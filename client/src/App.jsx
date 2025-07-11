import Canvas from './components/Canvas/Canvas.jsx'
import Button from './components/Button/Button.jsx'
import  ColorPicker from './components/ColorPicker/ColorPicker.jsx'
import './App.css'

import { useState } from 'react';

function App () {
  const [ tool , setTool ] = useState('eraser'); 
  const [ color , setColor ] = useState('black'); 

  return ( 
    <div className="parent-container">
      <Canvas tool={tool} color={color}/>
      <ColorPicker color={color} setColor={setColor}/>
      <div style={{ position: 'relative', height: 100, left: 400}}>
        <Button style={{ left: 0 }} setTool={setTool}>Draw</Button>
        <Button style={{ left: 120 }} setTool={setTool}>Clear</Button>
     </div>
    </div>
  )
}

export default App; 