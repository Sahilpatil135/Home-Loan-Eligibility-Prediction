from flask import Flask, jsonify, request
from flask_cors import CORS
import joblib
import pandas as pd
import json
import os

# app instance
app = Flask(__name__)
CORS(app)

model = joblib.load('rfforty.pkl')
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
        original_loan_term = input_data['Loan_Amount_Term'].iloc[0]
        original_applicant_income = input_data['ApplicantIncome'].iloc[0]
        original_coapplicant_income = input_data['CoapplicantIncome'].iloc[0]        
        original_age = input_data['Age'].iloc[0]
        original_self_employed = input_data['Self_Employed'].iloc[0]
        og_property_area = input_data['Property_Area'].iloc[0]
        og_education = input_data['Education'].iloc[0]
        og_credit_history = input_data['Credit_History'].iloc[0]
        og_total_income = original_applicant_income + original_coapplicant_income

        # Calculate Total Income 
        input_data['TotalIncome'] = input_data['ApplicantIncome'] + input_data['CoapplicantIncome']

        # Calculate EMI and EMI-to-Income ratio
        input_data['EMI'] = input_data.apply(lambda x: calculate_emi(x['LoanAmount'], x['Loan_Amount_Term'], rate=8.0), axis=1)
        EMI_value = input_data['EMI'].iloc[0]
        input_data['EMI_to_Income'] = input_data['EMI'] / (input_data['ApplicantIncome'] + input_data['CoapplicantIncome'])
        EMI_to_income_value = input_data['EMI_to_Income'].iloc[0]
        print(EMI_to_income_value)

        # EMI for different banks in rupees
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

        # Converting rupees into dollar as csv is in dollar
        input_data['ApplicantIncome'] = input_data['ApplicantIncome'] / 85
        input_data['CoapplicantIncome'] = input_data['CoapplicantIncome'] / 85
        input_data['LoanAmount'] = input_data['LoanAmount'] / 85
        input_data['TotalIncome'] = input_data['TotalIncome'] / 85
        input_data['EMI'] = input_data['EMI'] / 85
        input_data['EMI_to_Income'] = input_data['EMI'] / (input_data['ApplicantIncome'] + input_data['CoapplicantIncome'])

        # Select numerical columns for scaling
        num_cols = ['ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term', 'TotalIncome', 'EMI', 'EMI_to_Income']
        input_data[num_cols] = scalar.transform(input_data[num_cols])

        # Prediction using the model
        prediction = model.predict(input_data)[0]
        print("Prediction: ",prediction)


        def kotak_bank_eligibility(age, self_employed, income, property_area, loan_term, education):
            is_self_employed_eligible = self_employed == 1 and 18 <= age <= 65
            is_salaried_eligible = self_employed == 0 and 18 <= age <= 60 and education == 1

            is_metro = property_area == 1  # 1 = metro cities
            required_income = 20000 if is_metro else 15000

            # Loan term should not exceed 25 years (in months)
            is_loan_term_eligible = loan_term <= 300

            return (is_self_employed_eligible or is_salaried_eligible) and income >= required_income and is_loan_term_eligible
        
        kotak_eligible = kotak_bank_eligibility(
            age=original_age,
            self_employed=original_self_employed,
            income=og_total_income,  # Assuming monthly income
            property_area=og_property_area,
            loan_term=original_loan_term,
            education=og_education
        )
        print(kotak_eligible)

        # for loan approval of kotak bank, if kotak_eligibile and prediction == 1 and EMI_to_income value <= 0.4 then return loan approved
        def hdfc_bank_eligibility(age, self_employed, income, loan_term):
            # Age eligibility: 21 to 65 years for both salaried and self-employed
            is_age_eligible = 21 <= age <= 65

            if self_employed == 0:
                # Salaried: income should be at least ₹10,000/month
                is_income_eligible = income >= 10000
            else:
                # Self-employed: income should be at least ₹2,00,000/year (₹16,667/month approx)
                is_income_eligible = income >= 16667
            
            # Loan term should not exceed 30 years (in months)
            is_loan_term_eligible = loan_term <= 360

            return is_age_eligible and is_income_eligible and is_loan_term_eligible

        # Example usage
        hdfc_eligible = hdfc_bank_eligibility(
            age=original_age,
            self_employed=original_self_employed,
            income=og_total_income,  # Monthly income
            loan_term = original_loan_term
        )
        print(hdfc_eligible)

        def sbi_bank_eligibility(age, loan_term):
            is_age_eligible = 18 <= age <= 70

            # Loan term should not exceed 30 years (in months)
            is_loan_term_eligible = loan_term <= 360
            return is_age_eligible and is_loan_term_eligible

        # Example usage
        sbi_eligible = sbi_bank_eligibility(age=original_age, loan_term=original_loan_term)
        print(sbi_eligible)

        def icici_bank_eligibility(age, self_employed, income, loan_term):
            # Age eligibility: 21 to 70 years for all applicants
            is_age_eligible = 21 <= age <= 70

            if self_employed == 0:
                # Salaried: Minimum ₹25,000/month
                is_income_eligible = income >= 25000
            else:
                # Self-employed: Minimum ₹30,000/month
                is_income_eligible = income >= 30000
            
            # Loan term should not exceed 30 years (in months)
            is_loan_term_eligible = loan_term <= 360

            return is_age_eligible and is_income_eligible and is_loan_term_eligible

        # Example usage
        icici_eligible = icici_bank_eligibility(
            age=original_age,
            self_employed=original_self_employed,
            income=og_total_income,  # Monthly income
            loan_term=original_loan_term
        )
        print(icici_eligible)

        def axis_bank_eligibility(age, loan_amount, loan_term):
            # Age criteria: 21 to 65 for both salaried and self-employed
            is_age_eligible = 21 <= age <= 65

            # Loan amount criteria: Minimum ₹3,00,000
            is_loan_amount_eligible = loan_amount >= 300000

            # Loan term should not exceed 30 years (in months)
            is_loan_term_eligible = loan_term <= 360

            return is_age_eligible and is_loan_amount_eligible and is_loan_term_eligible
        
        axis_eligibile = axis_bank_eligibility(
            age = original_age,
            # self_employed = original_self_employed,
            loan_amount = original_loan_amount,
            loan_term=original_loan_term
        )
        print(axis_eligibile)

        # Validate loan term based on age
        def evaluate_age_vs_loan_term(age):
            # Assume retirement age is 60 for salaried, 65 for self-employed
            # So max tenure in months = (retirement age - current age) * 12
            max_salaried_tenure = max(0, (60 - age) * 12)
            max_self_employed_tenure = max(0, (65 - age) * 12)

            return max_salaried_tenure, max_self_employed_tenure

        max_salaried_tenure, max_self_employed_tenure = evaluate_age_vs_loan_term(original_age)

        loan_term_message = ""
        if original_self_employed == 0 and original_loan_term > max_salaried_tenure:
            loan_term_message = f"At age {original_age}, maximum allowed tenure for salaried individuals is {max_salaried_tenure} months. Please reduce loan term."
        elif original_self_employed == 1 and original_loan_term > max_self_employed_tenure:
            loan_term_message = f"At age {original_age}, maximum allowed tenure for self-employed individuals is {max_self_employed_tenure} months. Please reduce loan term."


        if og_credit_history == 0 and EMI_to_income_value > 0.25:
            prediction = 0  # Force rejection


        # Return result
        return jsonify({
            "prediction": int(prediction),
            "message": "Loan Approved" if prediction == 1 and EMI_to_income_value <= 0.4 else "Loan Rejected",
            "emi": int(EMI_value),
            "loanAmount": int(original_loan_amount),
            "bankEmiBreakdown": emi_results,
            "loanTermMessage": loan_term_message,
            "eligibility_results": {
                "HDFC Bank": bool(hdfc_eligible),
                "State Bank of India (SBI)": bool(sbi_eligible),
                "ICICI Bank": bool(icici_eligible),
                "Axis Bank": bool(axis_eligibile),
                "Kotak Mahindra Bank": bool(kotak_eligible)
            }
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}),400
    


if __name__ == "__main__":
    app.run(debug=True, port=8080)
