"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  contactEyebrow,
  contactHeading,
  contactIntro,
  emailDisplay,
  phoneDisplay,
} from "@/lib/site-content";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion-variants";

const phoneHref = `tel:${phoneDisplay.replace(/-/g, "")}`;
const mailHref = `mailto:${emailDisplay}`;

const inputClass =
  "w-full rounded-md border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-secondary outline-none transition placeholder:text-zinc-400 focus:border-primary/45 focus:ring-2 focus:ring-primary/12";

function ContactIconWrap({ children }: { children: ReactNode }) {
  return (
    <span className="flex shrink-0 items-center justify-center text-primary" aria-hidden>
      {children}
    </span>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10 xl:gap-12">
          <motion.div
            className="flex min-w-0 flex-col gap-5 sm:gap-6 lg:col-span-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.div variants={fadeUp} className="min-w-0 text-left">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">{contactEyebrow}</p>
              <h2 className="mt-2.5 text-2xl font-bold leading-tight tracking-tight text-secondary sm:text-3xl lg:text-[2rem] xl:text-[2.25rem]">
                {contactHeading}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">{contactIntro}</p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex min-w-0 items-start gap-3">
              <ContactIconWrap>
                <PhoneGlyph className="size-5 sm:size-[1.35rem]" />
              </ContactIconWrap>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Phone</p>
                <a
                  href={phoneHref}
                  className="mt-1 block text-sm font-semibold text-secondary transition-colors hover:text-primary sm:text-[0.9375rem]"
                >
                  {phoneDisplay}
                </a>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex min-w-0 items-start gap-3">
              <ContactIconWrap>
                <MailGlyph className="size-5 sm:size-[1.35rem]" />
              </ContactIconWrap>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Email</p>
                <a
                  href={mailHref}
                  className="mt-1 block wrap-break-word text-sm font-semibold text-secondary transition-colors hover:text-primary sm:text-[0.9375rem]"
                >
                  {emailDisplay}
                </a>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex min-w-0 items-start gap-3">
              <ContactIconWrap>
                <ClockGlyph className="size-5 sm:size-[1.35rem]" />
              </ContactIconWrap>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Office hours</p>
                <p className="mt-1 text-sm font-semibold text-secondary sm:text-[0.9375rem]">9 am to 6 pm</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="min-w-0 lg:col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <form
              className="bg-transparent lg:max-w-none"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <h3 className="text-base font-semibold text-secondary sm:text-lg">Send a message</h3>
              <p className="mt-1 text-sm text-slate-600">We&apos;ll get back to you as soon as we can.</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-3">
                <label className="sr-only" htmlFor="contact-name">
                  Name
                </label>
                <input id="contact-name" name="name" type="text" placeholder="Full name" className={inputClass} />
                <label className="sr-only" htmlFor="contact-email">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  className={inputClass}
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
                placeholder="Phone number"
                pattern="[0-9()#&+*\\-.=]+"
                title="Only numbers and phone characters (#, -, *, etc) are accepted."
                className={`${inputClass} mt-3`}
              />
              <label className="sr-only" htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                placeholder="Your message"
                className={`${inputClass} mt-3 resize-y`}
              />
              <div className="mt-5 flex justify-end sm:mt-6">
                <motion.button
                  type="submit"
                  className="inline-flex min-h-9 w-full items-center justify-center rounded-lg bg-primary px-6 py-2 text-xs font-medium uppercase tracking-widest text-white shadow-[0_8px_28px_-14px_rgba(225,29,72,0.55)] transition hover:bg-primary/95 sm:w-auto sm:min-h-10 sm:px-7 sm:py-2.5 sm:text-sm sm:tracking-[0.08em]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
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
