import React from 'react'
//rgb(203, 213, 241)
const navbar = () => {
  return (
    <nav className="navbar absolute top-0 left-0 left-0 right-0 z-50 bg-[#0B0C14]/80 border[#727DA1]/15- fixed flex justify-center">
      <div className="navbar-content flex justify-between w-300">
        <div className="flex p-6 items-center">
          <h1 className="cursor-pointer text-2xl font-bold px-4 text-[#FAF9F6] hover:text-[#aad6ec] transition-colors duration-300">Logo/Name</h1>
          <div className="flex gap-6 pl-8">
            <h2 className="cursor-pointer text-[#FAF9F6] hover:text-[#aad6ec] transition-colors duration-300">Home Loan Eligibilty Prediction</h2>
            <h2 className="cursor-pointer text-[#FAF9F6] hover:text-[#aad6ec] transition-colors duration-300">EMI Calculator</h2>
          </div>
        </div>    
        <div className="flex items-center gap-6 mx-6">
          {/* text-white bg-[#1DB954, #113551] */}
          <button className="px-6 py-1 font-semibold text-black bg-white border-2 rounded border-transparent cursor-pointer hover:bg-[#aad6ec] transition-colors duration-300">
            Login
          </button>
          <button className="px-4 py-1 font-semibold text-black bg-white border-2 rounded border-transparent cursor-pointer hover:bg-[#aad6ec] transition-colors duration-300">
            Sign up
          </button>
        </div>
      </div>

    </nav>
  )
}

export default navbar

