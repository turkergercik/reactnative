import { useEffect,useContext,useReducer,useMemo,createContext, useRef } from "react"
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SignIn from "./screens/Signin";
import { AuthContext } from "./Authcontext";
import { Auth } from "./Authcontext";
import {View,PermissionsAndroid,Alert,TouchableOpacity,StatusBar,Text,Linking,NativeModules} from "react-native"
import { useAuthorization } from "./Authcontext";
import Home from "./screens/Home";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Other from "./screens/Other";
import Login from "./screens/login";
import Register from "./screens/register";
import Chat from "./screens/chat";
import Chatid from "./screens/chatid";
import Photo from "./components/photo";
import Videocall from "./screens/videocall";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { signIn, setmpeop, setpeop,signOut  } from "./redux/counter";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {navigationRef} from "./navigators/rootnavigator"
import RNCallKeep from 'react-native-callkeep';
import { io } from 'socket.io-client';
import InCallManager from 'react-native-incall-manager';
import Resetpassword from "./screens/resetpassword";
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { current } from "@reduxjs/toolkit";
import Animated ,{ Extrapolation,useAnimatedKeyboard, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withTiming,AnimatedLayout, FadeIn, Layout, SlideInDown, SlideInUp, SlideOutUp, SlideInRight, SlideInLeft } from 'react-native-reanimated'
import Pincode from "./screens/pincode";
import Newpassword from "./screens/newpassword";
import Allpeople from "./screens/allpeop";
import ShortUniqueId from 'short-unique-id';
import RNExitApp from 'react-native-exit-app';
import BackgroundFetch from "react-native-background-fetch";
const {pause}=NativeModules
let x =0
export default function App({ navigation,call,socket1}) {

  //const Stack = createStackNavigator()
  const Stack = createNativeStackNavigator();
  //const { isLoading,userToken,img } = useSelector((state) => state.counter);
  //const dispatch = useDispatch();
const {state,authContext,img,socket,server,remoteRTCMessage,seticall,icall,currentconv,setmessages,istoday,stat,setstat,offlinepause,myconv,messages,check,allm,setcalli,calli} = useAuthorization()
const d =new ShortUniqueId({length:10})
x+=1
 
 const RNCall = async() => {
  console.log("oolol")
  const options = {
    ios: {
      appName: 'My app name',
    },
    android: {
      appName:"wewe",
      alertTitle: 'Permissions required',
      alertDescription: 'This application needs to access your phone accounts',
      cancelButton: 'Cancel',
      okButton: 'ok',
      imageName: 'phone_account_icon',
      additionalPermissions: [PermissionsAndroid.PERMISSIONS.RECORD_AUDIO],
      // Required to get audio in background when using Android 11
      foregroundService: {
        channelId: 'com.company.my',
        channelName: 'Foreground service for my app',
        notificationTitle: 'My app is running on background',
        notificationIcon: 'Path to the resource icon of the notification',
      }, 
    }
  };
  
  const result = await RNCallKeep.setup(options).then(accepted => {
    console.log("accepted--->", accepted)
    RNCallKeep.setAvailable(true)
  });



}
async function set1(){

  try {
    await BackgroundFetch.configure({
      minimumFetchInterval: 15,
      forceAlarmManager:true,
   startOnBoot:true,
   stopOnTerminate:false,
   enableHeadless:true,
   requiresCharging:false,
   requiresBatteryNotLow:false,
    }, async (taskId) => {  // <-- Event callback
      console.log("[BackgroundFetch] taskId: ", taskId);
      BackgroundFetch.finish(taskId);
    }, async (taskId) => {
      console.log("[BackgroundFetch] taskId: bok", taskId);

      // <-- Task timeout callback
      // This task has exceeded its allowed running-time.
      // You must stop what you're doing and immediately .finish(taskId)
      BackgroundFetch.finish(taskId);
    })

    await BackgroundFetch.scheduleTask({
      taskId: 'com.foo.customtask',
      delay: 5000,       // milliseconds
      forceAlarmManager: true,
      startOnBoot:true,
      stopOnTerminate:false,
      periodic: true,
      enableHeadless:true
    }).then((e)=>{
console.log(e,45)
    }).catch((e)=>{
      console.log(e,46)
 
    })
  } catch (error) {
    
  }


 
  BackgroundFetch.start()
}
useEffect(() => {
set1()
  InCallManager.start();
  //InCallManager.startRingtone("DEFAULT","","",10);

  InCallManager.setKeepScreenOn(true)
  InCallManager.setForceSpeakerphoneOn(true);
  //InCallManager.setSpeakerphoneOn(true)
  //InCallManager.setFlashOn(true)
  return () => {
    
    InCallManager.stop();
  };
}, []);




  useEffect(() => {
    
    //StatusBar.setTranslucent(true)
    StatusBar.setBackgroundColor("transparent")

    //SystemNavigationBar.fullScreen(true)
   //SystemNavigationBar.lowProfile()
   //SystemNavigationBar.navigationShow()
   //SystemNavigationBar.setNavigationColor('translucent');

    //SystemNavigationBar.setNavigationColor("translucent")
     //SystemNavigationBar.setNavigationColor('hsla(0, 100%, 50%, 1)');
     SystemNavigationBar.setNavigationColor("transparent")
 
   //SystemNavigationBar.setNavigationColor("transparent",undefined,"navigation")
    //SystemNavigationBar.navigationShow()
    
    
    //StatusBar.setTranslucent(true)
    //SystemNavigationBar.setFitsSystemWindows()

  


    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      let userId
      let userName
      try {
        userToken = await AsyncStorage.getItem('userToken');
        userId = await AsyncStorage.getItem('id');
        userName = await AsyncStorage.getItem('name');
        if(userToken && userId){
          
          //dispatch(signIn({userToken:userToken1,userId:userId1}))

          authContext.signIn({userToken:userToken,userId:userId,userName:userName})
       if(socket.current===null){
          
            RNCall()
            console.log("ok",99999)
            if(socket1){
              socket1.off("endCall")
             socket.current=socket1
            }else{

              socket.current = io(server)
              socket.current.emit("no",userId)
            }
            socket.current.on("getm",async(e)=> {
              console.log("yenimesaj")
              let n =[{
                _id:e._id,
                sender:e.sender,
                text:e.text,
                createdAt:e.createdAt,
                receiver:e.receiver,
                media:e.media,
                conversationid:e.conversationid,
                isNotification:e.isNotification
              }]
              let y = e.conversationid
              let day ={date:new Date(Date.now()).toLocaleDateString("tr-TR",{day:"2-digit",month:"long",year:"numeric"}),type:"day"}
             
              console.log(istoday.current,12)
              console.log(e.conversationid,33333)
              let a = await AsyncStorage.getItem(e.conversationid)
              console.log(a,45)
              
              if(a){
                let all = JSON.parse(a)
                if(istoday.current.hasOwnProperty(y) === false){
                const b= all.find((e)=>{
                  if( e.type!==undefined){
                    return e
                  }
                })
               
              if(b.date === day.date){
               

              }else{
               
                n=[...n,day]

              }

              
              
              console.log(b,55)
              istoday.current={...istoday.current,[y]:true}
            }
            console.log(istoday.current,13)
            try {
              console.log(allm.current,144)
              if(allm.current[0].conversationid===currentconv.current){

                allm.current=[...n,...allm.current]
              }
              await AsyncStorage.setItem(e.conversationid,JSON.stringify([...n,...all]))
              
            } catch (error) {
              
            }
            }else{



            }
              /* if(typeof e.text === 'object' && e.text !== null){
           

                 n[0].text=e.text.text
                 n=[...n,e.text.others]
              } */
             /* if(e.isNotification){
         socket.current.emit("send",{
               sender:e.sender,
               text:e.text,
               createdAt: e.createdAt,
               receiver:e.sender,
               conversationid:e.conversationid
         })
         
         
             } */
           console.log(e.conversationid,currentconv.current,"yyy")
             if(e.conversationid===currentconv.current){
           
               setmessages((p)=>[...n,...p])
          
               console.log("evet")
             }
            
            
            })
            

socket.current.on("offlinepause",(data,id)=>{
  if(remoteRTCMessage.current.callerId===id){
if(data==="video"){
if(offlinepause.current.video===true){
  offlinepause.current.video=false

}else{
  offlinepause.current.video=true

}
}else{
  if(offlinepause.current.audio===true){
    offlinepause.current.audio=false
  
  }else{
    offlinepause.current.audio=true
  
  }
}}

})

            
            socket.current.on('newCall', data => {
       RNCallKeep.backToForeground()
              
              console.log("yeni arama")
              call={
                rtcMessage:data.rtcMessage,
                otherid:data.callerId
              }
              remoteRTCMessage.current={
                rtcMessage:data.rtcMessage,
                callerId:data.callerId,
              }
              InCallManager.startRingtone("DEFAULT","","default","")
              if(navigationRef.getCurrentRoute().name!=="Video"){

                seticall(true)
          
              }}
              /* console.log("yeni arama")
              console.log(data.callerId,22222) */
          
              /* remoteRTCMessage.current = data.rtcMessage;
              otherUserId.current = data.callerId; */
          
            );
            socket.current.on('newconversationonline', async(e,a) => {
              //check.current=false
              let conversation=JSON.parse(e)
              let message=JSON.parse(a)
              console.log(conversation,"hey")
              let i
              let all1= await AsyncStorage.getItem("mpeop")
              let all=JSON.parse(all1)
              //console.log(all,74)
              let filtered= all.filter((a,index)=>{
                if(a.members?.includes(conversation.members[0])&&a.members?.includes(conversation.members[1])){
                  i=index
                  return a
                }
                
              })
            
            if(filtered.length===0){
              let c
              console.log("yok11")
              all=[...all,conversation]
              message.conversationid=conversation._id
              if(currentconv.current){
                let a= await AsyncStorage.getItem(currentconv.current)
               let b= JSON.parse(a)
                c =[message,...b]
               currentconv.current=conversation._id
               
               setmessages(c)
               check.current=false
              }else{
                let day = {date:new Date(Date.now()).toLocaleDateString("tr-TR",{day:"2-digit",month:"long",year:"numeric"}),type:"day",_id:d()}
                 c= [message,day]

              }
              authContext.setmpeop(all)
              allm.current=c
              await AsyncStorage.setItem("mpeop",JSON.stringify(all))
              await AsyncStorage.setItem(conversation._id,JSON.stringify(c))
            }else{
            console.log(conversation,3)
            let a= await AsyncStorage.getItem(currentconv.current)
            let b= JSON.parse(a)
              if(new Date(conversation.createdAt)<new Date(filtered[0].createdAt)){
                Alert.alert("bok")
                
                all[i]._id=conversation._id
                all[i].sender=conversation.receiver
                all[i].receiver=conversation.sender
                message.conversationid=conversation._id

                if(b){
                  b.forEach((a) => {
                    if(a.conversationid!==undefined){
                      a.conversationid=conversation._id
                    }
                  });
                  
                }
             
                let c =[message,...b]
                 
                 
                 authContext.setmpeop(all)
                 currentconv.current=conversation._id
                 
                 console.log(c,4444)
                 await AsyncStorage.setItem(conversation._id,JSON.stringify(c))
                 await AsyncStorage.setItem("mpeop",JSON.stringify(all))
                 allm.current=c
                 setmessages(c)
              }else{
                Alert.alert("ok")
                if(b){
                  b.forEach((a) => {
                    if(a.conversationid!==undefined && a.conversationid!==currentconv.current){
                      a.conversationid=currentconv.current
                    }
                  });
                  
                }
                message.conversationid=currentconv.current
                b.splice(1,0,message)
                console.log(b,5555)
                allm.current=b
                setmessages(b)
                await AsyncStorage.setItem(currentconv.current,JSON.stringify(b))
             /*    setmessages((p)=>{
            if(b.length===1){

              p.splice(1,0,message)
              return [...p]

            }else{
              return [message,...p]
            }
                   }) */
                
              }

              /* if(new Date(filtered.createdAt)>new Date(conversation.createdAt)){

              } */
            }
            if(conversation._id===currentconv.current){
           console.log(message)
         
              console.log("evet")
            }
  
              });

            socket.current.on('updateconv', async(id,who,value) => {
              console.log(id,who,value,2323)
            let i
            let all1= await AsyncStorage.getItem("mpeop")
            let all=JSON.parse(all1)
            let filtered= all.filter((a,index)=>{
              if(a._id===id){
                i=index
                return a
              }
              
            })
            console.log(all,4545)
          if(filtered.length!==0){
/* if(who==="sender"){
  if(value===true){
    all[i].sender.delete=true
  }else{

    all[i].sender.delete=false
  }

}else{
  if(value===true){
    all[i].receiver.delete=true
  }else{

    all[i].receiver.delete=false
  }


} */










            if(value===true){
              if(who==="sender"){
                if(filtered[0].receiver.delete===true){
                  console.log(8)
                  all.splice(i,1)
                  socket.current.emit("deleteconversation",id)
                  //state.mpeop.slice(i,1)

                }else{
                  console.log(2)
                  all[i].sender.delete=true
                  //state.mpeop[i].sender.delete=true
                }
              }else{
               console.log(1)
                if(filtered[0].sender.delete===true){
                  all.splice(i,1)
                  socket.current.emit("deleteconversation",id)
                  //state.mpeop.slice(i,1)

                }else{
                  console.log(99)
                  all[i].receiver.delete=true
                  //state.mpeop[i].receiver.delete=true
                }


              }


            }else{
              if(who==="receiver"){

                all[i].receiver.delete=false
              }else{
                all[i].sender.delete=false
              }
              //state.mpeop[i][who].delete=false


            }
            console.log(all,41)
            authContext.setmpeop(all)
            await AsyncStorage.setItem("mpeop",JSON.stringify(all))

          }

            });


            socket.current.on('deleteconv', async(id) => {
              let i
              let all1= await AsyncStorage.getItem("mpeop")
              let all=JSON.parse(all1)
              let filtered= all.filter((a,index)=>{
                if(a._id===id){
                  i=index
                  return a
                }
                
              })
              console.log(filtered,1212)
            if(filtered.length!==0){
              all.splice(i,1)
              //console.log(all.length,88889)
              authContext.setmpeop(all)
              await AsyncStorage.setItem("mpeop",JSON.stringify(all))
  
            }
  
              });
            socket.current.on('endCall', data => {
              setcalli(false)
              InCallManager.stopRingtone()
               seticall(false)
               if(call){
                console.log(call)
              
                if(call.type){
                  pause.pause()
                  RNExitApp.exitApp()
                }
                call=null
               }
  
               //Alert.alert(`${navigationRef.getCurrentRoute().name}`)
               if(navigationRef.getCurrentRoute().name==="Video"){
                
                   navigationRef.goBack()
                 
                   
               }
               remoteRTCMessage.current={
                 rtcMessage:null,
                 callerId:null,
               }
               
               
            
           
               /* remoteRTCMessage.current = data.rtcMessage;
               otherUserId.current = data.callerId; */
           
             });
          
          }
          
          
          



        }else{
          //dispatch(signOut())
          authContext.signOut()
        }
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      
    };

    bootstrapAsync();


    return ()=>{
      //socket.current.close()
    }
  }, [state.userId]);
useEffect(()=>{
myconv.current=state.mpeop

},[state.mpeop])

  const SlideTransition = {
    cardStyleInterpolator: ({ current, next, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0,1],
                outputRange: [layouts.screen.width, -1],
              }),
            },
            {
              translateX: next
                ? next.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -layouts.screen.width],
                  })
                : 1,
            },
          ],
        },
      };
    },
  };
  const config = {
    screens: {
      Videocall:'Video',
      Chatid:"Chatid",
      Chat:"Chat"
    },
  };
  const linking = {
    prefixes: ['mychat://'],
    config,
  };
  function SS(){
    
    return(
      <View style={{flex:1,flexDirection:"row",width:"100%",position:"absolute",top:0,height:100,backgroundColor:"yellow",zIndex:2}} >
       
      <TouchableOpacity style={{flex:1,backgroundColor:"green",justifyContent:"center",alignItems:"center"}} onPress={()=>{
        if(remoteRTCMessage.current.callerId){
          InCallManager.stopRingtone()
          seticall(false)
         navigationRef.navigate("Video",{otherid:remoteRTCMessage.current.callerId,call:"outchat"})
         // Linking.openURL(`my://Chatview/Video/?otherid=${remoteRTCMessage.current.callerId}&&call=outchat`)
        }
        
  //Linking.openURL("Video",{otherid:rtcm.current.otherid})
      }}>
   <Text style={{color:"white"}}>
        Cevapla
      </Text>
      </TouchableOpacity>
     
      <TouchableOpacity style={{flex:1,backgroundColor:"red",justifyContent:"center",alignItems:"center"}}onPress={()=>{
        InCallManager.stopRingtone()
        //Alert.alert(`${remoteRTCMessage.current.callerId}`)
        socket.current.emit("endCall",remoteRTCMessage.current.callerId)
        seticall(false)
      }}>
  <Text style={{color:"white"}}>
        Reddet
      </Text>
      </TouchableOpacity>
   
  
     
</View>


    )
    
  }
  if(state.isLoading){

    return(
      <View style={{flex:1,backgroundColor:"red"}}>

      </View>
    )
  }
  return (
    <View style={{flex:1,backgroundColor:"black"}}>
    <GestureHandlerRootView style={{flex:1,backgroundColor:"transparent"}}>

      <NavigationContainer linking={linking} ref={navigationRef}>
      {calli && <View style={{position:"absolute",backgroundColor:"green",top:0,bottom:0,right:0,left:0,zIndex:1}}>
<View style={{flex:1,flexDirection:"column"}} >
  <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>

  <Text style={{}} >{call?.callerName? call.callerName:"ee"}</Text>

  </View>
  <View style={{backgroundColor:"green",flex:1,flexDirection:"row"}}>
<View style={{backgroundColor:"green",flex:1}}>
  <TouchableOpacity style={{flex:1,justifyContent:"center",alignItems:"center"}}
  onPress={()=>{
    navigationRef.navigate("Video",{otherid:call.callerId,call:"notification",info:call})
  }}
  
  >
    <Text>Cevapla</Text>
  </TouchableOpacity>
</View>
<View style={{backgroundColor:"red",flex:1}}>
  <TouchableOpacity style={{flex:1,alignItems:"center",justifyContent:"center"}}
    onPress={()=>{
  socket.current.emit("endCall",call.callerId)
  setTimeout(() => {
    
    pause.pause()
  },0 );
    }}
  
  >
    <Text>Reddet</Text>
  </TouchableOpacity>
</View>
</View>

</View>
      </View> }
      {

icall &&
<SS></SS>
}
      <Stack.Navigator  screenOptions={{headerShown:false,animation:"slide_from_right",animationDuration:100,gestureEnabled:false,contentStyle:{opacity:1,backgroundColor:"transparent"}}} >
      {state.userToken == null ? (
          <><Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Resetpassword" component={Resetpassword} />
          <Stack.Screen name="Pincode" component={Pincode} />
          <Stack.Screen name="Newpassword" component={Newpassword}/>
          </>
        ) : (
          <><Stack.Screen name="Chat" component={Chat} options={{cardStyle:{backgroundColor:"transparent"} }} >
          </Stack.Screen>
          <Stack.Screen name="Chatid" component={Chatid} options={{cardStyle:{backgroundColor:"red"},presentation:"transparentModal",cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}} />
          <Stack.Screen name="Photo" component={Photo} options={{animation:"fade",cardStyle:{backgroundColor:"transparent"},presentation:"transparentModal",animationEnabled:false}} />
          <Stack.Screen name="Video" component={Videocall} options={{cardStyle:{backgroundColor:"transparent"},presentation:"transparentModal",animationEnabled:false}}/>
          <Stack.Screen name="Allpeople" component={Allpeople}/>

          </>
        )}
       
         
        
      </Stack.Navigator>
      </NavigationContainer>

      </GestureHandlerRootView>
      </View>
  );
}