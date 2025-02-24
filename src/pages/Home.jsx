import React from "react";
import Header from "../components/Header";
import { assets } from "../assets/assets";

export default function Home() {
  return (
    <div>
    <div>
      <Header />
    </div>
    <div className="flex flex-col md:flex-row bg-gray-400">
  <img src={assets.doc14} alt="" className="w-" />
  <h6>
    Welcome to <span className="text-primary">PRESCRIPTO</span>
  </h6>
</div>

    </div>
    
  );
}
