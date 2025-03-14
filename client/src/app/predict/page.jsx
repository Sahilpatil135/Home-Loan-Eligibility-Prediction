import React from 'react'

const page = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="mb-4">Enter your details</h1>
            <form>
                <div className="pred-gender">
                    <label htmlFor="">Gender</label>
                    <select name="gender" id="gender" className="form-select" aria-label="Default select example">
                        <option defaultValue>-- select Gender --</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div className="pred-married">
                    <label htmlFor="">Married Status</label>
                    <select name="married" id="married">
                        <option defaultValue>-- select Married Status --</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                <div className="pred-dependents">
                    <label htmlFor="">Dependents</label>
                    <select name="dependents" id="dependents">
                    <option defaultValue>-- select Dependents --</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="3+">3+</option>
                    </select>
                </div>

                <div className="pred-education">
                    <label htmlFor="">Education</label>
                    <select name="eduction" id="eduction">
                    <option defaultValue>-- select Education --</option>
                        <option value="Graduate">Graduate</option>
                        <option value="Not Graduate">Not Graduate</option>
                    </select>
                </div>

                <div className="pred-self-employed">
                    <label htmlFor="">Self Employed</label>
                    <select name="employed" id="employed">
                    <option defaultValue>-- select Self Employed --</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                <div className="pred-credit-history">
                    <label htmlFor="">Credit History</label>
                    <select name="credit" id="credit">
                    <option defaultValue>-- select Credit History --</option>
                        <option value="1.0">1.0</option>
                        <option value="0.0">0.0</option>
                    </select>
                </div>

                <div className="pred-area">
                    <label htmlFor="">Property Area</label>
                    <select name="area" id="area">
                    <option defaultValue>-- select Property Area --</option>
                        <option value="Rural">Rural</option>
                        <option value="Semiurban">Semiurban</option>
                        <option value="Urban">Urban</option>
                    </select>
                </div>

                <div className="pred-appicant-income">
                    <label htmlFor="ApplicantIncome">Applicant Income</label>
                    <input type="text" name="ApplicantIncome" id="ApplicantIncome" placeholder="Enter Applicant Income" />
                </div>

                <div className="pred-coapp-income">
                    <label htmlFor="">Coapplicant Income</label>
                    <input type="text" name="CoapplicantIncome" id="CoapplicantIncome" placeholder="Enter Coapplicant Income" />
                </div>

                <div className="pred-loan-amount">
                    <label htmlFor="">Loan Amount</label>
                    <input type="text" name="LoanAmount" id="LoanAmount" placeholder="Enter Loan Amount" />
                </div>

                <div className="pred-loan-amount-term">
                    <label htmlFor="">Loan Amount Term</label>
                    <input type="text" name="Loan_Amount_Term" id="Loan_Amount_Term" placeholder="Enter Loan Amount Term" />
                </div>
            </form>
        </div>
    )
}

export default page

