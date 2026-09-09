import { useEffect, useState } from 'react';
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

import { Link } from 'react-router-dom';

function Contact() {
  const [isDark, setIsDark] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Synchronize with your app's theme attribute changes
  useEffect(() => {
    const checkTheme = () => {
      const themeAttr = document.documentElement.getAttribute('data-theme');
      const hasDarkClass = document.documentElement.classList.contains('dark');
      setIsDark(themeAttr === 'dark' || hasDarkClass);
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });

    return () => observer.disconnect();
  }, []);

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
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0c0a09] text-[#f5f5f4]' : 'bg-[#F7F2EB] text-[#231F20]'}`}>

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className={`relative overflow-hidden border-b ${isDark ? 'border-[#2A2725]' : 'border-[#E8DDD0]'}`}>

        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 -top-45 h-105 w-105 -translate-x-1/2 rounded-full bg-[#8B1E24]/10 dark:bg-red-500/10 blur-3xl" />

          <div className="absolute -right-30 top-40 h-80 w-80 rounded-full bg-[#8B1E24]/10 dark:bg-red-500/10 blur-3xl" />

          <div className="absolute -bottom-37.5 -left-25 h-72 w-72 rounded-full bg-[#8B1E24]/5 dark:bg-red-500/5 blur-3xl" />
        </div>


        <div className="relative mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 lg:py-28">

          <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${isDark ? 'bg-red-500/10 text-red-400' : 'bg-[#8B1E24]/10 text-[#8B1E24]'}`}>
            <MessageSquare size={28} />
          </div>


          <p className={`mt-6 text-sm font-semibold uppercase tracking-[0.18em] ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
            Contact CardioPredict-AI
          </p>


          <h1 className={`mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
            Let's connect.
            <span className={`block ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
              We're listening.
            </span>
          </h1>


          <p className={`mx-auto mt-6 max-w-2xl text-base leading-7 sm:text-lg ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
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

          <div className={`rounded-2xl border p-7 sm:p-9 ${isDark ? 'border-[#2A2725] bg-[#171717]' : 'border-[#E8DDD0] bg-[#FFFDFC]'}`}>

            <p className={`text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
              Get In Touch
            </p>


            <h2 className={`mt-3 text-2xl font-bold sm:text-3xl ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
              How can we help?
            </h2>


            <p className={`mt-4 leading-7 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
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
                isDark={isDark}
              />


              <ContactOption
                icon={<Brain size={21} />}
                title="Model & AI"
                description="Questions about the prediction model and AI workflow."
                isDark={isDark}
              />


              <ContactOption
                icon={<Settings size={21} />}
                title="Technical Support"
                description="Having trouble using the website or dashboard?"
                isDark={isDark}
              />


              <ContactOption
                icon={<MessageSquare size={21} />}
                title="Feedback"
                description="Share ideas or suggestions that could improve the platform."
                isDark={isDark}
              />

            </div>


            {/* Divider */}
            <div className={`my-8 h-px ${isDark ? 'bg-[#2A2725]' : 'bg-[#E8DDD0]'}`} />


            {/* Email */}
            <div className="flex items-start gap-4">

              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${isDark ? 'bg-red-500/10 text-red-400' : 'bg-[#8B1E24]/10 text-[#8B1E24]'}`}>
                <Mail size={19} />
              </div>


              <div>

                <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
                  Email
                </p>

                <p className={`mt-1 text-sm ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
                  Contact details coming soon
                </p>

              </div>

            </div>

          </div>


          {/* =====================================================
              RIGHT SIDE FORM
          ===================================================== */}

          <div className={`rounded-2xl border p-7 sm:p-9 ${isDark ? 'border-[#2A2725] bg-[#171717]' : 'border-[#E8DDD0] bg-[#FFFDFC]'}`}>

            <div>

              <p className={`text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
                Send A Message
              </p>


              <h2 className={`mt-3 text-2xl font-bold sm:text-3xl ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
                Tell us what's on your mind
              </h2>


              <p className={`mt-4 text-sm leading-6 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
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
                    className={`mb-2 block text-sm font-medium ${isDark ? 'text-white' : 'text-[#211A1A]'}`}
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
                    className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition placeholder:text-stone-500 ${isDark ? 'border-[#2A2725] bg-[#101010] text-white focus:border-red-400' : 'border-[#E8DDD0] bg-background text-[#211A1A] focus:border-[#8B1E24]'}`}
                  />

                </div>


                <div>

                  <label
                    htmlFor="email"
                    className={`mb-2 block text-sm font-medium ${isDark ? 'text-white' : 'text-[#211A1A]'}`}
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
                    className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition placeholder:text-stone-500 ${isDark ? 'border-[#2A2725] bg-[#101010] text-white focus:border-red-400' : 'border-[#E8DDD0] bg-background text-[#211A1A] focus:border-[#8B1E24]'}`}
                  />

                </div>

              </div>


              {/* Subject */}
              <div>

                <label
                  htmlFor="subject"
                  className={`mb-2 block text-sm font-medium ${isDark ? 'text-white' : 'text-[#211A1A]'}`}
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
                  className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition placeholder:text-stone-500 ${isDark ? 'border-[#2A2725] bg-[#101010] text-white focus:border-red-400' : 'border-[#E8DDD0] bg-background text-[#211A1A] focus:border-[#8B1E24]'}`}
                />

              </div>


              {/* Message */}
              <div>

                <label
                  htmlFor="message"
                  className={`mb-2 block text-sm font-medium ${isDark ? 'text-white' : 'text-[#211A1A]'}`}
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
                  className={`w-full resize-none rounded-lg border px-4 py-3 text-sm outline-none transition placeholder:text-stone-500 ${isDark ? 'border-[#2A2725] bg-[#101010] text-white focus:border-red-400' : 'border-[#E8DDD0] bg-background text-[#211A1A] focus:border-[#8B1E24]'}`}
                />

              </div>


              {/* Submit */}
              <button
                type="submit"
                className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold text-white transition ${isDark ? 'bg-red-600 hover:bg-red-700' : 'bg-[#8B1E24] hover:bg-[#70151B]'}`}
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

      <section className={`border-y ${isDark ? 'border-[#2A2725] bg-[#141414]' : 'border-[#E8DDD0] bg-[#FCFAF8]'}`}>

        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">

          <div className="mx-auto max-w-3xl text-center">

            <p className={`text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
              Support
            </p>


            <h2 className={`mt-3 text-3xl font-bold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
              What can we help with?
            </h2>


            <p className={`mt-5 leading-7 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
              Choose the area that best matches your question.
            </p>

          </div>


          <div className="mt-12 grid gap-5 md:grid-cols-3">

            <SupportCard
              icon={<CircleHelp size={25} />}
              title="General Questions"
              description="Learn more about the platform, its features, and how CardioPredict-AI works."
              isDark={isDark}
            />


            <SupportCard
              icon={<Brain size={25} />}
              title="AI & Prediction"
              description="Questions about the machine-learning workflow and prediction results."
              isDark={isDark}
            />


            <SupportCard
              icon={<Settings size={25} />}
              title="Technical Support"
              description="Need help with your account, dashboard, or another technical issue?"
              isDark={isDark}
            />

          </div>

        </div>

      </section>


      {/* =========================================================
          QUICK QUESTIONS
      ========================================================= */}

      <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8 lg:py-28">

        <div className="text-center">

          <p className={`text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
            Quick Questions
          </p>


          <h2 className={`mt-3 text-3xl font-bold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
            Frequently asked topics
          </h2>

        </div>


        <div className="mt-10 grid gap-3">

          <QuestionRow text="How does the CardioPredict-AI prediction system work?" isDark={isDark} />

          <QuestionRow text="What information is used by the prediction model?" isDark={isDark} />

          <QuestionRow text="How do I access the dashboard?" isDark={isDark} />

          <QuestionRow text="Can I view my previous prediction results?" isDark={isDark} />

          <QuestionRow text="How can I report a technical problem?" isDark={isDark} />

        </div>

      </section>


      {/* =========================================================
          IMPORTANT NOTE
      ========================================================= */}

      <section className="px-5 pb-20 sm:px-8 lg:px-10 lg:pb-28">

        <div className={`mx-auto max-w-5xl rounded-2xl border p-6 sm:p-8 ${isDark ? 'border-red-500/20 bg-red-500/5' : 'border-[#8B1E24]/20 bg-[#8B1E24]/5'}`}>

          <div className="flex gap-4">

            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${isDark ? 'bg-red-500/10 text-red-400' : 'bg-[#8B1E24]/10 text-[#8B1E24]'}`}>
              <HeartIcon />
            </div>


            <div>

              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
                Important Health Information
              </h3>


              <p className={`mt-2 text-sm leading-6 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
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

      <section className={`border-t ${isDark ? 'border-[#2A2725]' : 'border-[#E8DDD0]'}`}>

        <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:py-24">

          <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${isDark ? 'bg-red-500/10 text-red-400' : 'bg-[#8B1E24]/10 text-[#8B1E24]'}`}>
            <HeartIcon />
          </div>


          <h2 className={`mt-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
            Ready to explore
            <span className={`block ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
              CardioPredict-AI?
            </span>
          </h2>


          <p className={`mx-auto mt-5 max-w-xl leading-7 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
            Sign in to access your dashboard and explore the
            CardioPredict-AI prediction workflow.
          </p>


          <Link
            to="/login"
            className={`mt-8 inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold text-white transition shadow-lg ${isDark ? 'bg-red-600 hover:bg-red-700 shadow-red-600/20' : 'bg-[#8B1E24] hover:bg-[#70151B] shadow-[#8B1E24]/20'}`}
          >
            Go to Login
            <ArrowRight size={18} />
          </Link>

        </div>

      </section>


      {/* =========================================================
          SUCCESS MESSAGE
      ========================================================= */}

      {submitted && (
        <div className={`fixed bottom-5 right-5 z-100 w-[calc(100%-40px)] max-w-sm rounded-xl border p-5 shadow-2xl ${isDark ? 'border-[#2A2725] bg-[#171717]' : 'border-[#E8DDD0] bg-white'}`}>

          <div className="flex items-start gap-4">

            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${isDark ? 'bg-red-500/10 text-red-400' : 'bg-[#8B1E24]/10 text-[#8B1E24]'}`}>
              <CheckCircle2 size={21} />
            </div>


            <div className="flex-1">

              <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
                Message submitted
              </h3>


              <p className={`mt-1 text-sm leading-5 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
                Your message has been received successfully.
              </p>

            </div>


            <button
              type="button"
              onClick={closeSuccessMessage}
              className={`transition ${isDark ? 'text-stone-400 hover:text-white' : 'text-[#6B6663] hover:text-[#211A1A]'}`}
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
  isDark: boolean;
}

function ContactOption({
  icon,
  title,
  description,
  isDark,
}: ContactOptionProps) {
  return (
    <div className="flex gap-4">

      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${isDark ? 'bg-red-500/10 text-red-400' : 'bg-[#8B1E24]/10 text-[#8B1E24]'}`}>
        {icon}
      </div>


      <div>

        <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
          {title}
        </h3>


        <p className={`mt-1 text-sm leading-5 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
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
  isDark: boolean;
}

function SupportCard({
  icon,
  title,
  description,
  isDark,
}: SupportCardProps) {
  return (
    <div className={`rounded-2xl border p-7 text-center transition duration-300 hover:-translate-y-1 ${isDark ? 'border-[#2A2725] bg-[#171717] hover:border-red-400/40' : 'border-[#E8DDD0] bg-[#FFFDFC] hover:border-[#8B1E24]/40'}`}>

      <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${isDark ? 'bg-red-500/10 text-red-400' : 'bg-[#8B1E24]/10 text-[#8B1E24]'}`}>
        {icon}
      </div>


      <h3 className={`mt-5 text-lg font-bold ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
        {title}
      </h3>


      <p className={`mt-3 text-sm leading-6 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
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
  isDark: boolean;
}

function QuestionRow({
  text,
  isDark,
}: QuestionRowProps) {
  return (
    <div className={`flex items-center justify-between gap-4 rounded-xl border px-5 py-4 transition ${isDark ? 'border-[#2A2725] bg-[#171717] hover:border-red-400/40' : 'border-[#E8DDD0] bg-[#FFFDFC] hover:border-[#8B1E24]/40'}`}>

      <div className="flex items-center gap-3">

        <CircleHelp
          size={18}
          className={`shrink-0 ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}
        />

        <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
          {text}
        </span>

      </div>


      <ArrowRight
        size={17}
        className={`shrink-0 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}
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