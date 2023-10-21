"use client";
import Link from "next/link";
import { useListen } from "@/utils/useListen";
import { useMetamask } from "@/utils/useMetamask";
import { useMoralis } from "react-moralis";
import { useEffect } from "react";

export default function Wallet() {
  const {
    enableWeb3,
    account,
    isWeb3Enabled,
    Moralis,
    deactivateWeb3,
    isWeb3EnableLoading,
    chainId,
  } = useMoralis();

  console.log(isWeb3Enabled);
  console.log(account, chainId);
  const {
    dispatch,
    state: { status, isMetamaskInstalled, wallet, balance },
  } = useMetamask();
  const listen = useListen();

  const showInstallMetamask =
    status !== "pageNotLoaded" && !isMetamaskInstalled;
  const showConnectButton =
    status !== "pageNotLoaded" && isMetamaskInstalled && !wallet;

  const isConnected = status !== "pageNotLoaded" && typeof wallet === "string";

  const handleConnect = async () => {
    dispatch({ type: "loading" });
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (accounts.length > 0) {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      });

      const ret = await enableWeb3();
      if (typeof ret !== "undefined") {
        dispatch({ type: "connect", wallet: accounts[0], balance });
      }

      listen();
    }
  };

  const handleDisconnect = () => {
    dispatch({ type: "disconnect" });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("metamaskState")) {
        enableWeb3();
      }
    }
  }, [isWeb3Enabled]);

  useEffect(() => {
    Moralis.onAccountChanged((newAccount) => {
      if (newAccount == null) {
        window.localStorage.removeItem("metamaskState");
        deactivateWeb3();
      }
    });
  }, []);

  return (
    <div>
      <div>
        {wallet && balance && (
          <div className="wallet-details">
            <h3>
              Address:{" "}
              <span>
                {wallet.slice(0, 4)}....{wallet.slice(-4)}
              </span>
            </h3>
            <p>
              Balance:{" "}
              <span>
                {(parseInt(balance) / 1000000000000000000).toFixed(4)} ETH
              </span>
            </p>
          </div>
        )}

        {showConnectButton && (
          <button onClick={handleConnect} className="wallet-btn">
            {status === "loading" ? (
              <div className="spin-wrapper">
                <div className="spin"></div>
              </div>
            ) : (
              "Connect Wallet"
            )}
          </button>
        )}

        {showInstallMetamask && (
          <Link
            className="install-link"
            href="https://metamask.io/"
            target="_blank"
          >
            Install Metamask
          </Link>
        )}

        {isConnected && (
          <button onClick={handleDisconnect} className="wallet-btn">
            Disconnect
          </button>
        )}
      </div>
    </div>
  );
}
