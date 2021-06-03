import React, { useState, useEffect } from "react";
import "../styles/Oscillator.scss";
import Audio from "./Audio";
import { Knob } from "react-rotary-knob";

const Delay = () => {
  const [delay, setDelay] = useState();
  const [feedback, setFeedback] = useState();
  const [filter, setFilter] = useState();
  const [offOn, setOffOn] = useState(false);

  // Initialise delay node and set default values
  useEffect(() => {
    const initiateDelay = () => {
      const delayNode = Audio.context.createDelay();
      delayNode.delayTime.setValueAtTime(0.15, Audio.context.currentTime);

      const feedbackNode = Audio.context.createGain();
      feedbackNode.gain.setValueAtTime(0.6, Audio.context.currentTime);

      const filterNode = Audio.context.createBiquadFilter();
      filterNode.frequency.setValueAtTime(1000, Audio.context.currentTime);

      delayNode.connect(feedbackNode);
      feedbackNode.connect(filterNode);
      filterNode.connect(delayNode);

      Audio.masterGainNode.connect(delayNode);

      const delayNodeValues = {
        delayTime: 0.15,
        delayNode: delayNode,
      };
      const filterNodeValues = {
        frequency: 1000,
        filterNode: filterNode,
      };
      const feedbackNodeValues = {
        gain: 0.6,
        feedbackNode: feedbackNode,
      };

      setDelay(delayNodeValues);
      setFeedback(feedbackNodeValues);
      setFilter(filterNodeValues);
    };
    initiateDelay();
  }, []);

  const updateDelayTime = (e) => {
    const newDelay = { ...delay };
    newDelay.delayNode.delayTime.setValueAtTime(e, Audio.context.currentTime);
    newDelay.delayTime = e;
    setDelay(newDelay);
  };

  const updateDelayFeedback = (e) => {
    const newFeedback = { ...feedback };
    newFeedback.gain = e;
    newFeedback.feedbackNode.gain.setValueAtTime(e, Audio.context.currentTime);
    setFeedback(newFeedback);
  };

  const updateDelayCutoffFreq = (e) => {
    const newFilter = { ...filter };
    newFilter.frequency = e;
    newFilter.filterNode.frequency.setValueAtTime(e, Audio.context.currentTime);
    setFilter(newFilter);
  };

  const switchOnOffDelay = () => {
    if (offOn) {
      setOffOn(false);
      delay.delayNode.disconnect(Audio.context.destination);
    } else {
      setOffOn(true);
      delay.delayNode.connect(Audio.context.destination);
    }
  };

  if (delay && filter && feedback) {
    return (
      <div className="oscillator-container">
        <h1 className="oscillator-title">DELAY</h1>

        {/* Set the delay time value */}
        <div className="oscillator-knob-container">
          <h3 className={"oscillator-title-small"}>TIME</h3>
          <Knob
            onChange={updateDelayTime}
            unlockDistance={10}
            min={0}
            max={1}
            preciseMode={true}
            rotateDegrees={180}
            value={delay.delayTime}
          />
          <p>{delay.delayTime.toFixed(2)}sec</p>
        </div>

        {/* Set the feedback value of the Delay */}
        <div className="oscillator-knob-container">
          <h3 className={"oscillator-title-small"}>FEEDBACK</h3>
          <Knob
            onChange={updateDelayFeedback}
            unlockDistance={10}
            min={0}
            max={0.95}
            preciseMode={true}
            rotateDegrees={180}
            value={feedback.gain}
          />
          <p>{feedback.gain.toFixed(2)}</p>
        </div>
        {/* Set the cutoff frequency value of the Delay */}
        <div className="oscillator-knob-container">
          <h3 className={"oscillator-title-small"}>CUTOFF</h3>
          <Knob
            onChange={updateDelayCutoffFreq}
            unlockDistance={10}
            preciseMode={true}
            min={0}
            max={4000}
            rotateDegrees={180}
            value={filter.frequency}
          />
          <p>{Math.round(filter.frequency)}hz</p>
        </div>
        <h3
          style={{ cursor: "pointer" }}
          className="oscillator-title-small"
          onClick={switchOnOffDelay}
        >
          {offOn ? "Turn Off" : "Turn On"}
        </h3>
      </div>
    );
  } else {
    return null;
  }
};
export default Delay;
