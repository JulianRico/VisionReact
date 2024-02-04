// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
// 1. TODO - Import required model here
// e.g. import * as tfmodel from "@tensorflow-models/tfmodel";
import Webcam from "react-webcam";
import "./App.css";
// 2. TODO - Import drawing utility here
import { drawRect } from "./utilities";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {
    // 3. TODO - Load network 
    const net = await tf.loadGraphModel('https://storage.googleapis.com/data-qc-api.appspot.com/model%20tfjs/model.json');

    console.log('modelo cargado', net)
    // e.g. const net = await cocossd.load();
    
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 16.7);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // 4. TODO - Make Detections
      // e.g. const obj = await net.detect(video);

      const img = tf.browser.fromPixels(video);
      const resized = tf.image.resizeBilinear(img, [320,320]) // redimensionamos la imagen para entregar al sistema, estamos utilizando el modelo de 320
      const casted = resized.cast('int32')
      const expanded = casted.expandDims(0)


      //inference
      const obj = await net.executeAsync(expanded);


      //info

        const info = await obj;

        const scrores =  await info[6].array()
        const boxes = await info[5].array()
        const clasess =  await info[3].array()

        const t0 = await info[0].array()
        const t1 = await info[1].array()
        const t2 = await info[2].array()
        const t3 = await info[3].array() //clases
        const t4 = await info[4].array()
        const t5 = await info[5].array() // cuadrod delimitadores / boxes
        const t6 = await info[6].array() // score
        const t7 = await info[7].array()
        
        console.log('t0', t0)
        console.log('t1', t1)
        console.log('t2', t2)
        console.log('t3', t3)
        console.log('t4', t4)
        console.log('t5', t5)
        console.log('t6', t6)
        console.log('t7', t7)


        //limpiar
        tf.dispose(img)
        tf.dispose(resized)
        tf.dispose(casted)
        tf.dispose(expanded)
        tf.dispose(obj)

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility

      requestAnimationFrame (()=>{drawRect(boxes[0], clasess[0], scrores[0], 0.6, videoWidth, videoHeight, ctx, video)})
      // drawSomething(obj, ctx)  
    }
  };

  useEffect(()=>{runCoco()},[]);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true} 
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 1280,
            height: 720,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 1280,
            height: 720,
          }}
        />
      </header>
    </div>
  );
}

export default App;
