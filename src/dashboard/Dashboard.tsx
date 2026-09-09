import { useEffect, useState } from "react";
import {
  Activity,
  Brain,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";
import logoImg from "../components/logo/logo.png";

function Dashboard() {
  const [isDark, setIsDark] = useState(false);
  const [predictionCount, setPredictionCount] = useState(0);

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

  useEffect(() => {
    const updatePredictionCount = () => {
      try {
        const history = JSON.parse(
          localStorage.getItem("predictionHistory") || "[]"
        );
        setPredictionCount(
          Array.isArray(history) ? history.length : 0
        );
      } catch (error) {
        console.error("Unable to read prediction history:", error);
        setPredictionCount(0);
      }
    };

    updatePredictionCount();

    window.addEventListener(
      "predictionHistoryUpdated",
      updatePredictionCount
    );

    return () => {
      window.removeEventListener(
        "predictionHistoryUpdated",
        updatePredictionCount
      );
    };
  }, []);

  const stats = [
    {
      title: "Predictions",
      value: String(predictionCount),
      description: "Total predictions",
      icon: HeartPulse,
    },
    {
      title: "AI Model",
      value: "Ready",
      description: "Model available",
      icon: Brain,
    },
    {
      title: "System",
      value: "Online",
      description: "All systems operational",
      icon: Activity,
    },
    {
      title: "Status",
      value: "Secure",
      description: "Protected session",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className={`min-h-[calc(100vh-5rem)] transition-colors duration-300 ${isDark ? 'bg-[#0c0a09] text-[#f5f5f4]' : 'bg-[#F7F2EB] text-[#231F20]'}`}>
      <div className="p-5 sm:p-6 lg:p-8">
        {/* Page Heading */}
        <div className="mb-8">
          <p className={`mb-2 text-sm font-semibold uppercase tracking-[0.18em] ${isDark ? 'text-red-400' : 'text-[#8B1E24]'}`}>
            CARDIOPREDICT-AI
          </p>
          <h1 className={`text-3xl font-bold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
            Dashboard
          </h1>
          <p className={`mt-2 max-w-2xl text-text-secondary ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
            Your AI-powered cardiac risk prediction workspace.
          </p>
        </div>

        {/* Welcome Card */}
        <div className={`mb-8 overflow-hidden rounded-2xl border ${isDark ? 'border-[#2A2725] bg-[#171717]' : 'border-[#E8DDD0] bg-[#FFFDFC]'}`}>
          <div className="p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
                    Welcome to CardioPredict-AI
                  </h2>
                  <img
                    src={logoImg}
                    alt="CardioPredict Logo"
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <p className={`mt-2 max-w-xl ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
                  Use the Prediction section to enter patient parameters and generate an AI-based cardiac disease prediction.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  window.location.href = "/dashboard/prediction";
                }}
                className={`rounded-lg px-5 py-3 text-sm font-semibold text-white transition shadow-lg ${isDark ? 'bg-red-600 hover:bg-red-700 shadow-red-600/20' : 'bg-[#8B1E24] hover:bg-[#70151B] shadow-[#8B1E24]/20'}`}
              >
                Start Prediction
              </button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className={`rounded-2xl border p-5 ${isDark ? 'border-[#2A2725] bg-[#171717]' : 'border-[#E8DDD0] bg-[#FFFDFC]'}`}
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${isDark ? 'bg-red-500/10 text-red-400' : 'bg-[#8B1E24]/10 text-[#8B1E24]'}`}>
                    <Icon size={22} />
                  </div>
                </div>

                <p className={`text-sm ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
                  {stat.title}
                </p>

                <p className={`mt-1 text-2xl font-bold ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
                  {stat.value}
                </p>

                <p className={`mt-1 text-xs ${isDark ? 'text-stone-500' : 'text-[#6B6663]/80'}`}>
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;