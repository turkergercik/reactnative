import { View,Keyboard, Text,TextInput as Ti,TouchableOpacity,StyleSheet,Button,SafeAreaView,ScrollView,StatusBar,KeyboardAvoidingView,Dimensions } from 'react-native'
import React,{useEffect,useState,useCallback, useRef,useImperativeHandle } from 'react'
import axios from 'axios'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, {
  interpolate,
  Extrapolate,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  useAnimatedGestureHandler,
  withTiming,runOnJS, SlideInDown, SlideOutDown,FadeInDown,FadeOut
} from 'react-native-reanimated';
import { TextInput } from 'react-native-paper';
import { useAuthorization } from '../Authcontext';
let darktext="#F0EFE9"
let bgfordarkmode="dark:bg-[#1a1a1a]"
let whitefordark="dark:text-[#F0EFE9]"
let svgcolor="text-[#097EFE]"
let bg="#097EFE"
let specialwhitebg="bg-[#F0EFE9]"
let specialwhitetext="text-[#F0EFE9]"
let bordercolor="border-[#097EFE]"
let textcolorblue="text-[#097EFE]"
let svgsearch="text-[#60ACFF]"
let bginput="bg-[#F0EFE9]"
let divisionlinedark="dark:divide-[#F0EFE9]"
let darkborderinput="dark:border-[#F0EFE9]"
let focusvgsearch="focus:border-[#097EFE]"
let divisioncolor="divide-[#90C5FF]"
let divisioncolorforfirstline="border-[#90C5FF]"
let maincolor="bg-white"
let x=""

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
export default function Register({route,navigation}) {
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });
  const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;
  const{server}=useAuthorization()
    let prt=server
   const login=async(e)=>{
    
    await axios.post(`${prt}/register`,{
        name:name,
        email:email,
        password:password,
        notid:x
    }).then((response) => {
        if(response.data.data!=="0"){ navigation.navigate("Login") }
    
   
  
    
        
      }).catch((q)=>{
        console.log(q)
      })
  
  setemail(null)
  setemailc(null)
  setpasswordc(null)
  setpassword(null)

   }
 
  

    const validate = (text) => {
        
        setemail(text)
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            setemailc(false)
         
          return false;
        }
        else {
            setemailc(true)
          //setemail()
        }
      }
      const validateP = (text) => {
        
        setpassword(text)
        if (text?.length>=5) {
            setpasswordc(true)
         
          
        }
        else {
            setpasswordc(false)
          //setemail()
        }
      }
   const [email, setemail] = useState(null)
   const [name, setname] = useState(undefined)
   const [emailc, setemailc] = useState(null)
   const [password, setpassword] = useState(null)
   const [passwordc, setpasswordc] = useState(null)
   


  return (
<KeyboardAvoidingView   style={style.body}>
      <View style={style.bodysmall}>
        <TextInput mode="outlined" textColor='white' activeOutlineColor='white' label={"Name"} contentStyle={{fontSize:18,height:50}} outlineStyle={{borderWidth:2,borderRadius:15,borderColor:name===undefined ? "black":name==="" ?"red":"green",}} onFocus={()=>setname("")} cursorColor='white' inputMode="text" autoCapitalize='none' keyboardType="default" onBlur={()=>
        {
            //setemailc(null)
    }}  textContentType='emailAddress' style={{
        width:"100%",
        backgroundColor:"#292929",
        borderRadius:15,
        marginBottom:4,
    
    }} value={name} onChangeText={(e)=>setname(e)}/>

        <TextInput mode="outlined" textColor='white' activeOutlineColor='white' label={"Email"} contentStyle={{fontSize:18,height:50}} outlineStyle={{borderRadius:15,borderWidth:2,borderColor:emailc===true ? "green":emailc===false ?"red":null}} autoCapitalize="none" keyboardType="default" onBlur={()=>
        {
            //setemailc(null)
    }}  style={{
        width:"100%",
        backgroundColor:"#292929",
        marginBottom:4,

    
    }} value={email} onFocus={()=>validate(email)} onChangeText={(e)=>{validate(e)}}/>
        <TextInput  mode="outlined" textColor='white' activeOutlineColor='white' label={"Password"} contentStyle={{fontSize:18,height:50}} outlineStyle={{borderRadius:15,borderWidth:2,borderColor:passwordc===true ? "green":passwordc===false ?"red":null}} textContentType='password' autoCapitalize='none' style={{
        width:"100%",
        backgroundColor:"#292929",
        marginBottom:4,
    
    }} value={password} onFocus={()=>validateP(password)} onChangeText={(e)=>{validateP(e)}} secureTextEntry/>

  {emailc&&passwordc&&name!=="" ?<Animated.View entering={FadeInDown} exiting={FadeOut}  style={{color:darktext,height:50,backgroundColor:"#111111",width:"100%",borderRadius:15,marginVertical:10,justifyContent:"center",alignItems:"center"}} onPress={()=>navigation.goBack()
}><TouchableOpacity onPress={()=>login()} disabled={emailc&&passwordc&&name!=="" ? false:true} style={{height:"100%",borderRadius:15,justifyContent:"center",width:"100%",alignItems:"center" }}>
       <Text style={{color:"white",fontSize:18,fontWeight:"300"}} >Kayıt Ol</Text>
      </TouchableOpacity></Animated.View>:<TouchableOpacity style={{color:darktext,height:50,backgroundColor:"#111111",width:"100%",borderRadius:15,marginVertical:10,justifyContent:"center",alignItems:"center"}} onPress={()=>navigation.goBack()
}>
<Text style={{color:"white",fontSize:18,fontWeight:"300"}}>
Zaten Üyeyim
</Text>
</TouchableOpacity> 

}      



    </View>
    </KeyboardAvoidingView>

  )



}


const style= StyleSheet.create({
    body:{
      flex:1,
      backgroundColor:"black",
      alignItems: 'center', 
      justifyContent: "center",

    },bodysmall:{
       
        width:"80%",
       
       alignItems:"center",
        backgroundColor:"#292929",
        paddingHorizontal:10,
        borderRadius:20,
        paddingTop:4
    },
    
    })