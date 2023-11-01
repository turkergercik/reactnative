import { View,Text,TouchableOpacity, Alert ,Image,StatusBar,Dimensions,useWindowDimensions} from 'react-native'
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
import Animated ,{ Extrapolation,useAnimatedKeyboard, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withTiming,AnimatedLayout, FadeIn, Layout, SlideInDown, SlideInUp, SlideOutUp, SlideInRight, SlideInLeft } from 'react-native-reanimated'
import Micoff from "../images/micoff.svg"
import Micon from "../images/micon.svg"
import Camon from "../images/camon.svg"
import Camoff from "../images/camoff.svg"
import Decline from "../images/decline.svg"
import Switchcam from "../images/switchcam.svg"
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { Gesture, GestureDetector, GestureHandlerRootView,ScrollView } from 'react-native-gesture-handler';
const as= StatusBar.currentHeight
let x
export default function Videocall({navigation,route}) {
  const { height, width } = useWindowDimensions();
    const{auth,setauth,messages,setmessages,currentconv,setcurrentconv,messageRef,server,socket,remoteRTCMessage,callst,state,seticall,offlinepause,setcalli}=useAuthorization()
    const [type, setType] = useState('JOIN');
    const [pause, setpause] = useState(false);
    const [pauselocal, setpauselocal] = useState(false);
    const [mute, setmute] = useState(false);
    const [mutelocal, setmutelocal] = useState(false);
    const tY= useSharedValue(0)
    const translationY= useSharedValue(0)
    const translationX= useSharedValue(0)
    const finalY= useSharedValue(0)
    const finalX= useSharedValue(0)
    const yc= useSharedValue(0)
    const xc= useSharedValue(0)
    const [mainscreen, setmainscreen] = useState(true);
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
  const [isFront, setisFront] = useState(true);
  const [t, sett] = useState(false);
  const video =useRef(null)
  const audio =useRef(null)
  const check =useRef([])
  const che =useRef(false)
  let streams
  const callnotif = useRef(null);  
    let call1= route?.params?.call
    let otherid= route?.params?.otherid
    let convid = route?.params?.convid
    let sdp = route?.params?.sdp
    let notid= route?.params?.notid
  let info = route?.params?.info
useEffect(()=>{
translationX.value=0
translationY.value=0
finalX.value=0
finalY.value=0
xc.value=0
yc.value=0

},[height])


useEffect(()=>{
if(remoteStream){
  //setcalli(false)
}
  
  },[remoteStream])
    useEffect(() => {
      
     SystemNavigationBar.setNavigationColor("transparent","dark")
      /* InCallManager.start()
      InCallManager.setForceSpeakerphoneOn(true); */
        if(state.userId){
          console.log(state.userId)
        //setcallst(true)
        socket.current.on('callAnswered', async(data) => {
          InCallManager.stopRingtone()
          setType(true)
       che.current=true
          /*   check.current.forEach((e)=>{
              
              console.log(e,7777)
              sendICEcandidate(e)

           
          }) */
           
                      remoteRTCMessage.current.rtcMessage = data.rtcMessage;
                     
                console.log(8888)
        
                  await  peerConnection.current.setRemoteDescription(
                    new RTCSessionDescription(remoteRTCMessage.current.rtcMessage),
                  );
               
                  
          

        });
    
        socket.current.on('answer', data => {
        
        });
        socket.current.on('videopaused', data => {
if(data==="video"){

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
                setcalli(false)
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
            video: {
              mandatory: {
                minWidth: 500, // Provide your own width, height and frame rate here
                minHeight: 300,
                minFrameRate: 30,
              },
              facingMode: isFront ? 'user' : 'environment',
            },
          })
          .then(async(stream) => {
            // Got stream!
           streams=stream
           //timer.current=peerConnection.current.getSenders()
           //stream.forEach((a)=>{})
           ls.current=stream
            setlocalStream(stream);
            console.log(stream)
            stream.getVideoTracks()[0].muted=true
             //peerConnection.current.addStream(stream);
            // setup stream listening
            video.current=peerConnection.current.addTrack(stream.getVideoTracks()[0],stream)
            audio.current=peerConnection.current.addTrack(stream.getAudioTracks()[0],stream)
            if(call1==="outchat"){
              if(otherid){
           
                processAccept()
                
              }
            }else if(call1==="notification"){
              if(info){

                console.log(6666666)
                remoteRTCMessage.current.rtcMessage=info.sdp
                 processAccept().then(()=>{
setTimeout(() => {
  
  //setcalli(false)
}, 500);

                 })
             
              }
            }else{
           
             // await peerConnection.current.setLocalDescription(null);
                processCall()
             
            }
          })

         }
            s()

    
        peerConnection.current.ontrack = event => {
    if(offlinepause.current.video===false){
      p.current=true
      setpause(true)
    }
    if(offlinepause.current.audio===false){
      m.current=true
      setmute(true)
    }
   console.log(event.streams[0].getVideoTracks()[0],state.userId)
          setRemoteStream(event.streams[0]);
        
        };
peerConnection.current.onnegotiationneeded = (event) => {
/*  if(ls.current){
  Alert.alert("89")
  setTimeout(() => {
    console.log(localStream)
    ls.current.getVideoTracks()[0].enabled=false
   peerConnection.current.addTrack(video.current,ls.current)
   processCall()
   // peerConnection.current.addTrack(video.current,localStream)
    
  }, 1000);
 } */
 
 
};
       /*  peerConnection.current.addEventListener( 'negotiationneeded', event => {
          processCall()
        } ); */
/* 
        peerConnection.current.onicegatheringstatechange = e => {
         sett(peerConnection.current.iceGatheringState)
          switch (peerConnection.current.iceGatheringState) {
            case "gathering":
              // collection of candidates has begun
              break;
            case "complete":
              // collection of candidates is finished
              break;
          
              default:
                  console.log('icegatheringChange: state not complete')
                  break
          }
      } */
        // Setup ice handling
        /* peerConnection.current.addEventListener( 'iceconnectionstatechange', event => {
          sett(peerConnection.current?.iceConnectionState)
          switch( peerConnection.current?.iceConnectionState ) {
            case 'connected':

            case 'completed':
              
              case "failed":

              // You can handle the call being connected here.
              // Like setting the video streams to visible.
        
              break;
          };
        } ); */

        /* peerConnection.current.addEventListener( 'icegatheringstatechange', event => {
          sett(peerConnection.current?.iceConnectionState)
          switch( peerConnection.current?.iceConnectionState ) {
            case 'connected':

            case 'completed':
              
              case "failed":

              // You can handle the call being connected here.
              // Like setting the video streams to visible.
        
              break;
          };
        } ); */
        
        

        peerConnection.current.onicecandidate = async(event)=> {
          
            //clearTimeout(timer.current)
            let sessionDescription
            if (event.candidate) {
           
             // x+=1
              
              let a={
                calleeId: otherid,
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
      
        return () => {
          SystemNavigationBar.setNavigationColor("transparent","light")
          StatusBar.setHidden(false)
          //StatusBar.setTranslucent(true)
       //StatusBar.setBackgroundColor("yellow")
          
          //setType(null)
          offlinepause.current.video=true
          offlinepause.current.audio=true

          check.current=null
          seticall(false)
          socket.current.emit("endCall",otherid)
          peerConnection.current.close()
          peerConnection.current=null
          callst.current=false
          streams?.getTracks().forEach(
            track => track.stop()
        );
          //socket.current.off('newCall');
          socket.current.off('callAnswered');
          socket.current.off('ICEcandidate');
          socket.current.off('videopaused');
          
        }
      
      }, []);








useEffect(()=>{
  if(type===true){
  
  sendICEcandidate({calleeId:otherid,rtcMessage:check.current})

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
       
        callnotif.current=sessionDescription
        sendCall({
          callerId:state.userId,
          calleeId: otherid,
          rtcMessage: sessionDescription,
          notid:notid,
          callerName:state.userName
       
        });
        } catch (error) {
          
        }
        
      }
    
      async function processAccept() {

        try {
         peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(remoteRTCMessage.current.rtcMessage)
        );
        const sessionDescription = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(sessionDescription);
        answerCall({
          callerId: otherid,
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
        setisFront(!isFront)
        localStream.getVideoTracks().forEach(track => {
          track._switchCamera();
        });
      }
      function toggleCam(){
        console.log("ok")
        if(type===true){
          socket.current.emit("videopaused",otherid,"video")
         
        }else{
  socket.current.emit("offlinepause",otherid,"video",state.userId)
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
        socket.current.emit("videopaused",otherid,"audio")
       
      }else{
socket.current.emit("offlinepause",otherid,"audio",state.userId)
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
          tY.value=withTiming(75+48,{duration:150})
          menu.current=true
          SystemNavigationBar.navigationHide()
          StatusBar.setHidden(true)
        }else{
          tY.value=withTiming(0,{duration:150})
          menu.current=false
          SystemNavigationBar.navigationShow()
          StatusBar.setHidden(false )
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
  return (
    <View style={{flex:1,flexDirection:"column"}}>
       {pauselocal&&mainscreen || !mainscreen&&pause ?  <View pointerEvents="none" style={{position:"absolute",top:0,bottom:0,right:0,left:0,justifyContent:"center",alignItems:"center",zIndex:1}}>
  <View style={{backgroundColor:"black",paddingHorizontal:10,borderRadius:10}}>
  <Text style={{color:"white",fontSize:27,fontWeight:"600"}} >Duraklatıldı</Text>

  </View>
</View>:null}
      
       {localStream && 
       
          <>
          <View style={{flex:1}}
          onTouchEnd={togglemenu}
          >
       <RTCView
           // onTouchEnd={toggleScreen()}
          mirror={isFront ? true:false}
          objectFit={'cover'}
          style={{ flex: 1 }}
          streamURL={mainscreen? localStream.toURL():remoteStream?.toURL()} /></View>
 {mutelocal&&mainscreen || !mainscreen&&mute  ? <View style={{position:"absolute",bottom:175,right:0,left:0,height:75,justifyContent:"center",alignItems:"center"}}><Text style={{color:"white",fontSize:25,fontWeight:"600"}}>Sessiz</Text></View>:null}

          <Animated.View style={[{borderWidth:2,borderColor:"purple",position:"absolute",backgroundColor:"#FCF5E5",borderTopLeftRadius:15,borderTopRightRadius:15,flexDirection: "row",height:75+48,bottom:0,right:0,left:0,justifyContent:"center"},style1]}>
            
            <TouchableOpacity style={{paddingBottom:48,flex: 1 ,borderTopLeftRadius:15,backgroundColor: "#FCF5E5",textAlign: "center",justifyContent:"center",alignItems:"center"}}
              onPress={() => {
                switchCamera();
              } }

            >
                       <Switchcam width={45} height={45}/>


            </TouchableOpacity>


            <TouchableOpacity style={{paddingBottom:48, flex: 1, textAlign: "center", backgroundColor:"#FCF5E5",justifyContent:"center",alignItems:"center"}}
              onPress={() => {
                seticall(false)
                navigation.goBack();
              } }

            >
            <Decline  style={{color:"red",transform: [{ scaleX: -1 }]}} width={42} height={42}/>
            </TouchableOpacity>



            <TouchableOpacity style={{paddingBottom:48, flex: 1, textAlign: "center", backgroundColor: "#FCF5E5",justifyContent:"center",alignItems:"center"}}
              onPress={() => {
                toggleCam()
              } }

            >
             {pauselocal ?  <Camoff width={51} height={51}/>:
            <Camon  width={50} height={50}/>
            }
              


            </TouchableOpacity>



            <TouchableOpacity style={{paddingBottom:48, borderTopRightRadius:15,flex: 1, textAlign: "center", backgroundColor: "#FCF5E5",alignItems:"center",justifyContent:"center"}}
              onPress={() => {
                toggleMic()
              } }

            >
            {mutelocal ?  <Micoff style={{transform: [{ scaleX: -1 }]}} width={42} height={42}/>:
            <Micon  width={41} height={41}/>
            }
           
            </TouchableOpacity>
            
            
          </Animated.View></>
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
  )
}