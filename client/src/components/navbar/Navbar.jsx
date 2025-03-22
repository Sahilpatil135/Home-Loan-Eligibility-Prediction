import React from 'react'

const navbar = () => {
  return (
    <nav className="navbar sticky top-0 bg-[#121212] flex justify-between navbar-expand-md">
        <div className="flex w-auto p-8 items-center">
          <div className="cursor-pointer">
            <h1 className="text-3xl px-4 text-[#ffffff] hover:text-[#aad6ec]">Logo/Name</h1>
          </div>
          <div className="flex gap-6 pl-8">
            <h2 className="cursor-pointer text-[#ffffff] hover:text-[#aad6ec]">Home Loan Eligibilty Prediction</h2>
            <h2 className="cursor-pointer text-[#ffffff] hover:text-[#aad6ec]">EMI Calculator</h2>
          </div>
        </div>
        <div className="flex py-7 px-16">
        {/* text-white bg-[#1DB954] */}
          <button className="px-4 font-bold text-black bg-white border-2 rounded-full border-black cursor-pointer hover:bg-[#03DAC5]">
            <h2>Login</h2>
          </button>
        </div>
    </nav>
  )
}

export default navbar

