import React from "react";

const initialState = {
  wallet: null,
  isMetamaskInstalled: false,
  status: "loading",
  balance: null,
  chainId: null,
};

function metamaskReducer(state, action) {
  switch (action.type) {
    case "connect": {
      const { wallet, balance, chainId } = action;
      const newState = { ...state, wallet, balance, chainId, status: "idle" };
      const info = JSON.stringify(newState);
      window.localStorage.setItem("metamaskState", info);
      console.log(newState);
      return newState;
    }
    case "disconnect": {
      window.localStorage.removeItem("metamaskState");
      return { ...state, wallet: null, balance: null, chainId: null };
    }
    case "pageLoaded": {
      const { isMetamaskInstalled, balance, wallet, chainId } = action;
      return {
        ...state,
        isMetamaskInstalled,
        status: "idle",
        wallet,
        balance,
        chainId,
      };
    }
    case "loading": {
      return { ...state, status: "loading" };
    }
    case "idle": {
      return { ...state, status: "idle" };
    }
    case "disconnect": {
      window.localStorage.removeItem("metamaskState");
      if (typeof window.ethereum !== undefined) {
        window.ethereum.removeAllListeners(["accountsChanged"]);
      }
      return { ...state, wallet: null, balance: null, chainId: null };
    }
    case "changeChain": {
      const { chainId } = action;
      const newState = { ...state, chainId, status: "idle" };
      const info = JSON.stringify(newState);
      window.localStorage.setItem("metamaskState", info);
      return newState;
    }
    default: {
      throw new Error("Unhandled action type");
    }
  }
}

const MetamaskContext = React.createContext(undefined);

function MetamaskProvider({ children }) {
  const [state, dispatch] = React.useReducer(metamaskReducer, initialState);
  const value = { state, dispatch };

  return (
    <MetamaskContext.Provider value={value}>
      {children}
    </MetamaskContext.Provider>
  );
}

function useMetamask() {
  const context = React.useContext(MetamaskContext);
  if (context === undefined) {
    throw new Error("useMetamask must be used within a MetamaskProvider");
  }
  return context;
}

export { MetamaskProvider, useMetamask };
