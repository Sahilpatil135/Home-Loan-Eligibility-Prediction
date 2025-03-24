"use client"; // Needed for event handling in Next.js App Router

import { React, useRef, useState, useEffect } from 'react'

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

  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

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
      console.log(data);
      setResult(data);
      // resultRef.current?.scrollIntoView({ behavior : "smooth" });
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [result]);

  return (
    <div className="flex flex-col min-h-screen bg-[#0c0c14] text-white p-14 pt-26">
      <h1 className="text-4xl mb-6 text-center">🏡 Home Loan Eligibility</h1>

      <div className="flex justify-center py-10">
        <div className="bg-[#0F101A] p-8 rounded-2xl shadow-lg w-full max-w-3xl border border-[#939DB8]/10">
          <h2 className="text-2xl mb-4">Enter Your Details</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 gap-x-8">
            {/* Gender */}
            <div>
              <label className="block mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-[#181a25] border border-[#939DB8]/20 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">-- Select Gender --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Married Status */}
            <div>
              <label className="block mb-2">Married Status</label>
              <select
                name="married"
                value={formData.married}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-[#181a25] border border-[#939DB8]/20 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">-- Select Status --</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Dependents */}
            <div>
              <label className="block mb-2">Dependents</label>
              <select
                name="dependents"
                value={formData.dependents}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-[#181a25] border border-[#939DB8]/20 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">-- Dependents --</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="3+">3+</option>
              </select>
            </div>

            {/* Education */}
            <div>
              <label className="block mb-2">Education</label>
              <select
                name="education"
                value={formData.education}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-[#181a25] border border-[#939DB8]/20 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">-- Education --</option>
                <option value="Graduate">Graduate</option>
                <option value="Not Graduate">Not Graduate</option>
              </select>
            </div>

            {/* Self Employed */}
            <div>
              <label className="block mb-2">Self Employed</label>
              <select
                name="employed"
                value={formData.employed}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-[#181a25] border border-[#939DB8]/20 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">-- Select --</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Credit History */}
            <div>
              <label className="block mb-2">Credit History</label>
              <select
                name="credit"
                value={formData.credit}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-[#181a25] border border-[#939DB8]/20 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">-- Credit History --</option>
                <option value="1.0">1.0</option>
                <option value="0.0">0.0</option>
              </select>
            </div>

            {/* Property Area */}
            <div>
              <label className="block mb-2">Property Area</label>
              <select
                name="area"
                value={formData.area}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-[#181a25] border border-[#939DB8]/20 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">-- Select Area --</option>
                <option value="Rural">Rural</option>
                <option value="Semiurban">Semiurban</option>
                <option value="Urban">Urban</option>
              </select>
            </div>

            {/* Age */}
            <div>
              <label className="block mb-2">Age</label>
              <input
                type="number"
                name="age"
                min="0"
                placeholder="Enter Age"
                value={formData.age}
                onChange={handleChange}
                onInput={(e) => {
                  if (e.target.value < 0) e.target.value = 0;
                }}
                required
                className="w-full p-3 rounded-lg bg-[#181a25] border border-[#939DB8]/20 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Applicant Income */}
            <div>
              <label className="block mb-2">Applicant Income</label>
              <input
                type="number"
                name="ApplicantIncome"
                min="0"
                placeholder="Enter Income"
                value={formData.ApplicantIncome}
                onChange={handleChange}
                onInput={(e) => {
                  if (e.target.value < 0) e.target.value = 0;
                }}
                required
                className="w-full p-3 rounded-lg bg-[#181a25] border border-[#939DB8]/20 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Coapplicant Income */}
            <div>
              <label className="block mb-2">Coapplicant Income</label>
              <input
                type="number"
                name="CoapplicantIncome"
                min="0"
                placeholder="Enter Coapplicant Income"
                value={formData.CoapplicantIncome}
                onChange={handleChange}
                onInput={(e) => {
                  if (e.target.value < 0) e.target.value = 0;
                }}
                required
                className="w-full p-3 rounded-lg bg-[#181a25] border border-[#939DB8]/20 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Loan Amount */}
            <div>
              <label className="block mb-2">Loan Amount</label>
              <input
                type="number"
                name="LoanAmount"
                min="0"
                placeholder="Enter Loan Amount"
                value={formData.LoanAmount}
                onChange={handleChange}
                onInput={(e) => {
                  if (e.target.value < 0) e.target.value = 0;
                }}
                required
                className="w-full p-3 rounded-lg bg-[#181a25] border border-[#939DB8]/20 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Loan Term */}
            <div>
              <label className="block mb-2">Loan Term (Months)</label>
              <input
                type="number"
                name="Loan_Amount_Term"
                min="0"
                placeholder="Enter Term in Months"
                value={formData.Loan_Amount_Term}
                onChange={handleChange}
                onInput={(e) => {
                  if (e.target.value < 0) e.target.value = 0;
                }}
                required
                className="w-full p-3 rounded-lg bg-[#181a25] border border-[#939DB8]/20 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="col-span-2 w-full bg-blue-500 p-3 rounded-lg font-semibold text-white cursor-pointer hover:bg-blue-600 transition-all"
            >
              🔍 Predict Eligibility
            </button>
          </form>
        </div>
      </div>

      {result && (
        <div ref={resultRef} className="predict-output flex justify-center mt-10">
          <div className="bg-[#0F101A] p-10 rounded-3xl shadow-2xl w-full max-w-3xl border border-[#939DB8]/20">
            <h2 className="text-center text-3xl font-semibold text-white mb-4">
              Loan Status:{" "}
              <span className={result.message === "Loan Approved" ? "text-green-400" : "text-red-400"}>
                {result.message}
              </span>
            </h2>
            <h2 className="text-center text-2xl font-medium text-[#939DB8]">
              Estimated EMI: <span className="text-white">₹{result.message == "Loan Approved" ? result.emi : "N/A"}</span>
            </h2>

            {result.message == "Loan Approved" && (
              <h2 className="text-center text-2xl font-medium text-[#939DB8]">
                Loan Amount: <span className="text-white">₹{result.loanAmount || "N/A"}</span>
              </h2>
            )}
          </div>
        </div>
      )}


    </div>
  )
}

export default page

