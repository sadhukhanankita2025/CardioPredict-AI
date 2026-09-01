export type PredictionRecord = {
  id: number;
  patientName: string;

  date: string;
  time: string;

  age: string;
  sex: string;
  chestPainType: string;
  restingBP: string;
  cholesterol: string;
  fastingBS: string;
  restingECG: string;
  maxHR: string;
  exerciseAngina: string;
  oldpeak: string;
  stSlope: string;

  prediction: number;
  riskLevel: string;

  class0Probability: number;
  class1Probability: number;

  modelConfidence: number;

  backendResult?: string;
};

const STORAGE_KEY = "cardioPredictHistory";

export const getPredictionHistory = (): PredictionRecord[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return [];
    }

    return JSON.parse(saved);
  } catch {
    return [];
  }
};

export const savePredictionRecord = (
  record: PredictionRecord,
): void => {
  const history = getPredictionHistory();

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([record, ...history]),
  );
};

export const updatePredictionRecord = (
  updatedRecord: PredictionRecord,
): void => {
  const history = getPredictionHistory();

  const updatedHistory = history.map((record) =>
    record.id === updatedRecord.id
      ? updatedRecord
      : record,
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedHistory),
  );
};

export const deletePredictionRecord = (
  id: number,
): void => {
  const history = getPredictionHistory();

  const updatedHistory = history.filter(
    (record) => record.id !== id,
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedHistory),
  );
};