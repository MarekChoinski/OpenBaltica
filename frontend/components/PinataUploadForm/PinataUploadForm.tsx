import styles from "./PinataUploadForm.module.scss";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { DropArea } from "../DropArea/DropArea";
import nftMarketplaceAbi from "../../abi/NFTMarketplace.json";
import networkMapping from "../../abi/networkMapping.json";
import { useWeb3ExecuteFunction } from "react-moralis";
import { ethers } from "ethers";

enum AttributesEnum {
  grapefruit = "grapefruit",
  cuteness = "cuteness",
  dancing = "dancing",
}

export interface PinataUploadFormResult {
  image: File;
  name: string;
  description: string;
  metaAttributes: AttributesEnum;
  attributesValue: number;
  shouldList: boolean;
  listingPrice?: number;
}

export interface PinataUploadFormProps {
  mintPrice: string;
  listPrice: string;
}

export const PinataUploadForm = ({ mintPrice, listPrice }) => {
  const { register, control, handleSubmit, watch } = useForm({
    mode: "onBlur",
  });

  const { fetch: createToken, error } = useWeb3ExecuteFunction({
    abi: nftMarketplaceAbi,
    contractAddress: networkMapping[11155111].NFTMarketplace[0], // FIXME: here should fetch from some config czy coś
    functionName: "createToken",
    params: {
      tokenURI:
        "https://gateway.pinata.cloud/ipfs/QmP4nJmkLmnvqpyZX2ScGH9uVw2D1C3Kk5NbtvuuC8YvcN",
      price: 1, //here should be price to list
    },
    msgValue: ethers.utils.parseUnits("0.01", "ether").toString(), //here zaleznie od ceny + powinno zaciagac ile trzeba
  });

  console.log("error", error);

  const onSubmit: SubmitHandler<PinataUploadFormResult> = async (data) => {
    // if (
    //   !data?.image ||
    //   !data?.name ||
    //   !data.description ||
    //   !data?.metaAttributes ||
    //   !data?.attributesValue
    // )
    //   return;

    // const [_errorPinataImageUrl, pinataImageUrl] = await uploadFileToIPFS(
    //   data.image,
    //   data.name
    // );

    if (true) {
      // (pinataImageUrl) {
      // const metadata = uploadFormResultToNFTMetadata(pinataImageUrl, data);
      // const [_errorPinataUrl, pinataUrl] = await uploadJSONToIPFS(metadata);
      // console.log("metadataResponse", pinataUrl);
      // TODO: OB-8 here should mint NFT
      // const a = await createToken({
      //   onSuccess: (tx: any) =>
      //     tx.wait().then((finalTx) => {
      //       console.log("finalTx", finalTx);
      //     }),
      // });
      // console.log("a", a);
      // TEGO NIZEJ NIE UZYWAJ!
      // await Moralis.start({
      //   apiKey:
      //     "Y3PgPqRrTuUFDmbhim35PWgCza5cwzaUhSLuPVEuYMQeQmfCEnRQQNLqAUVyp6Sc",
      // });
      // const a = await Moralis.EvmApi.utils.runContractFunction({
      //   address: nftMarketplaceAbi.address,
      //   abi: nftMarketplaceAbi.abi,
      //   chain: "11155111",
      //   functionName: "createToken",
      //   params: {
      //     tokenURI:
      //       "https://gateway.pinata.cloud/ipfs/QmP4nJmkLmnvqpyZX2ScGH9uVw2D1C3Kk5NbtvuuC8YvcN",
      //     price: 1,
      //   },
      //   onSubmit
      // });
      // console.log("a", a);
      // const provider = new Moralis.EvmApi.utils.runContractFunction ethers.providers.Web3Provider(window.ethereum);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <DropArea
        label="offerCreatePage:formHeaders.images"
        name="image"
        header="offerCreatePage:dropArea.addPhotos"
        description="offerCreatePage:dropArea.dropHere"
        alt="offerCreatePage:dropArea.alt"
        control={control}
      />
      <label className={styles.name}>
        <span>Nazwa:</span>
        <input {...register("name")} />
      </label>
      <label className={styles.textarea}>
        <span>Opis:</span>
        <textarea {...register("description")} />
      </label>
      <label>
        Attributes:
        <div>
          <select {...register("metaAttributes")}>
            <option value="grapefruit">Grapefruit</option>
            <option value="cuteness">Cuteness</option>
            <option value="dancing">Dancing</option>
          </select>
          <input {...register("attributesValue")} type="number" />
        </div>
      </label>
      <label>
        <input type="checkbox" {...register("shouldList")} />
        Should list?
      </label>
      {watch("shouldList") && (
        <label className={styles.textarea}>
          <span>Cena na listingu:</span>
          <textarea {...register("listingPrice")} />
        </label>
      )}
      <button type="submit" className={styles.submit}>
        Wyslij
      </button>
    </form>
  );
};
