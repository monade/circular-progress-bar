import { useState } from "react";
import "./App.css";
import CircularProgressBar from "./components/circularProgressBar";

function App() {
  const [percentage, setPercentage] = useState(20);
  const [diameter, setDiameter] = useState(300);
  const [borderWidth, setBorderWidth] = useState(20);
  const [color, setColor] = useState("#4456fa");
  const [contentBackgroundColor, setContentBackgroundColor] = useState("#ffffff");

  return (
    <div className='body'>
      <CircularProgressBar
        diameter={diameter}
        color={color}
        percentage={percentage}
        borderWidth={borderWidth}
        contentBackgroundColor={contentBackgroundColor}
      >
        <span>{percentage}%</span>
      </CircularProgressBar>
      <div className='input-container'>
        <span>Progress</span>
        <input
          value={percentage}
          onChange={e => {
            setPercentage(e.target.valueAsNumber);
          }}
          type='range'
        />
      </div>
      <div className='input-container'>
        <span>Diameter</span>
        <input
          value={diameter}
          onChange={e => {
            setDiameter(e.target.valueAsNumber);
          }}
          min={0}
          max={1000}
          type='range'
        />
      </div>
      <div className='input-container'>
        <span>Border width</span>
        <input
          value={borderWidth}
          onChange={e => {
            setBorderWidth(e.target.valueAsNumber);
          }}
          min={0}
          max={diameter}
          type='range'
        />
      </div>
      <div className='color-container'>
        <span style={{ margin: "0px 20px 0px 50px" }}>Outer circle color</span>
        <input
          value={color}
          onChange={e => {
            setColor(e.target.value);
          }}
          type='color'
        />
        <span style={{ margin: "0px 20px 0px 50px" }}>Inner circle color</span>
        <input
          value={contentBackgroundColor}
          onChange={e => {
            setContentBackgroundColor(e.target.value);
          }}
          type='color'
        />
      </div>
    </div>
  );
}

export default App;
