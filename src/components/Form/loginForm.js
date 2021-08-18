import React,{useRef, useState, useCallback, useEffect} from 'react';
import SignUpForm from './signUpForm';
import useForm from '../../hooks/useform';

import Input from '../../UI/Input';

import classes from './loginForm.module.css';


const LoginForm = () => {
  const [formIsValid, setFormIsValid] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  //inputs values
  const usernameRef = useRef();
  const passwordRef = useRef();

  //useForm custom hook
  const { 
    hasError: userHasError,
    errorHandler: userNameErrorHandler,
    blurHandler: userNameBlurHandler
  } = useForm(usernameRef);

  const {
    hasError: passwordHasError,
    errorHandler: passwordErrorHandler,
    blurHandler: passwordBlurHandler,
  } = useForm(passwordRef);

  //error message
  const userNameError = "Incorrect username";
  const passwordError = "Incorrect password";

  //Inputs
  const inputArray = [
    {
      type: "text",
      placeholder: "Username",
      label: { id: "uname", name: "Username" },
      ref: usernameRef,
      error: userHasError,
      errorMessage: userNameError,
      onBlur: userNameBlurHandler,
    },
    {
      type: "password",
      placeholder: "Password",
      label: { id: "password", name: "Password" },
      ref: passwordRef,
      error: passwordHasError,
      errorMessage: passwordError,
      onBlur: passwordBlurHandler,
    },
  ];

  
  useEffect(() => {
    const formHasError = userHasError &&
      passwordHasError &&
      userHasError !== "" &&
      passwordHasError !== "";
      setFormIsValid(formHasError);
  },[passwordHasError, userHasError])

  //Submit form
  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      userNameErrorHandler();
      passwordErrorHandler();
    },
    [userNameErrorHandler, passwordErrorHandler]
  );

  //mapping of inputs
  const inputArr = inputArray.map((input) => {
    return (
      <Input
        key={input.label.id}
        type={input.type}
        placeholder={input.placeholder}
        id={input.label.id}
        name={input.label.name}
        ref={input.ref}
        error={input.error}
        errorMessage={input.errorMessage}
        onBlur={input.onBlur}
      />
    );
  });

  const onCreateAccount = () => {
    setHasAccount(true);
  }

  const signUpMessage = (
    <p className={classes.signUp}>
      Don't have an account? <span onClick={onCreateAccount}>Sign Up</span>
    </p>
  );


  //JSX
  return (
    <React.Fragment>
      {!hasAccount && (
        <form onSubmit={onSubmitHandler} className={classes.Form}>
          {inputArr}
          <button className={classes.btn}>Login</button>
          {signUpMessage}
        </form>
      )}
      {hasAccount && <SignUpForm className={classes.Form} btnClass ={classes.btn}/>}
    </React.Fragment>
  );
};

export default LoginForm;