import { createContext, useContext, useState } from 'react';
const GlobalState = createContext();
export const GlobalStateProvider = ({ children }) => {
  const [pageLoading, setPageLoading] = useState(false);
  const updatePageLoading = (value) => {
    setPageLoading(value);
  }
  return (
    <GlobalState.Provider value={{ pageLoading, updatePageLoading }}>
      {children}
    </GlobalState.Provider>
  );
}
export const useGlobalState = () => {
  return useContext(GlobalState);
};