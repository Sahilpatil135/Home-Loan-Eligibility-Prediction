"use client"; // Needed for event handling in Next.js App Router

import { React, useRef, useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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
    ApplicantIncome: "50000",
    CoapplicantIncome: "20000",
    LoanAmount: "300000",
    Loan_Amount_Term: "10",
  });

  const [criteriaData, setCriteriaData] = useState([]);

  const [loanTermMessage, setLoanTermMessage] = useState("");
  const loanTermMessageRef = useRef(null);

  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
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

      if (data.loanTermMessage) {
        setLoanTermMessage(data.loanTermMessage);
        setResult(null); // clear previous result
      } else {
        setLoanTermMessage(""); // clear error if any
        setResult(data);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  useEffect(() => {
    if (loanTermMessage && loanTermMessageRef.current) {
      loanTermMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [loanTermMessage]);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [result]);

  useEffect(() => {
    const fetchCriteria = async () => {
      try {
        const res = await fetch("/criteria.json");
        const data = await res.json();
        setCriteriaData(data);
      } catch (error) {
        console.error("Error loading criteria:", error);
      }
    };

    fetchCriteria();
  }, []);
  

  return (
    <div className="flex flex-col min-h-screen bg-[#0c0c14] text-white p-14 pt-26">
      <h1 className="text-4xl mb-6 text-center">🏡 Home Loan Eligibility</h1>

      <div className="flex justify-center py-10">
        <div className="bg-[#0F101A] p-8 rounded-2xl shadow-lg w-full max-w-3xl border border-[#939DB8]/10">
          <h2 className="text-2xl mb-4">Enter Your Details</h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-6 gap-x-8"
          >
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
                type="text"
                name="age"
                min="0"
                placeholder="Enter Age"
                value={formData.age}
                // onChange={handleChange}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow only numbers & prevent exceeding 100
                  if (/^\d*$/.test(value)) {
                    const numericValue = parseInt(value, 10);
                    if (numericValue <= 100 || value === "") {
                      handleChange(e);
                    }
                  }
                }}
                required
                className="w-full p-3 rounded-lg bg-[#181a25] border border-[#939DB8]/20 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Applicant Income Slider */}
            <div className="mb-6">
              <label className="block mb-2 text-white font-medium">
                Applicant Income
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  name="ApplicantIncome"
                  min="10000"
                  max="1000000"
                  step="1000"
                  value={formData.ApplicantIncome}
                  onChange={handleChange}
                  className="w-full h-2 bg-[#2a2c3b] rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <input
                  type="number"
                  name="ApplicantIncome"
                  value={formData.ApplicantIncome}
                  onChange={handleChange}
                  className="w-28 px-3 py-1.5 rounded-md bg-[#1a1c29] text-white border border-[#3d3f50] focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all duration-150 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>

            {/* Coapplicant Income Slider */}
            <div className="mb-6">
              <label className="block mb-2 text-white font-medium">
                Coapplicant Income
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  name="CoapplicantIncome"
                  min="10000"
                  max="1000000"
                  step="1000"
                  value={formData.CoapplicantIncome}
                  onChange={handleChange}
                  className="w-full h-2 bg-[#2a2c3b] rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <input
                  type="number"
                  name="CoapplicantIncome"
                  value={formData.CoapplicantIncome}
                  onChange={handleChange}
                  className="w-28 px-3 py-1.5 rounded-md bg-[#1a1c29] text-white border border-[#3d3f50] focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all duration-150 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>

            {/* Loan Amount Slider */}
            <div className="mb-6">
              <label className="block mb-2 text-white font-medium">
                Loan Amount
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  name="LoanAmount"
                  min="100000"
                  max="50000000"
                  step="5000"
                  value={formData.LoanAmount}
                  onChange={handleChange}
                  className="w-full h-2 bg-[#2a2c3b] rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <input
                  type="number"
                  name="LoanAmount"
                  value={formData.LoanAmount}
                  onChange={handleChange}
                  className="w-28 px-3 py-1.5 rounded-md bg-[#1a1c29] text-white border border-[#3d3f50] focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all duration-150 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>

            {/* Loan Term Slider */}
            <div className="mb-6">
              <label className="block mb-2 text-white font-medium">
                Loan Term (years)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  name="Loan_Amount_Term"
                  min="1"
                  max="40"
                  step="1"
                  value={formData.Loan_Amount_Term}
                  onChange={handleChange}
                  className="w-full h-2 bg-[#2a2c3b] rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <input
                  type="number"
                  name="Loan_Amount_Term"
                  value={formData.Loan_Amount_Term}
                  onChange={handleChange}
                  className="w-28 px-3 py-1.5 rounded-md bg-[#1a1c29] text-white border border-[#3d3f50] focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all duration-150 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
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

      {loanTermMessage && (
        <div ref={loanTermMessageRef} className="flex justify-center mt-6">
          <div className="bg-red-600/20 text-red-400 p-4 rounded-lg text-center max-w-2xl">
            {loanTermMessage}
          </div>
        </div>
      )}

      {/* Loan status Displays  */}
      {result && (
        <div
          ref={resultRef}
          className="predict-output flex justify-center mt-10"
        >
          <div className="bg-[#0F101A] p-10 rounded-3xl shadow-2xl w-full max-w-3xl border border-[#939DB8]/20">
            <h2 className="text-center text-3xl font-semibold text-white mb-4">
              Loan Status:{" "}
              <span
                className={
                  result.message === "Loan Approved"
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {result.message}
              </span>
            </h2>
            <h2 className="text-center text-2xl font-medium text-[#939DB8]">
              Estimated EMI (According to 8% rate p.a.):{" "}
              <span className="text-white">
                ₹{result.message == "Loan Approved" ? result.emi : "N/A"}
              </span>
            </h2>

            {result.message == "Loan Approved" && (
              <h2 className="text-center text-2xl font-medium text-[#939DB8]">
                Loan Amount:{" "}
                <span className="text-white">
                  ₹{result.loanAmount || "N/A"}
                </span>
              </h2>
            )}
          </div>
        </div>
      )}

      {/* Comparison of Banks  */}
      {result && result.bankEmiBreakdown && (
        <div className="bg-[#0F101A] p-6 rounded-lg shadow-md mt-10">
          <Table>
            <TableCaption className="text-neutral-400 text-md font-semibold mb-4">
              Eligibility for Different Banks
            </TableCaption>
            <TableHeader>
              <TableRow className="hover:bg-[#1f2233] transition-colors">
                <TableHead className="text-white font-medium">
                  Bank Name
                </TableHead>
                <TableHead className="text-white font-medium">
                  Rate Range
                </TableHead>
                <TableHead className="text-white font-medium">
                  Loan Tenure
                </TableHead>
                <TableHead className="text-white font-medium">EMI</TableHead>
                <TableHead className="text-white font-medium">
                  Eligible?
                </TableHead>
                <TableHead className="text-white font-medium">
                  Loan Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.bankEmiBreakdown.map((bank, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <TableRow className="even:bg-[#13141e] odd:bg-[#0F101A] hover:bg-[#1f2233] transition-colors border-b border-gray-700 cursor-pointer">
                      <TableCell className="text-gray-300">
                        {bank.name}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {bank.min_rate.toFixed(2)}% - {bank.max_rate.toFixed(2)}
                        %
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {bank.loan_tenure}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {result.eligibility_results[bank.name] &&
                        result.message === "Loan Approved"
                          ? `₹${bank.min_emi} - ₹${bank.max_emi}`
                          : "N/A"}
                      </TableCell>
                      <TableCell
                        className={`font-medium ${
                          result.eligibility_results[bank.name]
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {result.eligibility_results[bank.name] ? "Yes" : "No"}
                      </TableCell>
                      {/* <TableCell className={result.message === "Loan Approved" ? "text-green-400" : "text-red-400"}>{result.message}</TableCell>   need to update loan status acc to bank */}
                      <TableCell
                        className={
                          result.eligibility_results[bank.name] &&
                          result.message === "Loan Approved"
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      >
                        {result.eligibility_results[bank.name] &&
                        result.message === "Loan Approved"
                          ? "Loan Approved"
                          : "Loan Rejected"}
                      </TableCell>
                    </TableRow>
                  </DialogTrigger>
                  {/* <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-xl">{bank.name}</DialogTitle>
                      <DialogDescription className="text-sm text-gray-400">
                        Rate Range: {bank.min_rate}% - {bank.max_rate}%<br />
                        Loan Tenure: {bank.loan_tenure} months<br />
                        EMI Range: ₹{bank.min_emi} - ₹{bank.max_emi}
                      </DialogDescription>
                      <div>
                        <p className="text-sm font-semibold text-white mb-1">Loan Approval Criteria:</p>
                        <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                          {criteriaData.find(c => c.bank === bank.name)?.criteria?.map((point, idx) => (
                            <li key={idx}>{point}</li>
                          )) || <li>No criteria available for this bank.</li>}
                        </ul>
                      </div>
                    </DialogHeader>
                  </DialogContent> */}
                  <DialogContent className="bg-[#1a1c2c] text-gray-200 rounded-2xl p-6 max-w-lg w-full border border-[#939DB8]/20">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-semibold text-white">
                        {bank.name}
                      </DialogTitle>
                    </DialogHeader>

                    <div className="mt-4 space-y-2 text-sm">
                      <p className="text-gray-400">
                        <span className="font-medium text-white">
                          Rate Range:
                        </span>{" "}
                        {bank.min_rate}% - {bank.max_rate}%<br />
                        <span className="font-medium text-white">
                          Loan Tenure:
                        </span>{" "}
                        {bank.loan_tenure} months
                        <br />
                        {/* <span className="font-medium text-white">EMI Range:</span> ₹{bank.min_emi} - ₹{bank.max_emi} */}
                      </p>
                    </div>

                    <div className="mt-6">
                      <p className="text-sm font-semibold text-white mb-2">
                        Loan Approval Criteria:
                      </p>
                      <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                        {criteriaData
                          .find((c) => c.bank === bank.name)
                          ?.criteria?.map((point, idx) => (
                            <li key={idx}>{point}</li>
                          )) || <li>No criteria available for this bank.</li>}
                      </ul>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* <TableRow key={index}>
              <TableCell>{bank.name}</TableCell>
              <TableCell>{bank.min_rate.toFixed(2)}</TableCell>
              <TableCell>{bank.max_rate.toFixed(2)}</TableCell>
              <TableCell>{bank.loan_tenure}</TableCell>
            </TableRow> */}
    </div>
  );
};

export default page;
