import React,{useRef, useState, useCallback, useEffect} from 'react';
import SignUpForm from './signUpForm';
import useForm from '../../hooks/useForm';

import Input from '../../UI/Input';

import classes from './loginForm.module.css';


const LoginForm = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [hasAccount, setHasAccount] = useState(true);
  const [formErrorMessage, setformErrorMessage] = useState("");
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formHasError, setFormHasError] = useState(false);

  //We are assuming the user is online
  const [isOnline, setIsOnline] = useState(true);

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
  

  //fetch data
  const onFetch = useCallback(async() => {
    if(usernameRef.current.value !== "" && passwordRef.current.value !== ""){
      const response = await fetch(
      "https://chat-app-ab30b-default-rtdb.firebaseio.com/user.json"
    ).catch(setIsOnline(false));

    const data = await response.json();

    
    const loadedUsers = [];
    for (const key in data) {
      loadedUsers.push({
        name: data[key].username,
        password: data[key].password
      })
    }


    if(loadedUsers.length > 0){      
      setUser(loadedUsers);
      setIsOnline(true);
    }
    }
  }, [])
  

  //Submit form
  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      userNameErrorHandler();
      passwordErrorHandler();
      onFetch();
      // if(user.userName === usernameRef && user.password === passwordRef){
      //     console.log("Correct");  
      // }
    },
    [userNameErrorHandler, passwordErrorHandler, onFetch]
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
    setFormHasError(false);
  }

  

  //Make error on Invalid Input on Form Submit but didn't find user
  const onLogIn = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    onFetch();    
      
    //loop through each user
    for (let i = 0; i < user.length; i++) {
     if(user[i].name === username && 
        user[i].password === password
      ) {
       setHasAccount(true); 
       setIsLoggedIn(true);       
       setformErrorMessage("");
     }

     if (
       user[i].name !== username &&
       user[i].password !== passwordRef.current.value
     ) {
       setIsLoggedIn(false);
       setFormHasError(true);
       setformErrorMessage("Invalid username or password");
     }
    }
  }

  const signUpMessage = (
    <p className={classes.signUp}>
      Don't have an account? <span onClick={onCreateAccount}>Sign Up</span>
    </p>
  );


  //for Signup form
  const madeAccount = () => {
    setHasAccount(true);
    setIsLoggedIn(true);
  }


  //When login save login details to the browser
  useEffect(()=>{
    if(isLoggedIn){
      localStorage.setItem("isLoggedIn", "true");
    }
  },[isLoggedIn])

  useEffect(()=>{
    const savedIsLoggedVal = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(savedIsLoggedVal);
  },[])

  //JSX
  return (
    <React.Fragment>
      {hasAccount && !isLoggedIn && (
        <form onSubmit={onSubmitHandler} className={classes.Form}>
          {inputArr}
          <button className={classes.btn} onClick={onLogIn}>
            Login
          </button>
          {!isLoggedIn && formHasError && (
            <p className={classes.errorMessage}>{formErrorMessage}</p>
          )}
          {!isOnline && <p className={classes.errorMessage}>No internet connection, please try again</p>}
          {signUpMessage}
          {formIsValid && formErrorMessage}
        </form>
      )}


      {hasAccount && isLoggedIn && isOnline && <h2>You have been logged in</h2>}

      {!hasAccount && !isLoggedIn && !formHasError && (
        <SignUpForm
          className={classes.Form}
          btnClass={classes.btn}
          hasAccount={madeAccount}
        />
      )}
    </React.Fragment>
  );
};

export default LoginForm;