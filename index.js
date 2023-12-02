/**
 * @format
 */
import { NavigationContainer,useNavigationContainerRef } from '@react-navigation/native';
import {AppRegistry,PermissionsAndroid,AppState,Linking,Alert, View,Text,TouchableOpacity,NativeModules} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidColor,AndroidCategory, AndroidFlags, AndroidImportance,AndroidStyle, AndroidVisibility,EventType } from '@notifee/react-native';
import RNCallKeep from 'react-native-callkeep';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useState,useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as RootNavigation from "./navigators/rootnavigator"
import { io } from 'socket.io-client';
import { Auth } from './Authcontext';
import { useAuthorization } from './Authcontext';
import RNExitApp from 'react-native-exit-app';
import { useNetInfo,fetch } from "@react-native-community/netinfo";
import axios from 'axios';
import ShortUniqueId from 'short-unique-id';

const {pause}=NativeModules
//example
let x=false
let call=null
let id=null
let socket=null
let call1=null
//let server ="http://192.168.1.108:3001"
const d =new ShortUniqueId({length:10})
let server ="https://smartifier.onrender.com"
//const {state,authContext,img,remoteRTCMessage,seticall,icall,currentconv,setmessages,istoday,stat,setstat} = useAuthorization()

async function bootstrap() {
  const initialNotification = await notifee.getInitialNotification();

  if (initialNotification) {
    //setmesnotif(true)
    
  
  }
}




RNCallKeep.addEventListener('answerCall', async({ callUUID }) => {
  x=true
  RNCallKeep.removeEventListener("endCall")
  RNCallKeep.removeEventListener("answerCall")
  console.log("rtrtrtrt")
  RNCallKeep.backToForeground()
  RNCallKeep.endAllCalls()
  //Linking.openURL(`mychat://Video/?otherid=${call.callerId}&&call=notification&&info=call`)
  setTimeout(async() => {

  await  AsyncStorage.getItem("userToken").then(()=>{

    x=false
    RootNavigation.navigate("Video",{otherid:call.callerId,call:"notification",info:call})
  })

//RootNavigation.navigate("Chatview",{screen:"Video",params:{otherid:call.callerId,call:"notification"}})

  }, 0);
});
RNCallKeep.addEventListener('endCall', async()=>{
  if(x===false){
    let id= await AsyncStorage.getItem("id")
    socket=io(server)
    socket.emit("no",id)
    socket.emit("endCall",call.callerId)
    socket.on("endCall",()=>{
      socket.close()
      socket=null
      
    })
  } 
  
    console.log("merhaba")
  });
bootstrap()
let nav
let messages=[]
notifee.onForegroundEvent(async({ type, detail }) => {
  if(type===EventType.PRESS){
    console.log("ok")
  
    const Url_C = "my://app/c";
    Linking.openURL(Url_C)
      
   
      nav="6373375a8f3d293cc082f78f"
      //RootNavigation.navigate("Chatid",{id:"6373375a8f3d293cc082f78f"})
  

  }
  if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'reply') {
    console.log("12")
    const channelId = await notifee.createChannel({
      id: 'privatemessage',
      name: 'privatemessage',
 importance:AndroidImportance.HIGH
    });
    messages=[...messages,{
      text:detail.input,
      timestamp:Date.now()
    }]
    await notifee.displayNotification({
        id:"2",
       /*  title: 'Notification Title',
        body: 'Main body content of the notification', */
        
        android: {
          
            onlyAlertOnce:true,
            actions :[ {
                title: 'reply',
                icon: 'https://my-cdn.com/icons/snooze.png',
                pressAction: {
                  id: 'reply',
                }
            
            ,input:true,
            },
          
            ],
           channelId,
           style: {
            type: AndroidStyle.MESSAGING,
             person: {
              name: 'John Doe',
              icon: 'https://my-cdn.com/avatars/123.png',
            }, 
             messages: [
...messages
             
            ] 
        
        
        },
           
          // pressAction is needed if you want the notification to open the app when pressed
          pressAction: {
            id: 'default',
          },
        },
      })
    //await notifee.cancelNotification(detail.notification.id);

}
});

notifee.onBackgroundEvent(async ({ type, detail }) => {
  
  const channelId = await notifee.createChannel({
    id: 'private',
    name: 'private',
importance:AndroidImportance.HIGH,
visibility:AndroidVisibility.PUBLIC,
  });
  
//console.log('Message handled in the background!', remoteMessage)
    if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'reply') {
        //console.log([...detail.notification.android.style.messages])
        messages=[...messages,{text:detail.input,
        timestamp:Date.now()
        },
        ]
        
console.log("kı")
       /* await notifee.displayNotification({
        id:"1",
         title:"h",
         body:"r",
        android: {
          color:AndroidColor.RED,
            onlyAlertOnce:true,
            actions :[ {
                title: 'reply',
                icon: 'https://i.nefisyemektarifleri.com/2021/02/11/yumusacik-red-velvet-pasta-11.jpg',
                pressAction: {
                  id: 'reply',
                },input: {
                  editableChoices:true,
              allowFreeFormInput: true, // set to false
              choices: ['Yes','No' ,'Maybe'],
              placeholder: 'Reply to Sarah...',
            },}
          
            ],
           channelId,
           style: {
            group:true,
            type: AndroidStyle.MESSAGING,
            person: {
              name: 'John Doe',
              icon: 'https://my-cdn.com/avatars/123.png',
            }, messages: [
                ...detail.notification.android.style.messages,{
                  text:detail.input,
                  timestamp:Date.now(),
                }
              ],
        
        
        },
           
          // pressAction is needed if you want the notification to open the app when pressed
          pressAction: {
            id: 'default',
          },
        },
      })  */
       //await notifee.cancelNotification(detail.notification.id);

    }else if(type===EventType.PRESS){
      console.log("pp")
    }
  });
  messaging().onMessage(async remoteMessage => {
    console.log(78,2)
    if(remoteMessage.data.title==="newconversation"){
      let all1=await AsyncStorage.getItem("mpeop")
      if(all1){
        let all=JSON.parse(all1)
        let newconv =JSON.parse(remoteMessage.data.conversation)
        let check = await AsyncStorage.getItem(newconv._id)
        let message =JSON.parse(remoteMessage.data.message)
        if(check){
        
        }else{
          all=[...all,newconv]
          let day = {date:new Date(Date.now()).toLocaleDateString("tr-TR",{day:"2-digit",month:"long",year:"numeric"}),type:"day",_id:d()}
        
          await AsyncStorage.setItem("mpeop",JSON.stringify(all))
          await AsyncStorage.setItem(newconv._id,JSON.stringify([message,day]))
        
        }
        
            }
  
    }else if(remoteMessage.data.title==="updateconversation"){
      let all1=await AsyncStorage.getItem("mpeop")
      if(all1){
  let all=JSON.parse(all1)
  console.log(all,777)
  let i
  all.forEach((c,index)=>{
    if(c._id===remoteMessage.data.conversationid){
      i=index
    }
  })
  if(remoteMessage.data.sender!==undefined){
    all[i].sender.delete=remoteMessage.data.sender
  }else if(remoteMessage.data.receiver!==undefined){
    all[i].receiver.delete=remoteMessage.data.receiver
  }
  await AsyncStorage.setItem("mpeop",JSON.stringify(all))
  
      }
  
    }else if(remoteMessage.data.title==="deleteconversation"){
      let all1=await AsyncStorage.getItem("mpeop")
      if(all1){
  let all=JSON.parse(all1)
  console.log(all,777)
  let i
  all.forEach((c,index)=>{
    if(c._id===remoteMessage.data.conversationid){
      i=index
    }
  })
  all.splice(i,1)
  await AsyncStorage.setItem("mpeop",JSON.stringify(all))
  
    }
  }else if(remoteMessage.data.title==="endCall"){
    //call1=false
    pause.pause()
  }
 
    console.log("kıkı")
    messages=[...messages,remoteMessage.data.body]
    /* messages =[...messages,{
    text: remoteMessage.data.body,
    timestamp: Date.now(), // Now
    person: {
      name: remoteMessage.data.title,
      icon: 'https://i.nefisyemektarifleri.com/2021/02/11/yumusacik-red-velvet-pasta-11.jpg',
    },
  },] */
  const channelId = await notifee.createChannel({
      id: 'privatemessage',
      name: 'privatemessage',
 importance:AndroidImportance.HIGH
    });
    
  //console.log('Message handled in the background!', remoteMessage)
});





messaging().setBackgroundMessageHandler(async remoteMessage => {
   id= await AsyncStorage.getItem("id")
  //RNCallKeep.backToForeground()
  //Linking.openURL("mychat://")
  console.log(78,1)
  if(remoteMessage.data.title==="newconversation"){
    let all1=await AsyncStorage.getItem("mpeop")
    if(all1){
let all=JSON.parse(all1)
let newconv =JSON.parse(remoteMessage.data.conversation)
let check = await AsyncStorage.getItem(newconv._id)
let message =JSON.parse(remoteMessage.data.message)
if(check){

}else{
  all=[...all,newconv]
  let day = {date:new Date(Date.now()).toLocaleDateString("tr-TR",{day:"2-digit",month:"long",year:"numeric"}),type:"day",_id:d()}

  await AsyncStorage.setItem("mpeop",JSON.stringify(all))
  await AsyncStorage.setItem(newconv._id,JSON.stringify([message,day]))

}

    }

  }else if(remoteMessage.data.title==="updateconversation"){
    let all1=await AsyncStorage.getItem("mpeop")
    if(all1){
let all=JSON.parse(all1)
console.log(all,777)
let i
all.forEach((c,index)=>{
  if(c._id===remoteMessage.data.conversationid){
    i=index
  }
})
if(remoteMessage.data.sender!==undefined){
  all[i].sender.delete=remoteMessage.data.sender
}else if(remoteMessage.data.receiver!==undefined){
  all[i].receiver.delete=remoteMessage.data.receiver
}
await AsyncStorage.setItem("mpeop",JSON.stringify(all))

    }

  }else if(remoteMessage.data.title==="deleteconversation"){
    let all1=await AsyncStorage.getItem("mpeop")
    if(all1){
let all=JSON.parse(all1)
console.log(all,777)
let i
all.forEach((c,index)=>{
  if(c._id===remoteMessage.data.conversationid){
    i=index
  }
})
all.splice(i,1)
await AsyncStorage.setItem("mpeop",JSON.stringify(all))

  }
}else if(remoteMessage.data.sdp!==undefined && remoteMessage.data.callerId!==undefined){
  call= {sdp:JSON.parse(remoteMessage.data.sdp),callerId:remoteMessage.data.callerId,callerName:remoteMessage.data.title,type:"notification"}
  i= remoteMessage
  if(call.callerId){
   /*  let id= await AsyncStorage.getItem("id")
    socket=io(server)
    socket.emit("no",id)
    socket.on("endCall",()=>{
      console.log("arama kapandı")
      call1=false
    }) */
    RNCallKeep.registerAndroidEvents();
    RNCallKeep.setAvailable(true);
    //RNCallKeep.answerIncomingCall()
    //RootNavigation.navigate("Chat")
    //startApp()
    call1=true
    pause.play()
    //Linking.openURL("mychat://")
    //RNCallKeep.backToForeground()
    //RNCallKeep.displayIncomingCall("123","1",`${remoteMessage.data.title} from v1`);
  setTimeout(() => {
    RNCallKeep.updateDisplay("123","1", "fegrgee")
  }, 1000);

  }






}else if(remoteMessage.data.title==="endCall"){
  //call1=false
  pause.pause()
}
  
 
 
  


  
   messages =[...messages,{
      text: remoteMessage.data.body,
      timestamp: Date.now(), // Now
      person: {
        name: remoteMessage.data.title,
        icon: 'https://i.nefisyemektarifleri.com/2021/02/11/yumusacik-red-velvet-pasta-11.jpg',
      },
    },]
    const channelId = await notifee.createChannel({
        id: 'privatemessage',
        name: 'privatemessage',
   importance:AndroidImportance.HIGH
      });

      /* notifee.displayNotification({
        body: 'Full-screen notification',
        android: {
          channelId,
          // Recommended to set a category
          category: AndroidCategory.CALL,
          // Recommended to set importance to high
          importance: AndroidImportance.HIGH,
          fullScreenAction: {
            id: 'default',
            mainComponent: 'custom-component',
          },
        },
      }); */

      /* await notifee.displayNotification({
        id:"1",
        title:"hello",
        body:"hell no",
        android: {
          color:AndroidColor.RED,
            onlyAlertOnce:true,
            actions :[ {
                title: 'reply',
                icon: 'https://my-cdn.com/icons/snooze.png',
                pressAction: {
                  id: 'reply',
                },input: {
              allowFreeFormInput: true, // set to false
              editableChoices:true,
              choices: ['Yes','No' ,'Maybe'],
              placeholder: 'Reply to Sarah...',
            },}
          
            ],
           channelId,
           style: {
            group:true,
            type: AndroidStyle.MESSAGING,
            person: {
              name: 'John Doe',
              icon: 'https://my-cdn.com/avatars/123.png',
            }, messages: [
                ...messages
              ],
        
        
        },
           
          // pressAction is needed if you want the notification to open the app when pressed
          pressAction: {
            id: 'default',
            launchActivity: "default"
          },
        },
      }) */
     
    //console.log('Message handled in the background!', remoteMessage)
  });
  function HeadlessCheck({isHeadless}) {
    
  const [first, setfirst] = useState()
  const [calli, setcalli] = useState(call1)
//call=null
call1=false
    if (isHeadless) {
      // App has been launched in the background by iOS, ignore
      return null;
    }
   
    return(
    <Auth setcalli={setcalli} calli={calli}>
<GestureHandlerRootView style={{flex:1}}>
      <App setfirst={setfirst} server={server} call={call} socket1={socket} />
      </GestureHandlerRootView>
      </Auth>

    )
    
  }
//HeadlessCheck()
/* function CustomComponent() {
  return (
    <View style={{flex:1,justifyContent:"center",
    alignItems:"center",backgrounColor:"red"}}>
      <Text>A custom component</Text>
    </View>
  );
} */
/* let MyHeadlessTask = async (event) => {
  // Get task id from event {}:
  let taskId = event.taskId;
  let isTimeout = event.timeout;  // <-- true when your background-time has expired.
  if (isTimeout) {
    // This task has exceeded its allowed running-time.
    // You must stop what you're doing immediately finish(taskId)
    console.log('[BackgroundFetch] Headless TIMEOUT:', taskId);
    BackgroundFetch.finish(taskId);
    return;
  }
  console.log('[BackgroundFetch HeadlessTask] start: ', taskId);

  // Perform an example HTTP request.
  // Important:  await asychronous tasks when using HeadlessJS.
  let response = await fetch('https://reactnative.dev/movies.json');
  let responseJson = await response.json();
  console.log('[BackgroundFetch HeadlessTask] response: ', responseJson);

  // Required:  Signal to native code that your task is complete.
  // If you don't do this, your app could be terminated and/or assigned
  // battery-blame for consuming too much time in background.
  BackgroundFetch.finish(taskId);
} */
const Backtest = async(w)=>{
  
if(w.first===true){
  let id= await AsyncStorage.getItem("id")
  if(id){
    await axios.get(`${server}/suspended/${userId}`).then(async(e)=>{
      if(e.data.data!==null){
        let nes=null
        //await AsyncStorage.removeItem("suspended")
        //await AsyncStorage.removeItem("1D27wrPxSR")
        let sss= await AsyncStorage.getItem("suspended")
        let ss = JSON.parse(sss)
        if(ss.length!==0){
          console.log(e.data.data.messages)
          nes=[...e.data.data.messages,...ss]
          console.log(nes,78)
      
        }else{
       
          nes=e.data.data.messages
        }
         let suspended = await AsyncStorage.setItem("suspended",JSON.stringify(nes))
    
       }
})


let sus = await AsyncStorage.getItem("suspended")
    let sus1= JSON.parse(sus)
    if(sus1.length!==0){
     
     let saves=[...sus1]
     const arr = [...sus1];
     for (const e of arr) {
      try {
    console.log(e,24)
         let day = {date:new Date(Date.now()).toLocaleDateString("tr-TR",{day:"2-digit",month:"long",year:"numeric"}),type:"day",_id:d()}

        let conversation = await AsyncStorage.getItem(e.conversationid)
        if(conversation){
         let all= JSON.parse(conversation)
         const b= all.find((e)=>{
          if( e.type!==undefined){
            return e
          }
        })
      
      if(b?.date === day.date){
       
        all=[e,...all]

      }else{
       
        all=[day,e,...all]

      }
        
         console.log(all,20)
         await AsyncStorage.setItem(e.conversationid,JSON.stringify(all))
    
         saves.splice(0,1)
    
         await AsyncStorage.setItem("suspended",JSON.stringify(saves))
       
        }else{
          saves.splice(0,1)
          console.log(25)
         let news= [e,day]
         await AsyncStorage.setItem(e.conversationid,JSON.stringify(news))
         
        }
      } catch (error) {
        console.log(error)
      }
      
     }
    }
  }
  
  const channelId = await notifee.createChannel({
    id: 'privatemessage',
    name: 'privatemessage',
importance:AndroidImportance.HIGH
  });

 /*  notifee.displayNotification({
    body: 'Mesajlar Eşitleniyor.',
    android: {
      channelId,
      // Recommended to set a category
      category: AndroidCategory.CALL,
      // Recommended to set importance to high
      importance: AndroidImportance.HIGH,
      fullScreenAction: {
        id: 'default',
        mainComponent: 'custom-component',
      },
    },
  }); */
}
  fetch().then(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
  });
 

}
// Register your BackgroundFetch HeadlessTask
AppRegistry.registerHeadlessTask("SomeTaskName",()=>Backtest)
AppRegistry.registerComponent(appName, () => HeadlessCheck );
/* AppRegistry.registerComponent('custom-component', () => CustomComponent); */
//AppRegistry.registerComponent(App, () => HeadlessCheck);
/* AppRegistry.registerHeadlessTask('RNCallKeepBackgroundMessage', () => ({ name, callUUID, handle }) => {
  // Make your call here
  RNCall()
  return Promise.resolve();
}); */