import { ethers } from 'ethers';

import ListingCard from "./listingCard";
import { useEffect, useState } from 'react';
import  { contractStore } from "@/store/contractStore";

export default function Marketplace() {
    const [listings, setListings] = useState([]);

    const contract = contractStore((state) => state.diamond);
      
    // Call the getAllListings function
    const gettingAllListings = async () => await contract!.getAllListings();
    const allListings = gettingAllListings();
    console.log("All Listings: " + allListings);
    
      // Fetch player details for each listing and store them in the state
      const playerListings = [];
      for (const listingId of allListings) {
        const { seller, playerId, price } = contract.getListing(listingId);
        playerListings.push({ listingId, seller, playerId, price });
      }
      setListings(playerListings);
      

    return (
    <div>
        <div className="btn-group">
            <input type="radio" name="options" data-title="Buy" className="btn" checked/>
            <input type="radio" name="options" data-title="Sell" className="btn"/>
        </div>
        <div className="grid grid-cols-3 pt-16 px-36 gap-20 relative">
            {listings.map((listing) => (
                <ListingCard key={listing.listingId} listing={listing} />
            ))}
        </div>

    </div>);
}