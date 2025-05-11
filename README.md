# 🏠 Home Loan Eligibility Prediction

A machine learning-powered web application that predicts a user's eligibility for a home loan based on their financial and personal details. The system also compares EMI rates and loan offers from multiple banks, helping users make informed decisions.

---

## 🚀 Features

- ✅ Predict home loan eligibility using trained ML models
- 🧮 EMI calculation based on loan amount, age, and tenure
- 🏦 Compare bank interest rates and EMI offers
- 📊 Responsive and user-friendly web interface
- 🔁 Real-time interaction between frontend and backend

---

## 🛠️ Tech Stack

**Frontend:**
- Next.js (React framework)
- Tailwind CSS for styling

**Backend:**
- Flask (Python)
- scikit-learn for ML model
- JSON for bank data management

**Others:**
- Git & GitHub for version control

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Sahilpatil135/Home-Loan-Eligibility-Prediction.git
cd Home-Loan-Eligibility-Prediction
```
### 2. Start the Backend (Flask)
```bash
cd server
pip install -r requirements.txt
python app.py
```
### 3. Start the Frontend (Next.js)
```bash
cd ../client
npm install
npm run dev
```
The app will run at http://localhost:3000 and connect to the Flask server.

## 📈 Machine Learning
  - The backend uses a trained classification model (Random Forest) to predict eligibility.
  - Features include income, age, credit history, employment status, etc.
  - Model performance can be evaluated with accuracy, confusion matrix, etc.

