# ❤️ CardioPredict-AI — AI-Powered Heart Disease Prediction System

CardioPredict-AI is a full-stack AI-powered Heart Disease Prediction System that predicts whether a patient has a **Lower Risk** or **Higher Risk** of heart disease using a trained **CatBoost Machine Learning model**. The project combines a modern **React + Vite + TypeScript** frontend with a **Flask** backend for real-time predictions through a REST API.

---

## 🚀 Project Overview

CardioPredict-AI helps users estimate heart disease risk by entering clinical information such as age, blood pressure, cholesterol level, ECG results, and other health parameters.

### ✨ Features

* AI-based Heart Disease Prediction using CatBoost.
* Modern Responsive React + TypeScript UI.
* Flask REST API backend.
* Real-time prediction with confidence probability.
* Risk classification (Lower Risk / Higher Risk).
* Form validation and error handling.
* CORS-enabled frontend-backend communication.
* Ready for deployment on Vercel (Frontend) and Railway/Render (Backend).

---

# 🛠️ Tech Stack

## Frontend

* React 19
* Vite
* TypeScript
* Tailwind CSS
* Framer Motion
* Lucide React

## Backend

* Python
* Flask
* Flask-CORS
* Pandas
* NumPy
* Scikit-Learn
* CatBoost
* Pickle

## AI / Machine Learning

* CatBoost Classifier
* Heart Disease Prediction Model
* Probability Prediction using `predict_proba()`

---

# 📁 Project Folder Structure

```text
CardioPredict-AI/
│
├── backend/
│   ├── app.py                 # Flask backend server
│   ├── requirements.txt        # Python dependencies
│   ├── model/
│   │   └── CatBoost.pkl        # Trained CatBoost model
│   ├── venv/                  # Python virtual environment (ignored)
│   └── .gitignore
│
├── public/                    # Static frontend assets
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── dashboard/
│   ├── pages/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   ├── App.css
│   └── index.css
│
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── eslint.config.js
├── README.md
└── .gitignore
```

---

# ❤️ Heart Disease Input Features

The CatBoost model uses **11 clinical features** for prediction.

| Feature        | Description                       |
| -------------- | --------------------------------- |
| Age            | Patient age                       |
| Sex            | Gender                            |
| ChestPainType  | Chest pain category               |
| RestingBP      | Resting blood pressure            |
| Cholesterol    | Serum cholesterol                 |
| FastingBS      | Fasting blood sugar               |
| RestingECG     | Resting ECG result                |
| MaxHR          | Maximum heart rate achieved       |
| ExerciseAngina | Exercise induced angina           |
| Oldpeak        | ST depression                     |
| ST_Slope       | Slope of peak exercise ST segment |

---

# ⚙️ Frontend Setup (React + Vite + TypeScript)

## 1. Clone Repository

```bash
git clone https://github.com/sadhukhanankita2025/CardioPredict-AI.git
```

## 2. Open Project

```bash
cd CardioPredict-AI
```

## 3. Install Node Modules

```bash
npm install
```

## 4. Start Frontend Development Server

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

# ⚙️ Backend Setup (Flask + CatBoost)

## Step 1 — Open Backend Folder

```bash
cd backend
```

## Step 2 — Create Virtual Environment

### Windows

```bash
python -m venv venv
```

### Activate Virtual Environment

**PowerShell**

```powershell
venv\Scripts\Activate
```

**Command Prompt**

```cmd
venv\Scripts\activate
```

---

## Step 3 — Install Backend Dependencies

```bash
pip install -r requirements.txt
```

### requirements.txt

```txt
Flask==3.1.2
Flask-Cors==6.0.1
pandas==2.3.2
numpy==2.3.3
scikit-learn==1.7.2
catboost==1.2.8
gunicorn==23.0.0
```

---

## Step 4 — Add Machine Learning Model

Place the trained CatBoost model here:

```text
backend/model/CatBoost.pkl
```

---

## Step 5 — Run Flask Backend

```bash
python app.py
```

Backend starts on:

```text
http://127.0.0.1:5000
```

Prediction API:

```text
http://127.0.0.1:5000/predict
```

Health Check:

```text
http://127.0.0.1:5000/
```

---

# 🔌 API Endpoint

## POST `/predict`

### Request Body

```json
{
  "Age": 58,
  "Sex": 1,
  "ChestPainType": 2,
  "RestingBP": 145,
  "Cholesterol": 280,
  "FastingBS": 1,
  "RestingECG": 1,
  "MaxHR": 120,
  "ExerciseAngina": 1,
  "Oldpeak": 2.3,
  "ST_Slope": 0
}
```

### Successful Response

```json
{
  "success": true,
  "prediction": 1,
  "result": "Higher Risk",
  "probability": {
    "class_0": 0.031,
    "class_1": 0.969
  }
}
```

---

# 🌐 Connecting Frontend with Backend

Create an API service.

**src/utils/api.ts**

```typescript
const API_URL = "http://127.0.0.1:5000";

export async function predictHeartDisease(data: any) {
  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return response.json();
}
```

---

# ▶️ Run Frontend and Backend Together

## Terminal 1 — Backend

```bash
cd backend
venv\Scripts\Activate
python app.py
```

## Terminal 2 — Frontend

```bash
npm run dev
```

Open:

```text
Frontend : http://localhost:5173
Backend  : http://127.0.0.1:5000
```

---

# 📦 Build Frontend

```bash
npm run build
```

Preview Production Build

```bash
npm run preview
```

---

# ☁️ Deployment

## Frontend — Vercel

```bash
npm run build
```

Deploy the React application on **Vercel**.

## Backend — Railway / Render

Use:

```bash
pip install gunicorn
```

Start Command:

```bash
gunicorn app:app
```

---

# 📌 Git Commands

## Push Latest Changes

```bash
git add .
git commit -m "Update CardioPredict-AI backend and frontend"
git push origin main
```

## Check Current Repository

```bash
git remote -v
```

---

# 🧪 Model Prediction Output

The CatBoost model returns:

* **Lower Risk (0)** — Low probability of heart disease.
* **Higher Risk (1)** — High probability of heart disease.

The API also returns confidence probabilities for both classes.

---

# 📚 Future Improvements

* User Authentication.
* Patient Prediction History Dashboard.
* PDF Medical Report Generation.
* PostgreSQL Database Integration.
* Explainable AI (SHAP Feature Importance).
* Doctor/Admin Dashboard.
* Deployment with CI/CD.



# ⭐ Support

If you found this project useful, consider giving it a **Star ⭐** on GitHub.
