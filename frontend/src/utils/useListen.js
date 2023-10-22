import { useMetamask } from "./useMetamask";

export const useListen = () => {
  const { dispatch } = useMetamask();

  return () => {
    window.ethereum.on("accountsChanged", async (newAccounts) => {
      if (newAccounts.length > 0) {
        const newBalance = await window.ethereum?.request({
          method: "eth_getBalance",
          params: [newAccounts[0], "latest"],
        });
        const newChainId = await window.ethereum?.request({
          method: "eth_chainId",
        });
        console.log(newChainId);
        dispatch({
          type: "connect",
          wallet: newAccounts[0],
          balance: newBalance,
          chianId: newChainId,
        });
      } else {
        dispatch({ type: "disconnect" });
      }
    });
  };
};
