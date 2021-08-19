import React from 'react';

const value = { logIn: false};


export const logInContext = React.createContext(value);

export const AuthContextProvider = (props) => {
  return <logInContext.Provider value={value}>{props.children}</logInContext.Provider>;
};