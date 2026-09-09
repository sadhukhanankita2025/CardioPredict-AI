import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import { jsPDF } from "jspdf";

import {
  Activity,
  AlertCircle,
  CheckCircle2,
  HeartPulse,
  RotateCcw,
  Send,
  XCircle,
} from "lucide-react";

import {
  savePredictionRecord,
  type PredictionRecord,
} from "../utils/predictionStorage";

type PredictionData = {
  prediction: number;
  probability: {
    class_0: number;
    class_1: number;
  };
  riskLevel: string;
  result?: string;
};

function Prediction() {
  // ==========================================
  // Form State
  // ==========================================

  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    sex: "",
    chestPainType: "",
    restingBP: "",
    cholesterol: "",
    fastingBS: "",
    restingECG: "",
    maxHR: "",
    exerciseAngina: "",
    oldpeak: "",
    stSlope: "",
  });

  // ==========================================
  // Prediction State
  // ==========================================

  const [result, setResult] = useState<PredictionData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ==========================================
  // Handle Form Changes
  // ==========================================

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // Submit Prediction
  // ==========================================

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      // ==========================================
      // Convert Form Values to CatBoost Values
      // ==========================================

      const requestData = {
        Age: Number(formData.age),

        Sex: formData.sex === "M" ? 1 : 0,

        ChestPainType:
          formData.chestPainType === "TA"
            ? 0
            : formData.chestPainType === "ATA"
              ? 1
              : formData.chestPainType === "NAP"
                ? 2
                : 3,

        RestingBP: Number(formData.restingBP),

        Cholesterol: Number(formData.cholesterol),

        FastingBS: Number(formData.fastingBS),

        RestingECG:
          formData.restingECG === "Normal"
            ? 0
            : formData.restingECG === "ST"
              ? 1
              : 2,

        MaxHR: Number(formData.maxHR),

        ExerciseAngina: formData.exerciseAngina === "Y" ? 1 : 0,

        Oldpeak: Number(formData.oldpeak),

        ST_Slope:
          formData.stSlope === "Up"
            ? 0
            : formData.stSlope === "Flat"
              ? 1
              : 2,
      };

      console.log("Sending data to CatBoost:", requestData);

      // ==========================================
      // Send Data to Flask Backend
      // ==========================================

      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      // ==========================================
      // Read Backend Response
      // ==========================================

      const data = await response.json();

      console.log("Backend response:", data);

      // ==========================================
      // Check Backend Response
      // ==========================================

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Prediction failed.");
      }

      // ==========================================
      // Get Probabilities
      // ==========================================

      const class1Probability = Number(
        data.probability?.class_1 ?? 0,
      );

      const class0Probability = Number(
        data.probability?.class_0 ?? 0,
      );

      const probabilityPercent = class1Probability * 100;

      // ==========================================
      // Determine Risk Level
      // ==========================================

      let riskLevel = "";

      if (probabilityPercent < 40) {
        riskLevel = "Lower Risk";
      } else if (probabilityPercent <= 65) {
        riskLevel = "Moderate / Borderline Risk";
      } else {
        riskLevel = "Higher Risk";
      }

      // ==========================================
      // Save Prediction Record
      // ==========================================

      const now = new Date();

      const record: PredictionRecord = {
        id: Date.now(),

        patientName: formData.patientName,

        date: now.toLocaleDateString(),

        time: now.toLocaleTimeString(),

        age: formData.age,

        sex: formData.sex,

        chestPainType: formData.chestPainType,

        restingBP: formData.restingBP,

        cholesterol: formData.cholesterol,

        fastingBS: formData.fastingBS,

        restingECG: formData.restingECG,

        maxHR: formData.maxHR,

        exerciseAngina: formData.exerciseAngina,

        oldpeak: formData.oldpeak,

        stSlope: formData.stSlope,

        prediction: data.prediction,

        riskLevel,

        class0Probability,

        class1Probability,

        modelConfidence: probabilityPercent,

        backendResult: data.result,
      };

      // Save to prediction storage
      savePredictionRecord(record);

      console.log("Prediction saved:", record);

      // ==========================================
      // Store Prediction History
      // ==========================================

      const historyRecord = {
        id: record.id,

        date: record.date,

        time: record.time,

        result: riskLevel,

        status: `${probabilityPercent.toFixed(1)}% confidence`,

        formData: {
          ...formData,
        },

        // Keep the prediction information as well
        prediction: data.prediction,

        class0Probability,

        class1Probability,

        modelConfidence: probabilityPercent,

        backendResult: data.result,
      };

      const existingHistory = JSON.parse(
        localStorage.getItem("predictionHistory") || "[]",
      );

      const updatedHistory = [
        ...existingHistory,
        historyRecord,
      ];

      localStorage.setItem(
        "predictionHistory",
        JSON.stringify(updatedHistory),
      );

      // ==========================================
      // ⭐ LIVE DASHBOARD UPDATE
      // ==========================================
      //
      // Tell Dashboard that a new prediction has
      // been successfully created.
      //
      window.dispatchEvent(
        new Event("predictionHistoryUpdated"),
      );

      console.log(
        "Dashboard prediction count update event dispatched.",
      );

      // ==========================================
      // Store Prediction Result
      // ==========================================

      setResult({
        prediction: Number(data.prediction),

        probability: {
          class_0: class0Probability,
          class_1: class1Probability,
        },

        riskLevel,

        result: data.result,
      });

      console.log(
        "Class 0 Probability:",
        class0Probability,
      );

      console.log(
        "Class 1 Probability:",
        class1Probability,
      );

      console.log("Risk Level:", riskLevel);
    } catch (error) {
      // ==========================================
      // Error Handling
      // ==========================================

      console.error("Prediction error:", error);

      if (error instanceof TypeError) {
        setError(
          "Unable to connect to the prediction server. Make sure the Flask backend is running on http://127.0.0.1:5000.",
        );
      } else {
        setError(
          error instanceof Error
            ? error.message
            : "Unable to generate prediction.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Reset Form
  // ==========================================

  const resetForm = () => {
    setFormData({
      patientName: "",
      age: "",
      sex: "",
      chestPainType: "",
      restingBP: "",
      cholesterol: "",
      fastingBS: "",
      restingECG: "",
      maxHR: "",
      exerciseAngina: "",
      oldpeak: "",
      stSlope: "",
    });

    setResult(null);
    setError(null);
  };

  // ==========================================
  // Format Probability
  // ==========================================

  const getProbability = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  // ==========================================
  // Generate PDF Report
  // ==========================================

  const generatePDFReport = () => {
    if (!result) {
      return;
    }

    const doc = new jsPDF();

    const class1Probability = result.probability.class_1;

    const probabilityPercent =
      class1Probability * 100;

    let riskLevel = "";

    let suggestions: string[] = [];

    if (probabilityPercent < 40) {
      riskLevel = "Lower Risk";

      suggestions = [
        "Continue maintaining a heart-healthy lifestyle.",
        "Stay physically active with regular age-appropriate exercise.",
        "Choose a balanced diet with fruits, vegetables, whole grains and other nutritious foods.",
        "Maintain regular health check-ups.",
        "Avoid smoking and exposure to tobacco smoke.",
        "Manage stress and maintain healthy sleep habits.",
      ];
    } else if (probabilityPercent <= 65) {
      riskLevel = "Moderate / Borderline Risk";

      suggestions = [
        "Arrange a consultation with a qualified healthcare professional to discuss the result.",
        "Review blood pressure, cholesterol and blood sugar with a healthcare professional.",
        "Maintain regular physical activity appropriate for your health and fitness level.",
        "Follow a balanced, heart-healthy eating pattern.",
        "Avoid smoking and exposure to tobacco smoke.",
        "Pay attention to new or worsening symptoms and seek medical advice when appropriate.",
      ];
    } else {
      riskLevel = "Higher Risk";

      suggestions = [
        "Discuss this prediction with a qualified healthcare professional.",
        "Do not use this AI result as a diagnosis or as a substitute for medical evaluation.",
        "Have relevant cardiovascular risk factors reviewed by a healthcare professional.",
        "Follow the healthcare professional's recommendations regarding lifestyle and follow-up care.",
        "Avoid smoking and exposure to tobacco smoke.",
        "Seek urgent medical attention if serious or concerning symptoms occur.",
      ];
    }

    // ==========================================
    // PDF Header
    // ==========================================

    doc.setFontSize(20);

    doc.setFont("helvetica", "bold");

    doc.text("CARDIOPREDICT-AI", 20, 20);

    doc.setFontSize(16);

    doc.text(
      "Cardiac Risk Prediction Report",
      20,
      32,
    );

    doc.setFontSize(10);

    doc.setFont("helvetica", "normal");

    doc.text(
      `Generated: ${new Date().toLocaleString()}`,
      20,
      42,
    );

    // ==========================================
    // Patient Information
    // ==========================================

    doc.setFontSize(13);

    doc.setFont("helvetica", "bold");

    doc.text("Patient Information", 20, 57);

    doc.setFontSize(11);

    doc.setFont("helvetica", "normal");

    let y = 68;

    const patientDetails = [
      ["Patient Name", formData.patientName],
      ["Age", formData.age],
      [
        "Sex",
        formData.sex === "M"
          ? "Male"
          : "Female",
      ],
      ["Chest Pain Type", formData.chestPainType],
      [
        "Resting Blood Pressure",
        `${formData.restingBP} mm Hg`,
      ],
      [
        "Cholesterol",
        `${formData.cholesterol} mg/dL`,
      ],
      [
        "Fasting Blood Sugar",
        formData.fastingBS === "1"
          ? "> 120 mg/dL"
          : "≤ 120 mg/dL",
      ],
      ["Resting ECG", formData.restingECG],
      [
        "Maximum Heart Rate",
        `${formData.maxHR} bpm`,
      ],
      [
        "Exercise-Induced Angina",
        formData.exerciseAngina === "Y"
          ? "Yes"
          : "No",
      ],
      ["Oldpeak", formData.oldpeak],
      ["ST Slope", formData.stSlope],
    ];

    patientDetails.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold");

      doc.text(`${label}:`, 20, y);

      doc.setFont("helvetica", "normal");

      doc.text(String(value), 75, y);

      y += 9;
    });

    // ==========================================
    // AI Prediction
    // ==========================================

    y += 8;

    doc.setFontSize(13);

    doc.setFont("helvetica", "bold");

    doc.text("AI Prediction", 20, y);

    y += 11;

    doc.setFontSize(12);

    doc.text(
      `Risk Level: ${riskLevel}`,
      20,
      y,
    );

    y += 9;

    doc.setFontSize(11);

    doc.setFont("helvetica", "normal");

    doc.text(
      `Model Confidence: ${probabilityPercent.toFixed(1)}%`,
      20,
      y,
    );

    y += 8;

    doc.text(
      `Lower Risk Probability: ${(
        result.probability.class_0 * 100
      ).toFixed(1)}%`,
      20,
      y,
    );

    y += 8;

    doc.text(
      `Higher Risk Probability: ${probabilityPercent.toFixed(1)}%`,
      20,
      y,
    );

    // ==========================================
    // Prevention Suggestions
    // ==========================================

    y += 15;

    doc.setFontSize(13);

    doc.setFont("helvetica", "bold");

    doc.text("What to Do Now", 20, y);

    y += 10;

    doc.setFontSize(10);

    doc.setFont("helvetica", "normal");

    suggestions.forEach((suggestion) => {
      const lines = doc.splitTextToSize(
        `• ${suggestion}`,
        170,
      );

      if (y > 270) {
        doc.addPage();

        y = 20;
      }

      doc.text(lines, 20, y);

      y += lines.length * 6 + 3;
    });

    // ==========================================
    // Disclaimer
    // ==========================================

    y += 8;

    if (y > 260) {
      doc.addPage();

      y = 20;
    }

    doc.setFontSize(9);

    doc.setFont("helvetica", "italic");

    const disclaimer =
      "Disclaimer: This report is generated by an AI-based prediction system and is intended for informational purposes only. It does not constitute a medical diagnosis. Please consult a qualified healthcare professional for medical advice, diagnosis and treatment.";

    const disclaimerLines =
      doc.splitTextToSize(
        disclaimer,
        170,
      );

    doc.text(
      disclaimerLines,
      20,
      y,
    );

    // ==========================================
    // Download PDF
    // ==========================================

    const safeName =
      formData.patientName
        .trim()
        .replace(/[^a-z0-9]/gi, "_") ||
      "Patient";

    doc.save(
      `CardioPredict-AI_${safeName}_Report.pdf`,
    );
  };

  // ==========================================
  // Component
  // ==========================================

  return (
    <div className="bg-background text-text-primary transition-colors duration-300">
      <div className="p-5 sm:p-6 lg:p-8">

        {/* Heading */}

        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#8B1E24] dark:text-red-400">
            AI Prediction
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Cardiac Risk Prediction
          </h1>

          <p className="mt-2 max-w-2xl text-text-secondary">
            Enter the patient's clinical parameters
            to generate an AI-powered heart disease
            prediction.
          </p>
        </div>

        {/* Prediction Area */}

        <div className="grid gap-6 xl:grid-cols-[1fr_380px]">

          {/* ===================================
              Prediction Form
          ==================================== */}

          <section className="rounded-2xl border border-border bg-surface">

            {/* Form Header */}

            <div className="border-b border-border p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#8B1E24]/10 text-[#8B1E24] dark:bg-red-500/15 dark:text-red-400">
                  <HeartPulse size={22} />
                </div>

                <div>
                  <h2 className="font-semibold">
                    Patient Parameters
                  </h2>

                  <p className="text-sm text-text-muted">
                    All fields are required
                  </p>
                </div>

              </div>

            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="p-6"
            >

              <div className="grid gap-5 md:grid-cols-2">

                {/* Patient Name */}

                <div className="md:col-span-2">

                  <label className="mb-2 block text-sm font-medium">
                    Patient Name
                  </label>

                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    placeholder="Enter patient name"
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-[#8B1E24] dark:focus:border-red-400"
                  />

                </div>

                {/* Age */}

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Age
                  </label>

                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="e.g. 55"
                    min="1"
                    max="120"
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-[#8B1E24] dark:focus:border-red-400"
                  />

                </div>

                {/* Sex */}

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Sex
                  </label>

                  <select
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-[#8B1E24] dark:focus:border-red-400"
                  >

                    <option value="">
                      Select sex
                    </option>

                    <option value="M">
                      Male
                    </option>

                    <option value="F">
                      Female
                    </option>

                  </select>

                </div>

                {/* Chest Pain Type */}

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Chest Pain Type
                  </label>

                  <select
                    name="chestPainType"
                    value={formData.chestPainType}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-[#8B1E24] dark:focus:border-red-400"
                  >

                    <option value="">
                      Select chest pain type
                    </option>

                    <option value="TA">
                      Typical Angina
                    </option>

                    <option value="ATA">
                      Atypical Angina
                    </option>

                    <option value="NAP">
                      Non-Anginal Pain
                    </option>

                    <option value="ASY">
                      Asymptomatic
                    </option>

                  </select>

                </div>

                {/* Resting BP */}

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Resting Blood Pressure
                  </label>

                  <input
                    type="number"
                    name="restingBP"
                    value={formData.restingBP}
                    onChange={handleChange}
                    placeholder="mm Hg"
                    min="0"
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-[#8B1E24] dark:focus:border-red-400"
                  />

                </div>

                {/* Cholesterol */}

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Cholesterol
                  </label>

                  <input
                    type="number"
                    name="cholesterol"
                    value={formData.cholesterol}
                    onChange={handleChange}
                    placeholder="mg/dL"
                    min="0"
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-[#8B1E24] dark:focus:border-red-400"
                  />

                </div>

                {/* Fasting Blood Sugar */}

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Fasting Blood Sugar
                  </label>

                  <select
                    name="fastingBS"
                    value={formData.fastingBS}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-[#8B1E24] dark:focus:border-red-400"
                  >

                    <option value="">
                      Select value
                    </option>

                    <option value="0">
                      ≤ 120 mg/dL
                    </option>

                    <option value="1">
                      &gt; 120 mg/dL
                    </option>

                  </select>

                </div>

                {/* Resting ECG */}

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Resting ECG
                  </label>

                  <select
                    name="restingECG"
                    value={formData.restingECG}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-[#8B1E24] dark:focus:border-red-400"
                  >

                    <option value="">
                      Select ECG result
                    </option>

                    <option value="Normal">
                      Normal
                    </option>

                    <option value="ST">
                      ST-T Wave Abnormality
                    </option>

                    <option value="LVH">
                      Left Ventricular Hypertrophy
                    </option>

                  </select>

                </div>

                {/* Maximum Heart Rate */}

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Maximum Heart Rate
                  </label>

                  <input
                    type="number"
                    name="maxHR"
                    value={formData.maxHR}
                    onChange={handleChange}
                    placeholder="e.g. 150"
                    min="0"
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-[#8B1E24] dark:focus:border-red-400"
                  />

                </div>

                {/* Exercise Angina */}

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Exercise-Induced Angina
                  </label>

                  <select
                    name="exerciseAngina"
                    value={formData.exerciseAngina}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-[#8B1E24] dark:focus:border-red-400"
                  >

                    <option value="">
                      Select option
                    </option>

                    <option value="Y">
                      Yes
                    </option>

                    <option value="N">
                      No
                    </option>

                  </select>

                </div>

                {/* Oldpeak */}

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Oldpeak
                  </label>

                  <input
                    type="number"
                    name="oldpeak"
                    value={formData.oldpeak}
                    onChange={handleChange}
                    placeholder="e.g. 1.5"
                    step="0.1"
                    min="0"
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-[#8B1E24] dark:focus:border-red-400"
                  />

                </div>

                {/* ST Slope */}

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    ST Slope
                  </label>

                  <select
                    name="stSlope"
                    value={formData.stSlope}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-[#8B1E24] dark:focus:border-red-400"
                  >

                    <option value="">
                      Select ST slope
                    </option>

                    <option value="Up">
                      Up
                    </option>

                    <option value="Flat">
                      Flat
                    </option>

                    <option value="Down">
                      Down
                    </option>

                  </select>

                </div>

              </div>

              {/* Buttons */}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                <button
                  type="submit"
                  disabled={loading}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#8B1E24] dark:bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-[#72171D] dark:hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 shadow-lg"
                >

                  <Send size={18} />

                  {loading
                    ? "Generating..."
                    : "Generate Prediction"}

                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 font-medium transition hover:bg-background disabled:cursor-not-allowed disabled:opacity-60"
                >

                  <RotateCcw size={17} />

                  Reset

                </button>

              </div>

            </form>

          </section>

          {/* ===================================
              Result Panel
          ==================================== */}

          <aside className="h-fit rounded-2xl border border-border bg-surface">

            {/* Result Header */}

            <div className="border-b border-border p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#8B1E24]/10 text-[#8B1E24] dark:bg-red-500/15 dark:text-red-400">
                  <Activity size={22} />
                </div>

                <div>

                  <h2 className="font-semibold">
                    Prediction Result
                  </h2>

                  <p className="text-sm text-text-muted">
                    AI model output
                  </p>

                </div>

              </div>

            </div>

            {/* Result Content */}

            <div className="p-6">

              {/* Error */}

              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">

                  <div className="flex items-start gap-3">

                    <XCircle
                      size={21}
                      className="mt-0.5 shrink-0 text-red-500"
                    />

                    <div>

                      <p className="font-semibold text-red-500">
                        Prediction Failed
                      </p>

                      <p className="mt-2 text-sm leading-6 text-text-secondary">
                        {error}
                      </p>

                    </div>

                  </div>

                </div>
              )}

              {/* No Result */}

              {!result && !error && (
                <div className="py-10 text-center">

                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-background text-text-muted">
                    <HeartPulse size={28} />
                  </div>

                  <h3 className="font-semibold">
                    No Prediction Yet
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    Complete the patient parameters
                    and generate a prediction to see
                    the result.
                  </p>

                </div>
              )}

              {/* Prediction Result */}

              {result && (
                <div className="space-y-5">

                  {/* Main Prediction */}

                  <div className="rounded-xl border border-border p-5">

                    <div className="flex items-center gap-3">

                      {result.riskLevel === "Higher Risk" ? (
                        <div
                          className="flex h-11 w-11 items-center justify-center rounded-full text-red-600 dark:text-red-400"
                          style={{ backgroundColor: "rgba(220, 38, 38, 0.1)" }}
                        >
                          <AlertCircle size={24} />
                        </div>
                      ) : result.riskLevel === "Lower Risk" ? (
                        <div
                          className="flex h-11 w-11 items-center justify-center rounded-full text-green-600 dark:text-green-400"
                          style={{ backgroundColor: "rgba(22, 163, 74, 0.1)" }}
                        >
                          <CheckCircle2 size={24} />
                        </div>
                      ) : (
                        <div
                          className="flex h-11 w-11 items-center justify-center rounded-full text-yellow-600 dark:text-yellow-400"
                          style={{ backgroundColor: "rgba(202, 138, 4, 0.1)" }}
                        >
                          <AlertCircle size={24} />
                        </div>
                      )}

                      <div>

                        <p className="text-sm text-text-muted">
                          Prediction
                        </p>

                        <h3
                          className={`text-xl font-bold ${
                            result.riskLevel === "Higher Risk"
                              ? "text-red-600 dark:text-red-400"
                              : result.riskLevel === "Lower Risk"
                              ? "text-green-600 dark:text-green-400"
                              : "text-yellow-600 dark:text-yellow-400"
                          }`}
                        >
                          {result.riskLevel}
                        </h3>

                      </div>

                    </div>

                  </div>

                  {/* Probability */}

                  <div>

                    <div className="mb-3 flex items-center justify-between">

                      <span className="text-sm font-medium">
                        Model Confidence
                      </span>

                      <span className="text-sm font-semibold">
                        {getProbability(
                          result.probability.class_1,
                        )}
                      </span>

                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-background">

                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          backgroundColor:
                            result.riskLevel === "Higher Risk"
                              ? "#dc2626"
                              : result.riskLevel === "Lower Risk"
                              ? "#16a34a"
                              : "#ca8a04",
                          width: `${
                            result.probability.class_1 *
                            100
                          }%`,
                        }}
                      />

                    </div>

                  </div>

                  {/* Risk Interpretation */}

                  <div className="rounded-lg border border-border bg-background p-4">

                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
                      Risk Interpretation
                    </p>

                    <p className="text-sm leading-6 text-text-secondary">

                      {result.riskLevel ===
                      "Lower Risk"
                        ? "The model probability is below 40%."
                        : result.riskLevel ===
                          "Moderate / Borderline Risk"
                        ? "The model probability is between 40% and 65%."
                        : "The model probability is above 65%."}

                    </p>

                  </div>

                  {/* Class Probabilities */}

                  <div className="grid grid-cols-2 gap-3">

                    <div className="rounded-lg border border-border p-4">

                      <p className="text-xs text-text-muted">
                        Lower Risk
                      </p>

                      <p className="mt-1 text-lg font-semibold">
                        {getProbability(
                          result.probability.class_0,
                        )}
                      </p>

                    </div>

                    <div className="rounded-lg border border-border p-4">

                      <p className="text-xs text-text-muted">
                        Higher Risk
                      </p>

                      <p className="mt-1 text-lg font-semibold">
                        {getProbability(
                          result.probability.class_1,
                        )}
                      </p>

                    </div>

                  </div>

                  {/* Download Report */}

                  <button
                    type="button"
                    onClick={generatePDFReport}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#8B1E24] dark:bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-[#72171D] dark:hover:bg-red-700 shadow-lg"
                  >
                    Download PDF Report
                  </button>

                  {/* Backend Result */}

                  {result.result && (
                    <div className="rounded-lg bg-background p-4">

                      <p className="text-sm leading-6 text-text-secondary">
                        {result.result}
                      </p>

                    </div>
                  )}

                </div>
              )}

            </div>

          </aside>

        </div>

      </div>
    </div>
  );
}

export default Prediction;