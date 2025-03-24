"use client";

import { useState } from "react";

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
      <div className="bg-[#113551] p-10 rounded-2xl shadow-2xl max-w-md w-full text-white">
        <h2 className="text-4xl font-semibold mb-6 text-center">EMI Calculator</h2>

        <div className="mb-4">
          <label className="block text-lg mb-2">Loan Amount (₹)</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#0c1c2c] text-white focus:outline-none focus:ring focus:ring-[#387087]"
            placeholder="Enter Loan Amount"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg mb-2">Interest Rate (%)</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#0c1c2c] text-white focus:outline-none focus:ring focus:ring-[#387087]"
            placeholder="Enter Interest Rate"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg mb-2">Loan Term (Years)</label>
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#0c1c2c] text-white focus:outline-none focus:ring focus:ring-[#387087]"
            placeholder="Enter Loan Term"
          />
        </div>

        <button
          onClick={calculateEMI}
          className="w-full bg-[#387087] p-3 rounded-lg font-semibold hover:bg-[#0c1c2c] transition-all duration-300"
        >
          Calculate EMI
        </button>

        {emi !== null && (
          <div className="mt-6 text-center">
            <h3 className="text-2xl font-semibold">Estimated EMI: ₹{emi}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
