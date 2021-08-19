import {useState} from 'react';

const useFetch = () => {
    const [data, setData] = useState("");

  const onFetchData = async(url,method,value) => {
    const response = await fetch(url, {
      method: method !== undefined ? "POST" : "GET",
      body: method !== undefined ? JSON.stringify(value) : null,
      headers:
        method !== undefined ? { "Content-type": "application/json" } : {},
    });

    const responseData = await response.json();
    setData(responseData)
    
    return{
        response,
        data
    }
  }
  return{
      onFetchData
  }
};

export default useFetch;