import React,{useContext, useRef, useState, useEffect} from 'react';
import AuthContext from '../../authContext/authContext';
import classes from './chatForum.module.css';
import useForm from '../../hooks/useForm';

const ChatForum = () => {
    const messageRef = useRef();
    const ctx = useContext(AuthContext);

    const [messageVal, setMessageVal] = useState([]);
    const [HasSentMessage, setHasSentMessage] = useState("");

    // const { hasError:messageError} = useForm(messageRef);    

    // const messageClasses = messageError && `${classes.error}`;

    const onSendHandler = () => {
        const message = [];

        if(messageRef.current.value){
        message.push(
            messageRef.current.value
        )
        setMessageVal((prevState) => [...prevState, messageRef.current.value]);
        }
    }

    //To load chat when text is sent
    useEffect(() => {
        if(messageVal){
            setHasSentMessage(true);
            
            console.log(messageVal);
        }else{
            setHasSentMessage(false);
        }
    },[messageVal])


    const messages = messageVal.map(elmt => {
        return (
          <React.Fragment>
            {HasSentMessage && (
              <p className={classes.newMessage}>{elmt}</p>
            )}
          </React.Fragment>
        );
    })

    return (
      <div>
        {ctx && (
          <React.Fragment>
            <form
              className={classes.Message}
              onSubmit={(e) => e.preventDefault()}
            >
              <textarea
                name=""
                id=""
                placeholder="Enter message"
                ref={messageRef}
              ></textarea>
              <button onClick={onSendHandler} className={classes.btn}>Send</button>
            </form>
            <div className={classes.chats}>
              {messages}
            </div>
          </React.Fragment>
        )}
      </div>
    );
}

export default ChatForum;
