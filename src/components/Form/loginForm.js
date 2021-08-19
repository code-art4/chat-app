import React,{useRef, useState, useCallback, useEffect, useContext} from 'react';
import SignUpForm from './signUpForm';
import useForm from '../../hooks/useForm';
import { logInContext } from '../../authContext/authContext';
import useFetch from '../../hooks/usefetch';

import Input from '../../UI/Input';

import classes from './loginForm.module.css';


const LoginForm = () => {

  let {logIn} = useContext(logInContext);
  
  const [formIsValid, setFormIsValid] = useState(false);
  const [hasAccount, setHasAccount] = useState(true);
  const [formErrorMessage, setformErrorMessage] = useState("");
  const [user, setUser] = useState("");

  //inputs values
  const usernameRef = useRef();
  const passwordRef = useRef();

  //useForm custom hook
  const { 
    hasError: userHasError,
    errorHandler: userNameErrorHandler,
    blurHandler: userNameBlurHandler,
    changeHandler: userChangeHandler
  } = useForm(usernameRef);

  const {
    hasError: passwordHasError,
    errorHandler: passwordErrorHandler,
    blurHandler: passwordBlurHandler,
    changeHandler: passwordChangeHandler,
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
      onChange: userChangeHandler,
    },
    {
      type: "password",
      placeholder: "Password",
      label: { id: "password", name: "Password" },
      ref: passwordRef,
      error: passwordHasError,
      errorMessage: passwordError,
      onBlur: passwordBlurHandler,
      onChange: passwordChangeHandler,
    },
  ];

  
  useEffect(() => {
    const formHasError = userHasError &&
      passwordHasError &&
      userHasError !== "" &&
      passwordHasError !== "";
      setFormIsValid(formHasError);
  },[passwordHasError, userHasError])
  



  //NOT WORKING
  //fetch data
  const onFetch = async() => {
    const response = await fetch(
      "https://chat-app-ab30b-default-rtdb.firebaseio.com/user.json"
    );

    const data = await response.json();
    
    const loadedUsers = [];
    for (const key in data) {
      loadedUsers.push({
        name: data[key].name,
        password: data[key].password
      })
    }
    if(loadedUsers.length > 0){      
      setUser(loadedUsers)
    }
  }
  
  useEffect(() => {
    onFetch();    
  },[])


















  //Submit form
  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      userNameErrorHandler();
      passwordErrorHandler();
      // if(user.userName === usernameRef && user.password === passwordRef){
      //     console.log("Correct");  
      // }
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
        onChange={input.onChange}
      />
    );
  });


  const onCreateAccount = () => {    
    setHasAccount(false);
  }

  

  //Make error on Invalid Input on Form Submit but didn't find user
  const onLogIn = () => {
    const username = usernameRef.current.value;
    user.map((elmt) => {
      return elmt.name === username && elmt.password === passwordRef.current.value && setHasAccount(true);
    })
  }
  
  useEffect(()=>{
    console.log(hasAccount);
  },[hasAccount])


  const signUpMessage = (
    <p className={classes.signUp}>
      Don't have an account? <span onClick={onCreateAccount}>Sign Up</span>
    </p>
  );


  //JSX
  return (
    <React.Fragment>
      {hasAccount && (
        <form onSubmit={onSubmitHandler} className={classes.Form}>
          {inputArr}
          <button className={classes.btn} onClick={onLogIn}>Login</button>
          {signUpMessage}
          {formIsValid && formErrorMessage}
        </form>
      )}
       {!hasAccount && <SignUpForm className={classes.Form} btnClass ={classes.btn}/>}
    </React.Fragment>
  );
};

export default LoginForm;