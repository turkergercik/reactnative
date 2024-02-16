import { View, NativeModules,Text,LayoutAnimation ,StyleSheet,Modal,FlatList, StatusBar,KeyboardAvoidingView,useWindowDimensions, Alert,BackHandler,TouchableOpacity,Keyboard,Dimensions, TurboModuleRegistry } from 'react-native'
import React,{useContext,useEffect, useState,useRef,useCallback} from 'react'
import { useAuthorization } from '../Authcontext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRoute,useIsFocused, LinkingContext } from '@react-navigation/native'
import axios from 'axios'
import { Image } from 'react-native'
import Mess from '../components/mess'
import Conv from '../components/conv'
import { TextInput as Ti } from 'react-native'
import { Gesture, GestureDetector, GestureHandlerRootView,ScrollView } from 'react-native-gesture-handler';
import Animated ,{ Extrapolation,useAnimatedKeyboard, interpolate, runOnJS,useAnimatedStyle, useSharedValue, withDelay, withTiming,AnimatedLayout, FadeIn, Layout, SlideInDown, SlideInUp, SlideOutUp, SlideInRight, SlideInLeft, withSpring,Easing, LinearTransition, withRepeat, withSequence, SlideOutDown, SlideOutLeft } from 'react-native-reanimated'
//import ImageView from "react-native-image-viewing";
import ImageViewer from "react-native-reanimated-image-viewer";
//import ImageViewer from './imageviewerback'
import SystemNavigationBar from 'react-native-system-navigation-bar';
import Photo from '../components/photo'
import { useDispatch, useSelector } from "react-redux";
import { signIn, setmpeop, setpeop,setmessages,setcurrentconv  } from "../redux/counter.js"
//import Modal from "react-native-modal";
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view'
import { useAnimatedScrollHandler } from 'react-native-reanimated'
import Mess2 from '../components/mess2'
import ShortUniqueId from 'short-unique-id';
import {useKeyboard} from '@react-native-community/hooks'
import  {Camera,useCameraFormat,useCameraDevices,useCameraDevice,fin} from 'react-native-vision-camera'
import Canvas,{Image as Canvasımage} from 'react-native-canvas';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { PermissionsAndroid, Platform } from "react-native";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import ImageResizer from '@bam.tech/react-native-image-resizer';
import Orientation from 'react-native-orientation-locker'
import User from "../images/user.svg"
import { Button,Icon,IconButton,TextInput,Menu ,Divider,Portal,Dialog,Avatar} from 'react-native-paper'
import FileViewer from "react-native-file-viewer";
import ImageView from "better-react-native-image-viewing";
import Gallery, { GalleryRef } from 'react-native-awesome-gallery';
import { FlashList } from '@shopify/flash-list'
import BigList from "react-native-big-list";
import { storage } from '../Authcontext'
let ssd
const {pause}=NativeModules
let x
const {width,height} =Dimensions.get("window")
const height1=Dimensions.get("screen").height
//const navbar=height1-height-StatusBar.currentHeight
const as= StatusBar.currentHeight
let img
export async function deleteconv(mpeop1f,otherf,otheridf,notid,state,me,authContext,prt){
  let k 
  state.mpeop.find((item,index)=>{
     if(item._id===mpeop1f._id){
      return k=index
     }
    }
  )
  console.log(k,"üüüüüüü")
  let mpeop=[]
  let object={
    sendername:state.userName,
    receivername:otherf,
    senderid:state.userId,
    receiverid:otheridf,
  receivernotificationid:notid
  }
    if(me==="sender"){
      object["senderdeleted"]=true
      mpeop1f.sender.delete=true
      if(mpeop1f.receiver.delete===true){
        state.mpeop.splice(k,1)
       
       }
    }else{
      mpeop1f.receiver.delete=true
      object["receiverdeleted"]=true
      if(mpeop1f.sender.delete===true){
        state.mpeop.splice(k,1)
       
       }
    }
    //close()
    mpeop=[...state.mpeop]
    
    authContext.setmpeop(mpeop)
    /* await AsyncStorage.setItem("mpeop",JSON.stringify(mpeop))
    await AsyncStorage.removeItem(mpeop1._id) */
    storage.set("mpeop",JSON.stringify(mpeop))
    storage.delete(mpeop1f._id)

    await axios.put(`${prt}/conversations/${mpeop1f._id}`,object).then(async(res)=>{
      console.log(res.data)

      



if(res.data==="updated"){
  /* if(me==="sender"){
    

   }else{
      
   } */
   mpeop=[...state.mpeop]





}else if(res.data==="deleted"){


}else{
  //mpeop=[...state.mpeop,res.data]
}
  

//authContext.setmpeop(mpeop)


//ne =[{_id:res.data._id,members:[na.id,person._id,na.name,person.name,true,true]}]
//ne[0]._id=res.data._id
//message(pre=>[...pre,res.data])
//chec(person.name)
}).catch((err)=>{console.log(err)})


  //await AsyncStorage.removeItem(mpeop1._id)


}




const Chatid = ({route,navigation,setmesnotif}) => {
  
const windowSize =messages?.length > 50 ? messages.length/4 : 21;
let num =100 
let initialLoadNumber = 40 
  async function hasAndroidPermission() {
    
    const getCheckPermissionPromise = async() => {
      if (Platform.Version >= 33) {
        return Promise.all([
          PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
          PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission,
        );
      } else {
        return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      }
    };
  
    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }
    const getRequestPermissionPromise = async() => {
      menuopens.current=true
      if (Platform.Version >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          (statuses) =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((status) => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };
  
    return await getRequestPermissionPromise();
  }
  



  const keyboardh = useKeyboard().keyboardHeight
  const d =new ShortUniqueId({length:10})
  const scrollY = useSharedValue(0)
  const st = useSharedValue(0)
  const stat1 = useSharedValue(0)
  const key = useSharedValue(0)
  const stickydatestyle = useSharedValue(as)
  const scrollHandler = useAnimatedScrollHandler((event) => {
    console.log("45")
    scrollY.value = event.contentOffset.y})
  const {fontScale} = useWindowDimensions(); // import useWindowDimensions()
/*   const data=[{"__v": "_id": "640f77ce4adac71e5768f41a", "conversationid": "6373375a8f3d293cc082f78f", "createdAt": "2023-03-13T19:21:50.384Z", "sender": "62d6c7b8f4925109c40a5ae1", "text": "J", "updatedAt": "2023-03-13T19:21:50.384Z"}, 
  {"__v": 0, "_id": "640e2f8088790ff0e94fad67", "conversationid": "6373375a8f3d293cc082f78f", "createdAt": "2023-03-12T20:01:04.628Z", "sender": "62d6c7b8f4925109c40a5ae1", "text": "Parselasyon planı Belediyemiz ilan tahtasında asılmış olup, parselasyon plamı, dağıum cetveli ve", "updatedAt": "2023-03-12T20:01:04.628Z"}
,{"__v": 0, "_id": "640f77ce4adac71e5768f41a", "conversationid": "6373375a8f3d293cc082f78f", "createdAt": "2023-03-13T19:21:50.384Z", "sender": "62d6c7b8f4925109c40a5ae1", "text": "J", "updatedAt": "2023-03-13T19:21:50.384Z"}, 
{"__v": 0, "_id": "640e2f8088790ff0e94fad67", "conversationid": "6373375a8f3d293cc082f78f", "createdAt": "2023-03-12T20:01:04.628Z", "sender": "62d6c7b8f4925109c40a5ae1", "text": "Parselasyon planı Belediyemiz ilan tahtasında asılmış olup, parselasyon plamı, dağıum cetveli ve", "updatedAt": "2023-03-12T20:01:04.628Z"}
,{"__v": 0, "_id": "640f77ce4adac71e5768f41a", "conversationid": "6373375a8f3d293cc082f78f", "createdAt": "2023-03-13T19:21:50.384Z", "sender": "62d6c7b8f4925109c40a5ae1", "text": "J", "updatedAt": "2023-03-13T19:21:50.384Z"}, 
{"__v": 0, "_id": "640e2f8088790ff0e94fad67", "conversationid": "6373375a8f3d293cc082f78f", "createdAt": "2023-03-12T20:01:04.628Z", "sender": "62d6c7b8f4925109c40a5ae1", "text": "Parselasyon planı Belediyemiz ilan tahtasında asılmış olup, parselasyon plamı, dağıum cetveli ve", "updatedAt": "2023-03-12T20:01:04.628Z"}
,{"__v": 0, "_id": "640f77ce4adac71e5768f41a", "conversationid": "6373375a8f3d293cc082f78f", "createdAt": "2023-03-13T19:21:50.384Z", "sender": "62d6c7b8f4925109c40a5ae1", "text": "J", "updatedAt": "2023-03-13T19:21:50.384Z"}, 
{"__v": 0, "_id": "640e2f8088790ff0e94fad67", "conversationid": "6373375a8f3d293cc082f78f", "createdAt": "2023-03-12T20:01:04.628Z", "sender": "62d6c7b8f4925109c40a5ae1", "text": "Parselasyon planı Belediyemiz ilan tahtasında asılmış olup, parselasyon plamı, dağıum cetveli ve", "updatedAt": "2023-03-12T20:01:04.628Z"}
,{"__v": 0, "_id": "640f77ce4adac71e5768f41a", "conversationid": "6373375a8f3d293cc082f78f", "createdAt": "2023-03-13T19:21:50.384Z", "sender": "62d6c7b8f4925109c40a5ae1", "text": "J", "updatedAt": "2023-03-13T19:21:50.384Z"}, 
{"__v": 0, "_id": "640e2f8088790ff0e94fad67", "conversationid": "6373375a8f3d293cc082f78f", "createdAt": "2023-03-12T20:01:04.628Z", "sender": "62d6c7b8f4925109c40a5ae1", "text": "Parselasyon planı Belediyemiz ilan tahtasında asılmış olup, parselasyon plamı, dağıum cetveli ve", "updatedAt": "2023-03-12T20:01:04.628Z"}

]
 */
const images = [
  {
    uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
  },
  {
    uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
  },
  {
    uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
  },
];
const{auth,navbar,setauth,messages,setmessages,currentconv,messageRef,userid,server,state,socket,setstat,rr,stat,authContext,check,allm,setss,cam,setimg,img,setsomemessages,somemessages,menuopens,onlines,inchat,typing,currentother,setlastmesssages,incall}=useAuthorization()
let prt= server
let na={
  id:state.userId
}
  const a = useRoute()
  let other
  let otherid
  let me
  let id= route?.params?.id
  currentconv.current=id
  console.log(id,8888888)
  let notid= route?.params?.notid
  let pp = route?.params?.pp
  let mpeop =route?.params?.mpeop
  let messa= route?.params?.mess
  let newchat= route?.params?.newchat
  let re= route?.params?.re
  let pos= route?.params?.pos

  if(mpeop){
    if(na.id===mpeop.sender?.id){
      me="sender"
  other= mpeop.receiver.name
  otherid= mpeop.receiver.id
  currentother.current=otherid
    }else {
      me="receiver"
      other= mpeop.sender?.name
      otherid= mpeop.sender?.id
      currentother.current=otherid
    }
  } 

 const today = useRef(false)

  const scroll = useRef()
  const stickydatevalue = useRef(false)
  const secondload = useRef(true)
  const offsets = useRef([])
  const indexes = useRef([])
  const currentindex = useRef(0)
  const search = useRef(null)
  const input = useRef(null)
  const starttype = useRef(false)
  const inputT = useRef(null)
  const animate = useRef(null)
  

  //const { userToken,userId,server,peop,messages } = useSelector((state) => state.counter);
  //const dispatch = useDispatch();
 
  const page =useRef(1)
  const canvas=useRef(null)
  //const allm =useRef([])
  const[text,settext]=useState(null)
  const[toph,settoph]=useState(Dimensions.get("screen").height)
  const[stickydate,setstickydate]=useState(null)
  const[searchmode,setsearchmode]=useState(false)
  //const [img, setimg] = useState(null)
  const [inp, setinp] = useState(false)
  const [zi, setzi] = useState(true)
  const [scrolls, setscrolls] = useState(false)
  const [completed, setcompleted] = useState(true)
  const [w, setw] = useState(null)
  const [menu, setmenu] = useState(true)
  const [h, seth] = useState(null)
  const [changing, setchanging] = useState(false)
  const [headersarr, setheadersarr] = useState([0])
  
  const[focus,setfocus]=useState(false)
  const[camopen,setcamopen]=useState(false)
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const [visiblem, setIsVisiblem] = useState(false);
  const [chatoptions, setchatoptions] = useState(false);
  const [offset, setOffset] = useState(1)
  const [online,setonline]=useState(false)
  const [inchats,setinchats]=useState(false)
  const [searchvisibility,setsearchvisibility]=useState(false)

  
  const [typings,settypings]=useState(false)
  let headers={ Authorization:state.userToken}
  const scale= useSharedValue(1)
  const opacity= useSharedValue(1)
  const op= useSharedValue(1)
  const op1= useSharedValue(1)
  const op2= useSharedValue(1)
  const op3= useSharedValue(1)
  const translationX= useSharedValue(1)
  const translationY= useSharedValue(0)
  const keyboard= useSharedValue(-1)
  const transX= useSharedValue(0)
  const lastx= useSharedValue(0)
  const lasty= useSharedValue(0)
  const focalx= useSharedValue(0)
  const focaly= useSharedValue(0)
  const lastscale= useSharedValue(1)
  const initialTouchLocation = useSharedValue({ x: 0, y: 0 })


  //const deletefunc = deleteconv(mpeop,other,otherid,notid.current,state,authContext,prt)
  useEffect(()=>{
    
    let f =onlines?.find((item)=>
      
       item.userId===otherid
         
      
     )
     if(f){
       setonline(true)
       socket.current?.emit("inchat",otherid,currentconv.current)
     }else{
       setonline(false)
     }
   },[onlines])
   
 
   useEffect(()=>{
    //op.value=withRepeat(withSequence(withTiming(0),withTiming(1)),-1)
    //op1.value=withDelay(100,withRepeat(withSequence(withTiming(0),withTiming(1)),-1))
  
    let f =typing?.find((item)=>
      
       item===id
         
      
     )
     if(f){
     
       settypings(true)
       op1.value=withRepeat(withSequence(withTiming(0,conf),withTiming(1,conf)),-1)
       op2.value=withDelay(150,withRepeat(withSequence(withTiming(0,conf),withTiming(1,conf)),-1))
       op3.value=withDelay(300,withRepeat(withSequence(withTiming(0,conf),withTiming(1,conf)),-1))
     }else{
       settypings(false)
     }
    
   },[typing])
  

   useEffect(()=>{
    console.log(inchat,555)
    let f =inchat?.find((item)=>
       item.conversationid===id
         
      
     )
     if(f){
       setinchats(true)
     }else{
       setinchats(false)
     }
   },[inchat])

   useEffect(()=>{
    socket.current?.emit("inchat",otherid,id)
    return ()=>{
  
      socket.current?.emit("outchat",otherid,id)
      
    }
   },[])
  
   useEffect(()=>{
    if(changing!==false){
      if(starttype.current===false){
        console.log("o78")
        socket.current?.emit("typing",otherid,id)
        
      }
      starttype.current=true

    
     clearTimeout(x)
     x= setTimeout(() => {
      console.log("o77")
      socket.current?.emit("nottyping",otherid,id)
      starttype.current=false
    }, 1000);
  }
    return ()=>{
      
      
      
    }
   },[changing])
   useEffect(()=>{
console.log("787878787878")
   },[typings])
  const resizeImage = (base64Str,pos) => {
    return new Promise((resolve) => {
      let a = 0
    if(pos==="back"){
a= 90
    }
 ImageResizer.createResizedImage(base64Str,960,1280,"JPEG",100,a).then((e)=>{

  resolve(e.uri)

 })
 
      
    })
  }



const fetchImage = async (uri,pos) => {
     const resized1 = await resizeImage(uri,pos)
    const imageResponse1 = await fetch(resized1);
    const imageBlob1 = await imageResponse1.blob();
    const base64Data1 = await blobToBase64(imageBlob1);
    //console.log(base64Data1)
    return new Promise((resolve,reject)=>{
       resolve(String(base64Data1))
    })
  };
  
  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(String(reader.result));
      };
      reader.readAsDataURL(blob);
    })
  }
  const getData = () => { // When scrolling we set data source with more data.

    if( allm.current.length !== 0 && somemessages.length < allm.current.length ){
        setOffset(offset + 1);
        setsomemessages(allm.current.slice(0,offset*num ))
        //Alert.alert(allm.current[0].text)
         //We changed dataSource.
    }

};
  useEffect(()=> { //Here we setting our data source on first open.

    if(somemessages.length < messages.length){  
        if(offset == 1){
            setsomemessages(messages.slice(0,offset*initialLoadNumber ))
        }      
    }

}, []); 
useEffect(() => {
  
  hasAndroidPermission()
  
  check.current=newchat
  console.log(check.current)
  //StatusBar.setBackgroundColor("red")
  //SystemNavigationBar.setNavigationColor("red")

  return ()=>{
    
    //StatusBar.setBackgroundColor("black")
    cam.current=false
  }

  
}, [])

useEffect(()=>{
  if(re){
    
  fetchImage(re,pos).then((e)=>{
    route.params.re=null
    route.params.pos=null
setTimeout(() => {
  sendTextMessage(e)
  
}, 500);

  })
  
  }
  },[re])
  const animatedStyle12 = useAnimatedStyle(() => {
    
    return {
     
      opacity: opacity.value,
    };
  });
  /* const pinch= Gesture.Pinch().onStart((a)=>{
  }).onUpdate((a)=>{
    
    scale.value = a.scale
    focalx.value= a.focalX
    focaly.value= a.focalY
    //console.log(a.scale)
  }).onEnd((a)=>{
    lastscale.value=scale.value
     //scale.value=1
  })
const pan = Gesture.Pan().onUpdate((a)=>{
  if(zoom1.value===false){
  translationX.value=(a.translationX+lastx.value)/scale.value
  translationY.value=(a.translationY+lasty.value)
  console.log(a.absoluteY)}


}).onEnd((a)=>{
console.log(zoom1.value)
lastx.value=translationX.value
lasty.value=translationY.value
if(a.velocityY>=20 && zoom1.value===false){
  translationY.value=withTiming(height,{duration:400},(e)=>{
console.log(101)
if(e){
   runOnJS(setimg)(null)
 //translationY.value=0
 lasty.value=0
 //translationY.value=0
 

}
  })

 
 
}else{
  if(zoom1.value===false){
    lasty.value=0
    translationY.value=withTiming(0)

  }
  
}

})

  const st= useAnimatedStyle(()=>{
   return {
    transform:[
      {scale:lastscale.value},
  
    ]}
})
const f= useAnimatedStyle(()=>{
  const opacity = interpolate(-translationY.value,[-height,0],[0,1],{extrapolateRight:Extrapolation.CLAMP})
  return {
    opacity:opacity,
   transform:[
{translateY:translationY.value},

   ]}
})

const compose = Gesture.Simultaneous(
  pinch,pan
); */







function groupedDays(messages) {
  return messages.reduce((acc, el) => {
    //console.log(el)
    const messageDay = new Date(el.createdAt).toDateString()
    console.log(messageDay,78)
    if (acc[messageDay]) {
      return { ...acc, [messageDay]: acc[messageDay].concat([el]) };
    }
    return { ...acc, [messageDay]: [el] };
  }, {});
}
function generateItems(messages) {
  const days = groupedDays(messages);
  const sortedDays = Object.keys(days).sort(
    (x, y) =>new Date(y)-new Date(x)
  );
  const items = sortedDays.reduce((acc, date) => {
    const sortedMessages = days[date].sort(
      (x, y) => new Date(y.createdAt) - new Date(x.createdAt)
    );
const d = new ShortUniqueId({ length: 10 })
    return acc.concat([...sortedMessages,{ type: 'day',date:new Date(date),_id:d() }]);
  }, []);
  return items;
}




async function getmessages(){
  //const mess = await AsyncStorage.getItem(currentconv.current)
  const mess =storage.getString(currentconv.current)
  if(mess){
  allm.current=JSON.parse(mess)
  setmessages(allm.current)
  let m = JSON.parse(mess).slice(0,20)
  
   /*  function groupedDays1(messages) {
      let acc = {}
      messages.forEach(el => {
         const messageDay = new Date(el.createdAt).toLocaleDateString("tr-TR",{day:"2-digit",month:"long",year:"numeric"})
        if(acc[messageDay]){
           acc[messageDay]= [...acc[messageDay],el]
          //return { ...acc, [messageDay]: acc[messageDay].concat([el]) };
          
        }else{
          acc[messageDay]=[el]
          //return { ...acc, [messageDay]: [el] };

        }

       });
      return acc
    } */
    


      //dispatch( setmessages(m))
      //setmessages(JSON.parse(mess).slice(0,20))
      
   
    //console.log(JSON.parse(mess).slice(0,2))
  }else{

console.log(12)
   const convers = await axios.get(`${prt}/messages/${currentconv.current}`,{headers}).then(async(res)=>{
    if(res.data==="tokExp"){
  
      //localStorage.setItem("aut",JSON.stringify({"isA":false,"tok":"tokExp"}))
    }
    let rev = generateItems(res.data)
    let a=[]
   
 
    rev.forEach((e,l)=>{
    if(e.type ==="day"){
      a.push(l)
    }
      
      }
          )
    let d = a.findIndex((e,i)=>{
      if(e>=15 && e<=25){
        return i
      }
    })
    
    if(d!==-1){
    
    
      setmessages(rev.slice(0,a[d]+1))
    }else{
      setmessages(rev)
    }
    //dispatch(setmessages(rev))
   
    allm.current=rev 
    setmessages(rev)
    setsomemessages(rev.slice(0,initialLoadNumber))
   // messageRef.current=res.data.slice(0,20)
   storage.set(currentconv.current,JSON.stringify(rev))
   //await AsyncStorage.setItem(currentconv.current,JSON.stringify(rev))
    //const obj = {[up.cid]: res.data}
   
 }).catch((err)=>{
  setmessages([])
    console.log("olmadı")
  })

}
}

const ss = useAnimatedStyle(() => {
  return {
    marginTop:  stat1.value
    //transform: [{ translateY: stat1.value }],
  };
});


async function setnewmessages(){

  //const mess = await AsyncStorage.getItem(id)

  if(allm.current.length!==0){
    page.current=page.current+1
    let m = allm.current.slice(0,page.current*40)
    console.log(page.current)
    console.log("bok")
    dispatch(setmessages(m))
  }
}

const imageUrl = "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&w=2726&h=2047&dpr=1"
async function all(){
  let a = {date:new Date(Date.now()),type:"day",_id:d()}
  let b = [a]
  if(messages.length===0){
    today.current=true
    allm.current=[a]
    storage.set(currentconv.current,JSON.stringify(b))
    //await AsyncStorage.setItem(currentconv.current,JSON.stringify(b))
    setmessages([a])

  }else{
  let m =   storage.getString(currentconv.current)
 //let m = await AsyncStorage.getItem(currentconv.current)
  if(m){

    allm.current= JSON.parse(m)
    let x=[]
    allm.current.filter((item,i)=>{
      if(item.type!==undefined){
        x.push(i)
      }
    })
   console.log(x,585858)
    setheadersarr(x.reverse())
    //console.log(allm.current,554)
  }
  }
 
}



/* useEffect(() => {
//StatusBar.setTranslucent(true)
 
  if(stat===true){
    stat1.value=StatusBar.currentHeight
    
  }else{
    stat1.value=0
    
  
  }
  
  }, [stat]) */

  useEffect(() => { 
   /*  const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        key.value=e.endCoordinates.height
        //setKeyboardVisible(e.endCoordinates.height); // or some other action
        keyboard.value=withTiming(-e.endCoordinates.height,{
          duration: 50,
          easing: Easing.in(Easing.bezierFn(0.7, 0.88, 0.49, 0.95)),
        })
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setfocus(false)
        inputT.current.blur()
        //setKeyboardVisible(false); // or some other action
         keyboard.value=withTiming(0,{
          duration:150,
          easing: Easing.out(Easing.back(0)),
        })
      }
    );
 */

    
    console.log(messa)
    if(messa===false){
      console.log("e")
      getmessages()
    }else{
      all()
    }
    //dispatch(setcurrentconv(id))
    
  return ()=>{
    
   /*  keyboardDidHideListener.remove();
    keyboardDidShowListener.remove(); */
//dispatch(setmessages([]))
    setmessages([])
    setsomemessages([])
    currentconv.current=null
    today.current=false

  }
}, [])
async function foc(){
setfocus(true)
setinp(true)

}
/* useEffect(() => { 
  if(img){
    console.log("ok")
     //SystemNavigationBar.stickyImmersive()
    //translationY.value=0
   }


}, [img]) */
function ne(e){
setfocus(false)
currentindex.current=0
indexes.current=[]
let text = e.trim()
let x= allm.current.filter((item,i)=>{
 if(item.text?.toLowerCase().includes(text.toLowerCase())){
  indexes.current.push(i)
  return item
 }
  })
  if(indexes.current.length!==0){
    /* if(somemessages.length<190){
      setsomemessages(allm.current)
    } */

setTimeout(() => {
  scroll.current.scrollToIndex({
    animated: false,
    index: indexes.current[0],
    viewOffset:0,
    viewPosition: 0
  })
  scroll.current.scrollToIndex({
    animated: false,
    index: indexes.current[0],
    viewOffset:0,
    viewPosition: 0
  })
}, 0);
     

    
  }else{
setsearchvisibility(true)
setTimeout(() => {
  hideDialog()
}, 1000);
  }
  
  //console.log(x,indexes,55555)
  /* function doSetTimeout(i) {
    setTimeout(() => {
      console.log("2")
      scroll.current.scrollToIndex({
        animated: true,
        index: i,
        viewOffset:0,
        viewPosition: 0
      })
    }, 1000);
  }
  for (let i = 0; i < indexes.length; i++) {
    doSetTimeout(indexes[i])
  } */


}


async function sendTextMessage(media1){
  /* setcompleted(false)
  settext(null) */
  //animate.current?.prepareForLayoutAnimationRender()
  //LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  console.log(currentconv.current,state.userName)
  inputT.current.clear()
  let x = input.current
  input.current=null
  if(x && x !=="" || media1 ){
    if(media1){

    }else{
      x =x.trim()

    }
  let date=Date.now()
  console.log(date)

    let newmessage={
      _id:date,
      sender:na.id,
      senderName:state.userName,
      receiver:otherid,
      conversationid:currentconv.current,
      text:x,
      createdAt:date,
    }
    if(media1){
      newmessage.media=media1
      console.log(media1)
    }

   
    if(today.current===false){

      
      let a = {date:new Date(Date.now()),type:"day",_id:d()}
      let x = allm.current.find((e)=>{
    if(e.type!==undefined){
       return e

    }
      })
      if(new Date(x?.date).toDateString() === new Date(a.date).toDateString()){
     
       allm.current=[newmessage,...allm.current]        
       setmessages((e)=>[newmessage,...e])
       //setsomemessages((e)=>[newmessage,...e])

       //settext(null)
       today.current=true
      }else{

        //Alert.alert(x.date)
        setmessages((e)=>[newmessage,a,...e])
        //setsomemessages((e)=>[newmessage,a,...e])

        //settext(null)
        allm.current=[newmessage,a,...allm.current]
        console.log(allm.current,555)
        today.current=true
     
     
      }
      
  
    
    }else{
      
      setmessages((e)=>[newmessage,...e])
      //setsomemessages((e)=>[newmessage,...e])

      //settext(null)
      allm.current=[newmessage,...allm.current]
      

    }
    setmenu(true)
    
    setTimeout(async() => {
      try {
        storage.set(currentconv.current,JSON.stringify(allm.current))
        setlastmesssages(currentconv.current)
        //await AsyncStorage.setItem(currentconv.current,JSON.stringify(allm.current))
        if(check.current===true){
          let a= [...state.mpeop,mpeop]
          authContext.setmpeop(a)
          socket.current?.emit("newconversationonline",otherid,other,JSON.stringify(mpeop),JSON.stringify(newmessage),notid)
          storage.set("mpeop",JSON.stringify(a))
          //await AsyncStorage.setItem("mpeop",JSON.stringify(a))
          check.current=false
      
    
        }else{
    
          socket.current?.emit("send",JSON.stringify(newmessage),notid)
          await axios.post(`${prt}/messages`,newmessage).then(()=>{
            console.log("gg")
          }).catch((e)=>{
            console.log(e)
          })
        }
  
      } catch (error) {
        
      }
    }, 0);
  





  
  }else{
    console.log("nol")
  }
  console.log(text)
   setcompleted(true)
}


useEffect(()=>{
  if(messages.length>=150){
    console.log("45454545")
    setTimeout(() => {
      
      /* scroll.current.scrollToIndex({
        animated: false,
        index: 195,
        viewOffset:0,
        viewPosition: 0
      }) */
    }, 2000);
    
    

  }
  
  console.log(somemessages.length,757575)
if(focus===true){
  setTimeout(() => {
    

   
    //scroll.current.scrollTo({y:0,animated:true})
  }, 0);
 /*  setTimeout(() => {
    setOffset(1)
    //setsomemessages(messages.slice(0,40 ))
  }, 3000); */

}
//  setfocus(false)


},[focus,messages])
const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom =150;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};
function ad(){
     if(navigation.canGoBack()){
       navigation.goBack()

     }
}

const gesture = Gesture.Pan().hitSlop({left:0,width:20}).onUpdate((e)=>{
  if(e.translationX >= width/2){
  
    
    transX.value= withTiming(width,300,(e)=>{
if(e){
  runOnJS(ad)()
}
    }) 
   

    return
  }
  if(e.translationX<0){
    transX.value=0
    return
  }
  
  transX.value=e.translationX
  console.log("ok")
}).onEnd((e)=>{

  if(e.translationX < width/2){
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
   

    
  }
})
const animatedStyle1 = useAnimatedStyle(() => {
    
  return {
    //paddingTop:keyboard.value<0 ? 75+as +keyboardh: 75+as,
    //paddingBottom:keyboard.value? keyboard.value:0,
    transform:[{translateX:transX.value}]
  };
});
   const g= Gesture.Pan()
   
   .onStart((e)=>{

console.log(e)

   })
   const ges = Gesture.Exclusive(gesture,g)
   let last_time_scroll_completed=0
   let old_offset=0

   const maskElementPosition = useAnimatedStyle(() => {
    return {
      transform: [{rotate:"180deg"},{ translateY: -scrollY.value }],
      opacity:opacity.value
    }
  })


  //const keyboard1 = useAnimatedKeyboard({isStatusBarTranslucentAndroid:true});
  const slidesticky = useAnimatedStyle(() => {
    return {
      //marginBottom:keyboard.value ? -keyboard.value:0
      transform: [{ translateY: stickydatestyle.value}],
    };
  });
  const kstyle = useAnimatedStyle(() => {
    return {
      paddingTop:keyboard.value<0 ? 75+as +keyboardh: 75+as,
      //marginTop:keyboard.value? keyboard.value:0
    };
  });
 console.log(keyboard.value)
  const translateStyle12 = useAnimatedStyle(() => {
    return {
     marginTop:st.value
    };
  });
  let conf={duration:500}
  const fadestyle = useAnimatedStyle(() => {
    return {
     opacity:op1.value
    };
  });
  const fadestyle1 = useAnimatedStyle(() => {
    return {
     opacity:op2.value
    };
  });
  
  const fadestyle2 = useAnimatedStyle(() => {
    return {
     opacity:op3.value
    };
  })

  function lay(e){

      setw(Dimensions.get("window").width)
      seth(Dimensions.get("window").height)
    
   
  }
async function choose(){
  menuopens.current=true
  await launchImageLibrary({
  mediaType:"photo",
  maxHeight:1280,
  maxWidth:720,
  quality:1,
  includeBase64:true,
  assetRepresentationMode:"current",
}).then((e)=>{

  
  sendTextMessage(`data:image/jpeg;base64,${e.assets[0].base64}`)
//sendTextMessage(e.assets[0].base64)

}).catch(()=>{

})

}

const openMenu = () => setIsVisiblem(true);

  const closeMenu = () => setIsVisiblem(false);

function toggle(e){
 /*  if(e.trim().length===0){
    setmenu(true)
    
  }else{

    setmenu(false)
  } */
  setchanging(e)
  input.current=e
}
const onViewableItemsChanged = ({ viewableItems }) => {
  
    if (viewableItems && viewableItems.length) {
      const lastItem = viewableItems.pop();
      if (lastItem && lastItem.item) {
        let m =null
        if(lastItem.item.type){
          m=lastItem.item.date
         
  
         }else{
          m=lastItem.item.createdAt
          
         }
         let now = new Date(Date.now())
    let t
    if(new Date(m).getFullYear()===now.getFullYear()){
      switch(now.getDate()-new Date(m).getDate()){
        case 0:
         t="Bugün"
        break
        case 1:
          t="Dün"
        break
        default:
          t= new Date(m).toLocaleDateString("tr-TR",{day:"numeric",month:"long",weekday:"long"})
      }
    }else{
      console.log(12)
      t=new Date(m).toLocaleDateString("tr-TR",{day:"2-digit",month:"long",year:"numeric"})
  
    }
    
       setstickydate(t)        
       }
     }
  }
 
    
    
  
  


const viewabilityConfig = { itemVisiblePercentThreshold:30,waitForInteraction:false,minimumViewTime:0 };

const viewabilityConfigCallbackPairs = useRef([
  { viewabilityConfig, onViewableItemsChanged },
]);
function updateheader({ viewableItems, changed }){
 
  if (viewableItems && viewableItems.length) {
    const lastItem = viewableItems.pop();
    if (lastItem && lastItem.item) {
      let m =null
      if(lastItem.item.type){
        m=lastItem.item.date
       

       }else{
        m=lastItem.item.createdAt
        
       }
       let now = new Date(Date.now())
  let t
  if(new Date(m).getFullYear()===now.getFullYear()){
    switch(now.getDate()-new Date(m).getDate()){
      case 0:
       t="Bugün"
      break
      case 1:
        t="Dün"
      break
      default:
        t= new Date(m).toLocaleDateString("tr-TR",{day:"numeric",month:"long",weekday:"long"})
    }
  }else{
    console.log(12)
    t=new Date(m).toLocaleDateString("tr-TR",{day:"2-digit",month:"long",year:"numeric"})

  }
  console.log(new Date(m).getFullYear(),now.getFullYear())
  setstickydate(t)
      
     }
   }

}

const keyExtractor = useCallback((item,index) => `${item._id}`, []);
function hideDialog(){
  setsearchvisibility(false)
}
     return (
    <GestureDetector gesture={gesture}>

      <Animated.View    onLayout={(e)=>{
            
              }} style={[animatedStyle1,{flex:1,backgroundColor:"#141414",flexDirection:"column",justifyContent:"space-between"}]}>
                <Portal>
          <Dialog visible={searchvisibility} onDismiss={hideDialog} style={{paddingVertical:5,marginHorizontal:40,justifyContent:"center",alignItems:"center",backgroundColor:"#6538c6"}}>
            
            <Dialog.Content style={{}}>
              <Text style={{color:"white",fontWeight:"300",fontSize:23/fontScale}} variant="bodyMedium">Mesaj Bulunamadı</Text>
            </Dialog.Content>
          </Dialog>
        </Portal>
                <Animated.View  style={[slidesticky,{position:"absolute",width:"100%",zIndex:1,justifyContent:"flex-start",alignItems:"center"}]}>
                  <Text style={{backgroundColor:"#252525",padding:5,borderRadius:10,fontSize:15/fontScale,fontWeight:"300",color:"white"}}>{stickydate}</Text>
                </Animated.View>
            
                <View style={{ marginTop:as,flexDirection: "row", height: 75, backgroundColor: "#141414", justifyContent: "space-between", alignItems: "center" ,zIndex:1}}>
                     {!searchmode ?  <><View style={{ flexDirection: "row", alignItems: "center" }}>
               <IconButton icon={"arrow-left"} size={30} iconColor='white' style={{ margin: 0 }} onPress={() => {
                 navigation.goBack()
               } }>

               </IconButton>
               <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={online && inchats ? ["green", "green"] : online ? ['#21D4FD', '#B721FF'] : ["#141414", "#141414"]} style={{ width: 68, height: 68, borderRadius: 35, justifyContent: "center", alignItems: "center", marginRight: 5 }}>

                 {pp ? <Image style={{ height: 60, width: 60, marginHorizontal: 5, borderRadius: 70, resizeMode: "cover" }} source={{ uri: pp }} /> : <User style={{ color: "#6538c6" }} width={60} height={60} />}
               </LinearGradient>
               <Text style={{ color: "white" }} onPress={() => Alert.alert(currentconv.current)}>{other}</Text>

             </View><View style={{ flexDirection: "row", alignItems: "center" }}>
             <IconButton icon={"draw"} size={30} iconColor='white' rippleColor={"grey"} style={{ margin: 0 }} onPress={() => {
                   console.log("ol")
                   /* setstat(true)
                   setTimeout(() => {
                     setstat(false)
                   }, 1500); */
                   /* storage.set("callnotif",JSON.stringify(true))
         socket.current.emit("dc1",state.userId)
         socket.current=null */
         /* menuopens.current=true */
                  
                   inputT.current.blur()
                   navigation.navigate("Draw",{otherid:otherid})
                 }}>


                 </IconButton>
                 <IconButton icon={"video"} size={30} iconColor='white' rippleColor={"grey"} style={{ margin: 0 }} onPress={() => {
                   console.log("ol")
                   /* setstat(true)
                   setTimeout(() => {
                     setstat(false)
                   }, 1500); */
                   inputT.current.blur()
                   menuopens.current=true
                   storage.set("svc","true")
                  storage.set("calldetails",JSON.stringify({convid:id,otherid:otherid,notid:notid,entrytype:"call",callerName:other,type:"Video"}))
                   pause.startcall(
                     "Video"
                    )
                    //id,  otherid,  notid , "call",null,true
                   //navigation.navigate("Video", { convid: id, otherid: otherid, notid: notid })
                 } }>


                 </IconButton>
                 <IconButton icon={"phone"} size={25} iconColor='white' rippleColor={"grey"} style={{ margin: 0 }} onPress={() => {
                   console.log("ol")
                   /* setstat(true)
                   setTimeout(() => {
                     setstat(false)
                   }, 1500); */
                   
                   inputT.current.blur()
                   storage.set("svc","true")
                  storage.set("calldetails",JSON.stringify({convid:id,otherid:otherid,notid:notid,entrytype:"call",callerName:other,type:"Audio"}))
                   pause.startcall(
                     "Audio"
                    )
                    //id,  otherid,  notid , "call",null,true
                   //navigation.navigate("Audio", { convid: id, otherid: otherid, notid: notid, other: other })
                 } }>


                 </IconButton>
                 <IconButton icon={"dots-vertical"} size={30} iconColor='white' rippleColor={"grey"} style={{ margin: 0 }} onPress={() => {
                   console.log("ol")
                   /* setstat(true)
                   setTimeout(() => {
                     setstat(false)
                   }, 1500); */
                 
                   
                   setchatoptions(true)

                 } }>


                 </IconButton>
               </View></> :<View style={{ flexDirection: "row", alignItems: "center" }}>
               <IconButton icon={"arrow-left"} size={30} iconColor='white' style={{ margin: 0 }} onPress={() => {
                 navigation.goBack()
                } }>

               </IconButton>
                 <Ti 
                 onSubmitEditing = {(event) => ne(event.nativeEvent.text)}
                 cursorColor={"white"}
                 placeholder='Mesajlarda ara'
                 placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                 style={{color:"white",backgroundColor:"#252525",flex:1,fontWeight:"300",borderRadius:16,paddingHorizontal:10,marginHorizontal:5,fontSize:20/fontScale}}

                 ></Ti>
                <IconButton icon={"chevron-up"} size={30} iconColor='white' style={{ margin: 0 }} onPress={() => {
                 if(indexes.current.length!==0){
                  if(indexes.current[currentindex.current+1]){
                    if(somemessages.length<indexes.current[currentindex.current+1]){
                      setsomemessages(allm.current.slice(0,indexes.current[currentindex.current+1]))
                    }
                    currentindex.current+=1
                    scroll.current.scrollToIndex({
                      animated: true,
                      index: indexes.current[currentindex.current],
                      viewOffset:0,
                      viewPosition: 0
                    })

                  }
                 
                  
                 }
                } }>

               </IconButton>
               <IconButton icon={"chevron-down"} size={30} iconColor='white' style={{ margin: 0 }} onPress={() => {
                if(indexes.current.length!==0){
                  if(currentindex.current!==0){
                    currentindex.current-=1

                  }
                  scroll.current.scrollToIndex({
                    animated: true,
                    index: indexes.current[currentindex.current],
                    viewOffset:0,
                    viewPosition: 0
                  })
                  
                 }
                } }>

               </IconButton>
               
                </View>} 
                
                </View>
{/* <View style={{flex:1}}>
                <BigList data={somemessages}
                onEndReached={getData} 
                ref={scroll}
                itemHeight={50}
                inverted
                scrollEnabled
                keyExtractor={item => item._id}
                style={[{ backgroundColor:"black",paddingBottom:10,zIndex: 1}]}
                 renderItem={({item,index}) =>  <Mess item={item} fontscale={fontScale} messages={item} rr={rr} setstat={setstat} allmess={messages} key={item._id} setimg={setimg}  setIsVisible={setIsVisible} userId={state.userId} k={index} pd={st}/>
                      }
               />
               </View> */}
               

              {/* <View style={{flex:1}}><FlatList
                    extraData={messages}
                    onEndReachedThreshold ={offset < 10 ? (offset*(offset == 1 ? 2 : 2)):20}   //While you scolling the offset number and your data number will increases.So endReached will be triggered earlier because our data will be too many
                    onEndReached = {getData} 
                    onTouchEnd={()=>{
                      setsearchmode(false)
                      setzi(true)
                    }}
                    removeClippedSubviews = {true} 
                    scrollEnabled
                    keyboardShouldPersistTaps="handled"
                    initialNumToRender={20}
                    maxToRenderPerBatch={num*2}
                    updateCellsBatchingPeriod={num}
                    
                    
                    data={messages}
                    renderItem={({item,index}) =>  <Mess fontscale={fontScale} inp={inputT} messages={item} rr={rr} setstat={setstat} allmess={messages} key={item._id} setimg={setimg}  setIsVisible={setIsVisible} userId={state.userId} k={index} pd={st}/>
                    }
                   
                    keyExtractor={item => item._id}
                      pagingEnabled
                      showsVerticalScrollIndicator={false}
                      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                      onScrollToIndexFailed={(info) => {
                        scroll.current.scrollToOffset({ offset: info.averageItemLength * info.index, animated: false });
                        setTimeout(() => {
                          if (messages.length !== 0 && scroll.current !== null) {
                            scroll.current.scrollToIndex({ index: info.index, animated: false });
                          }
                        }, 100);


                       console.log("ıkık")
                        const wait = new Promise(resolve => setTimeout(resolve, 0));
                        wait.then(() => {
                          scroll.current.scrollToEnd({
                            animated:false
                          })
                          scroll.current.scrollToIndex({
                            animated: false,
                            index: info.index,
                            viewOffset:0,
                            viewPosition: 0
                          })
                        })
                      }
                    }
                    
                 
                      overScrollMode="always"
                        ref={scroll}
                        contentContainerStyle={{flexGrow:1}}
                        style={[{ backgroundColor:"black",paddingBottom:10,flex:1,zIndex: 0,transform: [{rotate:"180deg"}]}]}
                      >
  
              </FlatList></View>  */}
 {messages.length!==0 && <Animated.View ref={animate} style={{flex:1,backgroundColor:"black"}} >
 
                <FlashList
             
                onScrollBeginDrag={()=>{
                  if(stickydatevalue.current==false){
                    stickydatestyle.value=withDelay(250,withTiming(75+as))
stickydatevalue.current=true
                  }
                }}
                onScroll ={ (event) => {
                  
                  clearTimeout(ssd)
                  console.log(stickydatevalue.current)
                 
                 
                  
                   ssd= setTimeout(() => {
                    stickydatevalue.current=false
                    stickydatestyle.value=withTiming(as,{duration:300},(e)=>{
                    if(e){
                      //runOnJS(setstickydate)(null)
                      //setstickydate(null)
                    }

                    })
                      
                    }, 1000);

                  
                  
                }}
                onScrollEndDrag={()=>{
                 
                }}
                onTouchEnd={()=>{
                  setsearchmode(false)
                }}
               //While you scolling the offset number and your data number will increases.So endReached will be triggered earlier because our data will be too man
                
                inverted
                keyboardShouldPersistTaps="handled"
                initialScrollIndex={0}
                //onEndReached={getData}
                onEndReachedThreshold ={offset < 10 ? (offset*(offset == 1 ? 2 : 2)):20} 
                scrollEnabled
                
                
                 data={messages}
                 renderItem={({item,index,target}) => {
                
                    return <Mess toph={toph} fontscale={fontScale} offset={offsets} inp={inputT} id={id} typing={typings}  messages={item} rr={rr} setstat={setstat} allmess={messages} key={item._id} setimg={setimg}  setIsVisible={setIsVisible} userId={state.userId} k={index} pd={st} />

                 
                  
                 
                 }
                }
                 keyExtractor={keyExtractor}
                  showsVerticalScrollIndicator={false}
                  overScrollMode="always"
                    ref={scroll}
                    
                    
                    estimatedItemSize={messages.length}
                   
                  viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                  
                    contentContainerStyle={{paddingTop: typings?55:0,paddingBottom:0}}
                    //style={[{ backgroundColor:"black",paddingBottom:10,zIndex: 1,transform: [{rotate:"180deg"}]}]}
                  >
                  
                </FlashList>
                {
                  typings ===true ?<View   style={[{position:"absolute",flexDirection:"row",bottom:0,zIndex:1,alignItems:"center",paddingHorizontal:5,paddingVertical:0,backgroundColor:"transparent",justifyContent:"flex-start"}]}>
                 <Animated.View entering={SlideInDown} exiting={SlideOutDown} style={{marginVertical:20,backgroundColor:"#292929",borderRadius:25,height:"100%",justifyContent:"center",alignItems:"center",paddingHorizontal:10,flexDirection:"row"}}>
                 <Animated.View style={[fadestyle,{justifyContent:"center",alignItems:"center"}]}>
                  <Avatar.Icon icon="circle-small" size={12} color='transparent'  style={{backgroundColor:"white",marginRight:7}}></Avatar.Icon>
                 </Animated.View>

                 <Animated.View style={[fadestyle1]}>
                  <Avatar.Icon icon="circle-small" size={12} color='transparent'  style={{backgroundColor:"white",marginRight:7}}></Avatar.Icon>
                 </Animated.View>
                 <Animated.View style={[fadestyle2]}>
                  <Avatar.Icon icon="circle-small" size={12} color='transparent'  style={{backgroundColor:"white"}}></Avatar.Icon>
                 </Animated.View>

                 </Animated.View>
                  
                  </View>:null
                }
                
                </Animated.View>}
                
                {/* <ScrollView  ref={scroll}
                
                onEnded={getData}
                style={{flex:1,transform:[{rotate:"180deg"}]}}>

                
                  {
                    somemessages?.map((c,i)=>{
                  
                      return <Mess fontscale={fontScale} messages={c} rr={rr} setstat={setstat} allmess={somemessages} key={c._id} setimg={setimg}  setIsVisible={setIsVisible} userId={state.userId} k={i} pd={st}/>
                
                    })
                  }
                   </ScrollView> */}
                
                {zi? <Animated.View //layout={Layout.easing(Easing.elastic())} 
                  style={[{flexDirection:"row",alignItems:"center",height:60,backgroundColor:"black",paddingBottom:5,paddingHorizontal:3,marginTop:0,}]} >
                    <Ti 
                    //onKeyPress={foc}
                    //onPressIn={foc}
                    ref={inputT}
                  onPressOut={()=>{
                    //inputT.current.blur()
                  }}
                  //showSoftInputOnFocus={false}
                    //showSoftInputOnFocus={inp}
                    onFocus={()=>setfocus(true)}
                    onChangeText={(e)=>{
                      //settext(e)
                      //input.current=e
                      toggle(e)

                        

                    
                    }}
                    value={text}
                    underlineColor='transparent'
                    activeUnderlineColor='transparent'
                    multiline={true}
                    placeholder='Mesaj'
                    placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                    cursorColor={"grey"}
                    selectionColor={"grey"}
                    contentStyle={{width:"100%",height:"100%"}}
                    style={{color:"white",backgroundColor:"#141414",width:"100%",fontWeight:"300",borderRadius:16,paddingHorizontal:10,height:50,fontSize:20/fontScale}}/>
                    <IconButton  icon={ "image"} iconColor='white' size={27}  style={{height:45,backgroundColor:"black",position:"absolute",right:2,bottom:3.5,width:45,borderRadius:45}} onPress={()=>
                    setIsVisiblem(true)
                    }/>
                    <IconButton  icon={"send"} iconColor='white' size={27}  style={{height:45,backgroundColor:"black",position:"absolute",right:54,bottom:3.5,width:45,borderRadius:45}} onPress={()=>
                    {
                      //settext(null)
                      /* let date=Date.now()
                      console.log(date)
                    
                        let newmessage={
                          _id:date,
                          sender:na.id,
                          senderName:state.userName,
                          receiver:otherid,
                          conversationid:currentconv.current,
                          text:"7778",
                          createdAt:date,
                        }
                        setmessages((e)=>[newmessage,...e]) */
                      setTimeout(() => {
                        
                        sendTextMessage()
                        
                      },0);
                    
                    }
                        
                    
                    
                    }/>
                    <Menu
                        style={{}}
                        contentStyle={{backgroundColor:"#141414",bottom:35,width:70,alignItems:"center",paddingVertical:-10}}
                        visible={visiblem}
                        onDismiss={closeMenu}
                        anchorPosition="top"
                        anchor={
                        <Button style={{}} onPress={openMenu}>Show menu</Button>}
                        >
                          <IconButton
                          icon={"camera"}
                          iconColor='white'
                          style={{width:"100%",borderRadius:2,marginBottom:-5}}
                          onPress={()=>{
                            closeMenu()
                            inputT.current.blur()
                            navigation.navigate("Takephoto")
                            Orientation.lockToPortrait()
                            cam.current=true
                            setcamopen(true)}}
                          >

                          </IconButton>
                          <IconButton
                          icon={"image"}
                          iconColor='white'
                          style={{width:"100%",borderRadius:2}}
                          onPress={()=>{
                          
                          closeMenu()
                          choose()


                          }}
                          >

                          </IconButton>
                          
                        
                    </Menu>
                    <Menu
                        style={{top:80+StatusBar.currentHeight}}
                        contentStyle={{backgroundColor:"#141414",alignItems:"center",paddingVertical:-10}}
                        visible={chatoptions}
                        onDismiss={()=>{setchatoptions(false)}}
                        anchorPosition="top"
                        anchor={
                        <Button style={{}} onPress={openMenu}>Show menu</Button>}
                        >
                          <Menu.Item  onPress={() => {setsearchmode(true)
                          inputT.current.blur()
                          setzi(false)
                          setchatoptions(false)
                          }} theme={{ colors: { onSurfaceVariant: 'red' } }} rippleColor={"grey"} title="Mesajlarda ara" style={{paddingRight:10}} titleStyle={{color:"white"}} />
                          <Menu.Item  onPress={() => {deleteconv(mpeop,other,otherid,notid,state,me,authContext,prt)
                          navigation.goBack()
                          }} theme={{ colors: { onSurfaceVariant: 'red' } }} rippleColor={"grey"} title="Sohbeti Sil" style={{paddingRight:10}} titleStyle={{color:"white"}} />
                          

                        
                    </Menu>

                </Animated.View>:null}
                
                
  </Animated.View>
</GestureDetector>

  
  )
}
const style= StyleSheet.create({
    body:{
      backgroundColor:"black",
        zIndex:1,
        flexDirection:"column",
        justifyContent:"space-between",
        flex:1,
       
       
      
        
       
    }
})
export default Chatid