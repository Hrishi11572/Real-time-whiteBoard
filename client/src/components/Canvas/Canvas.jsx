import { useRef, useEffect } from "react"

import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

function Canvas ({ tool , color }) {
    const isDrawing = useRef(false);
    const canvasRef = useRef(null); 

    useEffect( () =>{
        const canvas = canvasRef.current; 
        const ctx = canvas.getContext('2d'); 

        // fix width and height 
        canvas.width = 1000; 
        canvas.height = 1000; 
        ctx.lineCap = 'round';
        ctx.lineWidth = 3;

        // Listen for drawing data from server
        socket.on("drawing" , ({ offsetX , offsetY , type, color, tool }) => {
            if(!ctx) return; 

            if(type === "begin"){
                ctx.beginPath(); 
                ctx.moveTo(offsetX , offsetY); 
                ctx.strokeStyle = tool === "eraser" ? "rgba(0,0,0,1)" : color;
                ctx.lineWidth = tool === "eraser" ? 100 : 3;
                ctx.globalCompositeOperation = tool === "eraser" ? "destination-out" : "source-over";
            }else if(type === "draw"){
                ctx.lineTo(offsetX, offsetY);
                ctx.stroke();
            }else if(type === "end"){
                ctx.globalCompositeOperation = "source-over";
            }
        })

        return () => {
            socket.off("drawing");
        };
    }, [])

    function emitDrawing(type, offsetX, offsetY) {
        socket.emit("drawing", {
            offsetX,
            offsetY,
            type,
            color,
            tool
        });
    }

    function handleMouseDown(event){
        const ctx = canvasRef.current.getContext('2d');
        const {offsetX , offsetY} = event.nativeEvent;

        isDrawing.current = true;
        ctx.beginPath(); 
        ctx.moveTo(offsetX,offsetY); 

        if(tool === 'pencil'){
            ctx.lineWidth=3; 
            ctx.strokeStyle = color;
            ctx.globalCompositeOperation = 'source-over';
            isDrawing.current = true;
            // define a new path
        }else{
            // baad me dekhte hain 
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = 100;
            ctx.strokeStyle = 'rgba(0,0,0,1)';
            isDrawing.current = true;
        }

        emitDrawing("begin", offsetX, offsetY);
    }

    function handleMouseMove(event){
        if(!isDrawing.current) return; 

        const ctx = canvasRef.current.getContext('2d');
        const {offsetX, offsetY} = event.nativeEvent; 

        ctx.lineTo(offsetX,offsetY);
        ctx.stroke();

        emitDrawing("draw", offsetX, offsetY);
    }

    function handleMouseUp(e){
        if(!isDrawing.current) return; 
        isDrawing.current = false; 

        const { offsetX, offsetY } = e.nativeEvent;
        emitDrawing("end", offsetX, offsetY);

        const ctx = canvasRef.current.getContext('2d'); 
        ctx.globalCompositeOperation = 'source-over';
    }

    return (
        <canvas 
        ref={canvasRef}
        style = {{
            border: "solid 3px"
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        ></canvas>
    )
}

export default Canvas