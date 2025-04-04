"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const page = () => {
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [loanTerm, setLoanTerm] = useState(0);
  const [emi, setEmi] = useState(null);

  const calculateEMI = () => {
    const rate = interestRate / (12 * 100);
    const term = loanTerm * 12;
    if (rate === 0) {
      setEmi((loanAmount / term).toFixed(2));
    } else {
      const emiValue =
        (loanAmount * rate * Math.pow(1 + rate, term)) /
        (Math.pow(1 + rate, term) - 1);
      setEmi(emiValue.toFixed(2));
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0c14] flex justify-center items-center p-10">
      <div className="bg-[#0F101A] border border-[#939DB8]/10 p-10 rounded-2xl shadow-2xl max-w-md w-full text-white">
        <h2 className="text-4xl font-semibold mb-6 text-center">EMI Calculator</h2>

        <div className="mb-4">
          <label className="block text-lg mb-2">Loan Amount (₹)</label>
          <input
            type="text"
            value={loanAmount}
            min="0"
            // onChange={(e) => setLoanAmount(e.target.value)}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*\.?\d{0,2}$/.test(value)) {
                setLoanAmount(value);
              }
            }}            
            required
            className="w-full p-3 rounded-lg bg-[#0c1c2c] text-white focus:outline-none focus:ring focus:ring-[#387087]"
            placeholder="Enter Loan Amount"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg mb-2">Interest Rate (%)</label>
          <input
            type="text"
            value={interestRate}
            min="0"
            // onChange={(e) => setInterestRate(e.target.value)}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*\.?\d{0,2}$/.test(value)) {
                const numericValue = parseFloat(value);
                if (numericValue <= 100 || value === "") {
                  setInterestRate(value);
                }
              }
            }}
            required
            className="w-full p-3 rounded-lg bg-[#0c1c2c] text-white focus:outline-none focus:ring focus:ring-[#387087]"
            placeholder="Enter Interest Rate"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg mb-2">Loan Term (Years)</label>
          <input
            type="text"
            value={loanTerm}
            min="0"
            // onChange={(e) => setLoanTerm(e.target.value)}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*\.?\d{0,2}$/.test(value)) {
                const numericValue = parseFloat(value);
                if (numericValue <= 100 || value === "") {
                  setLoanTerm(value);
                }
              }
            }}
            required
            className="w-full p-3 rounded-lg bg-[#0c1c2c] text-white focus:outline-none focus:ring focus:ring-[#387087]"
            placeholder="Enter Loan Term"
          />
        </div>

        <button
          onClick={calculateEMI}
          className="w-full bg-blue-500 p-3 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300"
        >
          Calculate EMI
        </button>

        {emi !== null && (
          <div className="mt-6 text-center">
            <h3 className="text-xl font-semibold">Estimated EMI: ₹{emi}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
