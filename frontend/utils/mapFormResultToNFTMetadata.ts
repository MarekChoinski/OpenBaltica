import { PinataUploadFormResult } from "../components/PinataUploadForm/PinataUploadForm";

export const uploadFormResultToNFTMetadata = (
  url: string,
  data: PinataUploadFormResult
) => {
  return {
    name: data.name,
    description: data.description,
    image: url,
    attributes: [
      {
        traits_type: data.metaAttributes,
        value: data.attributesValue,
      },
    ],
  };
};
