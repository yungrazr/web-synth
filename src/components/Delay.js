import React, { useState, useEffect } from 'react';
import './Oscillator.css';
import Audio from './Audio'
import { Knob } from "react-rotary-knob";

const Delay = () => {
    const [delay, setDelay] = useState();
    const [feedback, setFeedback] = useState();
    const [filter, setFilter] = useState();
    const [offOn, setOffOn] = useState(false)

    // initialize masterGainNode on first render
    useEffect(() => {
        const initiateDelay = () => {
            let delayNode = Audio.context.createDelay();
            delayNode.delayTime.setValueAtTime(0.15, Audio.context.currentTime)
    
            let feedbackNode = Audio.context.createGain();
            feedbackNode.gain.setValueAtTime(0.6, Audio.context.currentTime)
    
            let filterNode = Audio.context.createBiquadFilter();
            filterNode.frequency.setValueAtTime(1000, Audio.context.currentTime)
    
            delayNode.connect(feedbackNode);
            feedbackNode.connect(filterNode);
            filterNode.connect(delayNode);
    
            Audio.masterGainNode.connect(delayNode);
    
            const delayNodeValues = {
                delayTime: 0.15,
                delayNode: delayNode,
            }
            const filterNodeValues = {
                frequency: 1000,
                filterNode: filterNode,
            }
            const feedbackNodeValues = {
                gain: 0.60,
                feedbackNode: feedbackNode,
            }
    
            setDelay(delayNodeValues);
            setFeedback(feedbackNodeValues)
            setFilter(filterNodeValues)
        }
        initiateDelay()
    }, [])

    const updateDelayTime = (e) => {
        let newDelay = {...delay};
        newDelay.delayNode.delayTime.setValueAtTime(e, Audio.context.currentTime)
        newDelay.delayTime = e;
        //newDelay.delayTime.value = e;
        setDelay(newDelay)
    }

    const updateDelayFeedback = (e) => {
        let newFeedback = {...feedback};
        newFeedback.gain = e;
        newFeedback.feedbackNode.gain.setValueAtTime(e, Audio.context.currentTime)
        setFeedback(newFeedback)
    }

    const updateDelayCutoffFreq = (e) => {
        let newFilter = {...filter};
        newFilter.frequency = e;
        newFilter.filterNode.frequency.setValueAtTime(e, Audio.context.currentTime)
        setFilter(newFilter)
    }

    const switchOnOffDelay=()=>{
        if(offOn) {
            setOffOn(false)
            delay.delayNode.disconnect(Audio.context.destination);
        }
        else {
            setOffOn(true)
            delay.delayNode.connect(Audio.context.destination);
        }
    }

    if(delay && filter && feedback) {
        return (
            <div className="oscillator-container">
                <h1 className="oscillator-title">DELAY</h1>
    
                {/* Set the value of .frequency element to be the frequency of the selected oscillator
                and add onChange handler to change the frequency of selectedOscillatorNode */}
                <div className="oscillator-tune-container">
                    <h3 className={"oscillator-title-small"}>TIME</h3>
                    <Knob
                        onChange={updateDelayTime}
                        unlockDistance={10}
                        min={0}
                        max={1}
                        preciseMode={true}
                        rotateDegrees={180}
                        value={delay.delayTime} />
                    <p>{(delay.delayTime).toFixed(2)}sec</p>
                </div>
    
                {/* Set the value of .wave-type element to be the type of the selected oscillator
                and add onChange handler to change the type of selectedOscillatorNode */}
                <div className="oscillator-tune-container">
                    <h3 className={"oscillator-title-small"}>FEEDBACK</h3>
                    <Knob
                        onChange={updateDelayFeedback}
                        unlockDistance={10}
                        min={0}
                        max={0.95}
                        preciseMode={true}
                        rotateDegrees={180}
                        value={feedback.gain} />
                    <p>{feedback.gain.toFixed(2)}</p>
                </div>
    
                <div className="oscillator-vol-container">
                    <h3 className={"oscillator-title-small"}>CUTOFF</h3>
                    {/* Set the value of .oscillator-volume element to be the gain value of the selected oscillator's GainNode
                    and add onChange handler to change the gain of selectedOscillatorNode */}
                    <Knob
                        onChange={updateDelayCutoffFreq}
                        unlockDistance={10}
                        preciseMode={true}
                        min={0}
                        max={4000}
                        rotateDegrees={180}
                        value={filter.frequency} />
                    <p>{Math.round(filter.frequency)}hz</p>
                </div>
                <h3 style={{"cursor": "pointer"}} className="oscillator-title-small" onClick={switchOnOffDelay}>{offOn? "Turn Off" : "Turn On"}</h3>
            </div>
        );
    } else { 
        return null
    }

}
export default Delay;
