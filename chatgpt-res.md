Your React/Next.js <video> implementation is mostly fine. The likely bottleneck is the way the MP4 is being delivered from DigitalOcean Spaces CDN, plus potentially the MP4's internal structure.

Your URL:

https://getweys.fra1.cdn.digitaloceanspaces.com/Laybay.mp4

is already using DigitalOcean Spaces CDN, so you're not dealing with a normal Droplet/Nginx setup.

1. Your preload="metadata" isn't the main problem

This:

preload="metadata"

is actually a reasonable choice.

The browser should initially request metadata rather than intentionally downloading the whole 204 MB.

The important question is: does the CDN return partial byte ranges correctly?

For video playback, you want requests like:

Range: bytes=0-...

and responses like:

206 Partial Content
Content-Range: bytes 0-...
Accept-Ranges: bytes

If the CDN/browser interaction isn't doing this properly, your 204 MB file can behave like a giant download.

2. Your biggest issue may be onCanPlay

This part is also important:

onCanPlay={() => setIsReady(true)}

You're hiding the video:

${isReady ? "z-20" : "pointer-events-none opacity-0"}

So your poster + spinner remains visible until the browser fires canplay.

That's not necessarily wrong, but with a large video and slow initial buffering, it can look like the video isn't loading at all.

I'd change this to onLoadedMetadata or at least use a separate loading state.

For example:

<video
ref={videoRef}
title={title}
className={`${className} ${
    isReady ? "z-20" : "pointer-events-none opacity-0"
  }`}
playsInline
loop
controls
muted={isMuted}
preload="metadata"
onLoadedMetadata={() => setIsReady(true)}
onPlaying={() => setIsReady(true)}

>

  <source src={videoSrc} type="video/mp4" />
</video>

But this alone probably won't solve the 204 MB loading issue.

3. Optimize the MP4

This is the first thing I'd do.

If your original video was exported from Premiere/After Effects/CapCut/etc., the MP4's metadata (moov atom) may be at the end of the file.

That means the browser may need to fetch a large amount of the file before it knows enough about the video.

Run:

ffmpeg -i Laybay.mp4 -c copy -movflags +faststart Laybay-web.mp4

Then upload:

Laybay-web.mp4

instead of:

Laybay.mp4

This doesn't re-encode the video and therefore doesn't reduce quality.

It simply rearranges the MP4 metadata for web playback.

4. Even better: reduce the video size

204 MB is quite large for a website hero/background video.

If this is something like your Getweys website's landing-page animation/video, I'd strongly recommend making a web-specific version.

For example:

Original
204 MB
4K / high bitrate

        ↓

Website version
20–50 MB
1080p
H.264
reasonable bitrate
faststart

For a background/marketing video, users generally don't need a 204 MB source-quality video.

Example FFmpeg command:

ffmpeg -i Laybay.mp4 \
 -c:v libx264 \
 -preset medium \
 -crf 23 \
 -movflags +faststart \
 -an \
 Laybay-web.mp4

-an removes audio, which is particularly useful if this is a background video.

If you actually need audio, remove -an.

5. Test the DigitalOcean CDN directly

This is the test I would do before changing your React code.

Open Chrome DevTools:

F12 → Network → reload page → click Laybay.mp4

Look at:

Request Headers

You want to see something like:

Range: bytes=0-...
Response Headers

Look for:

Accept-Ranges: bytes
Content-Range: bytes ...
Content-Length: ...
Content-Type: video/mp4

And especially:

206 Partial Content

If you're seeing something like:

200 OK

with the entire 204 MB response, then we have found the problem.

6. There's another thing I'd change in your component

You have:

<source src={videoSrc} type={videoMimeType(videoSrc)} />

Your helper is unnecessary for this particular URL.

Just use:

<source src={videoSrc} type="video/mp4" />

because your file is definitely:

Laybay.mp4

So I'd simplify the component to:

export function CdnVideoEmbed({
videoSrc,
title,
posterSrc,
isMuted = false,
className = "absolute inset-0 size-full object-cover",
}: CdnPlayerBaseProps) {
const videoRef = useRef<HTMLVideoElement>(null);
const [isReady, setIsReady] = useState(false);

useEffect(() => {
if (videoRef.current) {
videoRef.current.muted = isMuted;
}
}, [isMuted]);

return (
<>
{!isReady && (
<VideoPoster
          posterSrc={posterSrc}
          title={title}
          showLoader
        />
)}

      <video
        ref={videoRef}
        title={title}
        className={`${className} ${
          isReady
            ? "z-20"
            : "pointer-events-none opacity-0"
        }`}
        playsInline
        loop
        controls
        muted={isMuted}
        preload="metadata"
        onLoadedMetadata={() => setIsReady(true)}
        onPlaying={() => setIsReady(true)}
      >
        <source
          src={videoSrc}
          type="video/mp4"
        />
      </video>
    </>

);
} 7. For your CdnScrollPlayer, there's a different issue

You are dynamically creating the <source>:

const source = document.createElement("source");

source.src = videoSrc;
source.type = videoMimeType(videoSrc);

video.appendChild(source);

video.load();

This is okay, but your strategy is:

Video enters viewport
↓
create source
↓
load 204 MB video
↓
wait for canplay
↓
play

For a large video, that can produce a noticeable delay.

You could preload a small amount earlier, or better, use a much smaller web-optimized video.

What I would do for Getweys

Since this looks like a marketing/website video rather than a user-uploaded video, I'd use:

Original video
│
├── Keep original → archival/source
│
└── Web version
↓
1080p H.264
20–50 MB
no audio if background
+faststart
↓
DigitalOcean Spaces
↓
DigitalOcean CDN
↓
<video>

Your existing:

export const laybyVideoSrc =
"https://getweys.fra1.cdn.digitaloceanspaces.com/Laybay.mp4";

can remain essentially the same; just point it to the optimized file:

export const laybyVideoSrc =
"https://getweys.fra1.cdn.digitaloceanspaces.com/Laybay-web.mp4";
Most important

Don't immediately rewrite your React component.

First test the current URL in DevTools and check:

Status: ?
Content-Type: ?
Accept-Ranges: ?
Content-Range: ?
Request Range: ?
Size: ?

If you send me a screenshot of Chrome DevTools → Network → Laybay.mp4 → Headers, I can tell you whether the problem is DigitalOcean CDN, MP4 encoding, or your React video logic
