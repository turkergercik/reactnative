import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Dimensions, StatusBar, TouchableNativeFeedbackComponent, TouchableOpacity, View, useWindowDimensions } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Canvas, Path,Skia } from "@shopify/react-native-skia";
import { runOnJS, useSharedValue } from "react-native-reanimated";
import { useAuthorization } from "../Authcontext";
import SystemNavigationBar from "react-native-system-navigation-bar";

let i =0
let x= Skia.Path.Make()
let y= Skia.Path.Make()
export default function Draw({route}) {
  const {width,height}=useWindowDimensions()
  const [paths, setPaths] = useState([]);
  const {socket}=useAuthorization()
  const n = useSharedValue([])
  const f = useSharedValue([])
  const all = useSharedValue([])
  const allref = useRef([])
  const r = useRef([])
  const otherdimension = useRef(null)
  const mydimension = useRef(null)
  //const r = useSharedValue([])
  let otherid= route?.params?.otherid
  function lay(e){
    mydimension.current={width:e.width,height:e.height}

  }
 function d(e){
  allref.current=[...allref.current,e]
  
 }
 function sendpatternbegin(x){
   socket.current.emit("patternbegin",{receiver:otherid,pattern:x,dimension:{width:mydimension.current.width,height:mydimension.current.height}})
  }
  function sendpatterncontinue(x){
   console.log(x.x,x.y,12)
  socket.current.emit("patterncontinue",{receiver:otherid,pattern:x})
 }
 function sendpatternfinish(){
  socket.current.emit("patternfinish",{receiver:otherid})
 }
useEffect(()=>{
  //SystemNavigationBar.navigationHide()
  
  socket.current.on("patternbegin",(e,d)=>{
    
    otherdimension.current={width:(mydimension.current.width/d.width),height:(mydimension.current.height/d.height)}
    //console.log(d.width,d.height)
    y.moveTo(e.x*otherdimension.current.width,e.y*otherdimension.current.height)
    r.current=[...r.current,{x:e.x*otherdimension.current.width,y:e.y*otherdimension.current.height}]

  })
  socket.current.on("patterncontinue",(e)=>{
    console.log(e.x*otherdimension.current.width,e.y*otherdimension.current.height,13)
    r.current=[...r.current,{x:e.x*otherdimension.current.width,y:e.y*otherdimension.current.height}]

    if(r.current.length==2){
      let xc = (r.current[i].x + r.current[i + 1].x) / 2;
      let yc = (r.current[i].y + r.current[i + 1].y) / 2;
      y.quadTo(r.current[i].x, r.current[i].y, xc, yc);
      r.current.shift()
    }

  })
  socket.current.on("patternfinish",(e)=>{
    r.current=[]


  })
  return ()=>{
    socket.current.off("patternbegin")
    socket.current.off("patterncontinue")
    socket.current.off("patternfinish")
    x.reset()
    y.reset()
  }

},[])

 
  const pan = Gesture.Pan()
    .onStart((g) => {
      f.value=[...f.value,{x:g.x,y:g.y}]
      n.value=[...n.value,{x:g.x,y:g.y}]
      x.moveTo(g.x,g.y)
      const newPaths = [...paths];
      newPaths[paths.length] = {
        segments: [],
        color: "#06d6a0",
      };
      newPaths[paths.length].segments.push(`M ${g.x} ${g.y}`);
      //runOnJS (setPaths)(newPaths);
      runOnJS(sendpatternbegin)({x:g.x,y:g.y})
    })
    .onUpdate((g) => {
      f.value=[...f.value,{x:g.x,y:g.y}]
      n.value=[...n.value,{x:g.x,y:g.y}]
      runOnJS(sendpatterncontinue)({x:g.x,y:g.y})
      
      /* f.value.map((item,i)=>{
        
        if(i+1<n.value.length){

          let xc = (f.value[i].x + f.value[i + 1].x) / 2;
          let yc = (f.value[i].y + f.value[i + 1].y) / 2;
          x.quadTo(f.value[i].x, f.value[i].y, xc, yc);
          
        }
       
      
    }) */


      if(n.value.length==2){
        let xc = (n.value[i].x + n.value[i + 1].x) / 2;
        let yc = (n.value[i].y + n.value[i + 1].y) / 2;
        x.quadTo(n.value[i].x, n.value[i].y, xc, yc);
        n.value.shift()
      }
    
      /* x.quadTo(g.x,g.y,n,) */
      
     /*  if(n.value.length===3){

      
      n.value.map((item,i)=>{
        
          if(i+1<n.value.length){

            let xc = (n.value[i].x + n.value[i + 1].x) / 2;
            let yc = (n.value[i].y + n.value[i + 1].y) / 2;
            x.quadTo(n.value[i].x, n.value[i].y, xc, yc);
            
          }
         
        
      })
    } */
    }).onEnd(()=>{
      
      runOnJS(d)(f.value)
      f.value=[]
      n.value=[]
      runOnJS(sendpatternfinish)()

      /* n.value.map((item,i)=>{
        if(i===0){
         console.log(item)
          x.moveTo(item.x,item.y)
        }else{
          if(i+1<n.value.length){

            let xc = (n.value[i].x + n.value[i + 1].x) / 2;
            let yc = (n.value[i].y + n.value[i + 1].y) / 2;
            x.quadTo(n.value[i].x, n.value[i].y, xc, yc);
          }
         
        }
      })
      console.log(n.value) */
    })
function undo(){
  x.reset()
  console.log(allref.current.length,8)
allref.current.pop()

          
            
            
            console.log(allref.current.length,8)
            allref.current.map((itemb,ib)=>{
  itemb.map((item,i)=>{
    if(i===0){
      console.log(item)
       x.moveTo(item.x,item.y)
     }else{
       if(i+1<itemb.length){

         let xc = (itemb[i].x + itemb[i + 1].x) / 2;
         let yc = (itemb[i].y + itemb[i + 1].y) / 2;
         x.quadTo(itemb[i].x, itemb[i].y, xc, yc);
       }
      
     }


  })

  
})
}
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      
      <GestureDetector gesture={pan}>
        <View onLayout={({ nativeEvent: { layout } }) => {
     lay(layout)
    
  }} style={{flex:1,backgroundColor: "black" }}>
          
        
          

          {/* <Button title="redraw" onPress={()=>{
            allref.current.map((itemb,ib)=>{
              itemb.map((item,i)=>{
                if(i===0){
                   console.log(item)
                   x.moveTo(item.x,item.y)
                 }else{
                   if(i+1<itemb.length){
                     let xc = (itemb[i].x + itemb[i + 1].x) / 2;
                     let yc = (itemb[i].y + itemb[i + 1].y) / 2;
                     x.quadTo(itemb[i].x, itemb[i].y, xc, yc);
                   }
                  
                 }


              })
           
              
            })
              
                
           }} ></Button> */}

        
          <Canvas mode="continuous" style={{ flex:1 }}>
           
              <Path
              
                path={x}
                strokeWidth={5}
                style="stroke"
                strokeCap={"round"}
                strokeJoin={"round"}
                color={"red"}
              />
              <Path
              
              path={y}
              strokeWidth={5}
              style="stroke"
              strokeCap={"round"}
              strokeJoin={"round"}
              color={"red"}
            />
           
          </Canvas>
        </View>
      </GestureDetector>
      
      {/* <View style={{zIndex:1,position:"absolute",bottom:0,}} >

          <TouchableOpacity style={{backgroundColor:"red",width:50,height:50}} onPress={()=>{
          
            allref.current=[]
            x.reset()
          }} ></TouchableOpacity>
         {/*  <Button title="undo" onPress={()=>{
            undo()
            
          }} ></Button> 

          </View> */}
    </GestureHandlerRootView>
  );
}