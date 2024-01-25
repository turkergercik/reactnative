import React, { useRef, useState } from "react";
import { Button, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Canvas, Path,Skia } from "@shopify/react-native-skia";
import { runOnJS, useSharedValue } from "react-native-reanimated";

let i =0
export default function Draw() {
  const [paths, setPaths] = useState([]);
  const n = useSharedValue([])
  const f = useSharedValue([])
  const all = useSharedValue([])
  const allref = useRef([])

 function d(e){
  allref.current=[...allref.current,e]
  console.log(allref.current,74)
  
 }


  let x= Skia.Path.Make()
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
    })
    .onUpdate((g) => {
      f.value=[...f.value,{x:g.x,y:g.y}]
      n.value=[...n.value,{x:g.x,y:g.y}]
      
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
        <View style={{ flex: 1, backgroundColor: "black" }}>
          <View style={{paddingTop:50}} >

          <Button title="get" onPress={()=>{
          
            allref.current=[]
            x.reset()
          }} ></Button>

          </View>
          <View style={{paddingTop:50}} >

          <Button title="undo" onPress={()=>{
            undo()
            
          }} ></Button>

          </View>
          <View style={{paddingTop:50}} >

          <Button title="redraw" onPress={()=>{
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
              
                
           }} ></Button>

          </View>
          <Canvas mode="continuous" style={{ flex: 8 }}>
           
              <Path
              
                path={x}
                strokeWidth={5}
                style="stroke"
                strokeCap={"round"}
                strokeJoin={"round"}
                color={"red"}
              />
           
          </Canvas>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}