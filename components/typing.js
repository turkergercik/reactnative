
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const TypingEffect = ({ text }) => {
    
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(displayedText + text.charAt(index));
        setIndex(index + 1);
      }, 100); // Adjust the speed of typing here
      return () => clearTimeout(timeout);
    }
  }, [index, text, displayedText]);

  return <Text style={{
    flexShrink:1,
    fontSize: 20,
    fontWeight: '300',
    color: 'red',
    paddingRight: 0,
    paddingLeft: 3,
    marginBottom: 0, // Optional: Adjust spacing between chunks
  }}>{displayedText}</Text>;
};

export default TypingEffect 