import { useEffect, useState } from "react";

import {
  Activity,
  Brain,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";

function Dashboard() {
  // ==========================================
  // Prediction Count
  // ==========================================

  const [predictionCount, setPredictionCount] =
    useState(0);

  // ==========================================
  // Load Prediction Count
  // ==========================================

  useEffect(() => {
    const updatePredictionCount = () => {
      try {
        const history = JSON.parse(
          localStorage.getItem("predictionHistory") ||
            "[]",
        );

        setPredictionCount(
          Array.isArray(history)
            ? history.length
            : 0,
        );
      } catch (error) {
        console.error(
          "Unable to read prediction history:",
          error,
        );

        setPredictionCount(0);
      }
    };

    // Load immediately when Dashboard opens
    updatePredictionCount();

    // ==========================================
    // ⭐ Listen for new predictions
    // ==========================================

    window.addEventListener(
      "predictionHistoryUpdated",
      updatePredictionCount,
    );

    // ==========================================
    // Cleanup listener
    // ==========================================

    return () => {
      window.removeEventListener(
        "predictionHistoryUpdated",
        updatePredictionCount,
      );
    };
  }, []);

  // ==========================================
  // Dashboard Statistics
  // ==========================================

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
    <div className="min-h-[calc(100vh-5rem)]">

      {/* Dashboard Content */}

      <div className="p-5 sm:p-6 lg:p-8">

        {/* Page Heading */}

        <div className="mb-8">

          <p className="mb-2 text-sm font-medium text-primary">
            CARDIOPREDICT-AI
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-text-secondary">
            Your AI-powered cardiac risk prediction
            workspace.
          </p>

        </div>

        {/* Welcome Card */}

        <div className="mb-8 overflow-hidden rounded-2xl border border-border bg-surface">

          <div className="p-6 sm:p-8">

            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

              <div>

                <h2 className="text-2xl font-bold">
                  Welcome to CardioPredict-AI 🫀
                </h2>

                <p className="mt-2 max-w-xl text-text-secondary">
                  Use the Prediction section to enter
                  patient parameters and generate an
                  AI-based cardiac disease prediction.
                </p>

              </div>

              <button
                type="button"
                onClick={() => {
                  window.location.href =
                    "/dashboard/prediction";
                }}
                className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover"
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
                className="rounded-2xl border border-border bg-surface p-5"
              >

                <div className="mb-5 flex items-center justify-between">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon size={20} />
                  </div>

                </div>

                <p className="text-sm text-text-muted">
                  {stat.title}
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs text-text-secondary">
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