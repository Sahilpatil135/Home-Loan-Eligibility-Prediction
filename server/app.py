from flask import Flask, jsonify, request
from flask_cors import CORS
import joblib
import pandas as pd
import json
import os

# app instance
app = Flask(__name__)
CORS(app)

model = joblib.load('rf.pkl')
scalar = joblib.load('vector.pkl')

# Load bank data from JSON
def load_bank_data():
    with open('data/data.json', 'r') as f:
        return json.load(f)["banks"]


@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "message":"Hello World"
    })


@app.route('/predict', methods=['POST'])
def predict():

    try:
        #  Function to calculate EMI based on loan amount, loan term (in months), and interest rate.
        def calculate_emi(loan_amount, loan_term, rate):

            rate = rate / (12 * 100)      # TODO : pass rate of each bank in future.
            if rate == 0:  # Edge case for zero interest (unlikely)
                return loan_amount / loan_term  
            emi = (loan_amount * rate * (1 + rate) ** loan_term) / ((1 + rate) ** loan_term - 1)
            return round(emi, 2)

        # Getting JSON data from requests
        data = request.get_json()
        if not data:
            return jsonify({"error": "No input data received"}), 400
    
        # Optional: print input to debug
        print("Received data:", data)


        # Validate input
        required_fields = [
            'gender', 'married', 'dependents', 'education', 'employed', 
            'credit', 'area', 'age', 'ApplicantIncome', 
            'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term'
        ]

        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400

        # Extracting input fields
        input_dict = {
            'Gender': data['gender'],
            'Married': data['married'],
            'Dependents': data['dependents'],
            'Education': data['education'],
            'Self_Employed': data['employed'],
            'Credit_History': float(data['credit']),
            'Property_Area': data['area'],
            'Age': int(data['age']),
            'ApplicantIncome': float(data['ApplicantIncome']),
            'CoapplicantIncome': float(data['CoapplicantIncome']),
            'LoanAmount': float(data['LoanAmount']),
            'Loan_Amount_Term': float(data['Loan_Amount_Term'])
        }

        expected_columns = ['Gender', 'Married', 'Dependents', 'Education', 'Self_Employed',
                    'ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term',
                    'Credit_History', 'Property_Area', 'Age']

        # Convert input to DataFrame
        input_data = pd.DataFrame([input_dict])[expected_columns]

        # Encoding dictionary
        encoding = {
            'Gender': {'Male': 1, 'Female': 0},
            'Married': {'Yes': 1, 'No': 0},
            'Dependents': {'0': 0, '1': 1, '2': 2, '3+': 4},
            'Education': {'Graduate': 1, 'Not Graduate': 0},
            'Self_Employed': {'Yes': 1, 'No': 0},
            'Property_Area': {'Rural': 0, 'Semiurban': 2, 'Urban': 1}
        }

        # Apply encoding
        input_data.replace(encoding, inplace=True)

        # Save original loan amount before scaling
        original_loan_amount = input_data['LoanAmount'].iloc[0]
        original_applicant_income = input_data['ApplicantIncome'].iloc[0]
        original_coapplicant_income = input_data['CoapplicantIncome'].iloc[0]
        original_age = input_data['Age'].iloc[0]

        # Calculate EMI and EMI-to-Income ratio
        input_data['EMI'] = input_data.apply(lambda x: calculate_emi(x['LoanAmount'], x['Loan_Amount_Term'], rate=8.0), axis=1)
        EMI_value = input_data['EMI'].iloc[0]
        input_data['EMI_to_Income'] = input_data['EMI'] / (input_data['ApplicantIncome'] + input_data['CoapplicantIncome'])
        EMI_to_income_value = input_data['EMI_to_Income'].iloc[0]
        print(EMI_to_income_value)

        # EMI for different banks
        banks = load_bank_data()
        emi_results = []

        for bank in banks:
            min_emi = calculate_emi(original_loan_amount, input_data['Loan_Amount_Term'].iloc[0], bank["min_rate"])
            max_emi = calculate_emi(original_loan_amount, input_data['Loan_Amount_Term'].iloc[0], bank["max_rate"])

            emi_results.append({
                "name": bank["name"],
                "min_rate": bank["min_rate"],
                "max_rate": bank["max_rate"],
                "loan_tenure": bank["loan_tenure"],
                "min_emi": min_emi,
                "max_emi": max_emi
            })

        print(emi_results)

        # Select numerical columns for scaling
        num_cols = ['ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term', 'EMI', 'EMI_to_Income']
        input_data[num_cols] = scalar.transform(input_data[num_cols])

        # Prediction using the model
        prediction = model.predict(input_data)[0]


        # Return result
        return jsonify({
            "prediction": int(prediction),
            "message": "Loan Approved" if prediction == 1 and EMI_to_income_value <= 0.4 else "Loan Rejected",
            "emi": int(EMI_value),
            "loanAmount": int(original_loan_amount),
            "bankEmiBreakdown": emi_results
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}),400
    


if __name__ == "__main__":
    app.run(debug=True, port=8080)
