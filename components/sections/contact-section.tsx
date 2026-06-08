"use client";

import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { motion } from "framer-motion";
import {
  contactEyebrow,
  contactHeading,
  contactIntro,
  emailDisplay,
  phoneDisplay,
} from "@/lib/site-content";
import { fadeUp, fadeUpBlur, headerStagger, slideInRight, staggerContainer, viewportOnce } from "@/lib/motion-variants";

const phoneHref = `tel:${phoneDisplay.replace(/-/g, "")}`;
const mailHref = `mailto:${emailDisplay}`;

const floatingControlClass =
  "peer w-full rounded-none border-0 border-b border-brand-green/35 bg-transparent px-0 pb-2.5 pt-6 text-sm text-secondary shadow-none outline-none transition-[border-color,color] duration-200 placeholder:text-transparent focus:border-primary focus:ring-0";

const floatingLabelClass =
  "pointer-events-none absolute left-0 top-[1.35rem] origin-left text-sm text-slate-500 transition-all duration-200 ease-out peer-focus:top-0 peer-focus:text-xs peer-focus:font-medium peer-focus:text-primary peer-focus:scale-[0.92] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-medium peer-[:not(:placeholder-shown)]:text-primary peer-[:not(:placeholder-shown)]:scale-[0.92]";

interface FloatingInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  wrapperClassName?: string;
}

function FloatingInputField({
  id,
  label,
  wrapperClassName = "",
  required,
  ...inputProps
}: FloatingInputFieldProps) {
  return (
    <div className={`relative ${wrapperClassName}`}>
      <input
        id={id}
        required={required}
        placeholder=" "
        className={floatingControlClass}
        {...inputProps}
      />
      <label htmlFor={id} className={floatingLabelClass}>
        {label}
        {required ? " *" : null}
      </label>
    </div>
  );
}

interface FloatingTextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  wrapperClassName?: string;
}

function FloatingTextareaField({
  id,
  label,
  wrapperClassName = "",
  required,
  ...textareaProps
}: FloatingTextareaFieldProps) {
  return (
    <div className={`relative ${wrapperClassName}`}>
      <textarea
        id={id}
        required={required}
        placeholder=" "
        className={`${floatingControlClass} resize-y`}
        {...textareaProps}
      />
      <label htmlFor={id} className={floatingLabelClass}>
        {label}
        {required ? " *" : null}
      </label>
    </div>
  );
}

function ContactIconWrap({ children }: { children: ReactNode }) {
  return (
    <span className="flex shrink-0 items-center justify-center text-primary" aria-hidden>
      {children}
    </span>
  );
}

export function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-brand-green/15 bg-surface-green py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10 xl:gap-12">
          <motion.div
            className="flex min-w-0 flex-col gap-5 sm:gap-6 lg:col-span-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.div className="min-w-0 text-left" variants={headerStagger}>
              <motion.p
                variants={fadeUp}
                className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm"
              >
                {contactEyebrow}
              </motion.p>
              <motion.h2
                variants={fadeUpBlur}
                className="mt-2.5 text-2xl font-bold leading-tight tracking-tight text-secondary sm:text-3xl lg:text-[2rem] xl:text-[2.25rem]"
              >
                {contactHeading}
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-3 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">
                {contactIntro}
              </motion.p>
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
            variants={slideInRight}
          >
            <form
              className="bg-transparent lg:max-w-none"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <h3 className="text-base font-semibold text-secondary sm:text-lg">Send a message</h3>
              <p className="mt-1 text-sm text-slate-600">We&apos;ll get back to you as soon as we can.</p>

              <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:gap-x-8">
                <FloatingInputField
                  id="contact-name"
                  name="name"
                  label="Full name"
                  type="text"
                  autoComplete="name"
                />
                <FloatingInputField
                  id="contact-email"
                  name="email"
                  label="Email address"
                  type="email"
                  required
                  autoComplete="email"
                />
              </div>
              <FloatingInputField
                id="contact-phone"
                name="phone"
                label="Phone number"
                type="tel"
                required
                autoComplete="tel"
                pattern="[0-9()#&+*\\-.=]+"
                title="Only numbers and phone characters (#, -, *, etc) are accepted."
                wrapperClassName="mt-6"
              />
              <FloatingTextareaField
                id="contact-message"
                name="message"
                label="Your message"
                rows={4}
                wrapperClassName="mt-6"
              />
              <div className="mt-5 flex justify-end sm:mt-6">
                <motion.button
                  type="submit"
                  className="inline-flex min-h-9 w-full items-center justify-center rounded-lg bg-primary px-6 py-2 text-xs font-medium uppercase tracking-widest text-white shadow-[0_8px_28px_-14px_rgba(92,107,72,0.42)] transition hover:bg-primary/95 sm:w-auto sm:min-h-10 sm:px-7 sm:py-2.5 sm:text-sm sm:tracking-[0.08em]"
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
