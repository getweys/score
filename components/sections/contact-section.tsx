"use client";

import { motion } from "framer-motion";
import {
  contactHeading,
  contactIntro,
  emailDisplay,
  phoneDisplay,
} from "@/lib/site-content";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion-variants";

const phoneHref = `tel:${phoneDisplay.replace(/-/g, "")}`;
const mailHref = `mailto:${emailDisplay}`;

export function ContactSection() {
  return (
    <section id="contact" className="bg-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.h3
            className="text-2xl font-bold tracking-tight text-secondary sm:text-3xl"
            variants={fadeUp}
          >
            {contactHeading}
          </motion.h3>
          <motion.p className="mt-4 max-w-md text-base leading-relaxed text-zinc-600" variants={fadeUp}>
            {contactIntro}
          </motion.p>
          <motion.ul className="mt-10 space-y-8" variants={fadeUp}>
            <li className="flex gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-md shadow-primary/25">
                <PhoneGlyph className="size-5" />
              </span>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-secondary">Call</h4>
                <a href={phoneHref} className="mt-1 block text-lg text-zinc-700 transition hover:text-primary">
                  {phoneDisplay}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-md shadow-primary/25">
                <MailGlyph className="size-5" />
              </span>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-secondary">Mail</h4>
                <a href={mailHref} className="mt-1 block text-lg text-zinc-700 transition hover:text-primary">
                  {emailDisplay}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-md shadow-primary/25">
                <ClockGlyph className="size-5" />
              </span>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-secondary">Office Hours</h4>
                <p className="mt-1 text-lg text-zinc-700">9 am to 6 pm</p>
              </div>
            </li>
          </motion.ul>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ delay: 0.08 }}
        >
          <form
            className="rounded-2xl border border-zinc-100 bg-zinc-50/50 p-6 shadow-lg shadow-zinc-900/5 sm:p-8"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="sr-only" htmlFor="contact-name">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Name"
                className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-secondary outline-none ring-primary/0 transition placeholder:text-zinc-400 focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
              />
              <label className="sr-only" htmlFor="contact-email">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder="Email"
                className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-secondary outline-none transition placeholder:text-zinc-400 focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
              />
            </div>
            <label className="sr-only" htmlFor="contact-phone">
              Phone
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              required
              placeholder="Phone Number"
              pattern="[0-9()#&+*\\-.=]+"
              title="Only numbers and phone characters (#, -, *, etc) are accepted."
              className="mt-4 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-secondary outline-none transition placeholder:text-zinc-400 focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
            />
            <label className="sr-only" htmlFor="contact-message">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              placeholder="Message"
              className="mt-4 w-full resize-y rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-secondary outline-none transition placeholder:text-zinc-400 focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
            />
            <div className="mt-6 flex justify-end">
              <motion.button
                type="submit"
                className="inline-flex min-w-[8rem] items-center justify-center rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-white shadow-md shadow-primary/25 transition hover:shadow-lg"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

function PhoneGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" fill="currentColor" aria-hidden>
      <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" />
    </svg>
  );
}

function MailGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" fill="currentColor" aria-hidden>
      <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" />
    </svg>
  );
}

function ClockGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" fill="currentColor" aria-hidden>
      <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z" />
    </svg>
  );
}
