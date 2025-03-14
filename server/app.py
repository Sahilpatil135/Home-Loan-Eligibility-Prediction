from flask import Flask, jsonify, request
from flask_cors import CORS
import joblib
import pandas as pd

# app instance
app = Flask(__name__)
CORS(app)

model = joblib.load('rf.pkl')
scalar = joblib.load('vector.pkl')


@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "message":"Hello World"
    })


@app.route('/predict', methods=['POST'])
def predict():
    
    try:
        #  Function to calculate EMI based on loan amount, loan term (in months), and interest rate.
        def calculate_emi(loan_amount, loan_term, rate=8.0):
            
            rate = rate / (12 * 100)      # TODO : pass rate of each bank in future.
            if rate == 0:  # Edge case for zero interest (unlikely)
                return loan_amount / loan_term  
            emi = (loan_amount * rate * (1 + rate) ** loan_term) / ((1 + rate) ** loan_term - 1)
            return round(emi, 2)
        
        # Getting JSON data from requests
        data = request.get_json()

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

        # Calculate EMI and EMI-to-Income ratio
        input_data['EMI'] = input_data.apply(lambda x: calculate_emi(x['LoanAmount'], x['Loan_Amount_Term']), axis=1)
        input_data['EMI_to_Income'] = input_data['EMI'] / (input_data['ApplicantIncome'] + input_data['CoapplicantIncome'])
        EMI_to_income_value = input_data['EMI_to_Income'].iloc[0]
        print(EMI_to_income_value)

        # Select numerical columns for scaling
        num_cols = ['ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term', 'EMI', 'EMI_to_Income']
        input_data[num_cols] = scalar.transform(input_data[num_cols])

        # Prediction using the model
        prediction = model.predict(input_data)[0]

        # add input validation


        # Return result
        return jsonify({
            "prediction": int(prediction),
            "message": "Loan Approved" if prediction == 1 and EMI_to_income_value <= 0.4 else "Loan Rejected"
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}),400
    


if __name__ == "__main__":
    app.run(debug=True, port=8080)