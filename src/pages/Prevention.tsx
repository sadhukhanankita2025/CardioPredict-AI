import { useEffect, useState, type ReactNode } from 'react';

import {
  Activity,
  Apple,
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock3,
  HeartPulse,
  Moon,
  ShieldCheck,
  Stethoscope,
  Wind,
} from 'lucide-react';

import { Link } from 'react-router-dom';

function Prevention() {
  const [isDark, setIsDark] = useState(false);

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

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0c0a09] text-[#f5f5f4]' : 'bg-[#F7F2EB] text-[#231F20]'}`}>

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className={`relative overflow-hidden border-b ${isDark ? 'border-[#2A2725]' : 'border-[#E8DDD0]'}`}>

        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 -top-45 h-105 w-105 -translate-x-1/2 rounded-full bg-[#8B1E24]/10 dark:bg-red-500/10 blur-3xl" />

          <div className="absolute -right-30 top-40 h-80 w-80 rounded-full bg-[#8B1E24]/10 dark:bg-red-500/10 blur-3xl" />

          <div className="absolute -bottom-37.5 -left-25 h-72 w-72 rounded-full bg-[#8B1E24]/5 dark:bg-red-500/5 blur-3xl" />
        </div>


        <div className="relative mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 lg:py-28">

          <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${isDark ? 'bg-red-500/10 text-red-400' : 'bg-[#8B1E24]/10 text-[#8B1E24]'}`}>
            <HeartPulse size={29} />
          </div>


          <p className={`mt-6 text-sm font-semibold uppercase tracking-[0.18em] ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
            Heart Health & Prevention
          </p>


          <h1 className={`mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
            Protect your heart.
            <span className={`block ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
              Understand your risks.
            </span>
          </h1>


          <p className={`mx-auto mt-6 max-w-2xl text-base leading-7 sm:text-lg ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
            Cardiovascular health is influenced by many factors.
            Building healthy habits and staying informed can help
            support your overall heart health.
          </p>


          <a
            href="#heart-health"
            className={`mt-8 inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-semibold transition ${isDark ? 'border-[#2A2725] bg-[#171717] text-white hover:border-red-400 hover:text-red-400' : 'border-[#E8DDD0] bg-[#FFFDFC] text-[#211A1A] hover:border-[#8B1E24] hover:text-[#8B1E24]'}`}
          >
            Explore Prevention
            <ArrowRight size={17} />
          </a>

        </div>

      </section>


      {/* =========================================================
          KNOW YOUR HEART
      ========================================================= */}

      <section
        id="heart-health"
        className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
      >

        <div className="mx-auto max-w-3xl text-center">

          <p className={`text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
            Know Your Heart
          </p>


          <h2 className={`mt-3 text-3xl font-bold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
            Awareness is the first step
          </h2>


          <p className={`mt-5 leading-7 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
            Understanding cardiovascular health means paying
            attention to the factors that can influence your
            heart and overall wellbeing.
          </p>

        </div>


        <div className="mt-12 grid gap-5 md:grid-cols-3">

          <AwarenessCard
            icon={<HeartPulse size={25} />}
            title="Heart Health"
            description="Learn about cardiovascular health and the factors that can affect it."
            isDark={isDark}
          />

          <AwarenessCard
            icon={<Activity size={25} />}
            title="Know Your Numbers"
            description="Keep track of important health measurements such as blood pressure and cholesterol."
            isDark={isDark}
          />

          <AwarenessCard
            icon={<Brain size={25} />}
            title="Stay Informed"
            description="Understanding your health information can help you make informed decisions."
            isDark={isDark}
          />

        </div>

      </section>


      {/* =========================================================
          HEALTHY HABITS
      ========================================================= */}

      <section className={`border-y ${isDark ? 'border-[#2A2725] bg-[#141414]' : 'border-[#E8DDD0] bg-[#FCFAF8]'}`}>

        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">

          <div className="max-w-2xl">

            <p className={`text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
              Heart-Healthy Habits
            </p>


            <h2 className={`mt-3 text-3xl font-bold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
              Small choices can add up
            </h2>


            <p className={`mt-5 leading-7 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
              Healthy routines can support cardiovascular wellbeing.
              Focus on habits that are realistic and sustainable for
              your everyday life.
            </p>

          </div>


          <div className="mt-12 grid gap-5 md:grid-cols-2">

            <HabitCard
              number="01"
              icon={<Apple size={25} />}
              title="Balanced Nutrition"
              description="Choose a varied and balanced diet that includes nutritious foods and supports your overall health."
              points={[
                'Choose a variety of nutritious foods',
                'Pay attention to overall dietary balance',
                'Stay mindful of highly processed foods',
              ]}
              isDark={isDark}
            />


            <HabitCard
              number="02"
              icon={<Activity size={25} />}
              title="Stay Physically Active"
              description="Regular physical activity can support cardiovascular fitness and overall wellbeing."
              points={[
                'Choose activities you enjoy',
                'Build movement into your daily routine',
                'Increase activity gradually when appropriate',
              ]}
              isDark={isDark}
            />


            <HabitCard
              number="03"
              icon={<Moon size={25} />}
              title="Prioritize Sleep"
              description="Consistent, adequate sleep is an important part of maintaining overall health."
              points={[
                'Maintain a consistent sleep routine',
                'Create a comfortable sleep environment',
                'Give your body enough time to rest',
              ]}
              isDark={isDark}
            />


            <HabitCard
              number="04"
              icon={<Wind size={25} />}
              title="Manage Everyday Stress"
              description="Finding healthy ways to manage stress can contribute to better overall wellbeing."
              points={[
                'Take regular breaks when needed',
                'Make time for relaxing activities',
                'Talk to someone when stress feels difficult to manage',
              ]}
              isDark={isDark}
            />

          </div>

        </div>

      </section>


      {/* =========================================================
          IMPORTANT HEALTH FACTORS
      ========================================================= */}

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">

        <div className="mx-auto max-w-3xl text-center">

          <p className={`text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
            Important Health Factors
          </p>


          <h2 className={`mt-3 text-3xl font-bold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
            Know the factors that matter
          </h2>


          <p className={`mt-5 leading-7 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
            Cardiovascular health is influenced by a combination
            of factors. Some can be modified through lifestyle,
            while others may require professional medical guidance.
          </p>

        </div>


        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <FactorCard
            icon={<Activity size={21} />}
            title="Blood Pressure"
            description="Regularly monitoring blood pressure can help you stay aware of your cardiovascular health."
            isDark={isDark}
          />

          <FactorCard
            icon={<BarChartIcon />}
            title="Cholesterol"
            description="Understanding your cholesterol levels can be an important part of cardiovascular health monitoring."
            isDark={isDark}
          />

          <FactorCard
            icon={<Activity size={21} />}
            title="Blood Sugar"
            description="Blood sugar levels can provide useful information about metabolic and overall health."
            isDark={isDark}
          />

          <FactorCard
            icon={<HeartPulse size={21} />}
            title="Physical Activity"
            description="Regular movement and physical activity can support cardiovascular fitness."
            isDark={isDark}
          />

          <FactorCard
            icon={<ShieldCheck size={21} />}
            title="Smoking"
            description="Avoiding tobacco exposure is an important step toward supporting cardiovascular health."
            isDark={isDark}
          />

          <FactorCard
            icon={<UserHealthIcon />}
            title="Family History"
            description="Family health history can be relevant when understanding individual cardiovascular risk."
            isDark={isDark}
          />

        </div>

      </section>


      {/* =========================================================
          KNOW YOUR NUMBERS
      ========================================================= */}

      <section className={`border-y ${isDark ? 'border-[#2A2725] bg-[#141414]' : 'border-[#E8DDD0] bg-[#FCFAF8]'}`}>

        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">

          <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">

            <div>

              <p className={`text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
                Know Your Numbers
              </p>


              <h2 className={`mt-3 text-3xl font-bold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
                Stay aware of your health information
              </h2>


              <p className={`mt-5 max-w-2xl leading-7 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
                Regular health checkups can help you keep track
                of important cardiovascular indicators. Discuss
                your results with a qualified healthcare
                professional to understand what they mean for you.
              </p>

            </div>


            <div className="grid grid-cols-3 gap-3 sm:gap-5">

              <NumberCard
                icon={<Activity size={22} />}
                label="Blood Pressure"
                isDark={isDark}
              />

              <NumberCard
                icon={<BarChartIcon />}
                label="Cholesterol"
                isDark={isDark}
              />

              <NumberCard
                icon={<HeartPulse size={22} />}
                label="Heart Health"
                isDark={isDark}
              />

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          WHEN TO SEEK GUIDANCE
      ========================================================= */}

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

          <div>

            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${isDark ? 'bg-red-500/10 text-red-400' : 'bg-[#8B1E24]/10 text-[#8B1E24]'}`}>
              <Stethoscope size={28} />
            </div>


            <p className={`mt-6 text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
              Professional Guidance
            </p>


            <h2 className={`mt-3 text-3xl font-bold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
              Your health is personal
            </h2>


            <p className={`mt-5 leading-7 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
              General health information cannot replace
              personalized medical advice. A healthcare
              professional can consider your individual
              circumstances, history, symptoms, and test results.
            </p>

          </div>


          <div className={`rounded-2xl border p-6 sm:p-8 ${isDark ? 'border-[#2A2725] bg-[#171717]' : 'border-[#E8DDD0] bg-[#FFFDFC]'}`}>

            <div className="space-y-5">

              <GuidancePoint
                icon={<Clock3 size={20} />}
                title="Regular checkups"
                description="Keep up with routine health assessments appropriate for you."
                isDark={isDark}
              />

              <GuidancePoint
                icon={<Stethoscope size={20} />}
                title="Discuss concerns"
                description="Talk to a qualified healthcare professional if you have concerns about your heart health."
                isDark={isDark}
              />

              <GuidancePoint
                icon={<ShieldCheck size={20} />}
                title="Know your history"
                description="Share relevant personal and family health information with your healthcare provider."
                isDark={isDark}
              />

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          IMPORTANT NOTE
      ========================================================= */}

      <section className="px-5 pb-20 sm:px-8 lg:px-10 lg:pb-28">

        <div className={`mx-auto max-w-5xl rounded-2xl border p-6 sm:p-8 ${isDark ? 'border-red-500/20 bg-red-500/5' : 'border-[#8B1E24]/20 bg-[#8B1E24]/5'}`}>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">

            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${isDark ? 'bg-red-500/10 text-red-400' : 'bg-[#8B1E24]/10 text-[#8B1E24]'}`}>
              <ShieldCheck size={23} />
            </div>


            <div>

              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
                Important Information
              </h3>


              <p className={`mt-2 text-sm leading-6 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
                The information on this page is provided for
                general educational purposes. It is not intended
                to diagnose, treat, or prevent any medical
                condition. If you have health concerns, symptoms,
                or questions about your individual risk, speak
                with a qualified healthcare professional.
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
            <HeartPulse size={28} />
          </div>


          <h2 className={`mt-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
            Stay informed about
            <span className={`block ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
              your heart health.
            </span>
          </h2>


          <p className={`mx-auto mt-5 max-w-xl leading-7 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
            Explore CardioPredict-AI and learn how its
            machine-learning workflow analyzes cardiac
            health parameters.
          </p>


          <Link
            to="/login"
            className={`mt-8 inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold text-white transition shadow-lg ${isDark ? 'bg-red-600 hover:bg-red-700 shadow-red-600/20' : 'bg-[#8B1E24] hover:bg-[#70151B] shadow-[#8B1E24]/20'}`}
          >
            Explore CardioPredict-AI
            <ArrowRight size={18} />
          </Link>

        </div>

      </section>

    </div>
  );
}


/* =============================================================
   AWARENESS CARD
============================================================= */

interface AwarenessCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  isDark: boolean;
}

function AwarenessCard({
  icon,
  title,
  description,
  isDark,
}: AwarenessCardProps) {
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
   HABIT CARD
============================================================= */

interface HabitCardProps {
  number: string;
  icon: ReactNode;
  title: string;
  description: string;
  points: string[];
  isDark: boolean;
}

function HabitCard({
  number,
  icon,
  title,
  description,
  points,
  isDark,
}: HabitCardProps) {
  return (
    <div className={`group rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 sm:p-7 ${isDark ? 'border-[#2A2725] bg-[#171717] hover:border-red-400/40' : 'border-[#E8DDD0] bg-[#FFFDFC] hover:border-[#8B1E24]/40'}`}>

      <div className="flex items-start justify-between gap-4">

        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${isDark ? 'bg-red-500/10 text-red-400' : 'bg-[#8B1E24]/10 text-[#8B1E24]'}`}>
          {icon}
        </div>


        <span className={`text-sm font-bold tracking-wider ${isDark ? 'text-stone-500' : 'text-[#8B1E24]/50'}`}>
          {number}
        </span>

      </div>


      <h3 className={`mt-6 text-xl font-bold ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
        {title}
      </h3>


      <p className={`mt-3 text-sm leading-6 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
        {description}
      </p>


      <div className="mt-6 space-y-3">

        {points.map((point) => (
          <div
            key={point}
            className="flex items-start gap-3"
          >

            <CheckCircle2
              size={17}
              className={`mt-0.5 shrink-0 ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}
            />

            <span className={`text-sm ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
              {point}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}


/* =============================================================
   FACTOR CARD
============================================================= */

interface FactorCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  isDark: boolean;
}

function FactorCard({
  icon,
  title,
  description,
  isDark,
}: FactorCardProps) {
  return (
    <div className={`rounded-xl border p-5 transition duration-300 ${isDark ? 'border-[#2A2725] bg-[#171717] hover:border-red-400/40' : 'border-[#E8DDD0] bg-[#FFFDFC] hover:border-[#8B1E24]/40'}`}>

      <div className="flex items-center gap-4">

        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${isDark ? 'bg-red-500/10 text-red-400' : 'bg-[#8B1E24]/10 text-[#8B1E24]'}`}>
          {icon}
        </div>


        <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
          {title}
        </h3>

      </div>


      <p className={`mt-4 text-sm leading-6 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
        {description}
      </p>

    </div>
  );
}


/* =============================================================
   NUMBER CARD
============================================================= */

interface NumberCardProps {
  icon: ReactNode;
  label: string;
  isDark: boolean;
}

function NumberCard({
  icon,
  label,
  isDark,
}: NumberCardProps) {
  return (
    <div className={`flex min-w-[23.75] flex-col items-center rounded-xl border p-4 text-center ${isDark ? 'border-[#2A2725] bg-[#171717]' : 'border-[#E8DDD0] bg-[#FFFDFC]'}`}>

      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${isDark ? 'bg-red-500/10 text-red-400' : 'bg-[#8B1E24]/10 text-[#8B1E24]'}`}>
        {icon}
      </div>


      <p className={`mt-3 text-xs font-semibold leading-4 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
        {label}
      </p>

    </div>
  );
}


/* =============================================================
   GUIDANCE POINT
============================================================= */

interface GuidancePointProps {
  icon: ReactNode;
  title: string;
  description: string;
  isDark: boolean;
}

function GuidancePoint({
  icon,
  title,
  description,
  isDark,
}: GuidancePointProps) {
  return (
    <div className="flex gap-4">

      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${isDark ? 'bg-red-500/10 text-red-400' : 'bg-[#8B1E24]/10 text-[#8B1E24]'}`}>
        {icon}
      </div>


      <div>

        <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
          {title}
        </h3>


        <p className={`mt-1 text-sm leading-6 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
          {description}
        </p>

      </div>

    </div>
  );
}


/* =============================================================
   SMALL ICON COMPONENTS
============================================================= */

function BarChartIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  );
}


function UserHealthIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21a6 6 0 0 1 12 0" />
      <path d="M17 11v6" />
      <path d="M14 14h6" />
    </svg>
  );
}


export default Prevention;