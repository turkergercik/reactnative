import { Image, StyleSheet,TouchableOpacity, Text, View,TouchableHighlight,Dimensions,Alert, TouchableNativeFeedback } from 'react-native'
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
import axios, { all } from 'axios';
import { Button,Portal,Dialog,IconButton,Surface, Icon } from 'react-native-paper';
import { storage } from '../Authcontext';
import LinearGradient from 'react-native-linear-gradient';

let r =0
const {width,height} =Dimensions.get("window")
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
const Conv = ({mpeop1,peop,userId,navigation,simul,isopen,k,setisopen,o}) => {
const { setmessages,istoday,rr,state,server,authContext,onlines,lastmesssages,setlastmesssages,settrigger,trigger}=useAuthorization()
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
   const [lastm,setlastm]=useState(null)
   const [time,settime]=useState(null)
   const [online,setonline]=useState(false)
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
  useEffect(()=>{
    if(lastmesssages===mpeop1._id || lastmesssages===null || trigger===true){
     
   let allm = storage.getString(mpeop1._id)
   if(allm){
    let allm1=JSON.parse(allm)
    let lastElement = allm1[0]
    
    if(lastElement){
      if(lastElement.text){
        setlastm(lastElement.text)
        let now = new Date(Date.now())
        let t
        if(new Date(lastElement.createdAt).getFullYear()===now.getFullYear()){
          switch(now.getDate()-new Date(lastElement.createdAt).getDate()){
            case 0:
              t=new Date(lastElement.createdAt).toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"})
            break
            case 1:
              t="Dün"
            break
            default:
              t=new Date(lastElement.createdAt).toLocaleDateString("tr-TR",{day:"2-digit",month:"2-digit",year:"2-digit"})
          }
        
        }else{
          t=new Date(lastElement.createdAt).toLocaleDateString("tr-TR",{day:"2-digit",month:"long",year:"numeric"})
      
        }
        //let time= new Date(lastElement.createdAt).toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"})
        
        settime(t)

      }else if(lastElement.media){
        setlastm("yenifotoğraf")
      }else{
        setlastm(null)
      }
    }
    console.log(lastElement,5555)
   }
  setlastmesssages(undefined)
  settrigger(undefined)
  }
   },[lastmesssages,trigger])
useEffect(()=>{
  console.log(storage.getAllKeys())
 let f =onlines?.find((item)=>
   
    item.userId===otherid
      
   
  )
  if(f){
    setonline(true)
  }else{
    setonline(false)
  }
},[onlines])

 useEffect(() => {
  
  async function s(){
  //let p = await AsyncStorage.getItem("peop")
  let p = storage.getString("peop")
  

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

}else{
  console.log("yok")
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
  //const mess= await AsyncStorage.getItem(mpeop1._id)
 const mess =storage.getString(mpeop1._id)
  if(mess){
    console.log(JSON.parse(mess).length)
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
    
      //setmessages(x.slice(0,a[d]+1))
      setmessages(x)
    }else{

      setmessages(x)
    }
    navigation.navigate("Chatid",{id:mpeop1._id,pp:pp,mpeop:mpeop1,notid:notid.current,mess:true,newchat:false})

     // dispatch(setmessages(generateItems(JSON.parse(mess).slice(0,20))))
  
    
  }else{
    
    //console.log(mpeop1,7)
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
function call(type){

  navigation.navigate(type,{convid:mpeop1._id,otherid:otherid,notid:notid.current,other:other})
  close()

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
    if(Math.abs(evt.translationX)>=width/3 ){
      
      
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
        lastx.value=width/5
        translationX.value=withTiming(width/5)
        runOnJS(f)(k)

      }else{
        if(direction.value==="right"){
        
          lastx.value=width/5
          translationX.value=withTiming(width/5)

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
          lastx.value=-width/3
          translationX.value=withTiming(-width/3)
          runOnJS(f)(k)

          
        }else{
          if(direction.value==="left"){
           
            lastx.value=-width/3
            translationX.value=withTiming(-width/3)
            
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
          <Animated.View style={{justifyContent:"center",alignItems:"center"}}>
          
              <IconButton icon={"video"} size={35} iconColor='white' rippleColor={"grey"} style={{width:60,height:60,position:"absolute",right:60,borderRadius:50}}
              onPress={()=>{
              call("Video")
              }}
              >                
              </IconButton>
              <IconButton icon={"phone"} size={30} iconColor='white' rippleColor={"grey"} style={{width:60,height:60,position:"absolute",right:0,borderRadius:50}}
              onPress={()=>{
              call("Audio")
              }}
              >                
              </IconButton>
              <IconButton icon={"trash-can-outline"} size={35} iconColor='red' rippleColor={"grey"} style={{width:60,height:60,position:"absolute",left:0,borderRadius:50}}
                onPress={async()=>{
                  deleteconv(mpeop1,other,otherid,notid.current,state,me,authContext,prt)
                  close()

                }}
                
              >
              </IconButton>
              <Animated.View style={[styles.body,animated]}>
               
                <View style={{flex:1,backgroundColor:"#505050"}}>
                    <TouchableNativeFeedback 
                    background={TouchableNativeFeedback.Ripple("grey")}
                    onPress={()=>{
                      nav()
                      setisopen(null)
                    }} activeOpacity={0.5} >
                      <View style={{flexDirection:"row",justifyContent:"space-between",flex:1,backgroundColor:"black"}}>
                            <View style={[styles.first,{flex:1,flexDirection:"row",justifyContent:"flex-start"}]}>
                              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={online ?['#21D4FD','#B721FF']:["transparent","transparent"]} style={{width:68,height:68,borderRadius:35,justifyContent:"center",alignItems:"center"}}>
                                <View style={{backgroundColor:"black",position:"absolute",width:58,height:58,borderRadius:30}}>
                                  </View>
                              {pp? <TouchableOpacity onPress={()=>{
                              navigation.navigate("Photo",{img1:pp})
                            }}><Image style={{width:60,height:60,borderRadius:100,resizeMode:"cover"}} source={{uri:pp}}/></TouchableOpacity> :<User source={"account-circle"} size={60} color='#6538c6' style={{color:"#6538c6"}} width={67} height={67}/>}
                              </LinearGradient>

                          
                                  <View style={[styles.two,{flex:1}]}>
                                    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                                    <Text style={{fontSize:17,fontWeight:300,color:"white"}}>{other}</Text>
                                    <Text style={{color:"grey",fontWeight:"300",fontSize:14}} >{time}</Text>
                                    </View>
                                    <Text numberOfLines={1}  style={{fontSize:14,fontWeight:300,color:"white"}} ellipsizeMode="head" >{lastm}</Text>
                                  </View>
                            </View>
                            {/* <View style={[styles.third,{backgroundColor:"blue",flex:1}]}>
                                  <Text style={{color:"red"}} >{456}</Text>
                            
                            </View> */}
                          </View>
                      </TouchableNativeFeedback>     
                </View>     
               
              </Animated.View>
          </Animated.View>
    </GestureDetector>
  )
}
  
}

export default Conv

const styles = StyleSheet.create({
    body:{
      flex:1,
      flexDirection:"row",
        height:75,
        backgroundColor:"#141414",
        borderRadius:15,
        marginHorizontal:0,
        marginBottom:0,
     justifyContent:"space-between",
        alignItems:"center",
    },first:{
      
      marginLeft:5,
      marginRight:5,
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center",
      
    },two:{
flexDirection:"column",
paddingLeft:5,
justifyContent:"center"

    },third:{
      
      alignSelf:"center",
      marginRight:5,
      flex:1


    }
})