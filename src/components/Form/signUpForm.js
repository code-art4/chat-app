import React,{useRef, useEffect, useState} from 'react';
import Input from "../../UI/Input";
import useForm from "../../hooks/useForm";
//  CSS import 
import classes from './signUpForm.module.css';
//  IMAGE import
import Placeholder from '../../assets/images/Profile placeholder.jpg';






//
const SignUpForm = (props) => {
  const [user, setUser] = useState("");
  //  inputs values by using refs for profile picture, full name, password, username, date of birth, confirm Password, email Address
  const imageRef = useRef();
  const fullNameRef = useRef();
  const passwordRef = useRef();
  const userNameRef = useRef();
  const dateOfBirthRef = useRef();
  const confirmPasswordRef = useRef();
  const emailAddressRef = useRef();

  //  useForm custom hook and destructuring the custom hook to bring out the hasError, errorHandler function, blurHandler function, changeHandler function for the form
  const {
    hasError: imageHasError,
    errorHandler: imageErrorHandler,
    blurHandler: imageBlurHandler,
    changeHandler: imageChangeHandler,
  } = useForm(imageRef);

  const {
    hasError: emailAddressHasError,
    errorHandler: emailAddressErrorHandler,
    blurHandler: emailAddressBlurHandler,
    changeHandler: emailAddressChangeHandler,
  } = useForm(emailAddressRef);

  const {
    hasError: fullNameHasError,
    errorHandler: fullNameErrorHandler,
    blurHandler: fullNameBlurHandler,
    changeHandler: fullNameChangeHandler,
  } = useForm(fullNameRef);

  const {
    hasError: passwordHasError,
    errorHandler: passwordErrorHandler,
    blurHandler: passwordBlurHandler,
    changeHandler: passwordChangeHandler,
  } = useForm(passwordRef);

  const {
    hasError: userNameHasError,
    errorHandler: userNameErrorHandler,
    blurHandler: userNameBlurHandler,
    changeHandler: userNameChangeHandler,
  } = useForm(userNameRef);

  const {
    hasError: dateOfBirthHasError,
    errorHandler: dateOfBirthErrorHandler,
    blurHandler: dateOfBirthBlurHandler,
    changeHandler: dateOfBirthChangeHandler,
  } = useForm(dateOfBirthRef);

  const {
    hasError: confirmPasswordHasError,
    errorHandler: confirmPasswordErrorHandler,
    blurHandler: confirmPasswordBlurHandler,
    changeHandler: confirmPasswordChangeHandler,
  } = useForm(confirmPasswordRef);


  //  error messages for when hasError = true
  const imageErrorMessage =
    "Something is wrong with that image, Please try another!!";
  const passwordErrorMessage = "Incorrect password";
  const confirmPasswordErrorMessage = "Incorrect password";
  const fullNameErrorMessage = "Incorrect full Name";
  const dateOfBirthErrorMessage = "Incorrect date of birth";
  const userNameErrorMessage = "Incorrect username";
  const emailAddressErrorMessage = "Incorrect email";


  //  Input Array to fill in the custom component <Input/>
  const inputArray = [
    {
      type: "file",
      placeholder: "Full Name",
      label: {
        id: "image",
        name: (
          <figure className={classes.figure}>
            <img
              src={Placeholder}
              alt="Make your Profile"
              className={classes.image}
            ></img>
          </figure>
        ),
      },
      labelClasses: classes.label,
      ref: imageRef,
      error: imageHasError,
      onBlur: imageBlurHandler,
      errorMessage: imageErrorMessage,
      onChange: imageChangeHandler,
    },
    {
      type: "text",
      placeholder: "Full Name",
      label: { id: "fname", name: "Full name" },
      ref: fullNameRef,
      error: fullNameHasError,
      onBlur: fullNameBlurHandler,
      errorMessage: fullNameErrorMessage,
      onChange: fullNameChangeHandler,
    },
    {
      type: "text",
      placeholder: "Username",
      label: { id: "uname", name: "Username" },
      ref: userNameRef,
      error: userNameHasError,
      onBlur: userNameBlurHandler,
      errorMessage: userNameErrorMessage,
      onChange: userNameChangeHandler,
    },
    {
      type: "email",
      placeholder: "Enter Email",
      label: { id: "email", name: "Email Address" },
      ref: emailAddressRef,
      error: emailAddressHasError,
      onBlur: emailAddressBlurHandler,
      errorMessage: emailAddressErrorMessage,
      onChange: emailAddressChangeHandler,
    },
    {
      type: "date",
      placeholder: "",
      label: { id: "dob", name: "Date of Birth" },
      ref: dateOfBirthRef,
      error: dateOfBirthHasError,
      onBlur: dateOfBirthBlurHandler,
      errorMessage: dateOfBirthErrorMessage,
      onChange: dateOfBirthChangeHandler,
    },
    {
      type: "password",
      placeholder: "Password",
      label: { id: "password", name: "Password" },
      ref: passwordRef,
      error: passwordHasError,
      onBlur: passwordBlurHandler,
      errorMessage: passwordErrorMessage,
      onChange: passwordChangeHandler,
    },

    {
      type: "password",
      placeholder: "Confirm Password",
      label: { id: "confirmPassword", name: "Password" },
      ref: confirmPasswordRef,
      error: confirmPasswordHasError,
      onBlur: confirmPasswordBlurHandler,
      errorMessage: confirmPasswordErrorMessage,
      onChange: confirmPasswordChangeHandler,
    },
  ];

  //Checking to see if the email HasError
  useEffect(() => {
    console.log(emailAddressHasError);
  }, [emailAddressHasError]);

  //mapping of input Array into the custom component <Input/>
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
        labelClasses={input.labelClasses}
        onBlur={input.onBlur}
        onChange={input.onChange}
      />
    );
  });

  
  //fetch data
  const onFetch = async () => {
    const formValues =  {image: imageRef.current.value, fullName:fullNameRef.current.value, password: passwordRef.current.value, username: userNameRef.current.value, dateOfBirth: dateOfBirthRef.current.value, confirmPassword: confirmPasswordRef.current.value, emailAddress: emailAddressRef.current.value};
    const response = await fetch(
      "https://chat-app-ab30b-default-rtdb.firebaseio.com/user.json",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},        
        body: JSON.stringify(formValues) 
      }
    );

    const data = await response.json();
    console.log(data);
  };

  //Signing up in the website by creating account
  const onCreateAccount = (e) => {
    e.preventDefault();
    imageErrorHandler();
    fullNameErrorHandler();
    emailAddressErrorHandler();
    passwordErrorHandler();
    userNameErrorHandler();
    dateOfBirthErrorHandler();
    confirmPasswordErrorHandler();
    
    //Create Account in database
    onFetch();
    props.hasAccount();

    console.log(
      imageRef.current.value,
      fullNameRef.current.value,
      passwordRef.current.value,
      userNameRef.current.value,
      dateOfBirthRef.current.value,
      confirmPasswordRef.current.value,
      emailAddressRef.current.value
    );
  };

  //JSX files
  return (
    <form
      onSubmit={onCreateAccount}
      className={`${props.className} ${classes.SignUpForm} `}
    >
      <main>{inputArr}</main>
      <button className={`${props.btnClass}`}>Sign up</button>
    </form>
  );
}

export default SignUpForm;
