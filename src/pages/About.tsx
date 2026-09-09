import { useEffect, useState, type ReactNode } from 'react';

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
          PAGE INTRO
      ========================================================= */}

      <section className={`relative overflow-hidden border-b ${isDark ? 'border-[#2A2725]' : 'border-[#E8DDD0]'}`}>

        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 -top-45 h-105 w-105 -translate-x-1/2 rounded-full bg-[#8B1E24]/10 dark:bg-red-500/10 blur-3xl" />

          <div className="absolute -right-25 top-20 h-72 w-72 rounded-full bg-[#8B1E24]/10 dark:bg-red-500/10 blur-3xl" />
        </div>


        <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:py-28">

          <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${isDark ? 'bg-red-500/10 text-red-400' : 'bg-[#8B1E24]/10 text-[#8B1E24]'}`}>
            <HeartPulse size={29} />
          </div>


          <p className={`mt-6 text-sm font-semibold uppercase tracking-[0.18em] ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
            About CardioPredict-AI
          </p>


          <h1 className={`mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
            Intelligent technology for
            <span className={`block ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
              cardiac risk analysis
            </span>
          </h1>


          <p className={`mx-auto mt-6 max-w-2xl text-base leading-7 sm:text-lg ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
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

            <div className={`overflow-hidden rounded-3xl border p-8 sm:p-12 ${isDark ? 'border-[#2A2725] bg-[#171717]' : 'border-[#E8DDD0] bg-[#FFFDFC]'}`}>

              <div className="relative mx-auto flex aspect-square max-w-md items-center justify-center">

                {/* Outer rings */}
                <div className={`absolute h-72 w-72 rounded-full border ${isDark ? 'border-red-500/10' : 'border-[#8B1E24]/10'}`} />

                <div className={`absolute h-60 w-60 rounded-full border ${isDark ? 'border-red-500/15' : 'border-[#8B1E24]/15'}`} />

                <div className={`absolute h-48 w-48 rounded-full border ${isDark ? 'border-red-500/20' : 'border-[#8B1E24]/20'}`} />


                {/* Center */}
                <div className={`relative flex h-32 w-32 items-center justify-center rounded-full ${isDark ? 'bg-red-500/15 text-red-400' : 'bg-[#8B1E24]/10 text-[#8B1E24]'}`}>

                  <HeartPulse
                    size={64}
                    strokeWidth={1.4}
                  />

                </div>


                {/* Floating cards */}

                <div className={`absolute left-0 top-12 rounded-xl border p-3 shadow-lg ${isDark ? 'border-[#2A2725] bg-[#141210]' : 'border-[#E8DDD0] bg-white'}`}>

                  <div className="flex items-center gap-2">

                    <Activity
                      size={17}
                      className={isDark ? 'text-red-400' : 'text-[#8B1E24]'}
                    />

                    <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
                      Health Data
                    </span>

                  </div>

                </div>


                <div className={`absolute bottom-10 right-0 rounded-xl border p-3 shadow-lg ${isDark ? 'border-[#2A2725] bg-[#141210]' : 'border-[#E8DDD0] bg-white'}`}>

                  <div className="flex items-center gap-2">

                    <BrainCircuit
                      size={17}
                      className={isDark ? 'text-red-400' : 'text-[#8B1E24]'}
                    />

                    <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
                      AI Model
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* Content */}
          <div>

            <p className={`text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
              What Is CardioPredict-AI?
            </p>


            <h2 className={`mt-3 text-3xl font-bold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
              Bringing cardiac data and
              <span className={`block ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
                machine learning together.
              </span>
            </h2>


            <p className={`mt-6 leading-7 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
              CardioPredict-AI is a machine-learning based
              platform designed to analyze a collection of
              cardiac health parameters and generate a
              model-based prediction.
            </p>


            <p className={`mt-4 leading-7 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
              The platform provides a structured workflow where
              patient information can be entered, processed by
              the trained model, and presented through an
              organized dashboard.
            </p>


            <div className="mt-7 space-y-3">

              <AboutPoint text="Structured cardiac parameter analysis" isDark={isDark} />

              <AboutPoint text="Machine-learning powered prediction" isDark={isDark} />

              <AboutPoint text="Protected dashboard workflow" isDark={isDark} />

              <AboutPoint text="Prediction history and reports" isDark={isDark} />

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          HOW THE SYSTEM WORKS
      ========================================================= */}

      <section className={`border-y ${isDark ? 'border-[#2A2725] bg-[#141414]' : 'border-[#E8DDD0] bg-[#FCFAF8]'}`}>

        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">

          <div className="mx-auto max-w-2xl text-center">

            <p className={`text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
              How The System Works
            </p>


            <h2 className={`mt-3 text-3xl font-bold sm:text-4xl ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
              From input to prediction
            </h2>


            <p className={`mt-4 leading-7 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
              CardioPredict-AI follows a straightforward workflow
              that connects patient input with the trained
              machine-learning model.
            </p>

          </div>


          {/* Steps */}
          <div className="relative mt-14">

            {/* Connecting line */}
            <div className={`absolute left-[16.66%] right-[16.66%] top-12 hidden h-px md:block ${isDark ? 'bg-[#2A2725]' : 'bg-[#E8DDD0]'}`} />


            <div className="relative grid gap-8 md:grid-cols-3">

              <SystemStep
                number="01"
                icon={<FileText size={25} />}
                title="Input"
                description="Enter the required cardiac health parameters through the prediction form."
                isDark={isDark}
              />

              <SystemStep
                number="02"
                icon={<BrainCircuit size={25} />}
                title="Model"
                description="The trained machine-learning model processes the supplied parameters."
                isDark={isDark}
              />

              <SystemStep
                number="03"
                icon={<Activity size={25} />}
                title="Output"
                description="The resulting model prediction is presented through the dashboard."
                isDark={isDark}
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

          <p className={`text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
            Model Parameters
          </p>


          <h2 className={`mt-3 text-3xl font-bold sm:text-4xl ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
            The data behind the prediction
          </h2>


          <p className={`mt-4 leading-7 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
            The prediction workflow uses 11 cardiac and
            demographic parameters as model inputs.
          </p>

        </div>


        {/* Parameter grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <ParameterCard number="01" title="Age" icon={<UserRound size={19} />} isDark={isDark} />

          <ParameterCard number="02" title="Sex" icon={<UserRound size={19} />} isDark={isDark} />

          <ParameterCard number="03" title="Chest Pain Type" icon={<HeartPulse size={19} />} isDark={isDark} />

          <ParameterCard number="04" title="Resting Blood Pressure" icon={<Activity size={19} />} isDark={isDark} />

          <ParameterCard number="05" title="Cholesterol" icon={<BarChart3 size={19} />} isDark={isDark} />

          <ParameterCard number="06" title="Fasting Blood Sugar" icon={<Activity size={19} />} isDark={isDark} />

          <ParameterCard number="07" title="Resting ECG" icon={<Activity size={19} />} isDark={isDark} />

          <ParameterCard number="08" title="Maximum Heart Rate" icon={<HeartPulse size={19} />} isDark={isDark} />

          <ParameterCard number="09" title="Exercise Angina" icon={<Activity size={19} />} isDark={isDark} />

          <ParameterCard number="10" title="Oldpeak" icon={<BarChart3 size={19} />} isDark={isDark} />

          <ParameterCard number="11" title="ST Slope" icon={<Activity size={19} />} isDark={isDark} />

        </div>

      </section>


      {/* =========================================================
          PLATFORM FEATURES
      ========================================================= */}

      <section className={`border-y ${isDark ? 'border-[#2A2725] bg-[#141414]' : 'border-[#E8DDD0] bg-[#FCFAF8]'}`}>

        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">

          <div className="text-center">

            <p className={`text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
              Platform Features
            </p>


            <h2 className={`mt-3 text-3xl font-bold sm:text-4xl ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
              Built around the prediction workflow
            </h2>

          </div>


          <div className="mt-12 grid gap-5 sm:grid-cols-2">

            <FeatureCard
              icon={<HeartPulse size={24} />}
              title="AI Prediction"
              description="Submit cardiac parameters and process them through the integrated machine-learning model."
              isDark={isDark}
            />

            <FeatureCard
              icon={<BrainCircuit size={24} />}
              title="Machine Learning"
              description="A trained model provides the prediction based on the supplied input parameters."
              isDark={isDark}
            />

            <FeatureCard
              icon={<BarChart3 size={24} />}
              title="History & Reports"
              description="Organize previous prediction information and access it through the dashboard."
              isDark={isDark}
            />

            <FeatureCard
              icon={<LockKeyhole size={24} />}
              title="Protected Access"
              description="Prediction functionality is available through the authenticated dashboard."
              isDark={isDark}
            />

          </div>

        </div>

      </section>


      {/* =========================================================
          WHY CARDIOPREDICT
      ========================================================= */}

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">

        <div className="mx-auto max-w-3xl text-center">

          <p className={`text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
            Why CardioPredict-AI?
          </p>


          <h2 className={`mt-3 text-3xl font-bold sm:text-4xl ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
            Simple. Intelligent. Organized.
          </h2>

        </div>


        <div className="mt-12 grid gap-5 md:grid-cols-3">

          <WhyCard
            icon={<CheckCircle2 size={24} />}
            title="Simple"
            description="A focused interface makes entering and reviewing prediction information straightforward."
            isDark={isDark}
          />

          <WhyCard
            icon={<BrainCircuit size={24} />}
            title="Intelligent"
            description="Machine learning is used to process the supplied cardiac parameters."
            isDark={isDark}
          />

          <WhyCard
            icon={<BarChart3 size={24} />}
            title="Organized"
            description="Prediction, history, and reports are brought together in one dashboard."
            isDark={isDark}
          />

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

      <section className={`border-t ${isDark ? 'border-[#2A2725]' : 'border-[#E8DDD0]'}`}>

        <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:py-24">

          <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${isDark ? 'bg-red-500/10 text-red-400' : 'bg-[#8B1E24]/10 text-[#8B1E24]'}`}>
            <Stethoscope size={28} />
          </div>


          <h2 className={`mt-6 text-3xl font-bold sm:text-4xl lg:text-5xl ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
            Ready to explore
            <span className={`block ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
              CardioPredict-AI?
            </span>
          </h2>


          <p className={`mx-auto mt-5 max-w-xl leading-7 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
            Sign in to access the protected dashboard and
            begin the prediction workflow.
          </p>


          <Link
            to="/login"
            className={`mt-8 inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold text-white transition shadow-lg ${isDark ? 'bg-red-600 hover:bg-red-700 shadow-red-600/20' : 'bg-[#8B1E24] hover:bg-[#70151B] shadow-[#8B1E24]/20'}`}
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
  isDark: boolean;
}

function AboutPoint({ text, isDark }: AboutPointProps) {
  return (
    <div className="flex items-center gap-3">

      <CheckCircle2
        size={18}
        className={`shrink-0 ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}
      />

      <span className={`text-sm ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
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
  isDark: boolean;
}

function SystemStep({
  number,
  icon,
  title,
  description,
  isDark,
}: SystemStepProps) {
  return (
    <div className="relative text-center">

      <div className={`relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border ${isDark ? 'border-[#2A2725] bg-[#141414]' : 'border-[#E8DDD0] bg-[#FCFAF8]'}`}>

        <div className={`flex h-14 w-14 items-center justify-center rounded-full ${isDark ? 'bg-red-500/10 text-red-400' : 'bg-[#8B1E24]/10 text-[#8B1E24]'}`}>
          {icon}
        </div>

      </div>


      <p className={`mt-5 text-xs font-bold tracking-widest ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
        {number}
      </p>


      <h3 className={`mt-2 text-lg font-bold ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
        {title}
      </h3>


      <p className={`mx-auto mt-3 max-w-sm text-sm leading-6 ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
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
  isDark: boolean;
}

function ParameterCard({
  number,
  title,
  icon,
  isDark,
}: ParameterCardProps) {
  return (
    <div className={`group flex items-center gap-4 rounded-xl border p-4 transition duration-300 hover:-translate-y-0.5 ${isDark ? 'border-[#2A2725] bg-[#171717] hover:border-red-400/40' : 'border-[#E8DDD0] bg-[#FFFDFC] hover:border-[#8B1E24]/40'}`}>

      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${isDark ? 'bg-red-500/10 text-red-400' : 'bg-[#8B1E24]/10 text-[#8B1E24]'}`}>
        {icon}
      </div>


      <div className="min-w-0 flex-1">

        <div className="flex items-center justify-between gap-3">

          <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
            {title}
          </p>

          <span className={`text-xs font-bold ${isDark ? 'text-stone-500' : 'text-[#8B1E24]/50'}`}>
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
  isDark: boolean;
}

function FeatureCard({
  icon,
  title,
  description,
  isDark,
}: FeatureCardProps) {
  return (
    <div className={`group rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 ${isDark ? 'border-[#2A2725] bg-[#171717] hover:border-red-400/40' : 'border-[#E8DDD0] bg-[#FFFDFC] hover:border-[#8B1E24]/40'}`}>

      <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition ${isDark ? 'bg-red-500/10 text-red-400 group-hover:bg-red-600 group-hover:text-white' : 'bg-[#8B1E24]/10 text-[#8B1E24] group-hover:bg-[#8B1E24] group-hover:text-white'}`}>
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
   WHY CARD
============================================================= */

interface WhyCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  isDark: boolean;
}

function WhyCard({
  icon,
  title,
  description,
  isDark,
}: WhyCardProps) {
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


export default About;