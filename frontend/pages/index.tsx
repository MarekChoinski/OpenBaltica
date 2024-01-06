import { NextPage } from "next";
import { PinataUploadForm } from "../components/PinataUploadForm/PinataUploadForm";
import { useEffect } from "react";

import { BigNumber, BigNumberish } from "moralis/common-core";
import { useMoralis } from "react-moralis";
import { useGetActualListingPrice } from "../hooks/useGetActualListingPrice";

const Home: NextPage = () => {
  const { enableWeb3 } = useMoralis();

  const { mintPrice, listPrice, mintPriceError, listPriceError } =
    useGetActualListingPrice();

  // FIXME: still need?
  // useEffect(() => {
  //   enableWeb3({
  //     onError(error) {
  //       console.log("err", error);
  //     },
  //     onSuccess(web3) {
  //       console.log("w3", web3);
  //     },
  //   });
  // }, []);

  return (
    <div>
      {mintPrice} / {listPrice}
      {!mintPriceError && !listPriceError && mintPrice && listPrice && (
        <PinataUploadForm mintPrice={mintPrice} listPrice={listPrice} />
      )}
    </div>
  );
};

export default Home;
