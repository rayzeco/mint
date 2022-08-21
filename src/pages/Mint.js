import * as React from "react";
import "./styles/mint.scss";
//--------web3--------
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import { parseUnits, formatUnits } from "@ethersproject/units";
import { contractABI } from "../constant/simpleNFTAbi";
//---------End of Web3---------
import { toast } from "react-toastify";
import { UserContext } from "../App";
import { useLocation } from "react-router-dom";
import ReactLoading from "react-loading";
import { JsonRpcProvider } from "@ethersproject/providers";
import { useEffect } from "react";

const Mint = () => {
  const location = useLocation();
  const { pathname } = location;
  const value = React.useContext(UserContext);
  const { library, active, account } = useWeb3React();
  const [mintedCounts, setMintedCounts] = React.useState(0);
  const [totalNFTSupply, setTotalNFTSupply] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [mintCnt, setMintCnt] = React.useState(1);
  const [maxMintCnt, setMaxMintCnt] = React.useState(1)
  const [mintCost, setMintCost] = React.useState(0.03)

  const getTotalSupply = async () => {
    try {
      const marketContract = new Contract(
        value.collection.ContractAddress,
        contractABI,
        library.getSigner()
      );
      const fetchTotalSupply = await marketContract.totalSupply();
      const fetchNftSupply = await marketContract.maxSupply();
      setMintedCounts(
        Math.round(formatUnits(fetchTotalSupply) * Math.pow(10, 18))
      );
      setTotalNFTSupply(
        Math.round(formatUnits(fetchNftSupply) * Math.pow(10, 18))
      );
    } catch (error) {
      toast.error("Transaction error");
    }
  };

  const getMintCost = async () => {
    const provider = new JsonRpcProvider('https://rinkeby.infura.io/v3/c1ba29d27c6b40779d9a00a8850d4f9e')
    const contract = new Contract(
      value.collection.ContractAddress,
      contractABI,
      provider
    )
    let c = await contract.cost()
    setMintCost(parseInt(c.toString()))
  }

  const getContractValues = async () => {
    try {
      const marketContract = new Contract(
        value.collection.ContractAddress,
        contractABI,
        library.getSigner()
      );
      let tmp = parseInt(await marketContract.maxMintAmountPerTx())
      setMaxMintCnt(tmp)
      tmp = await marketContract.cost()
    } catch (error) {
      setMaxMintCnt(1)
    }
  }

  React.useEffect(() => {
    if (active) {
      getTotalSupply();
      getContractValues()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, pathname]);

  useEffect(() => {
    if(value.collection.ContractAddress) {
      getMintCost()
    }
  }, [value])

  const mintNFT = async () => {
    try {
      setIsLoading(true);
      const marketContract = new Contract(
        value.collection.ContractAddress,
        contractABI,
        library.getSigner()
      );

      const res = await marketContract.mint(mintCnt, {
        value: parseUnits((mintCost * mintCnt).toString(), "ether"),
        from: account
      });
      await res.wait();
      await getTotalSupply();
      setIsLoading(false);
    } catch (error) {
      toast.error("Mint error");
      setIsLoading(false);
      console.error("---Write Contract Error---", error);
    }
  };

  const handleMintCnt = (am) => {
    let tmp = mintCnt + am;
    if (tmp < 1) {
      tmp = 1
    }
    else if(tmp > maxMintCnt) {
      tmp = maxMintCnt
    }
    setMintCnt(tmp);
  };

  return (
    <>
      {isLoading && (
        <div className="load-container">
          <ReactLoading type="spinningBubbles" color="#fff" />
        </div>
      )}

      <div className="mint-container" id="home" style={{backgroundColor: value.collection.background}}>
        <div className="mint-left-content">
          <h1>{value.collection.Title}</h1>
          <p>{value.collection.Description}</p>
          <div className="inner-space-group">
            <div className="question">How many do you with to mint?</div>
            <span className="price">1 NFT costs 0.03ETH</span >
            <p>(excluding minting cost)</p>
            <h5>Click mint to purchase your NFT</h5>
            <div className="mint-cnt-control">
              <button onClick={() => handleMintCnt(-1)}>-</button>
              <div>{mintCnt}</div>
              <button onClick={() => handleMintCnt(1)}>+</button>
            </div>
          </div>
          <button
            className="mint-button"
            onClick={() => {
              mintNFT();
            }}
          >
            Mint
          </button>
          <h2 className="nft-counts">{`${mintedCounts}/${totalNFTSupply}`}</h2>
          <p className="sold-label">sold</p>
        </div>
        <div className="mint-right-content">
          <img
            className="img2"
            src={`./config/${value.collection.top_img}`}
            alt="blur-chicken"
          />
          <img
            className="img1"
            src={`./config/${value.collection.top_img}`}
            alt="blur-chicken"
          />
        </div>
      </div>
    </>
  );
};

export default Mint;
