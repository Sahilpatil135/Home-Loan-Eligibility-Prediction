from flask import Flask, jsonify, request
from flask_cors import CORS
import pickle

# app instance
app = Flask(__name__)
CORS(app)
model = pickle.load(open('rf.pkl', 'rb'))

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "message":"Hello World"
    })

# add route and fuction for predict
@app.route('/predict', method=['GET', 'POST'])
def predict():
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


    # else :
        return 
    


if __name__ == "__main__":
    app.run(debug=True, port=8080)