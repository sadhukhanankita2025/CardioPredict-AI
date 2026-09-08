import { useEffect, useRef, useState, type ReactNode } from 'react';

import {
  Activity,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
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

  return (
    <div className="min-h-screen bg-background text-text-primary">

      {/* =========================================================
          HERO SECTION
      ========================================================= */}

      <section className="relative overflow-hidden">

        {/* Background decoration */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

          <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-maroon/10 blur-3xl" />

        </div>


        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-2 lg:px-10 lg:pb-28 lg:pt-24">


          {/* =====================================================
              HERO CONTENT
          ===================================================== */}

          <div>

            {/* Badge */}

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold tracking-wider text-primary">

              <Sparkles size={14} />

              AI-POWERED CARDIAC RISK ANALYSIS

            </div>


            {/* Heading */}

            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">

              Understand Your Heart.

              <span className="block text-primary">

                Predict the Risk.

              </span>

            </h1>


            {/* Description */}

            <p className="mt-6 max-w-xl text-base leading-7 text-text-secondary sm:text-lg">

              CardioPredict-AI uses machine learning to analyze
              cardiac health parameters and generate an
              AI-powered risk prediction.

            </p>


            {/* Buttons */}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <Link
                to="/login"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
              >

                Start Prediction

                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />

              </Link>


              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-6 py-3.5 text-sm font-semibold transition hover:border-primary hover:text-primary"
              >

                Learn More

                <ChevronRight size={17} />

              </Link>

            </div>


            {/* Small reassurance */}

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs text-text-muted">

              <span className="flex items-center gap-2">

                <CheckCircle2
                  size={15}
                  className="text-primary"
                />

                Data-driven analysis

              </span>


              <span className="flex items-center gap-2">

                <ShieldCheck
                  size={15}
                  className="text-primary"
                />

                Secure dashboard

              </span>

            </div>

          </div>


          {/* =====================================================
              HERO VISUAL
          ===================================================== */}

          <div className="relative mx-auto w-full max-w-lg">


            {/* =================================================
                MAIN CARD
            ================================================= */}

            <div
              ref={cardRef}
              style={{
                transform,
                transition: 'transform 180ms ease-out',
                transformStyle: 'preserve-3d',
              }}
              className="relative overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-2xl sm:p-8"
            >

              {/* Soft glow */}

              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />


              {/* Top */}

              <div className="relative z-10 flex items-center justify-between">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Cardiac Analysis
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    AI Health Monitor
                  </p>

                </div>


                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">

                  <HeartPulse size={23} />

                </div>

              </div>


              {/* =================================================
                  HEARTBEAT VISUAL
              ================================================= */}

              <div className="relative my-10 flex items-center justify-center">

                {/* Outer heartbeat ring */}

                <div className="heartbeat-ring heartbeat-ring-outer absolute h-44 w-44 rounded-full border border-primary/20" />


                {/* Inner heartbeat ring */}

                <div className="heartbeat-ring heartbeat-ring-inner absolute h-32 w-32 rounded-full border border-primary/20" />


                {/* Heart */}

                <div className="heartbeat-heart relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">

                  <HeartPulse
                    size={52}
                    strokeWidth={1.5}
                  />

                </div>

              </div>


              {/* =================================================
                  ECG SIGNAL
              ================================================= */}

              <div className="relative overflow-hidden rounded-xl border border-border bg-background p-4">

                <div className="mb-3 flex items-center justify-between">

                  <span className="text-xs font-medium text-text-muted">
                    ECG SIGNAL
                  </span>


                  <span className="flex items-center gap-1.5 text-xs font-medium text-primary">

                    <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />

                    Monitoring

                  </span>

                </div>


                {/* ECG animation window */}

                <div className="ecg-window flex h-14 items-center">

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
                        className="text-primary"
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
                        className="text-primary"
                      />

                    </svg>

                  </div>

                </div>

              </div>


              {/* =================================================
                  BOTTOM STATS
              ================================================= */}

              <div className="mt-4 grid grid-cols-2 gap-3">


                {/* Parameters */}

                <div className="rounded-xl border border-border p-4">

                  <p className="text-xs text-text-muted">
                    Parameters
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    11
                  </p>

                </div>


                {/* AI Analysis */}

                <div className="rounded-xl border border-border p-4">

                  <p className="text-xs text-text-muted">
                    AI Analysis
                  </p>

                  <p className="mt-1 text-xl font-bold text-primary">
                    Ready
                  </p>

                </div>

              </div>

            </div>


            {/* =================================================
                FLOATING PREDICTION ENGINE
            ================================================= */}

            <div className="prediction-engine absolute -bottom-5 -left-4 hidden rounded-xl border border-border bg-surface p-4 shadow-xl sm:block">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">

                  <BrainCircuit size={20} />

                </div>


                <div>

                  <p className="text-xs text-text-muted">
                    Prediction Engine
                  </p>

                  <p className="text-sm font-semibold">
                    Machine Learning
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          PLATFORM HIGHLIGHTS
      ========================================================= */}

      <section className="border-y border-border bg-surface">

        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border sm:grid-cols-4">

          <Highlight
            icon={<BrainCircuit size={21} />}
            title="AI Powered"
            description="Machine learning"
          />

          <Highlight
            icon={<Activity size={21} />}
            title="Data Driven"
            description="Clinical parameters"
          />

          <Highlight
            icon={<Clock3 size={21} />}
            title="Fast Analysis"
            description="Rapid processing"
          />

          <Highlight
            icon={<LockKeyhole size={21} />}
            title="Secure"
            description="Protected dashboard"
          />

        </div>

      </section>


      {/* =========================================================
          ABOUT CARDIOPREDICT
      ========================================================= */}

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">

        <div className="grid items-center gap-12 lg:grid-cols-2">


          {/* Visual */}

          <div className="relative">

            <div className="overflow-hidden rounded-3xl border border-border bg-surface p-8">

              <div className="flex aspect-square max-w-md mx-auto items-center justify-center">

                <div className="relative flex h-52 w-52 items-center justify-center rounded-full border border-primary/20">

                  <div className="absolute h-40 w-40 rounded-full border border-primary/20" />

                  <div className="stethoscope-pulse flex h-28 w-28 items-center justify-center rounded-full bg-primary/10 text-primary">

                    <Stethoscope
                      size={55}
                      strokeWidth={1.4}
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* Content */}

          <div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              What Is CardioPredict-AI?
            </p>


            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">

              AI-powered cardiac

              <span className="block">
                risk prediction.
              </span>

            </h2>


            <p className="mt-5 leading-7 text-text-secondary">

              CardioPredict-AI is a machine-learning powered
              platform designed to analyze important cardiac
              health parameters and provide a model-generated
              prediction.

            </p>


            <p className="mt-4 leading-7 text-text-secondary">

              The platform brings patient input, intelligent
              analysis, prediction history, and reports together
              inside one protected dashboard.

            </p>


            <Link
              to="/about"
              className="group mt-7 inline-flex items-center gap-2 font-semibold text-primary"
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

      <section className="border-y border-border bg-surface">

        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              How It Works
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              From patient data to prediction
            </h2>

            <p className="mt-4 leading-7 text-text-secondary">

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
            />

            <ProcessStep
              number="02"
              icon={<BrainCircuit size={24} />}
              title="AI Analyzes Parameters"
              description="The machine-learning model processes the provided input and evaluates the data."
            />

            <ProcessStep
              number="03"
              icon={<Activity size={24} />}
              title="Get Prediction"
              description="View the model-generated prediction through the CardioPredict-AI dashboard."
            />

          </div>

        </div>

      </section>


      {/* =========================================================
          FEATURES
      ========================================================= */}

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">

        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Platform Features
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Everything in one place
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-text-secondary">

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
          />

          <FeatureCard
            icon={<Clock3 size={24} />}
            title="Prediction History"
            description="Keep track of previously generated predictions through your dashboard."
          />

          <FeatureCard
            icon={<FileText size={24} />}
            title="Reports"
            description="Organize and review prediction-related information in one place."
          />

          <FeatureCard
            icon={<LockKeyhole size={24} />}
            title="Secure Dashboard"
            description="Access prediction features through a protected user account."
          />

        </div>

      </section>


      {/* =========================================================
          PREVENTION CTA
      ========================================================= */}

      <section className="px-5 pb-20 sm:px-8 lg:px-10 lg:pb-28">

        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-border bg-surface">

          <div className="relative px-6 py-14 text-center sm:px-10 lg:px-20 lg:py-20">

            <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">

                <HeartPulse size={28} />

              </div>


              <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
                Take Care of Your Heart
              </h2>


              <p className="mx-auto mt-4 max-w-2xl leading-7 text-text-secondary">

                Understanding cardiac risk is only one part of
                maintaining heart health. Explore practical
                information about prevention and healthy habits.

              </p>


              <Link
                to="/prevention"
                className="mt-7 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
              >

                Explore Prevention

                <ArrowRight size={18} />

              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <section className="border-t border-border">

        <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:py-24">

          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Get Started
          </p>


          <h2 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">

            Ready to explore your

            <span className="block text-primary">
              cardiac risk?
            </span>

          </h2>


          <p className="mx-auto mt-5 max-w-xl leading-7 text-text-secondary">

            Sign in to access the CardioPredict-AI dashboard
            and begin your prediction workflow.

          </p>


          <Link
            to="/login"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
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
}

function Highlight({
  icon,
  title,
  description,
}: HighlightProps) {

  return (

    <div className="flex items-center gap-3 px-5 py-6 sm:justify-center sm:px-6">

      <div className="text-primary">
        {icon}
      </div>

      <div>

        <p className="text-sm font-semibold">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-text-muted">
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
}

function ProcessStep({
  number,
  icon,
  title,
  description,
}: ProcessStepProps) {

  return (

    <div className="relative rounded-2xl border border-border bg-background p-7">

      <div className="flex items-center justify-between">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>

        <span className="text-4xl font-bold text-primary/10">
          {number}
        </span>

      </div>


      <h3 className="mt-6 text-lg font-bold">
        {title}
      </h3>


      <p className="mt-3 text-sm leading-6 text-text-secondary">
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
}

function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {

  return (

    <div className="group rounded-2xl border border-border bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/40">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">

        {icon}

      </div>


      <h3 className="mt-5 font-bold">
        {title}
      </h3>


      <p className="mt-2 text-sm leading-6 text-text-secondary">
        {description}
      </p>

    </div>

  );

}


export default Home;