import * as React from "react";
import "./styles/reward.scss";
import endArrow from "../asserts/end_arrow.png";
//--------- Web3 -----------------
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import { parseUnits, formatUnits } from "@ethersproject/units";
import { contractABI } from "../constant/simpleNFTAbi";
// import { bullTokenContractAbi } from '../constant/bullTokenAbi';
import { rayzeTokenContractAbi } from "../constant/rayzeTokenAbi";
import { daiContractABI } from "../constant/daiContractAbi";
//----------End of Web3------------
import { toast } from "react-toastify";
import { UserContext } from "../App";
import { useLocation } from "react-router-dom";
import ReactLoading from "react-loading";

const Reward = () => {
  const value = React.useContext(UserContext);

  const location = useLocation();
  const { pathname } = location;

  const { library, active, account } = useWeb3React();
  const [loadMoreValue, setLoadMoreValue] = React.useState("");
  const [rewBalCount, setRewBalCount] = React.useState(0);
  const [rewBalSymbol, setRewBalSymbol] = React.useState("");
  const [usdcCount, setUsdcCount] = React.useState(0);
  const [usdcSymbol, setUsdcSymbol] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const getRewardData = async () => {
    try {
      setIsLoading(true);
      const nftContract = new Contract(
        value.collection.ContractAddress,
        contractABI,
        library.getSigner()
      );
      const tokenAddress = await nftContract.getRewardToken();
      const balanceAddress = await nftContract.balanceToken();

      const tokenContract = new Contract(
        tokenAddress,
        rayzeTokenContractAbi,
        library.getSigner()
      );

      const usdcTokenContract = new Contract(
        balanceAddress,
        rayzeTokenContractAbi,
        library.getSigner()
      );

      const rewbal = await tokenContract.balanceOf(account); //25
      const symbol = await tokenContract.symbol(); //$BULLC
      const bal = await usdcTokenContract.balanceOf(account); //35
      const rsymbol = await usdcTokenContract.symbol(); //ryzUSDC

      setRewBalCount(formatUnits(rewbal));
      setRewBalSymbol(symbol);

      setUsdcCount(formatUnits(bal));
      setUsdcSymbol(rsymbol);

      setIsLoading(false);
    } catch (error) {
      console.error("---Write Contract Error---", error);
      toast.error("Transaction error");
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    if (account) {
      if (loadMoreValue <= 0) {
        toast.error("Please input the some value");
      } else {
        try {
          setIsLoading(true);
          const nftContract = new Contract(
            value.collection.ContractAddress,
            contractABI,
            library.getSigner()
          );
          const ownerAddress = await nftContract.ownerBalToken();
          const daiContract = new Contract(
            ownerAddress,
            daiContractABI,
            library.getSigner()
          );
          const daiBalance = await daiContract.balanceOf(account);
          if (formatUnits(daiBalance) < loadMoreValue) {
            toast.error("Insufficient Dai balance!");
            return;
          }
          const approveRes = await daiContract.approve(
            value.collection.ContractAddress,
            parseUnits(loadMoreValue, "ether")
          );
          await approveRes.wait();
          const res = await nftContract.loadBalance(
            parseUnits(loadMoreValue, "ether")
          );
          await res.wait();
          setIsLoading(false);
          await getRewardData();
        } catch (error) {
          setIsLoading(false);
          console.log(error);
          toast.error("Transaction error");
        }
      }
    } else {
      toast.error("Please check the wallet connection");
    }
  };

  React.useEffect(() => {
    if (active && account) {
      getRewardData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, account, pathname]);

  return (
    <>
      {isLoading && (
        <div className="load-container">
          <ReactLoading type="spinningBubbles" color="#fff" />
        </div>
      )}

      <div className="reward-container">
        <div className='arrow'></div>
        <div className="reward-header">
          <h1>Your Rewards</h1>
          <p>
            The rewards you have earned by being a valued community member of{" "}
            <span>{`<Bull Chicken>.`}</span>
          </p>
        </div>
        <div className="reward-content">
          {usdcCount > 0 && (
            <div className="reward-left">
              <h1>
                <span>{rewBalCount}</span> {rewBalSymbol}
              </h1>
              <p>Rewards earned</p>
              {/* <button>Claim</button> */}
            </div>
          )}
          <div className="reward-right">
            <p>Your USDC Balance</p>
            <h1>
              <span>{usdcCount}</span> {usdcSymbol}
            </h1>
            <div className="control">
              <input
                type="text"
                value={loadMoreValue}
                name="bullc"
                onChange={(e) => {
                  setLoadMoreValue(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  loadMore();
                }}
              >
                Load More
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reward;
