import { View,Text,TouchableOpacity,NativeEventEmitter, AppState,PermissionsAndroid,Alert ,Image,StatusBar,Dimensions,useWindowDimensions,TouchableNativeFeedback,NativeModules, BackHandler} from 'react-native'
import React,{useContext,useState,useRef,useEffect} from 'react'
import { UserContext } from '../components/context'
import { useAuthorization } from '../Authcontext';
import {
    mediaDevices,
    RTCPeerConnection,
    RTCView,
    RTCIceCandidate,
    RTCSessionDescription,
    permissions,
  } from 'react-native-webrtc';
import InCallManager from 'react-native-incall-manager';
import { BlurView } from "@react-native-community/blur";
import Animated ,{Easing,Extrapolation,useAnimatedKeyboard,withSequence, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withTiming,AnimatedLayout, FadeIn, Layout, SlideInDown, SlideInUp, SlideOutUp, SlideInRight, SlideInLeft, SlideOutDown, withRepeat, LayoutAnimationConfig, LinearTransition } from 'react-native-reanimated'
import Micoff from "../images/micoff.svg"
import Micon from "../images/micon.svg"
import Camon from "../images/camon.svg"
import Camoff from "../images/camoff.svg"
import Decline from "../images/decline.svg"
import Switchcam from "../images/switchcam.svg"
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { navigationRef } from '../navigators/rootnavigator';
import { Gesture, GestureDetector, GestureHandlerRootView,ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storage } from '../Authcontext';
import { IconButton } from 'react-native-paper';
import { Socket, io } from 'socket.io-client';
import { useDispatch, useSelector } from "react-redux";
import { setcurrentconv } from '../redux/counter';
import notifee from '@notifee/react-native';
import { Platform } from 'react-native';
import Volume from "../images/volume.svg"
import Muted from "../images/muted.svg"
import User from "../images/user.svg"
let server ="http://192.168.1.106:3001"

console.log(storage)
const {pause:df}=NativeModules
const enterpip=NativeModules.pipmodule
const as= StatusBar.currentHeight
let x=false
let otherid=null
  let notid=null
  let info=null
  let convid=null
  let entrytype=null
  let callerName=null
export default function CustomAudiocall({navigation,route,soc1,someValue,fromapp}) {
  /* const count = useSelector((state) => state.counter.currentconv)
  const dispatch = useDispatch() */

  


  const { height, width } = useWindowDimensions()
  
  //let otheridcall.current =null//`${otherid}-call`
  let otheridcall= useRef(null)
  let isNotification= useRef(false)
    const socket =useRef(null)
    const mystream =useRef(null)
    const [type, setType] = useState('JOIN');
    const [pause, setpause] = useState(false);
    const [inPipMode, setinPipMode] = useState(false);
    const [pauselocal, setpauselocal] = useState(false);
    const [mute, setmute] = useState(false);
    const [mutelocal, setmutelocal] = useState(false);
    const [callscreen, setcallscreen] = useState(false);
    const [muted, setmuted] = useState(true)
    const [time, settime] = useState(null)
    const [callername,setcallername]=useState(null)
    const tY= useSharedValue(0)
    const ty1= useSharedValue(0)
    const translationY= useSharedValue(0)
    const translationX= useSharedValue(0)
    const finalY= useSharedValue(0)
    const finalX= useSharedValue(0)
    const yc= useSharedValue(0)
    const xc= useSharedValue(0)
    const [mainscreen, setmainscreen] = useState(true);
    const [otherx, setotherx] = useState(null)
    const [pp, setpp] = useState(null);
    const remoteRTCMessage=useRef(null)
    const fullscreen=useRef(null)
    const mains=useRef(true)
    const p = useRef(false)
    const menu = useRef(false)
    const pl = useRef(true)
    const m = useRef(false)
    const v = useRef(null)
    const peerConnection = useRef(
        new RTCPeerConnection({
          iceServers: [
            {
              urls: 'stun:stun.l.google.com:19302',
            },
            {
              urls: 'stun:stun1.l.google.com:19302',
            },
            {
              urls: 'stun:stun2.l.google.com:19302',
            },{
            urls: "turn:relay1.expressturn.com:3478",
            credential: "efLCEDXKZGCO5IZ6QD",
            username: "jNAuxkZtAMC5DRPR",
        }
          ]
        },),
      );
    const [localStream, setlocalStream] = useState(null);
    const ls = useRef(null);
  const [remoteStream, setRemoteStream] = useState(null);
  //const [callerName, setcallerName] = useState(null);
  const [back, setBack] = useState(false);
  const [isFront, setisFront] = useState(true);
  const [t, sett] = useState(false);
  const video =useRef(null)
  const audio =useRef(null)
  const check =useRef([])
  const pipmode =useRef(false)
  const che =useRef(false)
  const btn =useRef(null)
  const tx = useSharedValue(-width)
  let streams
  let state={
    userId:storage.getString("id"),
    userName:storage.getString("name")
  }
  const callnotif = useRef(null);  
    
    //let otheridcall.current= route?.params?.otheridcall.current
    
    let sdp = route?.params?.sdp
    
    let caller= route?.params?.caller
    useEffect(()=>{
        let x =storage.getString("peop")
        let y = JSON.parse(x)
      y.find((item,index)=>{
      if(item._id===otherx){
        setpp(item.profilepicture)
      }
      
      })
      
      
      
      },[otherx])

 
  useEffect(() => {

    const eventEmitter = new NativeEventEmitter(NativeModules.pipmodule);
    let eventListener = eventEmitter.addListener('PIP_MODE_CHANGE', event => {
      
      console.log(event)
     setinPipMode(event)
    });
    let eventListener2 = eventEmitter.addListener('onhint', event => {
      
      if(inPipMode){
      
        

      }else{
        if(menu.current===false){

          togglemenu()
        }
        setTimeout(() => {
          enterpip.enterPipMode(400, 700)
          
        }, 0);
        
      }
    });

    // Removes the listener once unmounted
    return () => {
     
      eventListener.remove();
      eventListener2.remove();
    };
  }, []);
useEffect(()=>{
 
translationX.value=0
translationY.value=0
finalX.value=0
finalY.value=0
xc.value=0
yc.value=0

},[height])


useEffect(()=>{

  const eventEmitter = new NativeEventEmitter(NativeModules.PipAndroidModule);
  let eventListener = eventEmitter.addListener('declineclick', event => {
    
    socket.current.emit("endCall",otheridcall.current,notid)
    socket.current.emit("endCall",otherid,notid)
    if(fromapp){
      if(inPipMode){
        df.stopvc()

      }else{
        
        df.stopvc1()
      }

    }else{
      df.stopvc()
      if(socket.current!==null){
        a()

      }
    }
    setTimeout(() => {
      
      storage.delete("svc")
    }, 100);
    console.log("basıldı") // "someValue"
  });
  let eventListener1 = eventEmitter.addListener('backpress', event => {
    
   
      if(inPipMode){
      
        

      }else{
        if(menu.current===false){

          togglemenu()
        }
        setTimeout(() => {
          enterpip.enterPipMode(400, 700)
          
        }, 0);
        
      }

   
  });
  return () => {
    eventListener.remove();
    eventListener1.remove();
  };
  
  },[])
  useEffect(()=>{
  
    if(inPipMode){

    }else{
      
    }
    
    },[inPipMode])

async function hasAndroidPermission() {
    
  const getCheckPermissionPromise = async() => {
    
    const x = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)
   if(x===true){
    const y = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO)
    if(y===true){
        return true
    }else{
      return false
    }
   }else{
    return false
   }
  };
  const hasPermission = await getCheckPermissionPromise();
  if (hasPermission) {
    return new Promise(async(re)=>{
      re(true)
        })
  }
  const getRequestPermissionPromise = async() => {
    //menuopens.current=true
    const x = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
    console.log(x,4545)
    const as = await new Promise(resolve =>  setTimeout(async() => {
      //menuopens.current=true
      const y = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO)
      if (x === "granted" && y === "granted") {
        resolve(true)
       }else{
        resolve(false)
       }
    }, 0));
    if(as){
      return true
    }else{
      return false
    }
   
    
   
      
    
  };

 
  return await getRequestPermissionPromise()
}

    useEffect(() => {
    hasAndroidPermission().then(async(e)=>{
      await notifee.cancelNotification("1")
      let sc =storage.getString("calldetails")
  if(sc){
     let sc1 = JSON.parse(sc)
     otherid = sc1.otherid
     convid= sc1.convid
     notid=sc1.notid
     sdp =sc1.sdp
     entrytype = sc1.entrytype
     callerName= sc1.callerName
     if(entrytype==="notification"){
      remoteRTCMessage.current=sdp
      setcallscreen(true)
      otherid=sc1.callerId
      isNotification.current=true
      
     }
     otheridcall.current =`${otherid}-call`
     console.log(otheridcall.current,otherid)
     setcallername(sc1.callerName)
   setotherx(otherid)
  }

   
 
      if(e===true&& state.userId){
      console.log(socket.current)
     //df.changedcm("shortEdges")
     setTimeout(async() => {
      storage.delete("caller")
      //await AsyncStorage.removeItem("caller")
      storage.delete("callnotif")
  
      //const callnotif = await AsyncStorage.removeItem("callnotif")
      
      
       SystemNavigationBar.setNavigationColor("transparent","dark")
      
     }, 350);
      /* InCallManager.start()
      InCallManager.setForceSpeakerphoneOn(true); */
        if(state.userId&&socket.current!==undefined){
          socket.current= io(server)
          socket.current.emit("no",`${state.userId}-call`)
          console.log(state.userName)
         
        //setcallst(true)
        socket.current.on('callAnswered', async(data) => {
          
          InCallManager.stopRingtone()
          setType(true)
       che.current=true
          /*   check.current.forEach((e)=>{
              
              console.log(e,7777)
              sendICEcandidate(e)

           
          }) */
           
                      remoteRTCMessage.current = data.rtcMessage;
                     
                console.log(8888)
        
                  await  peerConnection.current.setRemoteDescription(
                    new RTCSessionDescription(remoteRTCMessage.current),
                  );
               
                  
          

        });
    
        socket.current.on('answer', data => {
        
        });
        socket.current.on('videopaused', data => {
if(data==="Audio"){

  if(p.current===true){
    p.current=false
    setpause(false)
  }else{
    setpause(true)
    p.current=true
   
  }
}else{

  if(m.current===true){
    m.current=false
    setmute(false)
  }else{
    setmute(true)
    m.current=true
   
  }

}
        
        });
    socket.current.on("endCall",()=>{
      console.log(inPipMode,"78")
      /* if(fromapp){
        df.stopvc1()
      

      }else{
      } */
      /* df.stopvc()
      if(socket.current!==null){
        a()

      } */
      /* if(fromapp){
        if(inPipMode){
          df.stopvc()
  
        }else{
          df.stopvc1()
        }

      }else{
       
      } */
         if(inPipMode){
          df.stopcall("Audio")
  
        }else{
          df.stopcall1("Audio")
        }
      if(socket.current!==null){
        a()

      }
      /* if(pipmode.current===true){
        df.stopvc()
       
      }else{
        BackHandler.exitApp()
      } */
      setTimeout(() => {
        
        storage.delete("svc")
      }, 100);
       

    })
        socket.current.on('ICEcandidate', async(data) => {
          let message = data.rtcMessage;
          if (peerConnection.current) {
            message.forEach(async(c)=>{
             await peerConnection.current
              .addIceCandidate(
                new RTCIceCandidate({
                  candidate: c.rtcMessage.candidate,
                  sdpMid: c.rtcMessage.id,
                  sdpMLineIndex: c.rtcMessage.label,
                }),
              )
              .then(data => {
               
                //console.log('SUCCESS');
              })
              .catch(err => {
                console.log('Error', err);
              });



            })
            setType(true)
           
          }
        });
    
        
         async function s(){
          await mediaDevices
          .getUserMedia({
            audio: true,
            video: false
          })
          .then(async(stream) => {
            // Got stream!
           streams=stream
           //timer.current=peerConnection.current.getSenders()
           //stream.forEach((a)=>{})
           ls.current=stream
            setlocalStream(stream);
            mystream.current=stream
            console.log(stream)
            
             //peerConnection.current.addStream(stream);
            // setup stream listening
            audio.current=peerConnection.current.addTrack(stream.getAudioTracks()[0],stream)
            if(entrytype==="incomingcall"){
                /* let sdp =await AsyncStorage.getItem("sdp")
                let sdp1=JSON.parse(sdp) 
                console.log(sdp1) */
                console.log(sdp,7878)
                remoteRTCMessage.current=sdp
                processAccept()
             
            }else if(entrytype==="notification"){
           
             // await peerConnection.current.setLocalDescription(null);
             
            }else{
              processCall()


            }
          }).catch((e)=>{
            console.log(e)
          })
          if(peerConnection.current){
            peerConnection.current.ontrack = event => {
              /* if(offlinepause.current.video===false){
                p.current=true
                setpause(true)
              }
              if(offlinepause.current.audio===false){
                m.current=true
                setmute(true)
              } */
             /* console.log(event.streams[0].getVideoTracks()[0],state.userId)
                    setRemoteStream(event.streams[0]); */
                  
                  };
                  peerConnection.current.onconnectionstatechange = (event) => {
                    switch (peerConnection.current?.connectionState) {
                  
                      case "connected":
                        let d = new Date('2000-00-00 00:00:00');

                      
                        setInterval(() => {
                          d = new Date(d.getTime() + 1000);
                          settime(d.toTimeString().split(" ")[0])
                        }, 1000);
                        break;
                     
                      default:
                        
                        break;
                    }
                  }
          
                  peerConnection.current.onicecandidate = async(event)=> {
                    
                      //clearTimeout(timer.current)
                      let sessionDescription
                      if (event.candidate) {
                     
                       // x+=1
                        
                        let a={
                          calleeId: otheridcall.current,
                          rtcMessage: {
                            label: event.candidate.sdpMLineIndex,
                            id: event.candidate.sdpMid,
                            candidate: event.candidate.candidate,
                          },
                          call:callnotif.current,
                          notid:notid,
                          callerId:state.userId,
                          callerName:state.userName
                        }
                        check.current=[...check.current,a]
                        
                        /* timer.current= setTimeout(async() => {
                          if(call1){
                            //setType("other")
                          }
                          
                          //sendICEcandidate(a)
                           
                        }, 250); */
                       /*  check.current= setTimeout(() => {
                      
                          //processCall(sessionDescription)
                        }, 1000); */
                      
              
                      } else {
                        //setType(true)
                        //sendICEcandidate(check.current)
                        
                        console.log('End of candidates.');
                      }
              
            
                    
                    
                  };

          }
          

         }
         
           s()

       

    
        
      }
    }else{
      navigation.goBack()
    }
  })
        return () => {
          if(socket.current!==null){
            a()

          }
        
          
        }
      
      }, []);

function a(){
  df.changedcm("default")
          SystemNavigationBar.setNavigationColor("black","light")
          //StatusBar.setHidden(false)
          //StatusBar.setTranslucent(true)
       //StatusBar.setBackgroundColor("yellow")
          
          //setType(null)
          
          /* offlinepause.current.video=true
          offlinepause.current.audio=true */

          check.current=null
          
          peerConnection.current.close()
          peerConnection.current=null
          
          mystream.current?.getTracks().forEach(
            track => track.stop()
        );
          //socket.current.off('newCall');
          socket.current.off('callAnswered');
          socket.current.off('ICEcandidate');
          socket.current.off('videopaused');
          socket.current.emit("dc1",`${state.userId}-call`)
          socket.current=null
}






useEffect(()=>{
  if(type===true){
  
  sendICEcandidate({calleeId:otheridcall.current,rtcMessage:check.current})

}


},[type])
 
      

      function sendICEcandidate(data) {
        socket.current.emit('ICEcandidate', data);
        //check.current=false
      }
    
      async function processCall() {

        try {
          //callnotif.current=null
        
        
         let  sessionDescription= await peerConnection.current.createOffer();
          await peerConnection.current.setLocalDescription(sessionDescription)

        //const sessionDescription =null
       console.log(notid,777888)
        callnotif.current=sessionDescription
        sendCall({
          callerId:state.userId,
          calleeId: otherid,
          rtcMessage: sessionDescription,
          notid:notid,
          callerName:state.userName,
          type:"Audio"
       
        });
        } catch (error) {
          
        }
        
      }
    
      async function processAccept() {

        try {
         peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(remoteRTCMessage.current)
        );
        const sessionDescription = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(sessionDescription);
        answerCall({
          callerId: otheridcall.current,
          rtcMessage: sessionDescription,
        });
       /* return new Promise((resolve, reject) => {
          resolve("done!")
        }); */
        } catch (error) {
          
        }

      }
    
      function answerCall(data) {
        socket.current.emit('answerCall', data);
      }
    
      function sendCall(data) {
        socket.current.emit('call', data);
      }
      function switchCamera() {
        if(pauselocal===false){
          setisFront(!isFront)
          localStream.getVideoTracks().forEach(track => {
          
            track._switchCamera();
          });
        
        }
        
      }
      function toggleCam(){
        console.log("ok")
        if(type===true){
          socket.current.emit("videopaused",otheridcall.current,"Audio")
         
        }else{
  socket.current.emit("offlinepause",otheridcall.current,"Audio",state.userId)
        }
        if(pl.current===true){
          console.log("1")
          localStream.getVideoTracks()[0].enabled=false
          pl.current=false
          setpauselocal(true)
        }else{
          console.log("2")
          localStream.getVideoTracks()[0].enabled=true
          pl.current=true
          setpauselocal(false)
        }
      }


     async function toggleMic(){
      if(type===true){
        socket.current.emit("videopaused",otheridcall.current,"audio")
       
      }else{
socket.current.emit("offlinepause",otheridcall.current,"audio",state.userId)
      }
      if(localStream.getAudioTracks()[0].enabled===true){
        localStream.getAudioTracks()[0].enabled=false
        setmutelocal(true)
      }else{
        localStream.getAudioTracks()[0].enabled=true
        setmutelocal(false)


      } 
      }

      async function togglemenu(){
        if(menu.current===false){
          ty1.value=withTiming(-75-as,{duration:150})
          tY.value=withTiming(95+48,{duration:150})
          menu.current=true
          SystemNavigationBar.navigationHide()
          StatusBar.setHidden(true)
        }else{
          ty1.value=withTiming(0,{duration:150})
          tY.value=withTiming(0,{duration:150})
          menu.current=false
          SystemNavigationBar.setNavigationColor("transparent")
          SystemNavigationBar.navigationShow()
          StatusBar.setHidden(false)
        }
        
        }


      function toggleScreen(){
        console.log("12")
        if(mains.current===true){
          mains.current=false
setmainscreen(false)
        }else{
          mains.current=true
setmainscreen(true)
        }
        
      }
     
      const ges = Gesture.Pan().onUpdate((e)=>{
        translationX.value=e.translationX+finalX.value
      translationY.value=e.translationY+finalY.value
     
      }).onEnd((e)=>{
       
        finalX.value=translationX.value
        finalY.value=translationY.value
        xc.value=xc.value+e.translationX
        yc.value=yc.value+e.translationY
        console.log(yc.value)
      if(xc.value>=10 ){
        translationX.value=0
        finalX.value=translationX.value
        xc.value=translationX.value
      }else if(Math.abs(xc.value)+170 >=width){
        if(width>height){
          translationX.value=-width+90+as
          finalX.value=translationX.value
          xc.value=translationX.value
        }else{
          translationX.value=-width+170
        finalX.value=translationX.value
        xc.value=translationX.value
        }
        
      }
      if(yc.value<=-40 ){
       
        if(width>height){
          translationY.value=-30
          finalY.value=translationY.value
          yc.value=translationY.value
        }else{
          translationY.value=0
          finalY.value=translationY.value
          yc.value=translationY.value
        }
      }else if(Math.abs(yc.value)+250-40>=height && height>width){
       
          translationY.value=height-250+30
          finalY.value=translationY.value
          yc.value=translationY.value
         
    
      }else if(Math.abs(yc.value)+250+40>=height && width>height){
        translationY.value=height-250-50
        finalY.value=translationY.value
        yc.value=translationY.value


      }
      
        
   /*      if(e.translationX < width/2){
          if(e.velocityX >=2000){
            transX.value= withTiming(width,300,(e)=>{
              if(e){
                runOnJS(ad)()
              }
                  }) 
        return
          }
          console.log("bok")
          
          transX.value= withTiming(0,300,(e)=>{
      
          }) 
         
      
          
        } */
      })
      function lay(event){
        let w =event.nativeEvent.layout.width
        let d=5000
        let m 
        if(Dimensions.get("screen").height>Dimensions.get("screen").width){
          m="portrait"
        }else{
          d=d*2
          m="landscape"
          console.log("okokokok")
        }
        tx.value=-width
        tx.value=withRepeat(
          withSequence(
            // split duration of 500ms to 250ms
            withTiming(w, {duration: d,easing:Easing.linear}),
            withTiming(-width, {duration: 0}),
            //withTiming(-width, {duration: 1000,easing:Easing.linear}),
          )
       ,-1)
      }
      const st = useAnimatedStyle(()=>{
        return{
          transform:[{translateX:tx.value}]
          
        }
      })
      const style1 = useAnimatedStyle(() => {
        return {
          transform: [{ translateY: tY.value }],
        };
      });
      const style12 = useAnimatedStyle(() => {
        return {
          transform: [{ translateY: translationY.value },{ translateX: translationX.value }],
        };
      });
      const ts = useAnimatedStyle(() => {
        return {
          transform: [{ translateY: ty1.value }],
        };
      });
      //#FCF5E5
      if (inPipMode) {
        return (
          <View style={{backgroundColor:"red",flex:1}} >
        <RTCView
        ref={v}
        mirror={true}
          objectFit={'cover'}
          style={{
           flex:1
          }}
          streamURL={remoteStream?.toURL()} />
          </View>
        );
      }
      return (
        <GestureHandlerRootView style={{flex:1}}>
        <View style={{flex:1,flexDirection:"column"}}>
           {pauselocal&&mainscreen || !mainscreen&&pause ?  <View pointerEvents="none" style={{position:"absolute",top:0,bottom:0,right:0,left:0,justifyContent:"center",alignItems:"center",zIndex:1}}>
                <View style={{backgroundColor:"black",paddingHorizontal:10,borderRadius:10}}>
                <Text style={{color:"white",fontSize:27,fontWeight:"600"}} >Duraklatıldı</Text>
    
                </View>
                </View>:null}
          
           {localStream && 
           
                <>
                <View style={{flex:1,backgroundColor:"#141414"}}>
                <View style={{flex:5,justifyContent:"flex-start",alignItems:"center",paddingTop:StatusBar.currentHeight}}>
                  <View style={{flexDirection:"row",height:120,width:"100%",justifyContent:"center",alignItems:"center"}}>
                 
                  {pp ? <Image source={{uri:pp}} style={{width:120,height:120,borderRadius:60,justifyContent:"center"}}></Image>:<User style={{color:"red"}} width={120} height={120}></User>}
                  
                </View>
                <Text style={{color:"white",fontSize:36,fontWeight:"300"}}>{callername}</Text>
                <Text style={{color:"grey",fontSize:18,fontWeight:"300"}}>{time}</Text>
                </View>
               
     {mutelocal&&mainscreen || !mainscreen&&mute  ? <View style={{position:"absolute",bottom:175,right:0,left:0,height:75,justifyContent:"center",alignItems:"center"}}><Text style={{color:"white",fontSize:25,fontWeight:"600"}}>Sessiz</Text></View>:null}
    
     <Animated.View style={[{flexDirection: "row",justifyContent:"space-between",alignItems:"flex-end",flex:1,marginBottom:48},style1]}>
                {callscreen ? <Animated.View style={[{flexDirection:"row",justifyContent:"space-evenly",alignItems:"flex-start",flex:1,width:"100%",paddingBottom:0}]}>
          
          <View style={{borderRadius:50,width:100,height:100}}>
          <TouchableNativeFeedback
          onPress={()=>{
            socket.current.emit("endCall",otheridcall.current,notid)
            socket.current.emit("endCall",otherid,null)
            if(inPipMode){
              df.stopcall("Audio")
      
            }else{
              df.stopcall1("Audio")
            }
          if(socket.current!==null){
            a()
    
          }
            setTimeout(() => {
              
              storage.delete("svc")
            }, 100);
           //BackHandler.exitApp() 
          }}
          background={TouchableNativeFeedback.Ripple("grey",true)}
          >
          <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
     <Decline width={height/13} height={height/11} style={{color:"red",borderRadius:height/10}} ></Decline>
     </View>
     
          </TouchableNativeFeedback>
          </View>
          <View style={{borderRadius:50,width:100,height:100}}>
          <TouchableNativeFeedback
          onPress={()=>{
           setcallscreen(false)
           processAccept()
           
           
          }}
          background={TouchableNativeFeedback.Ripple("grey",true)}
          >
          <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
     <Decline width={height/13} height={height/11} style={{color:"green",borderRadius:height/10,transform:[{rotate:"230deg"}]}} ></Decline>
     </View>
     
          </TouchableNativeFeedback>
          </View>
     </Animated.View> :<><View style={{ width: 100, height: 100, borderRadius: 50, textAlign: "center", justifyContent: "center", alignItems: "center" }}>
          <TouchableNativeFeedback
              style={{}}
              onPress={() => {
                  toggleSpeaker();
              } }
              background={TouchableNativeFeedback.Ripple(
                  "grey",
                  true
              )}
          >
              <View style={{ width: "100%", height: "100%", flex: 1, backgroundColor: "#141414", justifyContent: "center", alignItems: "center" }}>

                  {muted ? <Volume style={{ color: "#D7D7D7" }} width={42} height={42} /> :
                      <Muted style={{ color: "#D7D7D7" }} width={41} height={41} />}
              </View>


          </TouchableNativeFeedback>
      </View><View style={{ width: 100, height: 100, borderRadius: 50, textAlign: "center", alignItems: "center", justifyContent: "center" }}>
              <TouchableNativeFeedback
                  style={{}}
                  onPress={() => {
                      toggleMic();
                  } }
                  background={TouchableNativeFeedback.Ripple(
                      "grey",
                      true
                  )}
              >
                  <View style={{ width: "100%", height: "100%", flex: 1, backgroundColor: "#141414", justifyContent: "center", alignItems: "center" }}>

                      {mutelocal ? <Micoff style={{ color: "#D7D7D7", transform: [{ scaleX: -1 }] }} width={42} height={42} /> :
                          <Micon style={{ color: "#D7D7D7" }} width={41} height={41} />}

                  </View>


              </TouchableNativeFeedback>
          </View><View style={{ width: 100, height: 100, borderRadius: 50, textAlign: "center", justifyContent: "center", alignItems: "center" }}>
              <TouchableNativeFeedback
                  style={{}}
                  onPress={() => {
                    socket.current.emit("endCall",otheridcall.current,notid)
                    socket.current.emit("endCall",otherid,null)
                    if(inPipMode){
                      df.stopcall("Audio")
              
                    }else{
                      df.stopcall1("Audio")
                    }
                  if(socket.current!==null){
                    a()
            
                  }
                    setTimeout(() => {
                      
                      storage.delete("svc")
                    }, 100);
                  } }
                  background={TouchableNativeFeedback.Ripple(
                      "grey",
                      true
                  )}
              >
                  <View style={{ width: "100%", height: "100%", backgroundColor: "#141414", justifyContent: "center", alignItems: "center" }}>

                      <Decline style={{ color: "red", transform: [{ scaleX: -1 }] }} width={42} height={42} />

                  </View>


              </TouchableNativeFeedback>
          </View></> }        
              </Animated.View>
              </View>
              </>
          }
          
           {remoteStream &&  
           
           <GestureDetector gesture={ges}>
           <Animated.View style={[{position:"absolute",
            top:40,
        right:10,
        height:250,
          width:150,
          borderColor: 'grey',
       
          borderWidth: 3.5,
          borderRadius:12,
          overflow:"hidden",
          backgroundColor:"black"
          },style12]}
            onTouchEnd={toggleScreen}
            >
    <View style={{backgroundColor:"black",flex:1}} >
            <RTCView
            ref={v}
            mirror={true}
              objectFit={'cover'}
              style={{
               flex:1
              }}
              streamURL={!mainscreen? localStream.toURL():remoteStream?.toURL()} />
              </View>
              {pauselocal===true&&mainscreen===false || pause===true&&mainscreen ?  <View style={{position:"absolute",top:0,bottom:0,right:0,left:0,justifyContent:"center",alignItems:"center",backgroundColor:"black"}}>
    
      <Text style={{color:"white"}} >Duraklatıldı</Text>
    
      </View>:null}
    
    {mutelocal&&!mainscreen || mainscreen&&mute  ? <View style={{position:"absolute",bottom:20,right:0,left:0,height:75,justifyContent:"center",alignItems:"center"}}><Text style={{color:"white"}}>Sessiz</Text></View>:null}
              </Animated.View></GestureDetector> }
             
        </View>
        </GestureHandlerRootView>
      )
}