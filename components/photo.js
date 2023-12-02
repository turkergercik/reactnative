import { View, Text ,Dimensions,StatusBar,Alert} from 'react-native'
import React,{useEffect} from 'react'
import { GestureHandlerRootView,gestureHandlerRootHOC } from 'react-native-gesture-handler'
import ImageViewer from "react-native-reanimated-image-viewer"
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { runOnJS } from 'react-native-reanimated';
import { useRoute, } from '@react-navigation/native';
import { useAuthorization } from '../Authcontext';
const Photo = ({route,navigation,onRequestClose}) => {
  //SystemNavigationBar.fullScreen(true)
  const {setstat,rr,setimg} = useAuthorization()
  const state = useRoute();
 // Alert.alert(state.params.img.toString())
  const img1 = route?.params?.img1
  let pd= route?.params?.pd1
  useEffect(() => {
    //setstat(true)
    //rr.value=true
    StatusBar.setTranslucent(true)
    StatusBar.setHidden(true)
    SystemNavigationBar.navigationHide()
    //SystemNavigationBar.fullScreen(true)
    
    //StatusBar.setBackgroundColor("transparent")
  
    return () => {
      setimg(null)
     /*  rr.value=false
      setstat(false) */
      //SystemNavigationBar.fullScreen(false)
      //StatusBar.setTranslucent(false)
      StatusBar.setHidden(false)
     // StatusBar.setBackgroundColor("red")
        
        SystemNavigationBar.navigationShow()
      
    }
  }, [])
  


  if(img1){

  
  return (
    <GestureHandlerRootView style={{backgroundColor:"transparent",position:"absolute",top:0,right:-1,left:0,bottom:0,zIndex:2}}>
    
    <ImageViewer 
    onSingleTap={()=>{
      }}
    onRequestClose={()=>
      {
      navigation.goBack()
      //setimg(false)
    }}
            imageUrl={img1} width={Dimensions.get("window").width} height={Dimensions.get("window").height} 
          />
          
         
          </GestureHandlerRootView>
    
        
  )}
}

export default Photo