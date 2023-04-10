import Diamond from "../../../../deployment/artifacts/HardhatDiamondABI.sol/DIAMOND-1-HARDHAT.json";
import { ethers } from "ethers";

import { useEffect, useState } from "react";
import ReactCardFlip from 'react-card-flip';

export default function ListingCard(props) {
  const { listingAddress } = props;
  const [listing, setListing] = useState(null);
  const [player, setPlayer] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const loadContract = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // Get signer
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_DIAMOND_ADDRESS,
        Diamond.abi,
        signer
      );

      const listingResponse = await contract._getListing(listingAddress);
      console.log(listingResponse);
      setListing(await listingResponse);

      const playerResponse = await contract.getPlayer(listing.playerId);
      console.log(playerResponse);
      setPlayer(await playerResponse);
    };
    loadContract();
  }, [index, listingAddress]);

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
        <div className="grid gap-x-48">
            <div> Level: {player.level} </div>
            <div> XP: {player.xp} </div>
            <div> Status: {player.status} </div>
            <div> Strength: {player.strength} </div>
            <div> Health: {player.health} </div>
            <div> Magic: {player.magic} </div>
            <div> Mana: {player.mana} </div>
            <div> Agility: {player.agility} </div>
            <div> Luck: {player.luck} </div>
            <div> Wisdom: {player.wisdom} </div>
            <div> Haki: {player.haki} </div>
            <div> Perception: {player.perception} </div>            
            <div> Defense: {player.defense} </div>
            <div> Name: {player.name} </div>
            <div> Gender: {player.gender ? "male" : "female"} </div>
        </div>
      </div>
    </div>
  </ReactCardFlip>);
}
