import { ethers } from 'ethers';

import ListingCard from "./listingCard";
import { useEffect, useState } from 'react';
import Diamond from "../../../../deployment/artifacts/hardhat-diamond-abi/HardhatDiamondABI.sol/DIAMOND-1-HARDHAT.json";


export default function Marketplace() {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const loadListings = async () => {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            process.env.NEXT_PUBLIC_DIAMOND_ADDRESS,
            Diamond.ABI,
            signer
          );
      
          // Call the getAllListings function
          const allListings = await contract.getAllListings();
      
          // Fetch player details for each listing and store them in the state
          const playerListings = [];
          for (const listingId of allListings) {
            const { seller, playerId, price } = await contract.getListing(listingId);
            playerListings.push({ listingId, seller, playerId, price });
          }
          setListings(playerListings);
        };
      
        loadListings();
      }, []);
      

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