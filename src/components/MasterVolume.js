/* eslint-disable react/prop-types */
import React from "react";
import { Knob } from "react-rotary-knob";
import Audio from "./Audio";

const MasterVolume = ({ masterGainValue, setMasterGainValue }) => {
  const changeMasterVolume = (e) => {
    setMasterGainValue(Math.round(e) / 100);
    Audio.masterGainNode.gain.setValueAtTime(
      Math.round(e) / 100,
      Audio.context.currentTime
    );
  };

  return (
    <div className="master-volume-container">
      <h1 className="oscillator-title">MASTER VOL</h1>
      <Knob
        onChange={changeMasterVolume}
        unlockDistance={10}
        preciseMode={true}
        min={0}
        max={100}
        rotateDegrees={225}
        value={masterGainValue * 100}
      />
      <p>{Math.round(masterGainValue * 100)}</p>
    </div>
  );
};
export default MasterVolume;
