import { View, Text,StyleSheet,Modal,FlatList, StatusBar,KeyboardAvoidingView,useWindowDimensions, Alert,BackHandler,TouchableOpacity,Keyboard,Dimensions } from 'react-native'
import React,{useContext,useEffect, useState,useRef} from 'react'
import { useAuthorization } from '../Authcontext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRoute,useIsFocused } from '@react-navigation/native'
import axios from 'axios'
import { Image } from 'react-native'
import Mess from '../components/mess'
import Conv from '../components/conv'
import { TextInput } from 'react-native'
import { Gesture, GestureDetector, GestureHandlerRootView,ScrollView } from 'react-native-gesture-handler';
import Animated ,{ Extrapolation,useAnimatedKeyboard, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withTiming,AnimatedLayout, FadeIn, Layout, SlideInDown, SlideInUp, SlideOutUp, SlideInRight, SlideInLeft, withSpring,Easing } from 'react-native-reanimated'
import { Transition } from 'react-native-reanimated';
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
const {width,height} =Dimensions.get("window")
const height1=Dimensions.get("screen").height
//const navbar=height1-height-StatusBar.currentHeight
const as= StatusBar.currentHeight
let img
const Chatid = ({route,navigation,setmesnotif}) => {
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
  const scrollHandler = useAnimatedScrollHandler((event) => {
    console.log("45")
    scrollY.value = event.contentOffset.y})
  const {fontScale} = useWindowDimensions(); // import useWindowDimensions()
/*   const data=[{"__v": 0, "_id": "640f77ce4adac71e5768f41a", "conversationid": "6373375a8f3d293cc082f78f", "createdAt": "2023-03-13T19:21:50.384Z", "sender": "62d6c7b8f4925109c40a5ae1", "text": "J", "updatedAt": "2023-03-13T19:21:50.384Z"}, 
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
const{auth,navbar,setauth,messages,setmessages,currentconv,messageRef,userid,server,state,socket,setstat,rr,stat,authContext,check,allm,setss,cam,setimg,img}=useAuthorization()

  const a = useRoute()
  let other
  let otherid
  
  let id= route?.params?.id
  let notid= route?.params?.notid
  let pp = route?.params?.pp
  let mpeop =route?.params?.mpeop
  let messa= route?.params?.mess
  let newchat= route?.params?.newchat
  let re= route?.params?.re
  let pos= route?.params?.pos


  console.log(mpeop,41)
 const today = useRef(false)

  const scroll = useRef()
  const input = useRef(null)
  const inputT = useRef(null)
  

  //const { userToken,userId,server,peop,messages } = useSelector((state) => state.counter);
  //const dispatch = useDispatch();
  let prt= server
  let na={
    id:state.userId
  }
  const page =useRef(1)
  const canvas=useRef(null)
  //const allm =useRef([])
  const[text,settext]=useState(null)
  //const [img, setimg] = useState(null)
  const [inp, setinp] = useState(false)
  const [w, setw] = useState(null)
  const [h, seth] = useState(null)
  const[focus,setfocus]=useState(false)
  const[camopen,setcamopen]=useState(false)
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [visible, setIsVisible] = useState(false);
  let headers={ Authorization:state.userToken}
  const scale= useSharedValue(1)
  const opacity= useSharedValue(1)
  const zoom1= useSharedValue(false)
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
 

useEffect(() => {
  
  hasAndroidPermission()
  currentconv.current=id
  check.current=newchat
  console.log(check.current)
 //StatusBar.setBackgroundColor("red")

  return ()=>{
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






if(mpeop){
  if(na.id===mpeop.sender?.id){
    //me="sender"
other= mpeop.receiver.name
otherid= mpeop.receiver.id
  }else {
    //me="receiver"
    other= mpeop.sender?.name
    otherid= mpeop.sender?.id
  }
} 
/* function groupedDays(messages) {
  return messages.reduce((acc, el) => {
    //console.log(el)
    const messageDay = new Date(el.createdAt).toLocaleDateString("tr-TR",{day:"2-digit",month:"long",year:"numeric"})
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
    return acc.concat([...sortedMessages,{ type: 'day',date,_id:d() }]);
  }, []);
  return items;
} */




async function getmessages(){
  const mess = await AsyncStorage.getItem(currentconv.current)

  if(mess){
  allm.current=JSON.parse(mess)
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
      setmessages(JSON.parse(mess).slice(0,20))
      
   
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
   // messageRef.current=res.data.slice(0,20)
   await AsyncStorage.setItem(currentconv.current,JSON.stringify(rev))
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
  let a = {date:new Date(Date.now()).toLocaleDateString("tr-TR",{day:"2-digit",month:"long",year:"numeric"}),type:"day",_id:d()}
  let b = [a]
  if(messages.length===0){
    today.current=true
    allm.current=[a]
    await AsyncStorage.setItem(currentconv.current,JSON.stringify(b))
    setmessages([a])
  }else{
 let m = await AsyncStorage.getItem(currentconv.current)
  if(m){
    allm.current= JSON.parse(m)
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
    const keyboardDidShowListener = Keyboard.addListener(
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


    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      ()=>{
        //setmesnotif(false)
      }
    );
    console.log(messa)
    if(messa===false){
      console.log("e")
      getmessages()
    }else{
      all()
    }
    //dispatch(setcurrentconv(id))
    
  return ()=>{
    
    keyboardDidHideListener.remove();
    keyboardDidShowListener.remove();
//dispatch(setmessages([]))
    setmessages([])
    currentconv.current=null
    today.current=false
backHandler.remove()
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
async function sendTextMessage(media1){
  console.log(currentconv.current,state.userName)
  inputT.current.clear()
  let x = input.current
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
      console.log(12)
      
      let a = {date:new Date(Date.now()).toLocaleDateString("tr-TR",{day:"2-digit",month:"long",year:"numeric"}),type:"day",_id:d()}
      let x = allm.current.find((e)=>{
    if(e.type!==undefined){
       return e

    }
      })
      if(x?.date===a.date){
     
       allm.current=[newmessage,...allm.current]        
       setmessages((e)=>[newmessage,...e])
       //settext(null)
       today.current=true
      }else{
        

        //Alert.alert(x.date)
        setmessages((e)=>[newmessage,a,...e])
        //settext(null)
        allm.current=[newmessage,a,...allm.current]
        console.log(allm.current,555)
        today.current=true
     
     
      }
      
  
    
    }else{
      
      setmessages((e)=>[newmessage,...e])
      //settext(null)
      allm.current=[newmessage,...allm.current]
      

    }
    try {
      await AsyncStorage.setItem(currentconv.current,JSON.stringify(allm.current))
      if(check.current===true){
        let a= [...state.mpeop,mpeop]
        authContext.setmpeop(a)
        socket.current.emit("newconversationonline",otherid,other,JSON.stringify(mpeop),JSON.stringify(newmessage),notid)
        await AsyncStorage.setItem("mpeop",JSON.stringify(a))
        check.current=false
    
  
      }else{
  
        socket.current.emit("send",newmessage)
        await axios.post(`${prt}/messages`,newmessage).then(()=>{
          console.log("gg")
        }).catch((e)=>{
          console.log(e)
        })
      }
    } catch (error) {
      
    }
  


input.current=null


  
  }else{
    console.log("nol")
  }
  console.log(text)
}


useEffect(()=>{
if(focus===true){
  setTimeout(() => {
    
    scroll.current.scrollTo({y:0,animated:true})
  }, 0);

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
   let offset
   const maskElementPosition = useAnimatedStyle(() => {
    return {
      transform: [{rotate:"180deg"},{ translateY: -scrollY.value }],
      opacity:opacity.value
    }
  })


  //const keyboard1 = useAnimatedKeyboard({isStatusBarTranslucentAndroid:true});
  const translateStyle = useAnimatedStyle(() => {
    return {
      //marginBottom:keyboard.value ? -keyboard.value:0
      transform: [{ translateY: keyboard.value }],
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

  function lay(e){

      setw(Dimensions.get("window").width)
      seth(Dimensions.get("window").height)
    
   
  }
async function choose(){
  await launchImageLibrary({
  mediaType:"photo",
  maxHeight:1280,
  maxWidth:720,
  quality:1,
  includeBase64:true,
  assetRepresentationMode:"current",
}).then((e)=>{
  console.log(e.assets[0].uri)
  sendTextMessage(`data:image/jpeg;base64,${e.assets[0].base64}`)
//sendTextMessage(e.assets[0].base64)

})

}





     return (
    <GestureDetector gesture={gesture}>

    <Animated.View    onLayout={(e)=>{
   
    }} style={[animatedStyle1,{flex:1,backgroundColor:"black",flexDirection:"column"}]}>


      <View style={{ paddingTop:StatusBar.currentHeight,flexDirection: "row", height: 75+as, backgroundColor: "gold", justifyContent: "space-between", alignItems: "center" ,zIndex:1}}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{}} >--</Text>
          {pp       &&    <Image style={{ height: 65, width: 65, backgroundColor: "red", marginHorizontal: 5, borderRadius: 70, resizeMode: "cover" }} source={{ uri: pp }} />
}
          <Text onPress={()=>Alert.alert(currentconv.current)} >{other}</Text>


        </View>
        <View>
          <TouchableOpacity style={{ backgroundColor: "red", padding: 20,flex:1}} onPress={() => {
            console.log("ol")
           /* setstat(true)
           setTimeout(() => {
            setstat(false)
           }, 1500); */
            navigation.navigate("Video",{convid:id,otherid:otherid,notid:notid})
          } }>

            <Text>
              ARA
            </Text>
          </TouchableOpacity>
        </View>
      </View>

<Animated.ScrollView
layout={Layout.easing(Easing.elastic())}
        overScrollMode="always"
          ref={scroll}
          scrollEventThrottle={250}
          style={[{ paddingBottom:10,flexGrow:1,zIndex: 1,transform: [{rotate:"180deg"}]}]}
        >
        {
          messages?.map((c,i)=>{
        
            return <Mess fontscale={fontScale} messages={c} rr={rr} setstat={setstat} allmess={messages} key={c._id} setimg={setimg}  setIsVisible={setIsVisible} userId={state.userId} k={i} pd={st}/>
       
          })
        }
        </Animated.ScrollView>
        
        

       
<Animated.View layout={Layout.easing(Easing.elastic())} style={[{flexDirection:"row",alignItems:"center",backgroundColor:"blue",padding:5}]} >
  <TextInput 
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
   

      input.current=e

   
  }}
  multiline={true}
  cursorColor={"blue"}
  style={{backgroundColor:"red",width:"100%",borderRadius:16,padding:3,paddingVertical:7,fontSize:23/fontScale}}/>
<TouchableOpacity style={{height:40,backgroundColor:"blue",position:"absolute",right:10,width:50,borderRadius:10}} onPress={()=>sendTextMessage()}/>
<TouchableOpacity style={{height:40,backgroundColor:"blue",position:"absolute",right:65,width:50,borderRadius:10}} onPress={async()=>{/* await launchImageLibrary({
  mediaType:"photo",
  maxHeight:1280,
  maxWidth:720,
  quality:1,
  includeBase64:true,
  assetRepresentationMode:"current",
}).then((e)=>{

  //console.log(e.assets[0])
})
 */
inputT.current.blur()
navigation.navigate("Takephoto")
Orientation.lockToPortrait()
cam.current=true
setcamopen(true)
//await resizeImage("1")

}


}/>
<TouchableOpacity style={{height:40,backgroundColor:"blue",position:"absolute",right:120,width:50,borderRadius:10}} onPress={async()=>{
choose()
}


}/>

</Animated.View>

    </Animated.View>
</GestureDetector>

  
  )
}
const style= StyleSheet.create({
    body:{
      backgroundColor:"black",
        zIndex:0,
        flexDirection:"column",
        justifyContent:"space-between",
        flex:1,
       
       
      
        
       
    }
})
export default Chatid