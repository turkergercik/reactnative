// RootNavigation.js

import { createNavigationContainerRef } from '@react-navigation/native';
import {useState,useEffect, useRef} from "react"
export const navigationRef = createNavigationContainerRef()
import { useAuthorization } from '../Authcontext';
import AsyncStorage from '@react-native-async-storage/async-storage';


export async function navigate(name, params) {
  //const {state,authContext,img,socket,server,remoteRTCMessage,seticall,icall,currentconv,setmessages,istoday,stat,setstat} = useAuthorization()

  let a 
  let x=0
 
     a = setInterval(()=>{
    
    if (navigationRef.isReady()) {
      navigationRef.navigate(name,params);
      
      clearInterval(a)
    
    }else{
      x+=1
      console.log(x)
    }
  },20)
    
  




  /* a = setInterval(()=>{
    
    if (navigationRef.isReady()) {
      navigationRef.navigate(name, params);
      console.log(x,"heyo")
      clearInterval(a)
    
    }else{
      x+=1
      console.log(x)
    }
  },20) */
  

}


// add other navigation functions that you need and export them