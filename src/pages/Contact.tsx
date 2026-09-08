import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  CircleHelp,
  Mail,
  MessageSquare,
  Send,
  Settings,
  Brain,
  X,
} from 'lucide-react';

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitted(true);

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const closeSuccessMessage = () => {
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-background text-text-primary">

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden border-b border-border">

        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 -top-45 h-105 w-105 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

          <div className="absolute -right-30 top-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

          <div className="absolute -bottom-37.5 -left-25 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        </div>


        <div className="relative mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 lg:py-28">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <MessageSquare size={28} />
          </div>


          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Contact CardioPredict-AI
          </p>


          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Let's connect.
            <span className="block text-primary">
              We're listening.
            </span>
          </h1>


          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
            Have a question about CardioPredict-AI, the prediction
            system, or the dashboard? Send us a message and let us
            know how we can help.
          </p>

        </div>

      </section>


      {/* =========================================================
          CONTACT SECTION
      ========================================================= */}

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">

          {/* =====================================================
              LEFT SIDE
          ===================================================== */}

          <div className="rounded-2xl border border-border bg-surface p-7 sm:p-9">

            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Get In Touch
            </p>


            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              How can we help?
            </h2>


            <p className="mt-4 leading-7 text-text-secondary">
              Whether you have a question, need technical help,
              or simply want to share feedback, we'd love to hear
              from you.
            </p>


            {/* Contact Options */}
            <div className="mt-10 space-y-5">

              <ContactOption
                icon={<CircleHelp size={21} />}
                title="General Questions"
                description="Questions about CardioPredict-AI or how the platform works."
              />


              <ContactOption
                icon={<Brain size={21} />}
                title="Model & AI"
                description="Questions about the prediction model and AI workflow."
              />


              <ContactOption
                icon={<Settings size={21} />}
                title="Technical Support"
                description="Having trouble using the website or dashboard?"
              />


              <ContactOption
                icon={<MessageSquare size={21} />}
                title="Feedback"
                description="Share ideas or suggestions that could improve the platform."
              />

            </div>


            {/* Divider */}
            <div className="my-8 h-px bg-border" />


            {/* Email */}
            <div className="flex items-start gap-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Mail size={19} />
              </div>


              <div>

                <p className="text-sm font-semibold">
                  Email
                </p>

                <p className="mt-1 text-sm text-text-secondary">
                  Contact details coming soon
                </p>

              </div>

            </div>

          </div>


          {/* =====================================================
              RIGHT SIDE FORM
          ===================================================== */}

          <div className="rounded-2xl border border-border bg-surface p-7 sm:p-9">

            <div>

              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Send A Message
              </p>


              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                Tell us what's on your mind
              </h2>


              <p className="mt-4 text-sm leading-6 text-text-secondary">
                Fill out the form below and submit your message.
              </p>

            </div>


            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* Name + Email */}
              <div className="grid gap-5 sm:grid-cols-2">

                <div>

                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium"
                  >
                    Name
                  </label>


                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-text-secondary/60 focus:border-primary"
                  />

                </div>


                <div>

                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email
                  </label>


                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-text-secondary/60 focus:border-primary"
                  />

                </div>

              </div>


              {/* Subject */}
              <div>

                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium"
                >
                  Subject
                </label>


                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What would you like to talk about?"
                  required
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-text-secondary/60 focus:border-primary"
                />

              </div>


              {/* Message */}
              <div>

                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium"
                >
                  Message
                </label>


                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows={6}
                  required
                  className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-text-secondary/60 focus:border-primary"
                />

              </div>


              {/* Submit */}
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
              >
                Send Message
                <Send size={17} />
              </button>

            </form>

          </div>

        </div>

      </section>


      {/* =========================================================
          HOW CAN WE HELP
      ========================================================= */}

      <section className="border-y border-border bg-surface">

        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Support
            </p>


            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              What can we help with?
            </h2>


            <p className="mt-5 leading-7 text-text-secondary">
              Choose the area that best matches your question.
            </p>

          </div>


          <div className="mt-12 grid gap-5 md:grid-cols-3">

            <SupportCard
              icon={<CircleHelp size={25} />}
              title="General Questions"
              description="Learn more about the platform, its features, and how CardioPredict-AI works."
            />


            <SupportCard
              icon={<Brain size={25} />}
              title="AI & Prediction"
              description="Questions about the machine-learning workflow and prediction results."
            />


            <SupportCard
              icon={<Settings size={25} />}
              title="Technical Support"
              description="Need help with your account, dashboard, or another technical issue?"
            />

          </div>

        </div>

      </section>


      {/* =========================================================
          QUICK QUESTIONS
      ========================================================= */}

      <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8 lg:py-28">

        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Quick Questions
          </p>


          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked topics
          </h2>

        </div>


        <div className="mt-10 grid gap-3">

          <QuestionRow text="How does the CardioPredict-AI prediction system work?" />

          <QuestionRow text="What information is used by the prediction model?" />

          <QuestionRow text="How do I access the dashboard?" />

          <QuestionRow text="Can I view my previous prediction results?" />

          <QuestionRow text="How can I report a technical problem?" />

        </div>

      </section>


      {/* =========================================================
          IMPORTANT NOTE
      ========================================================= */}

      <section className="px-5 pb-20 sm:px-8 lg:px-10 lg:pb-28">

        <div className="mx-auto max-w-5xl rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">

          <div className="flex gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <HeartIcon />
            </div>


            <div>

              <h3 className="font-bold">
                Important Health Information
              </h3>


              <p className="mt-2 text-sm leading-6 text-text-secondary">
                CardioPredict-AI is intended for educational
                and technological purposes. It is not a substitute
                for professional medical advice, diagnosis, or
                treatment. If you have a medical concern, please
                consult a qualified healthcare professional.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <section className="border-t border-border">

        <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:py-24">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <HeartIcon />
          </div>


          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to explore
            <span className="block text-primary">
              CardioPredict-AI?
            </span>
          </h2>


          <p className="mx-auto mt-5 max-w-xl leading-7 text-text-secondary">
            Sign in to access your dashboard and explore the
            CardioPredict-AI prediction workflow.
          </p>


          <a
            href="/login"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
          >
            Go to Login
            <ArrowRight size={18} />
          </a>

        </div>

      </section>


      {/* =========================================================
          SUCCESS MESSAGE
      ========================================================= */}

      {submitted && (
        <div className="fixed bottom-5 right-5 z-100 w-[calc(100%-40px)] max-w-sm rounded-xl border border-border bg-surface p-5 shadow-2xl">

          <div className="flex items-start gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 size={21} />
            </div>


            <div className="flex-1">

              <h3 className="text-sm font-bold">
                Message submitted
              </h3>


              <p className="mt-1 text-sm leading-5 text-text-secondary">
                Your message has been received successfully.
              </p>

            </div>


            <button
              type="button"
              onClick={closeSuccessMessage}
              className="text-text-secondary transition hover:text-text-primary"
              aria-label="Close notification"
            >
              <X size={18} />
            </button>

          </div>

        </div>
      )}

    </div>
  );
}


/* =============================================================
   CONTACT OPTION
============================================================= */

interface ContactOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ContactOption({
  icon,
  title,
  description,
}: ContactOptionProps) {
  return (
    <div className="flex gap-4">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>


      <div>

        <h3 className="text-sm font-bold">
          {title}
        </h3>


        <p className="mt-1 text-sm leading-5 text-text-secondary">
          {description}
        </p>

      </div>

    </div>
  );
}


/* =============================================================
   SUPPORT CARD
============================================================= */

interface SupportCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function SupportCard({
  icon,
  title,
  description,
}: SupportCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-background p-7 text-center transition duration-300 hover:-translate-y-1 hover:border-primary/40">

      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>


      <h3 className="mt-5 text-lg font-bold">
        {title}
      </h3>


      <p className="mt-3 text-sm leading-6 text-text-secondary">
        {description}
      </p>

    </div>
  );
}


/* =============================================================
   QUESTION ROW
============================================================= */

interface QuestionRowProps {
  text: string;
}

function QuestionRow({
  text,
}: QuestionRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface px-5 py-4 transition hover:border-primary/40">

      <div className="flex items-center gap-3">

        <CircleHelp
          size={18}
          className="shrink-0 text-primary"
        />

        <span className="text-sm font-medium">
          {text}
        </span>

      </div>


      <ArrowRight
        size={17}
        className="shrink-0 text-text-secondary"
      />

    </div>
  );
}


/* =============================================================
   HEART ICON
============================================================= */

function HeartIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}


export default Contact;