import Image from "next/image";
import contractStore from "@/store/contractStore";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Diamond from "@/contracts/data/diamond.json";
import { ethers } from "ethers";

import { AiOutlineHeart } from "react-icons/ai";
import { TbSword, TbBrandTailwind, TbClover } from "react-icons/tb";
import { SlEnergy } from "react-icons/sl";
import { GiPotionBall } from "react-icons/gi";
import { GoLightBulb } from "react-icons/go";
import { SiGhost } from "react-icons/si";
import { TfiEye } from "react-icons/tfi";
import { RiCoinLine } from "react-icons/ri";
import { HiArrowSmRight, HiArrowSmLeft } from "react-icons/hi";

import Link from "next/link";
import InventoryModal from "./inventoryModal";
export default function PlayerCard() {
  const { address } = useAccount();
  const store = contractStore();
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
      const response = await contract.getPlayers(address);
      console.log(response);
      const players = await response.map((val) => val.toNumber());
      console.log(players);
      const player = await contract.getPlayer(players[index]);
      store.setSelectedPlayer(players[index]);
      console.log(store.selectedPlayer);
      store.setPlayer(await player);
      store.setStatus(await player.status.toNumber());
      const gold = await contract.getGoldBalance(address);
      store.setGold(await gold.toNumber());
    };
    loadContract();
  }, [index, address]);

  function statusSwitch(status) {
    switch (status) {
      case 0:
        return <span className="text-success">ready</span>;
      case 1:
        return <span className="text-error">training</span>;
      case 2:
        return <span className="text-error">questing</span>;
      case 3:
        return <span className="text-error">crafting</span>;
      case 4:
        return <span className="text-error">fighting</span>;
      default:
        return <span className="text-success">ready</span>;
    }
  }
  if (store.player.status) {
    return (
      <>
        <div className="stats shadow absolute -left-32 -bottom-8 rounded-l-none rounded-br-none bg-[#E6E6FA] overflow-visible py-2 pr-5 gap-6 scale-[0.40] sm:absolute sm:scale-75 sm:bottom-1 sm:-left-12 lg:left-1 lg:scale-100">
          <button
            onClick={() =>
              index === 0
                ? setIndex(store.players.length - 1)
                : setIndex(index - 1)
            }
            className="z-10 absolute right-[91%] bottom-[0%]  mx-auto grid btn h-0 w-fit bg-[#9696ea]  px-0 py-0 border-0  btn-accent max-w-4xl place-items-center rounded-lg sm:mx-auto"
          >
            <div className=" grid h-full w-full place-items-center rounded-lg  py-0 px-4 text-white  ">
              <HiArrowSmLeft />
            </div>
          </button>

          <button
            onClick={() =>
              index === store.players.length - 1
                ? setIndex(0)
                : setIndex(index + 1)
            }
            className="z-10 absolute right-[83%] bottom-[0%]  mx-auto grid h-fit bg-[#9696ea]  px-0 py-0 border-0 w-fit btn  btn-accent max-w-4xl  place-items-center rounded-lg sm:mx-auto"
          >
            <div className=" grid h-full w-full place-items-center rounded-lg  py-2 px-4 text-white">
              <HiArrowSmRight className="" />
            </div>
          </button>
          <div className="w-full flex items-center my-auto pl-1 gap-4">
            <div className="avatar p-4">
              <div className="w-16 rounded-full">
                <Image
                  alt="player"
                  src={store.player?.uri}
                  fill
                  className="rounded-full"
                />
              </div>
            </div>
            <div>
              <div className="stat-value text-purple-900">
                {store.player?.name}
              </div>
              <div>
                <div className="stat-title">
                  {" "}
                  {store.player?.male ? "Male" : "Female"}
                </div>
                <div className=" font-bold text-sm">
                  {statusSwitch(store.player.status.toNumber())}
                </div>
              </div>
              <div className="stat-desc text-purple-800 font-bold">
                level: {store.player?.level.toNumber()}
              </div>
              {/* <progress
                className="progress w-full progress-success"
                value="50"
                max="100"
              ></progress> */}
            </div>
          </div>
          <div className=" my-auto">
            <div
              className=" flex justify-center items-center text-3xl text-purple-900  tooltip"
              data-tip="strength"
            >
              <TbSword />0{store.player?.strength.toNumber()}
            </div>
            <div
              className=" flex justify-center items-center text-3xl text-purple-900 tooltip"
              data-tip="health"
            >
              <AiOutlineHeart />
              {store.player?.health.toNumber()}
            </div>
            <div
              className=" flex justify-center items-center text-3xl text-purple-900 tooltip"
              data-tip="magic"
            >
              <SlEnergy />0{store.player?.magic.toNumber()}
            </div>
          </div>
          <div className=" my-auto ">
            <div
              className=" flex justify-center items-center text-3xl text-purple-900 tooltip"
              data-tip="mana"
            >
              <GiPotionBall />0{store.player?.mana.toNumber()}
            </div>
            <div
              className=" flex justify-center items-center text-3xl text-purple-900 tooltip"
              data-tip="agility"
            >
              <TbBrandTailwind />0{store.player?.agility.toNumber()}
            </div>
            <div
              className=" flex justify-center items-center text-3xl text-purple-900 tooltip"
              data-tip="luck"
            >
              <TbClover />0{store.player?.luck.toNumber()}
            </div>
          </div>
          <div className=" my-auto ">
            <div
              className=" flex justify-center items-center text-3xl text-purple-900 tooltip "
              data-tip="wisdom"
            >
              <GoLightBulb />0{store.player?.wisdom.toNumber()}
            </div>
            <div
              className=" flex justify-center items-center text-3xl text-purple-900 tooltip"
              data-tip="haki"
            >
              <SiGhost />0{store.player?.haki.toNumber()}
            </div>
            <div
              className=" flex justify-center items-center text-3xl text-purple-900 tooltip"
              data-tip="perception"
            >
              <TfiEye />0{store.player?.perception.toNumber()}
            </div>
          </div>

          <div className=" my-auto ">
            <div
              className=" flex  justify-center items-center text-3xl text-amber-500 tooltip "
              data-tip="gold"
            >
              <RiCoinLine className="pr-2" />0{store.gold}
            </div>
            <label
              htmlFor="my-modal"
              className="btn mt-2 bg-[#9696ea] btn-accent"
            >
              inventory
            </label>
          </div>
        </div>
        <InventoryModal />
      </>
    );
  } else {
    return null;
  }
}
