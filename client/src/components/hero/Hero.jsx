import Image from 'next/image'
import React from 'react'
import { HiArrowLongRight } from "react-icons/hi2";
// import hero_2 from "../../../public/hero_2/png"

const Hero = () => {
  return (
    // #387087, #0c1c2c, #113551
    // flex justify-between items-center bg-[#0c1c2c] text-white p-28
    <div className="relative h-screen w-full max-w-[1888px] bg-cover bg-center bg-no-repeat flex justify-center items-center" style={{ backgroundImage: "url('/bg_hero.png')" }}>
      <div className="hero-content text-center w-150">
        <h4 className="text-2xl text-[#939DB8] ">LOGO</h4>
        <h1 className="text-7xl font-semibold text-white mt-6">Predict. Qualify. Own Home.</h1>
        <h3 className="text-xl text-[#939DB8] mt-8">AI-powered home loan eligibility prediction for smarter, faster financial decisions.</h3>
        <button className="flex items-center mx-auto gap-2 px-8 py-3 mt-10 font-semibold text-white bg-[#113551] rounded-2xl shadow-lg hover:bg-[#0c1c2c] transition-all duration-300">
          <div>
            Check Eligibilty Now
          </div>
          <HiArrowLongRight size={30} />
        </button>
      </div>
      {/* <div className="hero-image">
            <Image src="/hero_2.png" alt="..." width={400} height={400} #387087 />
        </div> */}
    </div>
  )
}

export default Hero