import React from 'react';

const value = { logIn: localStorage.getItem("isLoggedIn")};

const logInContext = React.createContext(value);

export const AuthContextProvider = (props) => {
  return <logInContext.Provider value={value}>{props.children}</logInContext.Provider>;
};

export default logInContext;
