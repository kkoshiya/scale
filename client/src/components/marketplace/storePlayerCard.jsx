import contractStore from "@/store/contractStore";
import { useAccount } from "wagmi";
import Diamond from "@/contracts/data/diamond.json";
import { ethers } from "ethers";

import { useEffect, useState } from "react";
import ReactCardFlip from 'react-card-flip';

export default function StorePlayerCard(props) {
  const { address } = props;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const loadContract = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // Get signer
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        "0xfE3Acd5a20Ca97DE7C7c9540F33BF54229D925E3",
        Diamond.abi,
        signer
      );
      const listing = await contract.getListing(address);
      const player = listing.playerId;
      const price = listing.price;
    };
    loadContract();
  }, [address]);

  const  [flip, setFlip] = useState(false);
  return (
  <ReactCardFlip isFlipped={flip} flipDirection="horizontal">
    <div className="front" onClick={()=>setFlip(!flip)}>
      <div tabIndex={0} className="card card-compact w-80 h-102 shadow-xl p-5" data-theme="scroll">
        <figure>
          <img src="http://clipart-library.com/img/1751890.png" alt="axxcar player" data-theme="scroll"/>
        </figure>
        {/* <input type="checkbox" />  */}
        <div className="card-actions justify-end">
          <button className="btn btn-primary m-6">Buy Now</button>
        </div>
        <div className="text-xl font-medium card-body" >  
          <h1 className="card-title" data-theme="scroll">#4124 AXXCAR</h1>
          <h1>0.001 ETH <span className="text-slate-500">($1.82 USD)</span></h1>
          
        </div>
      </div>
    </div>
    <div className="back pt-5 pb-0" onClick={()=>setFlip(!flip)}> 
      <div tabIndex={0} className="card card-compact w-80 h-102 shadow-xl p-5" data-theme="scroll">
        <h2 className="font-bold">Attributes</h2>
        <div className="grid gap-x-48 grid-cols-2">
          <div>Status: </div>
          <div>Idle</div>
          <div>Attack: </div>
          <div>35</div>
          <div>HP: </div>
          <div>200</div>
          <div>Items: </div>
          <div>Sword</div>
          <div>Wins: </div>
          <div>12</div>
        </div>
      </div>
    </div>
  </ReactCardFlip>);
}
