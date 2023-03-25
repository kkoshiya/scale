import { motion } from "framer-motion";
import craftmap from "../../../../public/images/craft1.png";
import contractStore from "@/store/contractStore";
import { useAccount, useTransaction } from "wagmi";
import Diamond from "@/contracts/data/diamond.json";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PlayerCard from "@/components/playerCard";
import { ethers } from "ethers";
import Toast from "@/components/toast";
import Countdown from "react-countdown";

export default function Craft() {
  const store = contractStore();
  const { address } = useAccount();
  const [hash, setHash] = useState("");

  useEffect(() => {}, []);
  async function handleCraftSword() {
    console.log(store.status);

    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    // Get signer
    const signer = provider.getSigner();
    const contract = await new ethers.Contract(
      process.env.NEXT_PUBLIC_DIAMOND_ADDRESS as string,
      Diamond.abi,
      signer
    );

    const quest = await contract.craftSword(store.selectedPlayer);
    console.log(quest);
    setHash(quest.hash);
  }
  async function handleCraftArmor() {
    console.log(store.status);

    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    // Get signer
    const signer = provider.getSigner();
    const contract = await new ethers.Contract(
      process.env.NEXT_PUBLIC_DIAMOND_ADDRESS as string,
      Diamond.abi,
      signer
    );

    const quest = await contract.craftArmor(store.selectedPlayer);
    console.log(quest);
    setHash(quest.hash);
  }

  if (store.players.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative w-fit mb-auto min-h-fit flex flex-col sm:flex-row items-center justify-center mx-auto  h-[78vh]"
      >
        {" "}
        <div>
          <Link href={"/play"}>
            <span className="  hover:cursor-pointer font-bold text-2xl text-white rounded-lg bg-gray-600 py-1 px-2">
              Back to map
            </span>
          </Link>
        </div>
      </motion.div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-fit mb-auto min-h-fit flex flex-col sm:flex-row items-center justify-center mx-auto "
    >
      <Image
        src={craftmap}
        alt="game map"
        height={800}
        className="rounded-3xl shadow-inner  mix-blend-	"
      />
      <PlayerCard />
      {hash && <Toast hash={hash} />}
      <Link href={"/play"}>
        <span className=" absolute left-[10%] btn top-[5%] hover:cursor-pointer font-bold text-white rounded-lg bg-gray-600 py-1 px-2">
          Back
        </span>
      </Link>

      <button
        disabled={store.status !== 0}
        className="absolute left-[40%] top-[55%] btn bg-gray-600 disabled:text-zinc-100 disabled:bg-opacity-90 disabled:text-opacity-100"
        onClick={() => {
          handleCraftSword();
        }}
      >
        <>Craft Sword</>
      </button>
      <button
        disabled={store.status !== 0}
        className="absolute left-[55%] top-[60%] btn bg-gray-600 disabled:text-zinc-100 disabled:bg-opacity-90 disabled:text-opacity-100"
        onClick={() => {
          handleCraftArmor();
        }}
      >
        <>Craft Armor</>
      </button>
    </motion.div>
  );
}