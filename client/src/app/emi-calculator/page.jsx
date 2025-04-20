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

  const formatIndianNumber = (value) => {
    const number = parseInt(String(value).replace(/,/g, ""), 10);
    return isNaN(number)
      ? ""
      : number.toLocaleString("en-IN");
  };


  return (
    <div className="min-h-screen bg-[#0c0c14] flex flex-col justify-center items-center p-16">
      <div className="bg-[#0F101A] border border-[#939DB8]/10 p-10 mt-14 rounded-2xl shadow-2xl max-w-md w-full text-white">
        <h2 className="text-4xl font-semibold mb-6 text-center">EMI Calculator</h2>

        <div className="mb-4">
          <label className="block text-lg mb-2">Loan Amount (₹)</label>
          <input
            type="text"
            value={formatIndianNumber(loanAmount)}
            inputMode="numeric"
            onChange={(e) => {
              const raw = e.target.value.replace(/,/g, "");
              if (/^\d*$/.test(raw)) {
                setLoanAmount(raw);
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
            <h3 className="text-xl font-semibold">Estimated EMI: ₹{Number(emi).toLocaleString("en-IN")}</h3>
          </div>
        )}
      </div>

      <div className="bg-[#0F101A] border border-[#3a3b4d] text-gray-300 rounded-lg p-6 mt-8">
        <h2 className="text-lg font-semibold text-white mb-5">Home Loan EMI Calculator Description</h2>
        <p className="mb-4">
          <strong>What is Home Loan EMI Calculator?</strong><br />
          The Home Loan EMI Calculator assists in calculating the loan installment (EMI) for your home loan. It is an easy-to-use tool and acts as a financial planning aid for home buyers.
        </p>
        <p className="mb-4">
          <strong>What is Home Loan EMI?</strong><br />
          EMI stands for Equated Monthly Installment. It includes repayment of the principal amount and the interest on the outstanding home loan. A longer loan tenure (up to 30 years) can help reduce the EMI.
        </p>
        <p className="mb-4">
          <strong>Illustration: How is EMI on a Loan Calculated?</strong><br />
          The formula used for EMI calculation is:<br />
          <code className="bg-[#1a1c29] text-blue-400 px-2 py-1 rounded">EMI = P × R × (1 + R)<sup>N</sup> / [(1 + R)<sup>N</sup> – 1]</code><br />
          where:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>P</strong> = Principal loan amount</li>
          <li><strong>N</strong> = Loan tenure in months</li>
          <li><strong>R</strong> = Monthly interest rate</li>
        </ul>
        <p className="mb-4">
          The monthly interest rate (R) is calculated as:<br />
          <code className="bg-[#1a1c29] text-blue-400 px-2 py-1 rounded">R = Annual Rate of Interest / 12 / 100</code><br />
          For example, if the interest rate is 7.2% per annum:<br />
          <code className="bg-[#1a1c29] text-blue-400 px-2 py-1 rounded">R = 7.2 / 12 / 100 = 0.006</code>
        </p>
        <p className="mb-4">
          If a person avails a loan of ₹10,00,000 at 7.2% annual interest for 120 months (10 years), then:
        </p>
        <p className="mb-4">
          <strong>EMI =</strong> ₹10,00,000 × 0.006 × (1 + 0.006)<sup>120</sup> / ((1 + 0.006)<sup>120</sup> – 1) = <strong>₹11,714</strong><br />
          <strong>Total Amount Payable:</strong> ₹11,714 × 120 = ₹14,05,703<br />
          <strong>Principal:</strong> ₹10,00,000<br />
          <strong>Interest:</strong> ₹4,05,703
        </p>
      </div>

    </div>
  );
};

export default page;
