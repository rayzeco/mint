import { useState, useEffect } from "react";
import { DefaultNetwork, networkInfo } from "../constant";
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export const chainIdToHexString = (chain_id) => {
  return "0x" + chain_id.toString(16);
};

export const shortAddress = (address) => {
  return `${address.slice(2, 5)}...${address.slice(-3)}`;
};

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export const changeNetwork = async () => {
  const wa = window;
  const ethereum = wa.ethereum;
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainIdToHexString(DefaultNetwork) }],
    });
  } catch (switchError) {
    const error = JSON.parse(JSON.stringify(switchError));
    if (
      error.code === 4902 ||
      (error.code === -32603 && error?.data?.originalError.code === 4902)
    ) {
      try {
        const item = networkInfo.filter((x) => x.chainId === DefaultNetwork)[0];
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: chainIdToHexString(DefaultNetwork),
              chainName: item.label,
              rpcUrls: item.rpcUrl,
              nativeCurrency: item.nativeCurrency,
              blockExplorerUrls: item.explorer,
            },
          ],
        });
      } catch (addError) {
        console.log("addError", addError);
      }
    }
  }
};
