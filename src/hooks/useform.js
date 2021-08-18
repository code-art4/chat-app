import {useState, useCallback} from 'react';

const useForm = (input) => {
  const [hasError, setHasError] = useState("");


  
  //Error function
  const errorHandler = useCallback(() => {      
      if (input.current.value !== "") {
        setHasError(false);
      }else{
        setHasError(true);
      }
    },[input]);

    const blurHandler = () => {
        errorHandler();
    }

  return {
    hasError,
    errorHandler,
    blurHandler
  };
};

export default useForm;
