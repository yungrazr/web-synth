import React, { useState, useEffect } from "react";
import "../styles/Oscillator.scss";
import Audio from "./Audio";
import { Knob } from "react-rotary-knob";

const Filter = () => {
  const [filter, setFilter] = useState();

  // Initialise filter node and set default values
  useEffect(() => {
    const initiateFilter = () => {
      const filterNode = Audio.context.createBiquadFilter();
      Audio.filterGainNode.gain.setValueAtTime(0.5, Audio.context.currentTime);
      filterNode.frequency.value = 1000;
      filterNode.type = "lowpass";
      filterNode.Q.value = 1;
      Audio.filterGainNode.connect(filterNode);
      filterNode.connect(Audio.masterGainNode);

      const filterNodeValues = {
        frequency: filterNode.frequency.value,
        type: filterNode.type,
        Q: filterNode.Q.value,
        filterNode: filterNode,
      };
      setFilter(filterNodeValues);
    };
    initiateFilter();
  }, []);

  const updateFrequency = (e) => {
    const newFreq = { ...filter };
    newFreq.filterNode.frequency.value = e;
    newFreq.frequency = e;
    setFilter(newFreq);
  };

  const updateQ = (e) => {
    console.log(filter);
    const newFreq = { ...filter };
    newFreq.filterNode.Q.value = e;
    newFreq.Q = e;
    setFilter(newFreq);
  };

  const updateType = (e) => {
    const select = Math.round(e);
    const newFreq = { ...filter };
    switch (select) {
      case 1:
        newFreq.filterNode.type = "lowpass";
        newFreq.type = "lowpass";
        break;
      case 2:
        newFreq.filterNode.type = "highpass";
        newFreq.type = "highpass";
        break;
      case 3:
        newFreq.filterNode.type = "bandpass";
        newFreq.type = "bandpass";
        break;
      default:
        newFreq.filterNode.type = "lowpass";
        newFreq.type = "lowpass";
    }
    setFilter(newFreq);
  };

  const checkType = () => {
    switch (filter.type) {
      case "lowpass":
        return 1;
      case "highpass":
        return 2;
      case "bandpass":
        return 3;
      default:
        return 1;
    }
  };

  if (filter === undefined) {
    return null;
  } else {
    return (
      <div className="oscillator-container">
        <h1 className="oscillator-title">FILTER</h1>

        {/* Set the cutoff frequency of the filter */}
        <div className="oscillator-knob-container">
          <h3 className={"oscillator-title-small"}>CUTOFF</h3>
          <Knob
            onChange={updateFrequency}
            unlockDistance={10}
            min={0}
            max={4000}
            preciseMode={true}
            rotateDegrees={180}
            value={filter.frequency}
          />
          <p>{Math.round(filter.frequency)}hz</p>
        </div>

        {/* Set the Q value of the filter */}
        <div className="oscillator-knob-container">
          <h3 className={"oscillator-title-small"}>RES</h3>
          <Knob
            onChange={updateQ}
            unlockDistance={10}
            min={0.01}
            max={15}
            preciseMode={true}
            rotateDegrees={180}
            value={filter.Q}
          />
          <p>{filter.Q.toFixed(2)}</p>
        </div>

        <div className="oscillator-knob-container">
          <h3 className={"oscillator-title-small"}>TYPE</h3>
          {/* Set the type of the filter */}
          <Knob
            onChange={updateType}
            unlockDistance={10}
            preciseMode={true}
            min={1}
            max={4}
            rotateDegrees={180}
            value={checkType()}
          />
          <p>{filter.type}</p>
        </div>
      </div>
    );
  }
};
export default Filter;
