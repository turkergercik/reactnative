/**
 * @format
 */
import { NavigationContainer,useNavigationContainerRef } from '@react-navigation/native';
import {AppRegistry,PermissionsAndroid,AppState,Linking,Alert, View,Text,TouchableOpacity} from 'react-native';
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
import BackgroundFetch from "react-native-background-fetch";
//example
let x=false
let call=null
let id=null
let socket=null
let call1=false
let server ="http://192.168.1.106:3001"
//let server ="https://smartifier.onrender.com"
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
  all=[...all,newconv]
  await AsyncStorage.setItem("mpeop",JSON.stringify(all))
  
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
all=[...all,newconv]
await AsyncStorage.setItem("mpeop",JSON.stringify(all))

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
    RNCallKeep.backToForeground()
    //RNCallKeep.displayIncomingCall("123","1",`${remoteMessage.data.title} from v1`);
  setTimeout(() => {
    RNCallKeep.updateDisplay("123","1", "fegrgee")
  }, 1000);

  }






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


  
    if (isHeadless) {
      // App has been launched in the background by iOS, ignore
      return null;
    }
   
    return(
    <Auth setcalli={setcalli} calli={calli}>
      <App setfirst={setfirst} server={server} call={call} socket1={socket} />
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
let MyHeadlessTask = async (event) => {
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
}

// Register your BackgroundFetch HeadlessTask
BackgroundFetch.registerHeadlessTask(MyHeadlessTask);
AppRegistry.registerComponent(appName, () => HeadlessCheck );
/* AppRegistry.registerComponent('custom-component', () => CustomComponent); */
//AppRegistry.registerComponent(App, () => HeadlessCheck);
/* AppRegistry.registerHeadlessTask('RNCallKeepBackgroundMessage', () => ({ name, callUUID, handle }) => {
  // Make your call here
  RNCall()
  return Promise.resolve();
}); */