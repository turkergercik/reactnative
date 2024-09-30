import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';


const TypingText = ({ message,onLastMessageTyped,style}) => {
  const [typedMessage, setTypedMessage] = useState('');
  const [index, setindex] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      if (index < message.length) {
        setTypedMessage(prevTypedMessage => prevTypedMessage + message[index]);
        setindex(index+1)
      } else {
        clearInterval(interval);
        if (index === message.length) {
          onLastMessageTyped(); // Notify parent when the last message is typed
        }
      }
    }, 0);

    return () => clearInterval(interval);
  }, [message,index,onLastMessageTyped]);



  return (

      <Text style={style}>{typedMessage}</Text>

  );
};

export default TypingText;
