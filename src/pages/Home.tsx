import { useEffect, useRef, useState, type ReactNode } from 'react';

import {
  Activity,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  FileText,
  HeartPulse,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from 'lucide-react';

import { Link } from 'react-router-dom';

/* =========================================================
   HERO CARD CURSOR PARALLAX
========================================================= */

function useCardParallax() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  useEffect(() => {
    const card = cardRef.current;

    if (!card) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * 8;
      const rotateX = ((y / rect.height) - 0.5) * -8;

      setTransform(
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.015)`
      );
    };

    const handleMouseLeave = () => {
      setTransform(
        'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
      );
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return { cardRef, transform };
}


/* =========================================================
   HOME PAGE
========================================================= */

function Home() {
  const { cardRef, transform } = useCardParallax();
  const [isDark, setIsDark] = useState(false);

  // Synchronize with your app's theme attribute changes
  useEffect(() => {
    const checkTheme = () => {
      const themeAttr = document.documentElement.getAttribute('data-theme');
      const hasDarkClass = document.documentElement.classList.contains('dark');
      setIsDark(themeAttr === 'dark' || hasDarkClass);
    };

    checkTheme();

    // Observe attribute changes on document root
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${isDark ? 'bg-[#0c0a09] text-[#f5f5f4]' : 'bg-[#F7F2EB] text-[#231F20]'}`}>

      {/* =========================================================
          HERO SECTION
      ========================================================= */}

      <section className="relative overflow-hidden">

        {/* Background decoration */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className={`absolute -right-32 -top-32 h-96 w-96 rounded-full blur-3xl ${isDark ? 'bg-red-500/15' : 'bg-[#8B1E24]/15'}`} />

          <div className={`absolute -left-40 bottom-0 h-80 w-80 rounded-full blur-3xl ${isDark ? 'bg-red-500/10' : 'bg-[#8B1E24]/10'}`} />

        </div>


        <div className="relative mx-auto grid max-w-7xl items-center gap-20 px-6 py-16 lg:grid-cols-2 lg:px-10 lg:py-24">


          {/* =====================================================
              HERO CONTENT
          ===================================================== */}

          <div>

            {/* Badge */}

            <div className={`mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold tracking-wider shadow-sm ${isDark ? 'border-[#2A2725] bg-[#171717] text-red-400' : 'border-[#E8DDD0] bg-[#FFFDFC] text-[#8B1E24]'}`}>

              <Sparkles size={14} />

              AI-POWERED CARDIAC RISK ANALYSIS

            </div>


            {/* Heading */}

            <h1 className={`max-w-xl text-[56px] leading-[1.05] font-extrabold tracking-[-2px] lg:text-[68px] ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>

              Understand Your Heart.

              <span className={`block ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>

                Predict the Risk.

              </span>

            </h1>


            {/* Description */}

            <p className={`mt-6 max-w-md text-[15px] leading-7 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>

              CardioPredict-AI uses machine learning to analyze cardiac health
              parameters and generate an AI-powered risk prediction.

            </p>


            {/* Buttons */}

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                to="/prediction"
                className={`rounded-xl px-7 py-3 text-sm font-semibold text-white shadow-lg transition ${isDark ? 'bg-red-600 hover:bg-red-700' : 'bg-[#8B1E24] hover:bg-[#70151B]'}`}
              >

                Predict Now

              </Link>


              <Link
                to="/about"
                className={`rounded-xl border px-7 py-3 text-sm font-semibold transition ${isDark ? 'border-[#2A2725] bg-[#171717] text-white hover:border-red-400' : 'border-[#DDD2C7] bg-white text-[#2E2A28] hover:border-[#8B1E24]'}`}
              >

                Learn More →

              </Link>

            </div>


            {/* Small reassurance */}

            <div className={`mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>

              <span className="flex items-center gap-2">

                <CheckCircle2
                  size={15}
                  className={isDark ? 'text-red-400' : 'text-[#8B1E24]'}
                />

                Data-driven analysis

              </span>


              <span className="flex items-center gap-2">

                <ShieldCheck
                  size={15}
                  className={isDark ? 'text-red-400' : 'text-[#8B1E24]'}
                />

                Secure dashboard

              </span>

            </div>

          </div>


          {/* =====================================================
              HERO VISUAL
          ===================================================== */}

          <div className="relative mx-auto w-full max-w-md lg:max-w-lg">


            {/* =================================================
                MAIN CARD
            ================================================ */}

            <div
              ref={cardRef}
              style={{
                transform,
                transition: 'transform 180ms ease-out',
                transformStyle: 'preserve-3d',
              }}
              className={`relative rounded-[30px] border p-8 ${isDark ? 'border-[#2A2725] bg-[#171717] shadow-none' : 'border-[#E8DDD0] bg-[#FFFDFC] shadow-[0_30px_60px_rgba(80,40,30,0.12)]'}`}
            >

              {/* Soft glow */}

              <div className={`pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full blur-3xl ${isDark ? 'bg-red-500/10' : 'bg-[#8B1E24]/10'}`} />


              {/* Top */}

              <div className="relative z-10 flex items-center justify-between">

                <div>

                  <p className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
                    Cardiac Analysis
                  </p>

                  <p className={`mt-1 text-lg font-bold ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
                    AI Health Monitor
                  </p>

                </div>


                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${isDark ? 'bg-red-500/10 text-red-400' : 'bg-[#8B1E24]/10 text-[#8B1E24]'}`}>

                  <HeartPulse size={23} />

                </div>

              </div>


              {/* =================================================
                  HEARTBEAT VISUAL
              ================================================ */}

              <div className="relative my-6 flex items-center justify-center">

                {/* Outer heartbeat ring */}

                <div className={`heartbeat-ring heartbeat-ring-outer absolute h-28 w-28 rounded-full border ${isDark ? 'border-red-500/30' : 'border-[#8B1E24]/30'}`} />


                {/* Inner heartbeat ring */}

                <div className={`heartbeat-ring heartbeat-ring-inner absolute h-20 w-20 rounded-full border ${isDark ? 'border-red-500/30' : 'border-[#8B1E24]/30'}`} />


                {/* Heart */}

                <div className={`heartbeat-heart relative z-10 flex h-16 w-16 items-center justify-center rounded-full ${isDark ? 'bg-red-500/15 text-red-400' : 'bg-[#8B1E24]/10 text-[#8B1E24]'}`}>

                  <HeartPulse
                    size={32}
                    strokeWidth={1.5}
                  />

                </div>

              </div>


              {/* =================================================
                  ECG SIGNAL
              ================================================ */}

              <div className={`relative overflow-hidden rounded-2xl border p-4 ${isDark ? 'border-[#2A2725] bg-[#101010]' : 'border-[#E8DDD0] bg-[#F7F2EB]'}`}>

                <div className="mb-3 flex items-center justify-between">

                  <span className={`text-xs font-medium ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
                    ECG SIGNAL
                  </span>


                  <span className={`flex items-center gap-1.5 text-xs font-medium ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>

                    <span className={`h-2 w-2 animate-pulse rounded-full ${isDark ? 'bg-red-400' : 'bg-[#8B1E24]'}`} />

                    Monitoring

                  </span>

                </div>


                {/* ECG animation window */}

                <div className="ecg-window flex h-12 items-center">

                  <div className="ecg-track">


                    {/* ECG signal 1 */}

                    <svg
                      viewBox="0 0 500 80"
                      className="ecg-line h-full w-125 shrink-0"
                      preserveAspectRatio="none"
                    >

                      <path
                        d="M0 40 H70 L82 40 L92 15 L104 65 L116 40 H175 L187 40 L198 22 L209 58 L220 40 H285 L297 40 L308 12 L320 68 L332 40 H390 L402 40 L413 25 L424 55 L435 40 H500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className={isDark ? 'text-red-400' : 'text-[#8B1E24]'}
                      />

                    </svg>


                    {/* ECG signal 2 for seamless loop */}

                    <svg
                      viewBox="0 0 500 80"
                      className="ecg-line h-full w-125 shrink-0"
                      preserveAspectRatio="none"
                    >

                      <path
                        d="M0 40 H70 L82 40 L92 15 L104 65 L116 40 H175 L187 40 L198 22 L209 58 L220 40 H285 L297 40 L308 12 L320 68 L332 40 H390 L402 40 L413 25 L424 55 L435 40 H500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className={isDark ? 'text-red-400' : 'text-[#8B1E24]'}
                      />

                    </svg>

                  </div>

                </div>

              </div>


              {/* =================================================
                  BOTTOM STATS
              ================================================ */}

              <div className="mt-4 grid grid-cols-2 gap-3">


                {/* Parameters */}

                <div className={`rounded-2xl border p-4 ${isDark ? 'border-[#2A2725] bg-[#1B1B1B]' : 'border-[#E8DDD0] bg-white/70'}`}>

                  <p className={`text-xs ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
                    Parameters
                  </p>

                  <p className={`mt-1 text-xl font-bold ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
                    11
                  </p>

                </div>


                {/* AI Analysis */}

                <div className={`rounded-2xl border p-4 ${isDark ? 'border-[#2A2725] bg-[#1B1B1B]' : 'border-[#E8DDD0] bg-white/70'}`}>

                  <p className={`text-xs ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
                    AI Analysis
                  </p>

                  <p className={`mt-1 text-xl font-bold ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
                    Ready
                  </p>

                </div>

              </div>

            </div>


            {/* =================================================
                FLOATING PREDICTION ENGINE
            ================================================ */}

            <div className={`absolute -bottom-6 -left-5 z-25 hidden items-center gap-3 rounded-2xl border px-4 py-3 shadow-xl sm:flex ${isDark ? 'border-[#2A2725] bg-[#171717]' : 'border-[#E8DDD0] bg-white'}`}>

              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${isDark ? 'bg-red-500/10 text-red-400' : 'bg-[#8B1E24]/10 text-[#8B1E24]'}`}>

                <BrainCircuit size={20} />

              </div>


              <div>

                <p className={`text-xs ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
                  Prediction Engine
                </p>

                <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
                  Machine Learning
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          PLATFORM HIGHLIGHTS
      ========================================================= */}

      <section className={`border-y ${isDark ? 'border-[#2A2725] bg-[#141414]' : 'border-[#E8DDD0] bg-[#FCFAF8]'}`}>

        <div className={`mx-auto grid max-w-7xl grid-cols-2 divide-x sm:grid-cols-4 ${isDark ? 'divide-[#2A2725]' : 'divide-[#E8DDD0]'}`}>

          <Highlight
            icon={<BrainCircuit size={21} />}
            title="AI Powered"
            description="Machine learning"
            isDark={isDark}
          />

          <Highlight
            icon={<Activity size={21} />}
            title="Data Driven"
            description="Clinical parameters"
            isDark={isDark}
          />

          <Highlight
            icon={<Clock3 size={21} />}
            title="Fast Analysis"
            description="Rapid processing"
            isDark={isDark}
          />

          <Highlight
            icon={<LockKeyhole size={21} />}
            title="Secure"
            description="Protected dashboard"
            isDark={isDark}
          />

        </div>

      </section>


      {/* =========================================================
          ABOUT CARDIOPREDICT
      ========================================================= */}

      <section className={`py-28 ${isDark ? 'bg-[#0F0F10]' : 'bg-[#F7F2EB]'}`}>

        <div className="mx-auto grid max-w-7xl items-center gap-20 px-6 lg:grid-cols-2">


          {/* Visual */}

          <div className="relative">

            <div className={`rounded-[28px] border p-10 shadow-sm ${isDark ? 'border-[#2A2725] bg-[#171717]' : 'border-[#E8DDD0] bg-[#FFFDFC]'}`}>

              <div className="flex aspect-square max-w-md mx-auto items-center justify-center">

                <div className={`relative flex h-60 w-60 items-center justify-center rounded-full border ${isDark ? 'border-red-500/30' : 'border-[#8B1E24]/30'}`}>

                  <div className={`absolute h-44 w-44 rounded-full border ${isDark ? 'border-red-500/30' : 'border-[#8B1E24]/30'}`} />

                  <div className={`stethoscope-pulse flex h-32 w-32 items-center justify-center rounded-full ${isDark ? 'bg-red-500/15 text-red-400' : 'bg-[#8B1E24]/10 text-[#8B1E24]'}`}>

                    <Stethoscope
                      size={60}
                      strokeWidth={1.4}
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* Content */}

          <div>

            <p className={`mb-3 text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
              What Is CardioPredict-AI?
            </p>


            <h2 className={`mt-4 text-[44px] font-bold leading-tight tracking-tight ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>

              AI-powered cardiac

              <span className={`block ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
                risk prediction.
              </span>

            </h2>


            <p className={`mt-6 leading-7 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>

              CardioPredict-AI is a machine-learning powered
              platform designed to analyze important cardiac
              health parameters and provide a model-generated
              prediction.

            </p>


            <p className={`mt-4 leading-7 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>

              The platform brings patient input, intelligent
              analysis, prediction history, and reports together
              inside one protected dashboard.

            </p>


            <Link
              to="/about"
              className={`group mt-8 inline-flex items-center gap-2 font-semibold ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}
            >

              Learn About the Platform

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />

            </Link>

          </div>

        </div>

      </section>


      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}

      <section className={`border-y ${isDark ? 'border-[#2A2725] bg-[#141414]' : 'border-[#E8DDD0] bg-[#FCFAF8]'}`}>

        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">

          <div className="mx-auto max-w-2xl text-center">

            <p className={`text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
              How It Works
            </p>

            <h2 className={`mt-3 text-3xl font-bold sm:text-4xl ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
              From patient data to prediction
            </h2>

            <p className={`mt-4 leading-7 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>

              A simple three-step workflow connects the
              patient parameters with the machine-learning model.

            </p>

          </div>


          <div className="mt-14 grid gap-6 md:grid-cols-3">

            <ProcessStep
              number="01"
              icon={<FileText size={24} />}
              title="Enter Patient Data"
              description="Provide the required cardiac health parameters through the prediction form."
              isDark={isDark}
            />

            <ProcessStep
              number="02"
              icon={<BrainCircuit size={24} />}
              title="AI Analyzes Parameters"
              description="The machine-learning model processes the provided input and evaluates the data."
              isDark={isDark}
            />

            <ProcessStep
              number="03"
              icon={<Activity size={24} />}
              title="Get Prediction"
              description="View the model-generated prediction through the CardioPredict-AI dashboard."
              isDark={isDark}
            />

          </div>

        </div>

      </section>


      {/* =========================================================
          FEATURES
      ========================================================= */}

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">

        <div className="text-center">

          <p className={`text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
            Platform Features
          </p>

          <h2 className={`mt-3 text-3xl font-bold sm:text-4xl ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
            Everything in one place
          </h2>

          <p className={`mx-auto mt-4 max-w-2xl leading-7 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>

            CardioPredict-AI brings prediction, history,
            reports, and account management into one focused
            dashboard.

          </p>

        </div>


        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <FeatureCard
            icon={<HeartPulse size={24} />}
            title="AI Prediction"
            description="Analyze cardiac parameters through the integrated machine-learning model."
            isDark={isDark}
          />

          <FeatureCard
            icon={<Clock3 size={24} />}
            title="Prediction History"
            description="Keep track of previously generated predictions through your dashboard."
            isDark={isDark}
          />

          <FeatureCard
            icon={<FileText size={24} />}
            title="Reports"
            description="Organize and review prediction-related information in one place."
            isDark={isDark}
          />

          <FeatureCard
            icon={<LockKeyhole size={24} />}
            title="Secure Dashboard"
            description="Access prediction features through a protected user account."
            isDark={isDark}
          />

        </div>

      </section>


      {/* =========================================================
          PREVENTION CTA
      ========================================================= */}

      <section className="py-20">

        <div className={`mx-auto max-w-7xl rounded-[34px] border px-8 py-20 text-center shadow-sm ${isDark ? 'border-[#2A2725] bg-[#171717]' : 'border-[#E8DDD0] bg-white'}`}>

          <div className="relative">

            <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${isDark ? 'bg-red-500/15 text-red-400' : 'bg-[#F8E8E8] text-[#8B1E24]'}`}>

              <HeartPulse size={28} />

            </div>


            <h2 className={`mt-6 text-3xl font-bold sm:text-4xl ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
              Take Care of Your Heart
            </h2>


            <p className={`mx-auto mt-4 max-w-2xl leading-7 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>

              Understanding cardiac risk is only one part of
              maintaining heart health. Explore practical
              information about prevention and healthy habits.

            </p>


            <Link
              to="/prevention"
              className={`mt-8 inline-flex rounded-xl px-8 py-3 font-semibold text-white ${isDark ? 'bg-red-600 hover:bg-red-700' : 'bg-[#8B1E24] hover:bg-[#70151B]'}`}
            >

              Explore Prevention

            </Link>

          </div>

        </div>

      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <section className="py-12">

        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">

          <p className={`text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
            Get Started
          </p>


          <h2 className={`text-[50px] font-bold leading-tight tracking-tight ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>

            Ready to explore your

            <span className={`block ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
              cardiac risk?
            </span>

          </h2>


          <p className={`mx-auto mt-5 max-w-xl leading-7 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>

            Sign in to access the CardioPredict-AI dashboard
            and begin your prediction workflow.

          </p>


          <Link
            to="/login"
            className={`mt-8 inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white transition shadow-lg ${isDark ? 'bg-red-600 hover:bg-red-700 shadow-red-600/20' : 'bg-[#8B1E24] hover:bg-[#70151B] shadow-[#8B1E24]/20'}`}
          >

            Start Prediction

            <ArrowRight size={18} />

          </Link>

        </div>

      </section>

    </div>
  );
}


/* =============================================================
   HIGHLIGHT COMPONENT
============================================================= */

interface HighlightProps {
  icon: ReactNode;
  title: string;
  description: string;
  isDark: boolean;
}

function Highlight({
  icon,
  title,
  description,
  isDark,
}: HighlightProps) {

  return (

    <div className="flex items-center justify-center gap-3 py-7">

      <div className={isDark ? 'text-red-400' : 'text-[#8B1E24]'}>
        {icon}
      </div>

      <div>

        <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
          {title}
        </p>

        <p className={`mt-0.5 text-xs ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
          {description}
        </p>

      </div>

    </div>

  );
}


/* =============================================================
   PROCESS STEP COMPONENT
============================================================= */

interface ProcessStepProps {
  number: string;
  icon: ReactNode;
  title: string;
  description: string;
  isDark: boolean;
}

function ProcessStep({
  number,
  icon,
  title,
  description,
  isDark,
}: ProcessStepProps) {

  return (

    <div className={`relative rounded-[22px] border p-8 transition-all hover:-translate-y-1 hover:shadow-lg ${isDark ? 'border-[#2A2725] bg-[#171717]' : 'border-[#E8DDD0] bg-[#FFFDFC]'}`}>

      <div className="flex items-center justify-between">

        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${isDark ? 'bg-red-500/10 text-red-400' : 'bg-[#F8E8E8] text-[#8B1E24]'}`}>
          {icon}
        </div>

        <span className={`text-5xl font-bold ${isDark ? 'text-stone-800' : 'text-[#F0D8D8]'}`}>
          {number}
        </span>

      </div>


      <h3 className={`mt-6 text-lg font-bold ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
        {title}
      </h3>


      <p className={`mt-3 text-sm leading-6 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
        {description}
      </p>

    </div>

  );
}


/* =============================================================
   FEATURE CARD COMPONENT
============================================================= */

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  isDark: boolean;
}

function FeatureCard({
  icon,
  title,
  description,
  isDark,
}: FeatureCardProps) {

  return (

    <div className={`rounded-[22px] border p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg ${isDark ? 'border-[#2A2725] bg-[#171717] hover:border-red-400/40' : 'border-[#E8DDD0] bg-white hover:border-[#8B1E24]/40'}`}>

      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${isDark ? 'bg-red-500/10 text-red-400' : 'bg-[#F8E8E8] text-[#8B1E24]'}`}>

        {icon}

      </div>


      <h3 className={`mt-5 font-bold ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
        {title}
      </h3>


      <p className={`mt-2 text-sm leading-6 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
        {description}
      </p>

    </div>

  );

}

export default Home;