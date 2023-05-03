import { ethers } from "ethers";
import { useEffect, useState } from "react";
import ReactCardFlip from 'react-card-flip';

export default function ListingCard(props) {
  const { listing } = props;
  
  const  [flip, setFlip] = useState(false);
  const exchangeContract = useContractStore((state) => state.exchange);
  const buyListing = async () => {
    if (!exchangeContract) return;

    try {
      const tx = await exchangeContract.purchasePlayer(listing.id, {
        value: ethers.utils.parseEther(listing.price.toString()),
      });
      await tx.wait();
      // Show success message or perform other actions
    } catch (error) {
      console.error("Error purchasing listing:", error);
      // Show error message or handle error
    }
  };
  const playerContract = useContractStore((state) => state.player);
  const player = playerContract.getPlayer(listing.playerId);

  // TODO: Create modal for create listing AKA sell

  return (
  <ReactCardFlip isFlipped={flip} flipDirection="horizontal">
    <div className="front" onClick={()=>setFlip(!flip)}>
      <div tabIndex={0} className="card card-compact w-80 h-102 shadow-xl p-5" data-theme="scroll">
        <figure>
          <img src="http://clipart-library.com/img/1751890.png" alt="axxcar player" data-theme="scroll"/>
        </figure>
        {/* <input type="checkbox" />  */}
        <div className="card-actions justify-end">
          <button className="btn btn-primary m-6" onClick={buyListing}>Buy Now</button>
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
