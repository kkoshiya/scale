import { ethers } from 'ethers';

import ListingCard from "./listingCard";
import { useEffect, useState } from 'react';
import  { contractStore } from "@/store/contractStore";

export default function Marketplace() {
    const [listings, setListings] = useState([]);

    const contract = contractStore((state) => state.diamond);
    // console.log(contract);
    let allListings;
    // Call the getAllListings function
    useEffect(() => {
        const loadContract = async () => {
            allListings = await contract.getAllListings();
            console.log(allListings);
            // Fetch player details for each listing and store them in the state
            const playerListings = [];
            for (const listingObj of allListings) {
                const listingId = listingObj.toNumber();
                let { seller, playerId, price } = await contract.getLisitng(listingId);
                playerId = playerId.toNumber();
                price = price.toNumber();
                playerListings.push({ listingId, seller, playerId, price });
            }
            setListings(playerListings);
        };
        loadContract();
      }, []);
    console.log(allListings);
    
      
      
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