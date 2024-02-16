/**
 * @format
 */
import { NavigationContainer,useNavigationContainerRef } from '@react-navigation/native';
import {AppRegistry,PermissionsAndroid,AppState,Linking,Alert, View,Text,TouchableOpacity,NativeModules} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidLaunchActivityFlag,AndroidColor,AndroidCategory, AndroidFlags, AndroidImportance,AndroidStyle, AndroidVisibility,EventType } from '@notifee/react-native';
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
import { PaperProvider } from 'react-native-paper';
import { storage } from './Authcontext';
import PushNotification from "react-native-push-notification";
import { Notifications } from 'react-native-notifications';
import RNFetchBlob from 'rn-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import Callvideoscreen from './screens/callvideoscreen';
import Callaudioscreen from './screens/callaudioscreen';
import CustomVideocall from './screens/customvideocall';
import CustomAudiocall from './screens/customaudiocall';
import { Provider } from 'react-redux';
import store from './redux/store';
const {pause}=NativeModules

//example
let x=false
let call=null
let id=null
let socket=null
let call1=null
let callnotif=null
//let server ="http://192.168.104:3001"
let server ="https://smartifier.onrender.com"
const d =new ShortUniqueId({length:10})
//const {state,authContext,img,remoteRTCMessage,seticall,icall,currentconv,setmessages,istoday,stat,setstat} = useAuthorization()

async function bootstrap() {
  const initialNotification = await notifee.getInitialNotification();

  if (initialNotification) {
    //setmesnotif(true)
    
  
  }
}




/* RNCallKeep.addEventListener('answerCall', async({ callUUID }) => {
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
  }); */
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
let mess=[]
notifee.onBackgroundEvent(async ({ type, detail }) => {
  
  
  
//console.log('Message handled in the background!', remoteMessage)
    if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'reply') {
        //console.log([...detail.notification.android.style.messages])
        console.log(detail.notification.data)
        mess=[...mess,{text:detail.input,person:{
          name:"me",
          
        },
        timestamp:Date.now(),
        }, 
        ]
        
        await notifee.displayNotification({
          id:detail.notification.id,
          body:detail.input,
          title: detail.input,
          
          android: {
            autoCancel:false,
            onlyAlertOnce:false,
            ongoing:true,
            category:AndroidCategory.MESSAGE,
            flags:[AndroidFlags.FLAG_NO_CLEAR],
            channelId:"privatemessag",
            style: {
              type: AndroidStyle.MESSAGING,
              person:{
                name:"me"
              },
              messages:[...mess]
              
            },
            actions: [
              {
                title: 'Reply',
                icon: 'https://my-cdn.com/icons/reply.png',
                pressAction: {
                  id: 'reply',
                },
                input: true, // enable free text input
              },
            ],
          },
        });
        let id = storage.getString("id")
        let name = storage.getString("name")
        let date=Date.now()
        let newmessage={
          _id:date,
          sender:id,
          senderName:name,
          receiver:detail.notification.data.sender,
          conversationid:detail.notification.data.conversationid,
          text:detail.input,
          createdAt:date,
        }
        console.log(newmessage,444444)
        
        /* let caller = await AsyncStorage.getItem("caller")
        let caller1 = JSON.parse(caller) */
       
        socket=io(server)
        socket.emit("no",id)
        socket.emit("send",JSON.stringify(newmessage),null)
        socket.emit("dc1",id)
       //await notifee.cancelNotification(detail.notification.id);

    }else if(type === EventType.ACTION_PRESS && detail.pressAction.id === 'accept'){
      pause.play()
      setTimeout(() => {
        //RootNavigation.navigate("Chat")
        setTimeout(() => {
          RootNavigation.navigate(call.route,{otherid:call.callerId,call:"notification",info:call.sdp,other:call.callerName})
          
        }, 0);
        
      }, 0);
      //await AsyncStorage.setItem("sdp",JSON.stringify(call.sdp))
      //Linking.openURL(`mychat://Video?otherid=${call.callerId}&call=notification&info=123`)
    }else if(type === EventType.ACTION_PRESS && detail.pressAction.id === 'decline'){

      //let id = await AsyncStorage.getItem("id")
      let id = storage.getString("id")
      /* let caller = await AsyncStorage.getItem("caller")
      let caller1 = JSON.parse(caller) */
     
      socket=io(server)
      socket.emit("no",id)
      socket.emit("endCall",call.callerId) 
      socket.emit("dc1",id)
      socket=null
      
    }
  });
  messaging().onMessage(async remoteMessage => {
    console.log(78,2)
    if(remoteMessage.data.title==="newmessage"){
      let message= JSON.parse(remoteMessage.data.message)
      //let a = await AsyncStorage.getItem(message.conversationid)
      let a = storage.getString(message.conversationid)      
                if(a){
                  let n =[message]
                  let day ={date:new Date(Date.now()),type:"day",_id:d()}
                  let all = JSON.parse(a)
                 
                  const b = all.find((e)=>{
                    if( e.type!==undefined){
                      return e
                    }
                  })
                  
                if(new Date(b.date).toDateString() === new Date(day.date).toDateString()){
                 
  
                }else{
                 
                  n=[...n,day]
  
                }
              
                //await AsyncStorage.setItem(message.conversationid,JSON.stringify([...n,...all]))
                storage.set(message.conversationid,JSON.stringify([...n,...all]))
              
              }
  
    }else if(remoteMessage.data.title==="newconversation"){
      //let all1=await AsyncStorage.getItem("mpeop")
      let all1=storage.getString("mpeop")
      if(all1){
        let all=JSON.parse(all1)
        let newconv =JSON.parse(remoteMessage.data.conversation)
        //let check = await AsyncStorage.getItem(newconv._id)
        let check = storage.getString(newconv._id)
        let message =JSON.parse(remoteMessage.data.message)
        if(check){
        
        }else{
          all=[...all,newconv]
          let day = {date:new Date(Date.now()).toLocaleDateString("tr-TR",{day:"2-digit",month:"long",year:"numeric"}),type:"day",_id:d()}
        
          /* await AsyncStorage.setItem("mpeop",JSON.stringify(all))
          await AsyncStorage.setItem(newconv._id,JSON.stringify([message,day])) */
          storage.set("mpeop",JSON.stringify(all))
          storage.set(newconv._id,JSON.stringify([message,day]))
        
        }
        
            }
  
    }else if(remoteMessage.data.title==="updateconversation"){
      //let all1=await AsyncStorage.getItem("mpeop")
      let all1=storage.getString("mpeop")
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
  //await AsyncStorage.setItem("mpeop",JSON.stringify(all))
  storage.set("mpeop",JSON.stringify(all))
  
      }
  
    }else if(remoteMessage.data.title==="deleteconversation"){
      //let all1=await AsyncStorage.getItem("mpeop")
      let all1=storage.getString("mpeop")
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
  //await AsyncStorage.setItem("mpeop",JSON.stringify(all))
  storage.set("mpeop",JSON.stringify(all))
    }
  }else if(remoteMessage.data.title==="endCall"){
    //call1=false
    //pause.pause()
  }
 
    console.log("kıkı")
    //messages=[...messages,{text:"789"}]
    messages =[...messages,{
    text: "789",
    timestamp: Date.now(), // Now
    person: {
      name: remoteMessage.data.title,
        }
  }]
  const channelId = await notifee.createChannel({
      id: 'privatemessage',
      name: 'privatemessage',
 importance:AndroidImportance.HIGH
    });
    
  //console.log('Message handled in the background!', remoteMessage)
});




function save(media,id){
  let Base64Code = media.split("data:image/jpeg;base64,"); //base64Image is my image base64 string

  const dirs = RNFetchBlob.fs.dirs;
  
  let path = dirs.CacheDir + `/${id}.jpeg`
  return new Promise((r,s)=>{

 
  //RNFetchBlob.fs.writeFile(path, RNFetchBlob.base64.encode(Base64Code), 'base64').then((res) => {console.log("File : ", res)})
  RNFetchBlob.fs.writeFile(path, Base64Code[1], 'base64')
  .then((res) => {console.log("File : ", res)
  
      r(`file://${path}`)
     
 
  

   })
  })
   




}
messaging().setBackgroundMessageHandler(async remoteMessage => {
   //id= await AsyncStorage.getItem("id")
   id= storage.getString("id")
   console.log("okokokokokoko")
  //RNCallKeep.backToForeground()

  //Linking.openURL("mychat://")

  
  if(remoteMessage.data.title==="newmessage"){
    let message= JSON.parse(remoteMessage.data.message)
    //let a = await AsyncStorage.getItem(message.conversationid)
    let a = storage.getString(message.conversationid)       
              if(a){
               
               console.log(message,45)
                let n =[message]
                let day ={date:new Date(Date.now()),type:"day",_id:d()}
                let all = JSON.parse(a)
               
                const b = all.find((e)=>{
                  if( e.type!==undefined){
                    return e
                  }
                })
                
              if(new Date(b.date).toDateString() === new Date(day.date).toDateString()){
               

              }else{
               
                n=[...n,day]

              }
          
              //await AsyncStorage.setItem(message.conversationid,JSON.stringify([...n,...all]))
              storage.set(message.conversationid,JSON.stringify([...n,...all]))
            
            }


            
let pp = storage.getString("peop")
let ppr=null

if(pp){
  let json1 =  JSON.parse(pp)
  let filtered= json1.filter((c)=>c._id===message.sender)
  if(filtered.length!==0){
    console.log(filtered[0]._id,filtered[0].name,json1.length,111222,filtered.length)
   ppr= await save(filtered[0].profilepicture,message.sender)
  }

}
mess=[...mess,{text:message.text,timestamp:Date.now(),person:{
 name:message.senderName,
 icon:ppr
  
}}]
console.log(mess,7777777)
        const channel = await notifee.createChannel({
          id: 'privatemessag',
          name: 'privatemessag',
          importance:AndroidImportance.HIGH,
          sound:"default",
          vibration:true,
          vibrationPattern: [100, 500],
          });
          /* PushNotification.localNotification({
            
            autoCancel: false,
            channelId: "my-channel",
            id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
            title: "My Notification Title", // (optional)
            message: "My Notification Message",
            actions: ["ReplyInput"],
            reply_placeholder_text: "Write your response...", // (required)
            reply_button_text: "Reply" ,
            invokeApp: false
          }) */
            
        
          await notifee.displayNotification({
            id:message.conversationid,
            body:message.text,
            title:message.text,
            data:message,
            android: {
              
              autoCancel:false,
              onlyAlertOnce:false,
              ongoing:false,
              category:AndroidCategory.MESSAGE,
              color:"red",
              flags:[AndroidFlags.FLAG_NO_CLEAR],
              channelId:"privatemessag",
              circularLargeIcon:true,
              style: {
                
                type: AndroidStyle.MESSAGING,
                person:{
                  
                  name:message.senderName,
                  
                
                },
                messages:[...mess]
                
              },
              actions: [

                {
                  title: 'Reply',
                  icon: 'https://my-cdn.com/icons/reply.png',
                  
                  pressAction: {
                    id: 'reply',
                    
                  },
                  input: {
                    
                  }, // enable free text input
                },
              ],
            },
          });
          
  }else if(remoteMessage.data.title==="newconversation"){
    //let all1=await AsyncStorage.getItem("mpeop")
    let all1=storage.getString("mpeop")
    if(all1){
let all=JSON.parse(all1)
let newconv =JSON.parse(remoteMessage.data.conversation)
//let check = await AsyncStorage.getItem(newconv._id)
let check = storage.getString(newconv._id)
let message =JSON.parse(remoteMessage.data.message)
if(check){

}else{
  all=[...all,newconv]
  let day = {date:new Date(Date.now()),type:"day",_id:d()}

  /* await AsyncStorage.setItem("mpeop",JSON.stringify(all))
  await AsyncStorage.setItem(newconv._id,JSON.stringify([message,day])) */
  storage.set("mpeop",JSON.stringify(all))
  storage.set(newconv._id,JSON.stringify([message,day]))

}

    }

  }else if(remoteMessage.data.title==="updateconversation"){
    //let all1=await AsyncStorage.getItem("mpeop")
    let all1=storage.getString("mpeop")
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
 //await AsyncStorage.setItem("mpeop",JSON.stringify(all))
storage.set("mpeop",JSON.stringify(all))
    }

  }else if(remoteMessage.data.title==="deleteconversation"){
    //let all1=await AsyncStorage.getItem("mpeop")
    let all1=storage.getString("mpeop")
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
//await AsyncStorage.setItem("mpeop",JSON.stringify(all))
storage.set("mpeop",JSON.stringify(all))

  }
}else if(remoteMessage.data.sdp!==undefined && remoteMessage.data.callerId!==undefined){
  call= {sdp:JSON.parse(remoteMessage.data.sdp),callerId:remoteMessage.data.callerId,callerName:remoteMessage.data.title,type:"notification",route:remoteMessage.data.type}
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
    pause.islocked().then(async(e)=>{
      let type=null
      let comp = null
      if(remoteMessage.data.type==="Video"){
        type="com.v1.CustomVideocall"
        comp="custom"
      }else{
        type="com.v1.CustomAudiocall"
        comp="custom2"
      }
        call1=true
        
        //await AsyncStorage.setItem("callbg",JSON.stringify(true))
       /* AsyncStorage.setItem("caller",JSON.stringify({otherid:call.callerId,call:"notification",info:call.sdp,callerName:call.callerName})).then((e)=>{
        pause.play()
       }) */ 
      storage.set("calldetails",JSON.stringify({callerId:call.callerId,call:"notification",sdp:call.sdp,callerName:call.callerName,type:remoteMessage.data.type,entrytype:"notification"}))
      
        //pause.play()
      
     /*  pause.play()
      RootNavigation.navigate("Chat") */
  
    

    
        console.log("hey")
        callnotif=true
        /*  */
        //await AsyncStorage.setItem("caller",JSON.stringify({otherid:call.callerId,call:"notification",info:call.sdp}))
        //await AsyncStorage.setItem("callnotif",JSON.stringify(true))
        storage.set("callnotif",JSON.stringify(true))
/*         await AsyncStorage.setItem("video",JSON.stringify({otherid:call.callerId,call:"notification",info:call}))
 */        //await notifee.deleteChannel("privatemessage")
        const channelId = await notifee.createChannel({
        id: 'privatemessag',
        name: 'privatemessag',
        importance:AndroidImportance.HIGH,
        sound:"default",
        vibration:true,
        vibrationPattern: [100, 500],
        });
        /* await notifee.displayNotification({
          id:"1",
          title:"Gelen Arama",
          body:`${remoteMessage.data.title} ${remoteMessage.data.type==="Video"? "görüntülü":"sesli"} arıyor`,
            android: {
              loopSound:true,
            flags:[AndroidFlags.FLAG_NO_CLEAR],
            ongoing:false,          
              color:AndroidColor.RED,
              onlyAlertOnce:false,
              category:AndroidCategory.MESSAGE,
              fullScreenAction: {
                id: 'default',
              },
              actions: [
                {
                  title: '<p style="color: #ff0000;"><b>Reddet</b></p>',
                  pressAction: { id: 'decline' },
                },
                {
                  title: '<p style="color: #0b8705;"><b>Kabul et</b></p>',
                  pressAction: { id: 'accept' },
                },
              ],
             channelId,
          },
        })*/

        await notifee.displayNotification({
          id:"1",
          title:"Gelen Arama",
          body:`${remoteMessage.data.title} ${remoteMessage.data.type==="Video"? "görüntülü":"sesli"} arıyor`,
          data:call,
          android: {
              loopSound:true,
              channelId: 'my-channel',
              category: AndroidCategory.CALL,
              visibility: AndroidVisibility.PUBLIC,
              importance: AndroidImportance.HIGH,
              timestamp: Date.now(),
              showTimestamp: true,
              /* pressAction:{
                id: "bok",
                launchActivityFlags:[AndroidLaunchActivityFlag.EXCLUDE_FROM_RECENTS,AndroidLaunchActivityFlag.SINGLE_TOP],
                launchActivity: type,
      
              }, */
              actions: [{
                title: '<p style="color: #0b8705;"><b>Kabul et</b></p>',
                pressAction: {
                      id: "bok",
                      launchActivityFlags:[],
                      launchActivity: type,
                  }
              }, {
                title: '<p style="color: #ff0000;"><b>Reddet</b></p>',
                pressAction: {
                      id: "reject",

                  }
              }],
              fullScreenAction: {
                  id: "defau",
                  launchActivityFlags:[],
                  launchActivity:type,

              },
          },
      
      
        })
      
      
    }) 
    
    //Linking.openURL("mychat://")
    //RNCallKeep.backToForeground()
    //RNCallKeep.displayIncomingCall("123","1",`${remoteMessage.data.title} from v1`);


  }






}else if(remoteMessage.data.title==="endCall"){
  //call1=false
  /* pause.islocked().then(async(e)=>{
    if(e===true){
      call1=true
      pause.pause()

    }else{
      call1=false
      callnotif=false
     
    }
  }) */
  
}
  
 
 




/* let x =JSON.parse(remoteMessage.data.message)
   messages =[...messages,{
      text: x.text,
      timestamp: Date.now(),
      person: {
        name: x.senderName,
          }
  
     
    }]
    const channelId = await notifee.createChannel({
        id: 'privatemessage',
        name: 'privatemessage',
   importance:AndroidImportance.HIGH
      });

       notifee.displayNotification({
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
      }); 
      await notifee.displayNotification({
        id:"1",
        title:"hello",
        body:"hell no",
        android: {
          color:AndroidColor.RED,
            onlyAlertOnce:false,
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
           channelId:"privatemessage",
           style: {
            group:false,
            type: AndroidStyle.MESSAGING,
            person: {
              name:x.senderName ,
              icon: 'https://my-cdn.com/avatars/123.png',
            }, messages: [
                ...messages
              ],
        
        
        }
        },
      }) */
     
    //console.log('Message handled in the background!', remoteMessage)
  });
  function HeadlessCheck({isHeadless}) {
    
  const [first, setfirst] = useState()
  const [calli, setcalli] = useState(call1)
  const [cn, setcn] = useState(callnotif)
//call=null
callnotif=false
call1=false

    if (isHeadless) {
      // App has been launched in the background by iOS, ignore
      return null;
    }
   
    return(
    <Auth >
      <Provider store={store}>
<GestureHandlerRootView style={{flex:1}}>
  <PaperProvider>
      <App setfirst={setfirst} server={server} call={call} call2={call1} socket1={socket} />
      </PaperProvider>
      </GestureHandlerRootView>
      </Provider>
      </Auth>

    )
    
  }


const Backtest = async(w)=>{
  
if(w.first===true){
  //let id= await AsyncStorage.getItem("id")
  let id= storage.getString("id")
  if(id){
    await axios.get(`${server}/suspended/${userId}`).then(async(e)=>{
      if(e.data.data!==null){
        let nes=null
        //await AsyncStorage.removeItem("suspended")
        //await AsyncStorage.removeItem("1D27wrPxSR")
        //let sss= await AsyncStorage.getItem("suspended")
        let sss= storage.getString("suspended")
        let ss = JSON.parse(sss)
        if(ss.length!==0){
          console.log(e.data.data.messages)
          nes=[...e.data.data.messages,...ss]
          console.log(nes,78)
      
        }else{
       
          nes=e.data.data.messages
        }
         //let suspended = await AsyncStorage.setItem("suspended",JSON.stringify(nes))
         let suspended = storage.set("suspended",JSON.stringify(nes))
    
       }
})


//let sus = await AsyncStorage.getItem("suspended")
let sus = storage.getString("suspended")
    let sus1= JSON.parse(sus)
    if(sus1.length!==0){
     
     let saves=[...sus1]
     const arr = [...sus1];
     for (const e of arr) {
      try {
    console.log(e,24)
         let day = {date:new Date(Date.now()).toLocaleDateString("tr-TR",{day:"2-digit",month:"long",year:"numeric"}),type:"day",_id:d()}

        //let conversation = await AsyncStorage.getItem(e.conversationid)
        let conversation = storage.getString(e.conversationid)
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
         //await AsyncStorage.setItem(e.conversationid,JSON.stringify(all))
         storage.set(e.conversationid,JSON.stringify(all))
         saves.splice(0,1)
    
         //await AsyncStorage.setItem("suspended",JSON.stringify(saves))
         storage.set("suspended",JSON.stringify(saves))
        }else{
          saves.splice(0,1)
          console.log(25)
         let news= [e,day]
         //await AsyncStorage.setItem(e.conversationid,JSON.stringify(news))
         storage.set(e.conversationid,JSON.stringify(news))
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
AppRegistry.registerComponent('custom',()=> Callvideoscreen);
AppRegistry.registerComponent('custom2',()=> Callaudioscreen);
AppRegistry.registerComponent('customvc',()=> CustomVideocall);
AppRegistry.registerComponent('customac',()=> CustomAudiocall);
AppRegistry.registerComponent(appName, () => HeadlessCheck);
/* AppRegistry.registerComponent('custom-component', () => CustomComponent); */
//AppRegistry.registerComponent(App, () => HeadlessCheck);
/* AppRegistry.registerHeadlessTask('RNCallKeepBackgroundMessage', () => ({ name, callUUID, handle }) => {
  // Make your call here
  RNCall()
  return Promise.resolve();
}); */