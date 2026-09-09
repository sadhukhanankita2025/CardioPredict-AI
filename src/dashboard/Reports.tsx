import { useEffect, useState } from "react";
import {
  ClipboardList,
  Download,
  FileText,
  HeartPulse,
  Search,
} from "lucide-react";
import jsPDF from "jspdf";
import lightLogo from "../components/logo/logolight.png";
import {
  getPredictionHistory,
  type PredictionRecord,
} from "../utils/predictionStorage";

function Reports() {
  const [reports, setReports] = useState<PredictionRecord[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setReports(getPredictionHistory());
  }, []);

  const filteredReports = reports.filter((report) =>
    report.patientName
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const generatePDF = (report: PredictionRecord) => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const margin = 15;
    let y = 15;

    // Professional Header Background (Maroon [128, 0, 32])
    pdf.setFillColor(128, 0, 32); 
    pdf.rect(0, 0, 210, 26, "F");

    // Add Logo to PDF Header on the left side (X: 15, Y: 6, Width: 30, Height: 12)
    const addLogoToPdf = () => {
      try {
        const img = new Image();
        img.src = lightLogo;
        pdf.addImage(img, "PNG", 15, 6, 30, 12);
      } catch (e) {
        // Fallback if canvas/image load fails synchronously
      }
    };
    addLogoToPdf();

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(13);
    pdf.setFont("helvetica", "bold");
    // Shift title right to make room for the logo on the left
    pdf.text("CARDIO-PREDICT CLINICAL ASSESSMENT REPORT", 50, 16);

    y = 34;

    // Layout Columns setup (2-column compact single-page layout)
    const leftColX = margin;
    const rightColX = 110;
    const contentWidth = 85;

    // --- LEFT COLUMN: Patient Info & Clinical Parameters ---
    let leftY = y;

    // Section Titles styled with Maroon color [128, 0, 32]
    pdf.setTextColor(128, 0, 32);
    pdf.setFontSize(9.5);
    pdf.setFont("helvetica", "bold");
    pdf.text("PATIENT INFORMATION", leftColX, leftY);
    leftY += 5;

    pdf.setTextColor(15, 23, 42); // Reset text color for body data
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8.5);
    const patientDetails = [
      `Name: ${report.patientName}`,
      `Date/Time: ${report.date} • ${report.time}`,
      `Record ID: ${report.id}`,
    ];
    patientDetails.forEach((line) => {
      pdf.text(line, leftColX, leftY);
      leftY += 4.5;
    });

    leftY += 3;

    pdf.setTextColor(128, 0, 32);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9.5);
    pdf.text("CLINICAL PARAMETERS", leftColX, leftY);
    leftY += 5;

    pdf.setTextColor(15, 23, 42);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);

    const parameters = [
      ["Age", report.age],
      ["Sex", report.sex],
      ["Chest Pain Type", report.chestPainType],
      ["Resting BP", report.restingBP],
      ["Cholesterol", report.cholesterol],
      ["Fasting BS", report.fastingBS],
      ["Resting ECG", report.restingECG],
      ["Max Heart Rate", report.maxHR],
      ["Exercise Angina", report.exerciseAngina],
      ["Oldpeak", report.oldpeak],
      ["ST Slope", report.stSlope],
    ];

    parameters.forEach(([label, value]) => {
      pdf.text(`${label}:`, leftColX, leftY);
      pdf.text(String(value), leftColX + 45, leftY);
      leftY += 4.2;
    });

    // --- RIGHT COLUMN: AI Prediction & Recommendations ---
    let rightY = y;

    pdf.setTextColor(128, 0, 32);
    pdf.setFontSize(9.5);
    pdf.setFont("helvetica", "bold");
    pdf.text("AI PREDICTION ANALYSIS", rightColX, rightY);
    rightY += 5;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8.5);

    const riskColor = report.riskLevel === "Higher Risk" ? [185, 28, 28] : [15, 118, 110];
    pdf.setTextColor(riskColor[0], riskColor[1], riskColor[2]);
    pdf.setFont("helvetica", "bold");
    pdf.text(`Risk Assessment: ${report.riskLevel}`, rightColX, rightY);
    pdf.setFont("helvetica", "normal");
    rightY += 5;

    pdf.setTextColor(15, 23, 42);
    const metrics = [
      `Model Confidence: ${report.modelConfidence.toFixed(1)}%`,
      `Lower Risk Probability: ${(report.class0Probability * 100).toFixed(1)}%`,
      `Higher Risk Probability: ${(report.class1Probability * 100).toFixed(1)}%`,
    ];
    metrics.forEach((metric) => {
      pdf.text(metric, rightColX, rightY);
      rightY += 4.5;
    });

    rightY += 4;

    pdf.setTextColor(128, 0, 32);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9.5);
    pdf.text("CLINICAL RECOMMENDATIONS", rightColX, rightY);
    rightY += 5;

    pdf.setTextColor(15, 23, 42);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);

    let suggestions: string[] = [];
    if (report.riskLevel === "Higher Risk") {
      suggestions = [
        "Consult a qualified cardiologist immediately.",
        "Schedule comprehensive clinical evaluation.",
        "Adhere strictly to prescribed medical plans.",
        "Monitor blood pressure and vital signs daily.",
        "Cease smoking and maintain heart-healthy habits.",
      ];
    } else if (report.riskLevel === "Moderate / Borderline Risk") {
      suggestions = [
        "Discuss findings with your family physician.",
        "Engage in regular moderate physical activity.",
        "Adopt a balanced, whole-food diet strategy.",
        "Track blood sugar and cholesterol metrics.",
      ];
    } else {
      suggestions = [
        "Sustain current healthy lifestyle routines.",
        "Remain physically active and exercise safely.",
        "Maintain routine preventative health checks.",
      ];
    }

    suggestions.forEach((suggestion) => {
      const lines = pdf.splitTextToSize(`• ${suggestion}`, contentWidth);
      pdf.text(lines, rightColX, rightY);
      rightY += lines.length * 4 + 1.5;
    });

    // --- Footer ---
    pdf.setFontSize(7);
    pdf.setFont("helvetica", "italic");
    pdf.setTextColor(100, 116, 139);
    pdf.text(
      "Disclaimer: This automated document is generated by CardioPredict-AI for informational support only and does not substitute for formal clinical diagnosis.",
      margin,
      288,
      { maxWidth: 180 }
    );

    pdf.save(`CardioPredict-${report.patientName}-${report.id}.pdf`);
  };

  return (
    <div className="bg-background text-text-primary transition-colors duration-300">
      <div className="p-5 sm:p-6 lg:p-8">
        {/* Heading */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#8B1E24] dark:text-red-400">
              Medical Reports
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Reports
            </h1>
            <p className="mt-2 max-w-2xl text-text-secondary">
              View and download your generated CardioPredict-AI reports.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
            />
            <input
              type="text"
              placeholder="Search reports..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#8B1E24] dark:focus:border-red-400"
            />
          </div>
        </div>

        {/* Reports */}
        <section className="overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="border-b border-border p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#8B1E24]/10 text-[#8B1E24] dark:bg-red-500/15 dark:text-red-400">
                <FileText size={20} />
              </div>
              <div>
                <h2 className="font-semibold">Generated Reports</h2>
                <p className="text-sm text-text-muted">
                  {reports.length} reports
                </p>
              </div>
            </div>
          </div>

          {filteredReports.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-background text-text-muted">
                <ClipboardList size={28} />
              </div>
              <h3 className="text-lg font-semibold">No Reports Available</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-text-secondary">
                Reports generated from your AI predictions will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="flex flex-col justify-between gap-4 p-6 transition hover:bg-background/50 sm:flex-row sm:items-center"
                >
                  {/* Report Info */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#8B1E24]/10 text-[#8B1E24] dark:bg-red-500/15 dark:text-red-400">
                      <HeartPulse size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{report.patientName}</h3>
                      <p className="mt-1 text-xs text-text-muted">
                        {report.date} • {report.time}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4">
                    <span className={`text-sm font-medium ${
                      report.riskLevel === "Higher Risk"
                        ? "text-red-600 dark:text-red-400"
                        : report.riskLevel === "Lower Risk"
                        ? "text-green-600 dark:text-green-400"
                        : "text-yellow-600 dark:text-yellow-400"
                    }`}>
                      {report.riskLevel}
                    </span>
                    <button
                      type="button"
                      onClick={() => generatePDF(report)}
                      className="flex items-center gap-2 rounded-lg bg-[#8B1E24] dark:bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#72171D] dark:hover:bg-red-700 shadow-lg"
                    >
                      <Download size={16} />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Reports;