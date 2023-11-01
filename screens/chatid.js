import { View, Text,StyleSheet,Modal,FlatList, KeyboardAvoidingView,useWindowDimensions, Alert,BackHandler,TouchableOpacity,Keyboard } from 'react-native'
import React,{useContext,useEffect, useState,useRef} from 'react'
import { Dimensions } from 'react-native'
import { StatusBar } from 'react-native'
import { useAuthorization } from '../Authcontext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRoute,useIsFocused } from '@react-navigation/native'
import axios from 'axios'
import { Image } from 'react-native'
import Mess from '../components/mess'
import Conv from '../components/conv'
import { TextInput } from 'react-native'
import { Gesture, GestureDetector, GestureHandlerRootView,ScrollView } from 'react-native-gesture-handler';
import Animated ,{ Extrapolation,useAnimatedKeyboard, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withTiming,AnimatedLayout, FadeIn, Layout, SlideInDown, SlideInUp, SlideOutUp, SlideInRight, SlideInLeft } from 'react-native-reanimated'
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
const {width,height} =Dimensions.get("window")
const as= StatusBar.currentHeight
let img
const Chatid = ({route,navigation,setmesnotif}) => {
  const d =new ShortUniqueId({length:10})
  const scrollY = useSharedValue(0)
  const st = useSharedValue(0)
  const stat1 = useSharedValue(0)

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
const{auth,setauth,messages,setmessages,currentconv,messageRef,userid,server,state,socket,setstat,rr,stat,authContext,check,allm}=useAuthorization()

  const a = useRoute()
  let other
  let otherid
  
  let id= route?.params?.id
  let notid= route?.params?.notid
  let pp = route?.params?.pp
  let mpeop =route?.params?.mpeop
  let messa= route?.params?.mess
  let newchat= route?.params?.newchat
  
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
  //const allm =useRef([])
  const[text,settext]=useState(null)
  const [img, setimg] = useState(null)
  const [inp, setinp] = useState(false)
  const[focus,setfocus]=useState(false)
  //const[stat,setstat]=useState(false)
  const[zoom,setzoom]=useState(false)
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [visible, setIsVisible] = useState(false);
  let headers={ Authorization:state.userToken}
  const scale= useSharedValue(1)
  const opacity= useSharedValue(1)
  const zoom1= useSharedValue(false)
  const translationX= useSharedValue(1)
  const translationY= useSharedValue(0)
  const keyboard= useSharedValue(false)
  const transX= useSharedValue(0)
  const lastx= useSharedValue(0)
  const lasty= useSharedValue(0)
  const focalx= useSharedValue(0)
  const focaly= useSharedValue(0)
  const lastscale= useSharedValue(1)
  const initialTouchLocation = useSharedValue({ x: 0, y: 0 })




useEffect(() => {
  currentconv.current=id
  check.current=newchat
  console.log(check.current)
 //StatusBar.setBackgroundColor("red")

  

  
}, [])


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
    console.log(allm.current,554)
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
        //setKeyboardVisible(e.endCoordinates.height); // or some other action
        //keyboard.value=withTiming(e.endCoordinates.height,{duration:150})
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setfocus(false)
        inputT.current.blur()
        //setKeyboardVisible(false); // or some other action
        keyboard.value=(0)
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
async function sendTextMessage(){
  console.log(currentconv.current,state.userName)
  inputT.current.clear()
  let x = input.current
  x =x.trim()
  if(x && x !==""){
  let date=Date.now()
  console.log(date)
    let newmessage={
      _id:date,
      sender:na.id,
      receiver:otherid,
      conversationid:currentconv.current,
      text:x,
      createdAt:date
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
        socket.current.emit("newconversationonline",otherid,JSON.stringify(mpeop),JSON.stringify(newmessage))
        await AsyncStorage.setItem("mpeop",JSON.stringify(a))
        check.current=false
    
  
      }else{
  
        socket.current.emit("send",newmessage)
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
    paddingBottom:keyboard.value? keyboard.value:0,
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


  const keyboard1 = useAnimatedKeyboard({isStatusBarTranslucentAndroid:true});
  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -keyboard1.height.value }],
    };
  });
  const kstyle = useAnimatedStyle(() => {
    return {
      marginBottom:keyboard1.height.value+44+as*2
    };
  });
 
  const translateStyle12 = useAnimatedStyle(() => {
    return {
     marginTop:st.value
    };
  });
     return (
    <GestureDetector  gesture={gesture}>
    <Animated.View style={[animatedStyle1,{flex:1}]}>
    <View style={{ paddingTop:StatusBar.currentHeight,flexDirection: "row", height: 75+as, backgroundColor: "gold", justifyContent: "space-between", alignItems: "center" ,position:"absolute",top:0,right:0,left:0,bottom:0,zIndex:1}}>
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
    <Animated.View style={[style.body,translateStyle,{}]} onPress={() => {

     
    } }>
      
      {/* <FlatList
      onEndReached={setnewmessages}
      onEndReachedThreshold={0.7}
      inverted={true}
        showsVerticalScrollIndicator={true}
        data={messages}
        keyExtractor={item => item._id}
        renderItem={({ item }) => {
          return <Mess fontscale={fontScale} messages={item} />
        } }
      >

      </FlatList> */}
  <MaskedView
  androidRenderingMode="software"
  style={{flex:1,marginBottom:messages.length===1 ? 50 :0}}
        maskElement={
          <Animated.View style={[{flex:1}, maskElementPosition]}>
            <Animated.View style={[kstyle]}>
            {
          messages?.map((c,i)=>{
          
           return <Mess fontscale={fontScale} messages={c} key={c._id} allmess={messages}  setimg={setimg}  setIsVisible={setIsVisible} userId={state.userId} k={i}/>
            
                })
        }
        </Animated.View>
          </Animated.View>
        }
      >
        <Animated.ScrollView
        
        overScrollMode="always"
          ref={scroll}
          scrollEventThrottle={250}
          onScroll={scrollHandler}
          style={[{ zIndex: 1,transform: [{rotate:"180deg"}]}]}
        >
        <Animated.View style={[kstyle]}>
        {
          messages?.map((c,i)=>{
        
            return <Mess2 fontscale={fontScale} messages={c} rr={rr} setstat={setstat} allmess={messages} key={c._id} setimg={setimg}  setIsVisible={setIsVisible} userId={state.userId} k={i} pd={st}/>
       
          })
        }
        </Animated.View>
        </Animated.ScrollView>

        <LinearGradient colors={['#0FDED5', '#0569B8', '#0505B8']} style={{position:"absolute",zIndex:0,bottom:0,top:0,left:0,right:0}}>
      </LinearGradient>
      </MaskedView>

  
      {/* <ScrollView 
    ref={scroll}
      onScroll={({nativeEvent}) => {
        var time = last_time_scroll_completed - performance.now()
        let v = (old_offset-nativeEvent.contentOffset.y)/time
        if(v>=3){

          console.log(v,8888)
        }
        old_offset = nativeEvent.contentOffset.y;
        last_time_scroll_completed = performance.now();
        if (isCloseToBottom(nativeEvent) || v>=4.5 ) {
          setnewmessages()
        }
      }}
      scrollEventThrottle={250}
      scrollIndicatorInsets={{left:1}}
      showsVerticalScrollIndicator={true}
     style={{transform: [{rotate:"180deg"}],zIndex:1,backgroundColor:"black"}}

      >
        <View style={{flex:1}}>
        {
          messages?.map((c,i)=>{
            return <Mess fontscale={fontScale} messages={c} allmess={messages} key={c.createdAt} setimg={setimg}  setIsVisible={setIsVisible} userId={state.userId} k={i}/>
          })
        }</View>
      </ScrollView> */}
      
{/* <FlatList
scrollEnabled
style={{flexDirection:"column-reverse"}}

data={messages}
renderItem={({item})=>{
 return <Mess  fontscale={fontScale} messages={item} setimg={setimg}  setIsVisible={setIsVisible}/>
}}
>

</FlatList> */}
 

      {/* <View style={{backgroundColor:"white",height:50}}>
<Text style={{color:"black"}}>
{messageRef.current}
</Text>
    </View> */}
<Animated.View style={[{flexDirection:"row",alignItems:"center",backgroundColor:"blue",padding:5}]} >
  <TextInput 
  //onKeyPress={foc}
  //onPressIn={foc}
  ref={inputT}

  //showSoftInputOnFocus={inp}
  onFocus={()=>setfocus(true)}
  onChangeText={(e)=>{
   

      input.current=e

   
  }}
  multiline={true}
  cursorColor={"blue"}
  style={{backgroundColor:"red",width:"100%",maxHeight:95,borderRadius:16,padding:3,paddingVertical:7,fontSize:23/fontScale}}/>
<TouchableOpacity style={{height:40,backgroundColor:"blue",position:"absolute",right:10,width:50,borderRadius:10}} onPress={()=>sendTextMessage()}/>
</Animated.View>
{/* <View style={{display:img ? "flex":"none",position:"absolute",top:0,bottom:0,right:0,left:0}}>
{<GestureDetector style={{backgroundColor:"red",flex:1}} gesture={pan}>
<Animated.View style={[{flex:1,backgroundColor:"black",position:"absolute",top:0,bottom:0,right:0,left:0},f]}>
<ReactNativeZoomableView
maxZoom={3}
minZoom={1}
zoomStep={1}
visualTouchFeedbackEnabled={false}
doubleTapDelay={175}
initialZoom={1}
bindToBorders={true}
onZoomAfter={this.logOutZoomState}
onZoomBefore={()=>{
  //zoom1.value=true
}}
style={{
 backgroundColor: 'transparent',
}}
>
<Animated.Image source={{uri:img? img:null}} style={[{height:"100%",width:"100%",alignSelf:"center"}]} resizeMode="contain" />
</ReactNativeZoomableView>
</Animated.View>
</GestureDetector>} */}
  {/*   {

      img && <View style={{backgroundColor:"transparent",position:"absolute",top:0,right:-1,left:0,bottom:0,zIndex:1}}>

     
  
      </View>
    } */}



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
        paddingBottom:48,
       
      
        
       
    }
})
export default Chatid