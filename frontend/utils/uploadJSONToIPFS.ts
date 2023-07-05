import axios from "axios";

export const uploadJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

  try {
    const response = await axios.post(url, JSONBody, {
      headers: {
        pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
        pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_API_SECRET,
      },
    });

    // TODO OB-6: should be ipfs
    return [
      null,
      `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
    ];
  } catch (error) {
    return [{ message: error.message, statusCode: error.statusCode }, null];
  }
};
