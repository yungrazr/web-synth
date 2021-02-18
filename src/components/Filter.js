import React, { useState, useEffect } from 'react';
import './Oscillator.css';
import Audio from './Audio'
import { Knob } from "react-rotary-knob";

const Filter = () => {
    const [filter, setFilter] = useState();

    // initialize masterGainNode on first render
    useEffect(() => {
        const initiateFilter = () => {
            let filterNode = Audio.context.createBiquadFilter();
            Audio.filterGainNode.gain.setValueAtTime(0.5, Audio.context.currentTime)
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
            }
            setFilter(filterNodeValues);
        }
        initiateFilter()
    }, [])

    const updateFrequency = (e) => {
        let newFreq = {...filter};
        newFreq.filterNode.frequency.value = e;
        newFreq.frequency = e;
        //newDelay.delayTime.value = e;
        setFilter(newFreq)
    }

    const updateQ = (e) => {
        console.log(filter)
        let newFreq = {...filter};
        newFreq.filterNode.Q.value = e;
        newFreq.Q = e;
        //newDelay.delayTime.value = e;
        setFilter(newFreq)
    }

    const updateType = (e) => {
        let select = Math.round(e)
        let newFreq = {...filter};
        switch(select) {
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
              // code block
        }
        setFilter(newFreq)
    }

    const checkType = () => {
        switch(filter.type) {
            case "lowpass":
                return 1
            case "highpass":
                return 2
            case "bandpass":
                return 3
            default:
                return 1
              // code block
        }
    }

    if(filter===undefined)
    {
        return null
    }
    else {
        return (
            <div className="oscillator-container">
                <h1 className="oscillator-title">FILTER</h1>
    
                {/* Set the value of .frequency element to be the frequency of the selected oscillator
                and add onChange handler to change the frequency of selectedOscillatorNode */}
                <div className="oscillator-tune-container">
                    <h3 className={"oscillator-title-small"}>CUTOFF</h3>
                    <Knob
                        onChange={updateFrequency}
                        unlockDistance={10}
                        min={0}
                        max={4000}
                        preciseMode={true}
                        rotateDegrees={180}
                        value={filter.frequency} />
                    <p>{Math.round(filter.frequency)}hz</p>
                </div>
    
                {/* Set the value of .wave-type element to be the type of the selected oscillator
                and add onChange handler to change the type of selectedOscillatorNode */}
                <div className="oscillator-tune-container">
                    <h3 className={"oscillator-title-small"}>RES</h3>
                    <Knob
                        onChange={updateQ}
                        unlockDistance={10}
                        min={0.01}
                        max={15}
                        preciseMode={true}
                        rotateDegrees={180}
                        value={filter.Q} />
                    <p>{(filter.Q).toFixed(2)}</p>
                </div>
    
                <div className="oscillator-vol-container">
                    <h3 className={"oscillator-title-small"}>TYPE</h3>
                    {/* Set the value of .oscillator-volume element to be the gain value of the selected oscillator's GainNode
                    and add onChange handler to change the gain of selectedOscillatorNode */}
                    <Knob
                        onChange={updateType}
                        unlockDistance={10}
                        preciseMode={true}
                        min={1}
                        max={4}
                        rotateDegrees={180}
                        value={checkType()} />
                    <p>{filter.type}</p>
                </div>
            </div>
        );
    }

}
export default Filter;
