import * as React from "react";
import { SiDiscord, SiInstagram, SiTwitter } from "react-icons/si";
//--------- web3----------
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
  WalletConnectConnector,
  URI_AVAILABLE,
} from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { changeNetwork } from "../utils/helper";
import { DefaultNetwork, RinkebyRPCURL } from "../constant";
// import { formatEther } from '@ethersproject/units';
//---------end------------
import logo from "../asserts/logo.png";
import "./styles/header.scss";
import useWindowDimensions from "../utils/helper";
import { UserContext } from "../App";

const Button = ({ onPress, label, disabled }) => {
  return (
    <button
      className={`common-button ${
        disabled ? "disabled-button" : "active-button"
      }`}
      onClick={onPress}
    >
      {label}
    </button>
  );
};

const injectedConnector = new InjectedConnector({
  supportedChainIds: [DefaultNetwork],
});

const WalletConnect = new WalletConnectConnector({
  rpc: { 4: RinkebyRPCURL },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: 12000,
});

const Header = () => {
  const value = React.useContext(UserContext);
  const windowDimensions = useWindowDimensions();
  const { error, account, activate, active, deactivate } = useWeb3React();
  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError;

  const [isWalletModalOpen, setIsWalletModalOpen] = React.useState(false);
  const [wrongNetwork, setWrongNetwork] = React.useState(false);
  const { width } = windowDimensions;
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  const [scrollPosition, setScrollPosition] = React.useState(0);
  // const [isMobileScreen, setIsMobileScreen] = React.useState(false);

  const handleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const handleWalletModal = () => {
    setIsWalletModalOpen(true);
  };

  const disconnectWallet = () => {
    deactivate();
  };

  const handleMetaMaskOpen = async () => {
    try {
      await activate(injectedConnector);
      setIsWalletModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleWalletConnect = async () => {
    try {
      await activate(WalletConnect);
      setIsWalletModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    setWrongNetwork(isUnsupportedChainIdError);
  }, [isUnsupportedChainIdError]);

  React.useEffect(() => {
    if (width > 851) {
      injectedConnector
        .isAuthorized()
        .then((isAuthorized) => {
          if (isAuthorized && !active && !error) {
            activate(injectedConnector);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // activate(WalletConnect);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activate, error]);

  React.useEffect(() => {
    if (wrongNetwork) changeNetwork();
  }, [wrongNetwork]);

  React.useEffect(() => {
    if (width > 767) {
      setIsOpenMenu(true);
      // setIsMobileScreen(false)
    } else {
      setIsOpenMenu(false);
      // setIsMobileScreen(true)
    }
  }, [width]);

  React.useEffect(() => {
    // if (width < 851) {
    //     scrollPosition > 1 && setIsOpenMenu(false)
    // }
  }, [scrollPosition, width]);

  React.useEffect(() => {
    const logURI = (uri) => {
      console.log("WalletConnect URI", uri);
    };

    WalletConnect.on(URI_AVAILABLE, logURI);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      WalletConnect.off(URI_AVAILABLE, logURI);
    };
  }, []);

  return (
    <header style={{ backgroundColor: value.collection.foreground }}>
      <div className="container App-header">
        {/* <div className='logo-container'>
                <img src={logo} alt="rayze-logo" />
            </div> */}
        <div className={`mobile-nav-bar`}>
          {isOpenMenu && (
            <>
              <div className="header-menu">
                <a href="/">Home</a>
                <a href="#roadmap">Roadmap</a>
                <a href="#faq">FAQ</a>
              </div>
              <div className="header-icons">
                <SiInstagram name="instagram" size={30} />
                <SiTwitter name="twitter" size={30} />
                <SiDiscord name="discord" size={30} />
              </div>
              {
                !active ? (
                  <Button
                    label={"Connect Wallet"}
                    onPress={handleWalletModal}
                  />
                ) : (
                  <Button
                    label={account ? `Disconnect` : ""}
                    onPress={disconnectWallet}
                  />
                )
                // <Button label={account ? `0x${shortAddress(account)}` : ''} onPress={null} />
              }
            </>
          )}
        </div>
        <div
          className="mobile-handler"
          onClick={() => {
            handleMenu();
          }}
        >
          {!isOpenMenu ? (
            <span className={`menu-trigger`} />
          ) : (
            <span className={`menu-trigger-close`} />
          )}
        </div>
        {isWalletModalOpen && (
          <div className="wallet-select-modal">
            <div
              className="wallet-connect-modal-overlay"
              onClick={() => {
                setIsWalletModalOpen(false);
              }}
            />
            <div className="wallet-container">
              <h1>Select a wallet</h1>
              <h2>Select a wallet to connect to Rayze</h2>
              <div className="buttons">
                <div
                  className="wallet-buttons"
                  onClick={() => {
                    handleMetaMaskOpen();
                  }}
                >
                  <img src="/images/metamask.svg" alt="metamask" />
                  <p>Metamask</p>
                </div>

                <div
                  className="wallet-buttons"
                  onClick={() => {
                    handleWalletConnect();
                  }}
                >
                  <img src="/images/coinbase.svg" alt="walletconnect" />
                  <p>Coinbase Wallet</p>
                </div>

                <div
                  className="wallet-buttons"
                  onClick={() => {
                    handleWalletConnect();
                  }}
                >
                  <img src="/images/walletConnect.png" alt="walletconnect" />
                  <p>Connect Wallet</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
