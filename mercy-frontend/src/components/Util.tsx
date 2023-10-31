import { getTheContract } from "../connector";

export const getTokens = async (walletAddress: string | null) => {
  try {
    const { contract } = await getTheContract();
    const owner = await contract.getTokens(walletAddress);

    const prom = owner.map(async (tokenId: number) => {
      const tokenURI = await contract.tokenURI(tokenId);
      const response = await fetch(tokenURI);
      const metadata = await response.json();
      return { tokenId, metadata };
    });

    const token = await Promise.all(prom);
    return token;
  } catch (error) {
    console.error("Error retrieving owned tokens:", error);
    return [];
  }
};
