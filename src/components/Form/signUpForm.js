import React,{useRef} from 'react';
import Input from "../../UI/Input";
import useForm from "../../hooks/useForm";

//CSS import 
import classes from './signUpForm.module.css';

//IMAGE import
import Placeholder from '../../assets/images/Profile placeholder.jpg';

const SignUpForm = (props) => {
  //inputs values
  const imageRef = useRef();
  const fullNameRef = useRef();
  const passwordRef = useRef();
  const userNameRef = useRef();
  const dateOfBirthRef = useRef();
  const confirmPasswordRef = useRef();

  //useForm custom hook
  const {
    hasError: imageHasError,
    errorHandler: imageErrorHandler,
    blurHandler: imageBlurHandler,
    changeHandler: imageChangeHandler
  } = useForm(imageRef);

  const {
    hasError: fullNameHasError,
    errorHandler: fullNameErrorHandler,
    blurHandler: fullNameBlurHandler,
    changeHandler: fullNameChangeHandler
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


  //error message
  const imageErrorMessage = "Something is wrong with that image, Please try another!!";
  const passwordErrorMessage = "Incorrect password";
  const confirmPasswordErrorMessage = "Incorrect password";
  const fullNameErrorMessage = "Incorrect full Name";
  const dateOfBirthErrorMessage = "Incorrect date of birth";
  const userNameErrorMessage = "Incorrect username";


  //Inputs
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
      onChange: imageChangeHandler
    },
    {
      type: "text",
      placeholder: "Full Name",
      label: { id: "fname", name: "Full name" },
      ref: fullNameRef,
      error: fullNameHasError,
      onBlur: fullNameBlurHandler,
      errorMessage: fullNameErrorMessage,
      onChange: fullNameChangeHandler
    },
    {
      type: "text",
      placeholder: "Username",
      label: { id: "uname", name: "Username" },
      ref: userNameRef,
      error: userNameHasError,
      onBlur: userNameBlurHandler,
      errorMessage: userNameErrorMessage,
      onChange: userNameChangeHandler
    },
    {
      type: "date",
      placeholder: "",
      label: { id: "dob", name: "Date of Birth" },
      ref: dateOfBirthRef,
      error: dateOfBirthHasError,
      onBlur: dateOfBirthBlurHandler,
      errorMessage: dateOfBirthErrorMessage,
      onChange: dateOfBirthChangeHandler
    },
    {
      type: "password",
      placeholder: "Password",
      label: { id: "password", name: "Password" },
      ref: passwordRef,
      error: passwordHasError,
      onBlur: passwordBlurHandler,
      errorMessage: passwordErrorMessage,
      onChange: passwordChangeHandler
    },
    {
      type: "password",
      placeholder: "Confirm Password",
      label: { id: "confirmPassword", name: "Password" },
      ref: confirmPasswordRef,
      error: confirmPasswordHasError,
      onBlur: confirmPasswordBlurHandler,
      errorMessage: confirmPasswordErrorMessage,
      onChange: confirmPasswordChangeHandler
    },
  ];

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
        labelClasses={input.labelClasses}
        onBlur={input.onBlur}
        onChange={input.onChange}
      />
    );
  });

  const onCreateAccount = (e) => {
    e.preventDefault();
    imageErrorHandler();
    fullNameErrorHandler();
    passwordErrorHandler();
    userNameErrorHandler();
    dateOfBirthErrorHandler();
    confirmPasswordErrorHandler();

    console.log(
      imageRef.current.value,
      fullNameRef.current.value,
      passwordRef.current.value,
      userNameRef.current.value,
      dateOfBirthRef.current.value,
      confirmPasswordRef.current.value
    );
  };

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
