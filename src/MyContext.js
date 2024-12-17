import React, { createContext, useContext } from "react";

// Step 1: Create the context (we set the default value to null)
const MyContext = createContext(null);

// Step 2: Create a provider component that will wrap your app or a part of your app
export function MyContextProvider({ children }) {
  // This is the value you want to share across your components
  const value = { basename: "/my-path" };  // You can change this value

  return (
    // This is the provider that makes the value available to all children
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
}

// Step 3: Create a custom hook to access the context easily
export function useMyContext() {
  return useContext(MyContext);
}
