import { View, Text ,Dimensions,StatusBar,Alert,NativeModules,BackHandler} from 'react-native'
import React,{useEffect, useRef,useState,useLayoutEffect} from 'react'
import { GestureDetector, GestureHandlerRootView,gestureHandlerRootHOC,Gesture } from 'react-native-gesture-handler'
import ImageViewer from "react-native-reanimated-image-viewer"
import SystemNavigationBar from 'react-native-system-navigation-bar';
import Animated, { FadeIn, SlideInDown, SlideInLeft, SlideInUp, SlideOutDown, SlideOutUp, runOnJS,useSharedValue,useAnimatedStyle, withTiming, withDelay, interpolate} from 'react-native-reanimated';
import { useRoute, } from '@react-navigation/native';
import { useAuthorization } from '../Authcontext';
import Gallery, { GalleryRef } from 'react-native-awesome-gallery';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import ImageView from "react-native-image-viewing";
import { IconButton } from 'react-native-paper';
const as= StatusBar.currentHeight
const {pause:df}=NativeModules
const Photo = ({route,navigation,onRequestClose}) => {
  const WIDTH = 400;
    const HEIGHT = 400;
  let {width,height}=Dimensions.get("screen")
  //SystemNavigationBar.fullScreen(true)
  const {setstat,rr,setimg} = useAuthorization()
  const [pt,setpt] = useState(false)
  const state = useRoute();
  const refg = useRef(false)
  const gref = useRef(null)
  const opacity =useSharedValue(1)
  const scale =useSharedValue(1)
  const tx =useSharedValue(height)
  const ty =useSharedValue(height)
  const doubletap =useSharedValue(false)
  const initialTouchLocation =useSharedValue(null)
  const savedx = useSharedValue(0);
  const savedy = useSharedValue(0);
  const trax = useSharedValue(0);
  const tray = useSharedValue(0);
  const focalX = useSharedValue(0);
    const focalY = useSharedValue(0);
    const xCurrent = useSharedValue(0);
    const yCurrent = useSharedValue(0);
    const xPrevious = useSharedValue(0);
    const yPrevious = useSharedValue(0);
    const scaleCurrent = useSharedValue(1);
    const scalePrevious = useSharedValue(1);
 // Alert.alert(state.params.img.toString())
  const img1 = route?.params?.img1
  let pd= route?.params?.pd1



  useEffect(()=>{
    if(Dimensions.get("screen").height>Dimensions.get("screen").width){
      setpt(true)
     }else{
      setpt(false)
     }
      
      ty.value=withDelay(0,withTiming(0))
      //setstat(true)
      //rr.value=true
      //StatusBar.setTranslucent(true)
      setTimeout(() => {
        df.changedcm("shortEdges")
        SystemNavigationBar.setNavigationColor("transparent","dark")
        StatusBar.setHidden(true)
        SystemNavigationBar.navigationHide()
        
      }, 300);
  
      //SystemNavigationBar.fullScreen(true)
      const x =Dimensions.addEventListener("change",(e)=>{
           if(e.screen.height>e.screen.width){
            setpt(true)
           }else{
            setpt(false)
           }
      })
      //StatusBar.setBackgroundColor("transparent")
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',goback
      );
      return () => {
        
        x.remove()
        backHandler.remove()
       
        setimg(null)
       
        
        df.changedcm("default")
        StatusBar.setHidden(false)
        
        
      }
  },[])
  const pinchHandler = Gesture.Pinch().
    onStart((event) => {
        if (event.numberOfPointers == 2) {
            focalX.value = event.focalX;
            focalY.value = event.focalY;
        }
    })
    .onChange((event) => {
        if (event.numberOfPointers == 2) {
            // On Android, the onStart event gives 0,0 for the focal
            // values, so we set them here instead too.
            if (event.oldState === 2) {
                focalX.value = event.focalX;
                focalY.value = event.focalY;
            }
            scaleCurrent.value = event.scale;

            xCurrent.value = (1 - scaleCurrent.value) * (focalX.value - WIDTH / 2);
            yCurrent.value = (1 - scaleCurrent.value) * (focalY.value - HEIGHT / 2);
        }
    })
    .onEnd(() => {
        scalePrevious.value = scalePrevious.value * scaleCurrent.value;

        xPrevious.value = scaleCurrent.value * xPrevious.value + xCurrent.value;
        yPrevious.value = scaleCurrent.value * yPrevious.value + yCurrent.value;

        xCurrent.value = 0;
        yCurrent.value = 0;

        scaleCurrent.value = 1;
    })


    function ee(s){
      
      setTimeout(() => {
        s.fail()
      }, 300);
    }
  const panhandle = Gesture.Pan().manualActivation(true)
  
  .onBegin((evt,s)=>{
    
    initialTouchLocation.value = { x: evt.x, y: evt.y };

    /* trax.value =  savedx.value
    tray.value =  savedy.value */
   /*  xPrevious.value = savedx.value
    yPrevious.value = savedy.value */

  }).onTouchesMove((evt,state)=>{
   
    
    const xDiff = Math.abs(evt.changedTouches[0].x - initialTouchLocation.value.x);
    const yDiff = Math.abs(evt.changedTouches[0].y - initialTouchLocation.value.y);
    const isHorizontalPanning = yDiff > xDiff;
     if(isHorizontalPanning&&scale.value===1){
      console.log(yDiff)
      state.activate()
    }else{
       state.fail()

     }
     if(xDiff>50){
      
     }else{
     }
    /* trax.value = event.translationX+savedx.value
    tray.value = event.translationY+savedy.value */
    /* xPrevious.value = event.translationX
    yPrevious.value = event.translationY */

  }).onTouchesDown((e,s)=>{
    s.fail()
    
    
  
  })
  const dt = Gesture.Tap().numberOfTaps(2).onStart((e)=>{
    
  
    console.log("op")
  })
  const style = useAnimatedStyle(() => {
    return {
      transform:[{translateY:tx.value}]
      //marginTop:keyboard.value? keyboard.value:0
    };
  });
  const ts = useAnimatedStyle(() => {
    return {
      transform:[{translateY:ty.value}]
      //marginTop:keyboard.value? keyboard.value:0
    };
  });

function goback(){
  SystemNavigationBar.navigationShow()
  SystemNavigationBar.setNavigationColor("black","light")
  
ty.value=withTiming(-height*2,{duration:500},(e)=>{
if(e){
  runOnJS(navigation.goBack)()
  
}
})
return true

}


function tap(){
  if(refg.current===false){
    ty.value=withTiming(-75-as,{duration:150})
    refg.current=true

  }else{
    ty.value=withTiming(0,{duration:150})
    refg.current=false
  }

}

const st = useAnimatedStyle(() => {
  return {
      transform: [
          { translateX: trax.value },
          { translateY: tray.value },
        
         
      ],
  };
});

const st1 = useAnimatedStyle(() => {
  opacity.value=interpolate(opacity.value,[0,tray.value],[1,0])
  return {
      opacity:opacity.value
  };
});

const animatedStyle = useAnimatedStyle(() => {
  return {
      transform: [

          { translateX: xCurrent.value },
          { translateY: yCurrent.value },
          { scale: scaleCurrent.value },
          { translateX: xPrevious.value },
          { translateY: yPrevious.value },
          { scale: scalePrevious.value },
          
      ],
  };
});
const ges = Gesture.Simultaneous(panhandle)
  if(img1){

  

    return (
          <>


            
              <Animated.View
              style={[ts,{position:"absolute",top:0,bottom:0,right:0,left:0,backgroundColor:"black"}]}
              >
             
              <Gallery
              onSwipeToClose={()=>{
                goback()
              }}
              
              ref={gref}
              style={{
                backgroundColor:"transparent"
              }}
              onScaleChange={(e)=>{
                scale.value=e
                console.log(e)
              }}             
              containerDimensions={{
                width:Dimensions.get("screen").width,
                height:Dimensions.get("screen").height
              }}
              hideAdjacentImagesOnScaledImage
              data={[img1]}
              >

              </Gallery>
              </Animated.View>
            
              
                


              </>
            
          
      
  )
}
}

export default Photo