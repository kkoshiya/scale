import Marketplace from "@/components/marketplace/marketplace";
import { motion } from "framer-motion";

export default function MarketplacePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-fit mb-auto min-h-fit flex flex-col items-center justify-center mx-auto"
    >
      {" "}
      {/* <div>
          <span className="inline-flex h-6 w-6 animate-spin rounded-full border-4 border-dotted border-purple-800"></span>
        </div> */}
      <Marketplace />
    </motion.div>
  );
}
