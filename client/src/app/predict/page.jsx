"use client"; // Needed for event handling in Next.js App Router

import { React, useState } from 'react'

const page = () => {
    const [formData, setFormData] = useState({
        gender: "",
        married: "",
        dependents: "",
        education: "",
        employed: "",
        credit: "",
        area: "",
        age: "",
        ApplicantIncome: "",
        CoapplicantIncome: "",
        LoanAmount: "",
        Loan_Amount_Term: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData)
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents page reload

        try {
            const response = await fetch("http://localhost:8080/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData), // Send JSON data to Flask
            });

            const data = await response.json();
            console.log(data)
            alert(`Prediction: ${data.message}`);
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="mb-4">Enter your details</h1>
            <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-md" >
                <div className="pred-gender">
                    <label htmlFor="">Gender</label>
                    <select name="gender" id="gender" value={formData.gender} onChange={handleChange} required className="border p-2 w-full">
                        <option value="">-- select Gender --</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div className="pred-married">
                    <label htmlFor="">Married Status</label>
                    <select name="married" id="married" value={formData.married} onChange={handleChange} required className="border p-2 w-full">
                        <option value="">-- select Married Status --</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                <div className="pred-dependents">
                    <label htmlFor="">Dependents</label>
                    <select name="dependents" id="dependents" value={formData.dependents} onChange={handleChange} required className="border p-2 w-full">
                        <option value="">-- select Dependents --</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="3+">3+</option>
                    </select>
                </div>

                <div className="pred-education">
                    <label htmlFor="">Education</label>
                    <select name="education" id="education" value={formData.education} onChange={handleChange} required className="border p-2 w-full">
                        <option value="">-- select Education --</option>
                        <option value="Graduate">Graduate</option>
                        <option value="Not Graduate">Not Graduate</option>
                    </select>
                </div>

                <div className="pred-self-employed">
                    <label htmlFor="">Self Employed</label>
                    <select name="employed" id="employed" value={formData.employed} onChange={handleChange} required className="border p-2 w-full">
                        <option value="">-- select Self Employed --</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                <div className="pred-credit-history">
                    <label htmlFor="">Credit History</label>
                    <select name="credit" id="credit" value={formData.credit} onChange={handleChange} required className="border p-2 w-full">
                        <option value="">-- select Credit History --</option>
                        <option value="1.0">1.0</option>
                        <option value="0.0">0.0</option>
                    </select>
                </div>

                <div className="pred-area">
                    <label htmlFor="">Property Area</label>
                    <select name="area" id="area" value={formData.area} onChange={handleChange} required className="border p-2 w-full" >
                        <option value="">-- select Property Area --</option>
                        <option value="Rural">Rural</option>
                        <option value="Semiurban">Semiurban</option>
                        <option value="Urban">Urban</option>
                    </select>
                </div>

                <div className="pred-age">
                    <label htmlFor="">Age</label>
                    <input type="text"name="age" id="age" placeholder="Enter Age" value={formData.age} onChange={handleChange} required className="border p-2 w-full" />
                </div>

                <div className="pred-appicant-income">
                    <label htmlFor="ApplicantIncome">Applicant Income</label>
                    <input type="text" name="ApplicantIncome" id="ApplicantIncome" placeholder="Enter Applicant Income" value={formData.ApplicantIncome} onChange={handleChange} required className="border p-2 w-full" />
                </div>

                <div className="pred-coapp-income">
                    <label htmlFor="">Coapplicant Income</label>
                    <input type="text" name="CoapplicantIncome" id="CoapplicantIncome" placeholder="Enter Coapplicant Income" value={formData.CoapplicantIncome} onChange={handleChange} required className="border p-2 w-full" />
                </div>

                <div className="pred-loan-amount">
                    <label htmlFor="">Loan Amount</label>
                    <input type="text" name="LoanAmount" id="LoanAmount" placeholder="Enter Loan Amount" value={formData.LoanAmount} onChange={handleChange} required className="border p-2 w-full" />
                </div>

                <div className="pred-loan-amount-term">
                    <label htmlFor="">Loan Amount Term</label>
                    <input type="text" name="Loan_Amount_Term" id="Loan_Amount_Term" placeholder="Enter Loan Amount Term" value={formData.Loan_Amount_Term} onChange={handleChange} required className="border p-2 w-full" />
                </div>

                <button type="submit" className="bg-blue-500 text-white p-2 rounded text-center cursor-pointer w-full" >
                    Predict
                </button> 

            </form>
        </div>
    )   
}

export default page

