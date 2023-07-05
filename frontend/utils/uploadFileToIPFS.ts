import axios from "axios";
import FormData from "form-data";

export const uploadFileToIPFS = async (file: File, filename: string) => {
  const data = new FormData();
  data.append("file", file);

  const metadata = JSON.stringify({
    name: filename,
    keyvalues: {
      exampleKey: "exampleValue",
    },
  });
  data.append("pinataMetadata", metadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  data.append("pinataOptions", pinataOptions);

  return axios
    .post(`https://api.pinata.cloud/pinning/pinFileToIPFS`, data, {
      headers: {
        "Content-Type": `multipart/form-data`,
        pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
        pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_API_SECRET,
      },
    })
    .then((response) => ({
      success: true,
      // TODO OB-6: should be ipfs
      pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
    }))
    .catch((error) => {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};
