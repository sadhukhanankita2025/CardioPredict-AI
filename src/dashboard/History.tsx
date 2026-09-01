import { useEffect, useState } from "react";

import {
  CalendarDays,
  Clock3,
  History as HistoryIcon,
  Search,
  Trash2,
  Pencil,
  X,
  Save,
} from "lucide-react";

import {
  deletePredictionRecord,
  getPredictionHistory,
  updatePredictionRecord,
  type PredictionRecord,
} from "../utils/predictionStorage";

function History() {
  const [history, setHistory] = useState<PredictionRecord[]>([]);
  const [search, setSearch] = useState("");
  const [editingRecord, setEditingRecord] =
    useState<PredictionRecord | null>(null);

  useEffect(() => {
    setHistory(getPredictionHistory());
  }, []);

  const filteredHistory = history.filter((item) =>
    item.patientName
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const handleDelete = (id: number) => {
    if (!window.confirm("Delete this prediction record?")) {
      return;
    }

    deletePredictionRecord(id);

    setHistory(getPredictionHistory());
  };

  const handleSaveEdit = () => {
    if (!editingRecord) return;

    updatePredictionRecord(editingRecord);

    setHistory(getPredictionHistory());

    setEditingRecord(null);
  };

  return (
    <div className="bg-[var(--background)] text-[var(--text-primary)]">
      <div className="p-5 sm:p-6 lg:p-8">

        {/* Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--primary)]">
            Patient Records
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Prediction History
          </h1>

          <p className="mt-2 max-w-2xl text-[var(--text-secondary)]">
            Review and manage your previous AI prediction records.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            />

            <input
              type="text"
              placeholder="Search patient records..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[var(--primary)]"
            />
          </div>
        </div>

        {/* History Card */}
        <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">

          {/* Header */}
          <div className="border-b border-[var(--border)] p-6">
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                <HistoryIcon size={20} />
              </div>

              <div>
                <h2 className="font-semibold">
                  Prediction Records
                </h2>

                <p className="text-sm text-[var(--text-muted)]">
                  {history.length} records
                </p>
              </div>

            </div>
          </div>

          {/* Empty */}
          {filteredHistory.length === 0 ? (
            <div className="px-6 py-16 text-center">

              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--background)] text-[var(--text-muted)]">
                <HistoryIcon size={28} />
              </div>

              <h3 className="text-lg font-semibold">
                No Prediction History
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
                Your completed predictions will appear here.
              </p>

            </div>
          ) : (

            <div className="divide-y divide-[var(--border)]">

              {filteredHistory.map((item) => (

                <div
                  key={item.id}
                  className="p-6 transition hover:bg-[var(--background)]"
                >

                  <div className="flex flex-col justify-between gap-5 lg:flex-row">

                    {/* Patient Info */}
                    <div>

                      <p className="text-lg font-semibold">
                        {item.patientName}
                      </p>

                      <p className="mt-1 text-sm text-[var(--text-muted)]">
                        Prediction #{item.id}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-[var(--text-muted)]">

                        <span className="flex items-center gap-1">
                          <CalendarDays size={14} />
                          {item.date}
                        </span>

                        <span className="flex items-center gap-1">
                          <Clock3 size={14} />
                          {item.time}
                        </span>

                      </div>

                    </div>

                    {/* Result */}
                    <div className="flex flex-col gap-3 lg:items-end">

                      <div>
                        <p className="font-semibold">
                          {item.riskLevel}
                        </p>

                        <p className="mt-1 text-xs text-[var(--text-muted)]">
                          Model Confidence:{" "}
                          {item.modelConfidence.toFixed(1)}%
                        </p>
                      </div>

                      <div className="flex gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            setEditingRecord(item)
                          }
                          className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2 text-sm transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
                        >
                          <Pencil size={15} />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(item.id)
                          }
                          className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2 text-sm transition hover:border-red-500 hover:text-red-500"
                        >
                          <Trash2 size={15} />
                          Delete
                        </button>

                      </div>

                    </div>

                  </div>

                  {/* Patient Parameters */}
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                    <Info label="Age" value={item.age} />
                    <Info label="Sex" value={item.sex} />
                    <Info label="Chest Pain" value={item.chestPainType} />
                    <Info label="Resting BP" value={item.restingBP} />
                    <Info label="Cholesterol" value={item.cholesterol} />
                    <Info label="Fasting BS" value={item.fastingBS} />
                    <Info label="Resting ECG" value={item.restingECG} />
                    <Info label="Max HR" value={item.maxHR} />
                    <Info label="Exercise Angina" value={item.exerciseAngina} />
                    <Info label="Oldpeak" value={item.oldpeak} />
                    <Info label="ST Slope" value={item.stSlope} />

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

        {/* Edit Modal */}
        {editingRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)]">

              <div className="flex items-center justify-between border-b border-[var(--border)] p-6">

                <div>
                  <h2 className="text-xl font-semibold">
                    Edit Patient Record
                  </h2>

                  <p className="mt-1 text-sm text-[var(--text-muted)]">
                    Update the stored patient information.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setEditingRecord(null)}
                  className="rounded-lg p-2 hover:bg-[var(--background)]"
                >
                  <X size={20} />
                </button>

              </div>

              <div className="grid gap-4 p-6 sm:grid-cols-2">

                {(
                  [
                    ["patientName", "Patient Name"],
                    ["age", "Age"],
                    ["sex", "Sex"],
                    ["chestPainType", "Chest Pain Type"],
                    ["restingBP", "Resting BP"],
                    ["cholesterol", "Cholesterol"],
                    ["fastingBS", "Fasting BS"],
                    ["restingECG", "Resting ECG"],
                    ["maxHR", "Maximum Heart Rate"],
                    ["exerciseAngina", "Exercise Angina"],
                    ["oldpeak", "Oldpeak"],
                    ["stSlope", "ST Slope"],
                  ] as const
                ).map(([key, label]) => (

                  <div key={key}>

                    <label className="mb-2 block text-sm font-medium">
                      {label}
                    </label>

                    <input
                      value={editingRecord[key]}
                      onChange={(e) =>
                        setEditingRecord({
                          ...editingRecord,
                          [key]: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none focus:border-[var(--primary)]"
                    />

                  </div>

                ))}

              </div>

              <div className="flex justify-end gap-3 border-t border-[var(--border)] p-6">

                <button
                  type="button"
                  onClick={() => setEditingRecord(null)}
                  className="rounded-lg border border-[var(--border)] px-5 py-3 text-sm"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="flex items-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white"
                >
                  <Save size={16} />
                  Save Changes
                </button>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-3">
      <p className="text-xs text-[var(--text-muted)]">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium">
        {value}
      </p>
    </div>
  );
}

export default History;