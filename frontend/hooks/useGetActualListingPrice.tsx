import nftMarketplaceAbi from "../abi/NFTMarketplace.json";
import networkMapping from "../abi/networkMapping.json";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { useEffect } from "react";
import { ethers } from "ethers";

// FIXME: should be runContractFunction
export const useGetActualListingPrice = () => {
  const { isInitialized, isWeb3Enabled } = useMoralis();

  const {
    data: listPrice,
    error: listPriceError,
    fetch: getListPrice,
  } = useWeb3ExecuteFunction({
    abi: nftMarketplaceAbi,
    contractAddress:
      networkMapping[11155111].NFTMarketplace[
        networkMapping[11155111].NFTMarketplace.length - 1
      ],
    functionName: "getListPrice",
  });

  const {
    data: mintPrice,
    error: mintPriceError,
    fetch: getMintPrice,
  } = useWeb3ExecuteFunction({
    abi: nftMarketplaceAbi,
    contractAddress:
      networkMapping[11155111].NFTMarketplace[
        networkMapping[11155111].NFTMarketplace.length - 1
      ],
    functionName: "getMintPrice",
  });

  // FIXME: needed?
  useEffect(() => {
    if (isInitialized && isWeb3Enabled) {
      getListPrice();
      getMintPrice();
    }
  }, [isInitialized, isWeb3Enabled]);

  return {
    mintPrice: mintPrice
      ? ethers.utils.formatEther(mintPrice._hex).toString()
      : null,
    listPrice: mintPrice
      ? ethers.utils.formatEther(listPrice._hex).toString()
      : null,
    mintPriceError,
    listPriceError,
  };
};
