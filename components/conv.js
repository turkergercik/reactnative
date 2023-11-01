import { Image, StyleSheet,TouchableOpacity, Text, View,TouchableHighlight,Dimensions,Alert } from 'react-native'
import React,{useContext, useState,useEffect,useRef} from 'react'
import { useAuthorization } from '../Authcontext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from "react-redux";
import { signIn, setmpeop, setpeop,setmessages  } from "../redux/counter.js"
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Animated,{ Extrapolate, interpolate,useSharedValue,useAnimatedStyle, runOnJS, withTiming,useDerivedValue } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { ComposedGesture, ExclusiveGesture } from 'react-native-gesture-handler';
import User from "../images/user.svg"
import axios from 'axios';

let r =0
const {width,height} =Dimensions.get("window")
const Conv = ({mpeop1,peop,userId,navigation,simul,isopen,k,setisopen,o}) => {
  const { setmessages,istoday,rr,state,server,authContext}=useAuthorization()
const translationX= useSharedValue(0)
const initialTouchLocation = useSharedValue({ x: 0, y: 0 })
const lastx = useSharedValue(0)
const open= useSharedValue(false)
const direction= useSharedValue(null)
let prt =server
const enable1= useSharedValue(true)
//const dispatch = useDispatch()

  const data=[{"__v": 0, "_id": "640f77ce4adac71e5768f41a", "conversationid": "6373375a8f3d293cc082f78f", "createdAt": "2023-03-13T19:21:50.384Z", "sender": "62d6c7b8f4925109c40a5ae1", "text": "J", "updatedAt": "2023-03-13T19:21:50.384Z"}, 
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
  let other
  let otherid
  let me
 
   const [pp,setpp]=useState()
   const [enable,setenable]=useState(true)
   const [a,seta]=useState(12)
   //const [notid,setnotid]=useState(null)
   const notid= useRef(null)
   let na={
    id:state.userId
  }
  if(mpeop1){
    if(na.id===mpeop1.sender?.id){
      me="sender"
  other= mpeop1.receiver.name
  otherid= mpeop1.receiver.id
    }else {
      me="receiver"
      other= mpeop1.sender?.name
      otherid= mpeop1.sender?.id
    }
    

  }


 useEffect(() => {
  async function s(){
  let p = await AsyncStorage.getItem("peop")

  if(p){
  JSON.parse(p).forEach((e,i) => {
    if(otherid===e._id){
      notid.current=e.notid
      if(e.profilepicture!==undefined){
        setpp(e.profilepicture)


      }else{
        setpp(null)
      }
      //setnotid(e.notid)
      //notid.current=e.notid
      //console.log(notid.current)
      
    }
   });

}


  }
  s()
/*    peop.forEach((e,i) => {
    if(otherid===e._id){
      notid.current=e.notid
      if(e.profilepicture!==undefined){
        setpp(e.profilepicture)


      }
      //setnotid(e.notid)
      //notid.current=e.notid
      //console.log(notid.current)
      
    }
   }); */
 
   
 },[peop])


useEffect(()=>{
if(isopen!==k){
  close()
}


},[isopen])
const close = ()=>{
  open.value=false
  direction.value=null
  lastx.value=0
  translationX.value=withTiming(0)

}
/* useDerivedValue(() => {
  if(isopen!==k){
   
  }
  console.log(open.value,4445);
}, [isopen.value]); */
 /* function ad(e){
  setisopen(k)
  simul.current.setNativeProps({ scrollEnabled: e })
 } */


 async function nav(){
  const mess= await AsyncStorage.getItem(mpeop1._id)

  if(mess){
   console.log(mess)
  r+=1
    //messageRef.current = JSON.parse(mess).slice(0,5)
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
    
        return acc.concat([...sortedMessages,{ type: 'day',date } ]);
      }, []);
      return items;
    } */
    let x = JSON.parse(mess)
    let a=[]
    //let today=false
    //let last=null
    x.forEach((e,l)=>{
    if(e.type ==="day"){
      a.push(l)
      /* if(last===null){
        last="full"
if(e.date===new Date(Date.now()).toLocaleDateString("tr-TR",{day:"2-digit",month:"long",year:"numeric"})){
  today=true

}

      } */
      
    }
      
      }
          )
    let d =a.findIndex((e,i)=>{
      if(e>=15 && e<=25){
        return i
      }
    })
    if(d!==-1){
    
      setmessages(x.slice(0,a[d]+1))
    }else{
      
      setmessages(x)
    }
    navigation.navigate("Chatid",{id:mpeop1._id,pp:pp,mpeop:mpeop1,notid:notid.current,mess:true,newchat:false})

     // dispatch(setmessages(generateItems(JSON.parse(mess).slice(0,20))))
  
    
  }else{
    console.log(mpeop1,7)
    navigation.navigate("Chatid",{id:mpeop1._id,pp:pp,mpeop:mpeop1,mess:false,newchat:false})
  }

 }




const cDirection = (d)=>{
  direction.value=d
  open.value=true
  if(d==="right"){
    lastx.value=width/4
    translationX.value=withTiming(width/4)
  }else{
    lastx.value=-width/4
    translationX.value=withTiming(-width/4)
  }

}
function call(){

  navigation.navigate("Video",{convid:mpeop1._id,otherid:otherid,notid:notid.current})
  close()

}

async function deleteconv(){
  let mpeop=[]
  let object={
    sendername:state.userName,
    receivername:other,
    senderid:na.id,
    receiverid:otherid,
  receivernotificationid:notid.current
  }
    if(me==="sender"){
      object["senderdeleted"]=true
      mpeop1.sender.delete=true
      if(mpeop1.receiver.delete===true){
        state.mpeop.splice(k,1)
       
       }
    }else{
      mpeop1.receiver.delete=true
      object["receiverdeleted"]=true
      if(mpeop1.sender.delete===true){
        state.mpeop.splice(k,1)
       
       }
    }
    close()
    mpeop=[...state.mpeop]
    
    authContext.setmpeop(mpeop)
    await AsyncStorage.setItem("mpeop",JSON.stringify(mpeop))
  console.log(mpeop1._id,555555555)
    await axios.put(`${prt}/conversations/${mpeop1._id}`,object).then(async(res)=>{
      console.log(res.data)

      



if(res.data==="updated"){
  if(me==="sender"){
    

   }else{
      
   }
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


function f(k){
setTimeout(() => {
  setisopen(k)
}, 100);
}
function sa(k){
  setTimeout(() => {
    seta(k.toString())
  }, 100);
  }
const touch = Gesture.Tap().onStart(()=>{


})

 const panGesture = Gesture.Pan()
   .manualActivation(true)
   .onBegin((evt,s) => {
     initialTouchLocation.value = { x: evt.x, y: evt.y };
     //translationX.value=lastx.value
   })
   .onTouchesMove((evt, state) => {
     // Sanity checks
     if (!initialTouchLocation.value || !evt.changedTouches.length) {
       state.fail();
       return;
     }

     const xDiff = Math.abs(evt.changedTouches[0].x - initialTouchLocation.value.x);
     const yDiff = Math.abs(evt.changedTouches[0].y - initialTouchLocation.value.y);
     const isHorizontalPanning = xDiff > yDiff;
     
     if (isHorizontalPanning) {
      if(xDiff>=10){
        state.activate()
      }

     } else {

        //navigation.navigate("Chatid",{id:mpeop1._id,pp:pp,mpeop:mpeop1,notid:notid.current})
    

       //state.fail()
     }
   }).onTouchesDown((evt)=>{
   }).onChange((evt) =>{
    if(Math.abs(evt.translationX)>=width/4 ){
      
      
      return
    }
    translationX.value=evt.translationX+lastx.value
   }).onTouchesUp((e,s)=>{s.fail()})
   .onEnd((evt,s) => {
   /*  if(Math.abs(evt.translationX)<width/4){
      
      direction.value=null
      open.value=false
      lastx.value=0
      translationX.value=withTiming(0)
    } */
    
    
    if(evt.translationX>=width/4 || evt.velocityX>=2000){
     
      if(open.value===false){
     
        open.value=true
        direction.value="right"
        lastx.value=width/4
        translationX.value=withTiming(width/4)
        runOnJS(f)(k)

      }else{
        if(direction.value==="right"){
        
          lastx.value=width/4
          translationX.value=withTiming(width/4)

        }else{
      
          open.value=false
          direction.value=null
        lastx.value=0
        translationX.value=withTiming(0)
        
        }
        
      }
      
    }else{
      if(evt.translationX<-width/4 || evt.velocityX<=-2000){
       
        if(open.value===false){
       
          open.value=true
          direction.value="left"
          lastx.value=-width/4
          translationX.value=withTiming(-width/4)
          runOnJS(f)(k)

          
        }else{
          if(direction.value==="left"){
           
            lastx.value=-width/4
            translationX.value=withTiming(-width/4)
            
          }else{
          
            open.value=false
            direction.value=null
          
            lastx.value=0
            translationX.value=withTiming(0)


          }
        }



      }else if(Math.abs(evt.translationX)<width/4){
    
        open.value=false
        direction.value=null
        lastx.value=0
        translationX.value=withTiming(0)
       

      }
      
    } 
   }).onStart(()=>{
    
   })
 

 const animated = useAnimatedStyle(() => {
    
  return {
  
   transform:[{translateX:translationX.value}]
  };
});

const g = Gesture.Exclusive(panGesture,touch)
if((mpeop1?.sender?.id===na.id && mpeop1?.sender.delete===false) || (mpeop1?.receiver?.id===na.id && mpeop1?.receiver.delete===false) ){
  return (
   
    <GestureDetector gesture={g}  >
 <Animated.View style={{marginHorizontal:10}}>
     <TouchableOpacity style={{position:"absolute",height:"100%",right:0,width:100,backgroundColor:"green",borderRadius:10}}
     onPress={()=>{
    call()
     }}
     ></TouchableOpacity>
      <TouchableOpacity style={{position:"absolute",height:"100%",width:100,backgroundColor:"red",borderRadius:10}}
      onPress={async()=>{
        deleteconv()

      }}
      
      ></TouchableOpacity>
    <Animated.View style={[styles.body,animated]}>
      <TouchableOpacity onPress={()=>{
        nav()
        setisopen(null)
      }} activeOpacity={0.5} style={{flexDirection:"row",flex:1,justifyContent:"space-between"}}>
        <View style={styles.first}>
         {pp?  <Image style={{width:60,height:60,borderRadius:100,resizeMode:"cover"}} source={{uri:pp}}  />:<User style={{color:"blue"}} width={60} height={60}/>}

       
        <View style={styles.two}>
          <Text style={{color:"black"}}>{other}</Text>
          <Text style={{color:"black"}}>{mpeop1._id}</Text>
          <Text style={{color:"black"}}>{mpeop1.sender.id===na.id? mpeop1.receiver.delete.toString():mpeop1.sender.delete.toString()}</Text>
        </View>
        </View>
        <View style={styles.third}>
        <Text style={{color:"red"}} >{}</Text>
        
        </View>
        
        </TouchableOpacity>     
        </Animated.View>
    </Animated.View></GestureDetector>
  )
}
  
}

export default Conv

const styles = StyleSheet.create({
    body:{
      flex:1,
      flexDirection:"row",
        height:75,
        backgroundColor:"white",
        borderRadius:10,
        marginHorizontal:0,
        marginBottom:0,
     justifyContent:"space-between",
        alignItems:"center",
    },first:{
  marginLeft:5,
      flexDirection:"row",
      alignSelf:"center"
      
    },two:{
backgroundColor:"red",
flexDirection:"column",
paddingLeft:5,
justifyContent:"center"

    },third:{
      
      alignSelf:"center",
      marginRight:5


    },linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5
    },
    buttonText: {
      fontSize: 18,
      fontFamily: 'Gill Sans',
      textAlign: 'center',
      margin: 10,
      color: '#ffffff',
      backgroundColor: 'transparent',
    },
})