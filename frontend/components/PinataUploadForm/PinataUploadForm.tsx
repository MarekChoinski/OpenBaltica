import styles from "./PinataUploadForm.module.scss";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { DropArea } from "../DropArea/DropArea";
import { uploadFileToIPFS } from "../../utils/uploadFileToIPFS";
import { uploadFormResultToNFTMetadata } from "../../utils/mapFormResultToNFTMetadata";
import { uploadJSONToIPFS } from "../../utils/uploadJSONToIPFS";

enum AttributesEnum {
  grapefruit = "grapefruit",
  cuteness = "cuteness",
  dancing = "dancing",
}

export interface PinataUploadFormResult {
  image: File;
  name: string;
  description: string;
  attributes: AttributesEnum;
  attributesValue: number;
}

export const PinataUploadForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<PinataUploadFormResult> = async (data) => {
    if (
      !data?.image ||
      !data?.name ||
      !data.description ||
      !data?.attributes ||
      !data?.attributesValue
    )
      return;

    const response = await uploadFileToIPFS(data.image, "filename");

    if (response.success) {
      const metadata = uploadFormResultToNFTMetadata(
        (response as any).pinataURL,
        data
      );

      const metadataResponse = await uploadJSONToIPFS(metadata);
      console.log("metadataResponse", metadataResponse);

      // TODO: OB-8 here should mint NFT
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
          <select {...register("attributes")}>
            <option value="grapefruit">Grapefruit</option>
            <option value="cuteness">Cuteness</option>
            <option value="dancing">Dancing</option>
          </select>
          <input {...register("attributesValue")} type="number" />
        </div>
      </label>
      <button type="submit" className={styles.submit}>
        Wyslij
      </button>
    </form>
  );
};
