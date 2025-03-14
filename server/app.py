from flask import Flask, jsonify, request
from flask_cors import CORS
import joblib

# app instance
app = Flask(__name__)
CORS(app)

model = joblib.load('rf.pkl')

num_cols = ['ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term', 'EMI', 'EMI_to_Income']
scalar = joblib.load('vector.pkl')

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "message":"Hello World"
    })

# add route and fuction for predict
@app.route('/predict', methods=['GET', 'POST'])   #can  use only POST method so if else will not come
def predict():
    # can use try except exception 
    if request.method == 'POST':
        gender = request.form['gender']
        married = request.form['married']
        dependents = request.form['dependents']   # input int/string not confirmed
        education = request.form['education']
        employed = request.form['employed']
        credit = float(request.form['credit'])
        area = request.form['area']
        age = int(request.form['age'])
        ApplicantIncome = float(request.form['ApplicantIncome'])
        CoapplicantIncome = float(request.form['CoapplicantIncome'])
        LoanAmount = float(request.form['LoanAmount'])
        Loan_Amount_Term = float(request.form['Loan_Amount_Term'])

        # add input validation
        # Create input array for model
        # calculate emi and emi to income ratio
        # Scale numeric features
        # predict model 

    # else :
        return #return prediction using jsonify
    


if __name__ == "__main__":
    app.run(debug=True, port=8080)