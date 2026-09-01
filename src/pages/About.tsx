import type { ReactNode } from 'react';

import {
  Activity,
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  FileText,
  HeartPulse,
  LockKeyhole,
  ShieldCheck,
  Stethoscope,
  UserRound,
} from 'lucide-react';

import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">

      {/* =========================================================
          PAGE INTRO
      ========================================================= */}

      <section className="relative overflow-hidden border-b border-[var(--border)]">

        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[var(--primary)]/10 blur-3xl" />

          <div className="absolute right-[-100px] top-20 h-72 w-72 rounded-full bg-[var(--maroon)]/10 blur-3xl" />
        </div>


        <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:py-28">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)]">
            <HeartPulse size={29} />
          </div>


          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
            About CardioPredict-AI
          </p>


          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Intelligent technology for
            <span className="block text-[var(--primary)]">
              cardiac risk analysis
            </span>
          </h1>


          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
            CardioPredict-AI combines machine learning and
            structured cardiac health data to provide a
            model-generated prediction through a simple,
            organized platform.
          </p>

        </div>

      </section>


      {/* =========================================================
          WHAT IS CARDIOPREDICT-AI
      ========================================================= */}

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">

        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* Visual */}
          <div className="relative">

            <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-12">

              <div className="relative mx-auto flex aspect-square max-w-md items-center justify-center">

                {/* Outer rings */}
                <div className="absolute h-72 w-72 rounded-full border border-[var(--primary)]/10" />

                <div className="absolute h-60 w-60 rounded-full border border-[var(--primary)]/15" />

                <div className="absolute h-48 w-48 rounded-full border border-[var(--primary)]/20" />


                {/* Center */}
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">

                  <HeartPulse
                    size={64}
                    strokeWidth={1.4}
                  />

                </div>


                {/* Floating cards */}

                <div className="absolute left-0 top-12 rounded-xl border border-[var(--border)] bg-[var(--background)] p-3 shadow-lg">

                  <div className="flex items-center gap-2">

                    <Activity
                      size={17}
                      className="text-[var(--primary)]"
                    />

                    <span className="text-xs font-medium">
                      Health Data
                    </span>

                  </div>

                </div>


                <div className="absolute bottom-10 right-0 rounded-xl border border-[var(--border)] bg-[var(--background)] p-3 shadow-lg">

                  <div className="flex items-center gap-2">

                    <BrainCircuit
                      size={17}
                      className="text-[var(--primary)]"
                    />

                    <span className="text-xs font-medium">
                      AI Model
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* Content */}
          <div>

            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
              What Is CardioPredict-AI?
            </p>


            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Bringing cardiac data and
              <span className="block">
                machine learning together.
              </span>
            </h2>


            <p className="mt-6 leading-7 text-[var(--text-secondary)]">
              CardioPredict-AI is a machine-learning based
              platform designed to analyze a collection of
              cardiac health parameters and generate a
              model-based prediction.
            </p>


            <p className="mt-4 leading-7 text-[var(--text-secondary)]">
              The platform provides a structured workflow where
              patient information can be entered, processed by
              the trained model, and presented through an
              organized dashboard.
            </p>


            <div className="mt-7 space-y-3">

              <AboutPoint text="Structured cardiac parameter analysis" />

              <AboutPoint text="Machine-learning powered prediction" />

              <AboutPoint text="Protected dashboard workflow" />

              <AboutPoint text="Prediction history and reports" />

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          HOW THE SYSTEM WORKS
      ========================================================= */}

      <section className="border-y border-[var(--border)] bg-[var(--surface)]">

        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
              How The System Works
            </p>


            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              From input to prediction
            </h2>


            <p className="mt-4 leading-7 text-[var(--text-secondary)]">
              CardioPredict-AI follows a straightforward workflow
              that connects patient input with the trained
              machine-learning model.
            </p>

          </div>


          {/* Steps */}
          <div className="relative mt-14">

            {/* Connecting line */}
            <div className="absolute left-[16.66%] right-[16.66%] top-12 hidden h-px bg-[var(--border)] md:block" />


            <div className="relative grid gap-8 md:grid-cols-3">

              <SystemStep
                number="01"
                icon={<FileText size={25} />}
                title="Input"
                description="Enter the required cardiac health parameters through the prediction form."
              />

              <SystemStep
                number="02"
                icon={<BrainCircuit size={25} />}
                title="Model"
                description="The trained machine-learning model processes the supplied parameters."
              />

              <SystemStep
                number="03"
                icon={<Activity size={25} />}
                title="Output"
                description="The resulting model prediction is presented through the dashboard."
              />

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          DATA PARAMETERS
      ========================================================= */}

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
            Model Parameters
          </p>


          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            The data behind the prediction
          </h2>


          <p className="mt-4 leading-7 text-[var(--text-secondary)]">
            The prediction workflow uses 11 cardiac and
            demographic parameters as model inputs.
          </p>

        </div>


        {/* Parameter grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <ParameterCard
            number="01"
            title="Age"
            icon={<UserRound size={19} />}
          />

          <ParameterCard
            number="02"
            title="Sex"
            icon={<UserRound size={19} />}
          />

          <ParameterCard
            number="03"
            title="Chest Pain Type"
            icon={<HeartPulse size={19} />}
          />

          <ParameterCard
            number="04"
            title="Resting Blood Pressure"
            icon={<Activity size={19} />}
          />

          <ParameterCard
            number="05"
            title="Cholesterol"
            icon={<BarChart3 size={19} />}
          />

          <ParameterCard
            number="06"
            title="Fasting Blood Sugar"
            icon={<Activity size={19} />}
          />

          <ParameterCard
            number="07"
            title="Resting ECG"
            icon={<Activity size={19} />}
          />

          <ParameterCard
            number="08"
            title="Maximum Heart Rate"
            icon={<HeartPulse size={19} />}
          />

          <ParameterCard
            number="09"
            title="Exercise Angina"
            icon={<Activity size={19} />}
          />

          <ParameterCard
            number="10"
            title="Oldpeak"
            icon={<BarChart3 size={19} />}
          />

          <ParameterCard
            number="11"
            title="ST Slope"
            icon={<Activity size={19} />}
          />

        </div>

      </section>


      {/* =========================================================
          PLATFORM FEATURES
      ========================================================= */}

      <section className="border-y border-[var(--border)] bg-[var(--surface)]">

        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">

          <div className="text-center">

            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
              Platform Features
            </p>


            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Built around the prediction workflow
            </h2>

          </div>


          <div className="mt-12 grid gap-5 sm:grid-cols-2">

            <FeatureCard
              icon={<HeartPulse size={24} />}
              title="AI Prediction"
              description="Submit cardiac parameters and process them through the integrated machine-learning model."
            />

            <FeatureCard
              icon={<BrainCircuit size={24} />}
              title="Machine Learning"
              description="A trained model provides the prediction based on the supplied input parameters."
            />

            <FeatureCard
              icon={<BarChart3 size={24} />}
              title="History & Reports"
              description="Organize previous prediction information and access it through the dashboard."
            />

            <FeatureCard
              icon={<LockKeyhole size={24} />}
              title="Protected Access"
              description="Prediction functionality is available through the authenticated dashboard."
            />

          </div>

        </div>

      </section>


      {/* =========================================================
          WHY CARDIOPREDICT
      ========================================================= */}

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
            Why CardioPredict-AI?
          </p>


          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Simple. Intelligent. Organized.
          </h2>

        </div>


        <div className="mt-12 grid gap-5 md:grid-cols-3">

          <WhyCard
            icon={<CheckCircle2 size={24} />}
            title="Simple"
            description="A focused interface makes entering and reviewing prediction information straightforward."
          />

          <WhyCard
            icon={<BrainCircuit size={24} />}
            title="Intelligent"
            description="Machine learning is used to process the supplied cardiac parameters."
          />

          <WhyCard
            icon={<BarChart3 size={24} />}
            title="Organized"
            description="Prediction, history, and reports are brought together in one dashboard."
          />

        </div>

      </section>


      {/* =========================================================
          IMPORTANT NOTE
      ========================================================= */}

      <section className="px-5 pb-20 sm:px-8 lg:px-10 lg:pb-28">

        <div className="mx-auto max-w-5xl rounded-2xl border border-[var(--primary)]/20 bg-[var(--primary)]/5 p-6 sm:p-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
              <ShieldCheck size={23} />
            </div>


            <div>

              <h3 className="font-bold">
                Important Information
              </h3>


              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                CardioPredict-AI provides a machine-learning
                model prediction and is intended as a technology
                and educational project. The prediction should
                not be considered a medical diagnosis or a
                replacement for advice from a qualified
                healthcare professional.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <section className="border-t border-[var(--border)]">

        <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:py-24">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)]">
            <Stethoscope size={28} />
          </div>


          <h2 className="mt-6 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Ready to explore
            <span className="block text-[var(--primary)]">
              CardioPredict-AI?
            </span>
          </h2>


          <p className="mx-auto mt-5 max-w-xl leading-7 text-[var(--text-secondary)]">
            Sign in to access the protected dashboard and
            begin the prediction workflow.
          </p>


          <Link
            to="/login"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)]"
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
   ABOUT POINT
============================================================= */

interface AboutPointProps {
  text: string;
}

function AboutPoint({ text }: AboutPointProps) {
  return (
    <div className="flex items-center gap-3">

      <CheckCircle2
        size={18}
        className="shrink-0 text-[var(--primary)]"
      />

      <span className="text-sm text-[var(--text-secondary)]">
        {text}
      </span>

    </div>
  );
}


/* =============================================================
   SYSTEM STEP
============================================================= */

interface SystemStepProps {
  number: string;
  icon: ReactNode;
  title: string;
  description: string;
}

function SystemStep({
  number,
  icon,
  title,
  description,
}: SystemStepProps) {
  return (
    <div className="relative text-center">

      <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)]">

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
          {icon}
        </div>

      </div>


      <p className="mt-5 text-xs font-bold tracking-widest text-[var(--primary)]">
        {number}
      </p>


      <h3 className="mt-2 text-lg font-bold">
        {title}
      </h3>


      <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
        {description}
      </p>

    </div>
  );
}


/* =============================================================
   PARAMETER CARD
============================================================= */

interface ParameterCardProps {
  number: string;
  title: string;
  icon: ReactNode;
}

function ParameterCard({
  number,
  title,
  icon,
}: ParameterCardProps) {
  return (
    <div className="group flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)]/40">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
        {icon}
      </div>


      <div className="min-w-0 flex-1">

        <div className="flex items-center justify-between gap-3">

          <p className="text-sm font-semibold">
            {title}
          </p>

          <span className="text-xs font-bold text-[var(--primary)]/50">
            {number}
          </span>

        </div>

      </div>

    </div>
  );
}


/* =============================================================
   FEATURE CARD
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
    <div className="group rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/40">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] transition group-hover:bg-[var(--primary)] group-hover:text-white">
        {icon}
      </div>


      <h3 className="mt-5 text-lg font-bold">
        {title}
      </h3>


      <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
        {description}
      </p>

    </div>
  );
}


/* =============================================================
   WHY CARD
============================================================= */

interface WhyCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

function WhyCard({
  icon,
  title,
  description,
}: WhyCardProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 text-center transition duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/40">

      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
        {icon}
      </div>


      <h3 className="mt-5 text-lg font-bold">
        {title}
      </h3>


      <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
        {description}
      </p>

    </div>
  );
}


export default About;