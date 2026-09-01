from pathlib import Path
import pickle

import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS


# ============================================================
# APP SETUP
# ============================================================

app = Flask(__name__)
CORS(app)


# ============================================================
# LOAD MODEL
# ============================================================

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "model" / "CatBoost.pkl"

print("Loading model...")
print(f"Model path: {MODEL_PATH}")

try:
    with open(MODEL_PATH, "rb") as file:
        model = pickle.load(file)

    print("\n✅ CatBoost model loaded successfully!")
    print(f"Model type: {type(model)}")

except Exception as error:
    print("\n❌ Failed to load the model.")
    print(f"Error: {error}")
    model = None


# ============================================================
# MODEL FEATURES
# ============================================================

FEATURES = [
    "Age",
    "Sex",
    "ChestPainType",
    "RestingBP",
    "Cholesterol",
    "FastingBS",
    "RestingECG",
    "MaxHR",
    "ExerciseAngina",
    "Oldpeak",
    "ST_Slope",
]


# ============================================================
# HOME / HEALTH CHECK
# ============================================================

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "CardioPredict-AI backend is running",
        "model_loaded": model is not None,
    })


# ============================================================
# PREDICTION API
# ============================================================

@app.route("/predict", methods=["POST"])
def predict():

    if model is None:
        return jsonify({
            "error": "Model is not loaded."
        }), 500

    try:
        # Get JSON data sent by React
        data = request.get_json()

        if not data:
            return jsonify({
                "error": "No input data received."
            }), 400

        # Check that all required features are present
        missing_features = [
            feature for feature in FEATURES
            if feature not in data
        ]

        if missing_features:
            return jsonify({
                "error": "Missing required features.",
                "missing_features": missing_features,
            }), 400

        # Create DataFrame in the exact model feature order
        input_data = pd.DataFrame([{
            feature: data[feature]
            for feature in FEATURES
        }])

        # Convert values to numeric
        input_data = input_data.apply(pd.to_numeric)

        # Make prediction
        prediction = model.predict(input_data)

        # Get probabilities
        probabilities = model.predict_proba(input_data)

        prediction_class = int(prediction[0])

        probability_class_0 = float(probabilities[0][0])
        probability_class_1 = float(probabilities[0][1])

        # Result text
        if prediction_class == 1:
            result = "Higher Risk"
        else:
            result = "Lower Risk"

        return jsonify({
            "success": True,
            "prediction": prediction_class,
            "result": result,
            "probability": {
                "class_0": probability_class_0,
                "class_1": probability_class_1,
            },
        })

    except Exception as error:

        print("\n❌ Prediction error:")
        print(error)

        return jsonify({
            "success": False,
            "error": str(error),
        }), 500


# ============================================================
# START SERVER
# ============================================================

if __name__ == "__main__":
    print("\n======================================")
    print("   CardioPredict-AI Backend")
    print("======================================")
    print("Server: http://127.0.0.1:5000")
    print("Prediction API: http://127.0.0.1:5000/predict")
    print("======================================\n")

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True,
    )