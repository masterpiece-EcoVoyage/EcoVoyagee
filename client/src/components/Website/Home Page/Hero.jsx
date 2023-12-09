// Hero.js

import React from "react";
import PlaneAnimation from "./PlaneAnimation";

const Hero = () => {
  return (
    <>
      <section className="mb-16 relative overflow-hidden bg-cover bg-no-repeat bg-[50%] h-[500px] bg-[url('https://img1.wsimg.com/isteam/ip/044fec34-105c-4e2c-af48-6dfd21091910/man-walking-dog.webp')]">
        <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed bg-[#0c4a6e69]">
          <div className="flex flex-col h-full items-center justify-center">
            <div className="px-6 text-white text-left md:px-12">
              <h1 className="mt-6 mb-16 text-3xl font-bold tracking-tight md:text-4xl xl:text-5xl">
                Plan Your Eco-Friendly Adventure <br />
                <span className="text-base md:text-2xl xl:text-3xl font-normal">
                  Start Planning Your Eco-Friendly Trip Today!
                </span>
              </h1>
            </div>
            <div className="flex flex-col gap-6 md:flex-row items-center justify-center p-12 container mx-auto rounded-lg md:h-24 bg-[#7dafbfb3]">
              <input
                className="shadow rounded py-2 px-3 text-gray-700 w-full md:w-1/4"
                type="text"
                placeholder="Where are you going?"
              />
              <input
                className="shadow rounded py-2 px-3 text-gray-700 w-full md:w-1/4"
                type="number"
                placeholder="Enter your budget"
              />
              <input
                className="shadow rounded py-2 px-3 text-gray-700 w-full md:w-1/4"
                type="date"
              />
              <input
                className="shadow rounded py-2 px-3 text-gray-700 w-full md:w-1/4"
                type="date"
              />
              <button className="border-sky-900 border-2 hover:bg-white bg-sky-900 hover:text-sky-900 text-white font-bold py-2 px-4 rounded w-full md:w-1/4">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Add the plane animation component */}
        {/* <PlaneAnimation /> */}
      </section>
    </>
  );
};

export default Hero;
