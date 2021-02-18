import React, { useState, useEffect } from 'react';
import './Oscillator.css';
import Audio from './Audio'
import { Knob } from "react-rotary-knob";

const Reverb = () => {
    const Reverb = require('soundbank-reverb')
    const [reverb, setReverb] = useState();
    const [offOn, setOffOn] = useState(false)

    // initialize masterGainNode on first render
    useEffect(() => {
        const initiateReverb = () => 
            {
            let reverbNode = Reverb(Audio.context);
            reverbNode.time = 3 //seconds
            reverbNode.wet.value = 0.5
            reverbNode.dry.value = 0

            reverbNode.filterType = 'highpass'
            reverbNode.cutoff.value = 200 //Hz
            Audio.masterGainNode.connect(reverbNode);
            //reverbNode.connect(Audio.context.destination)

            const reverbValues = {
                decay: reverbNode.time,
                wet: reverbNode.wet.value,
                dry: reverbNode.dry.value,
                reverbNode: reverbNode
            }
            setReverb(reverbValues);
        }
        initiateReverb()
    }, [])

    const updateWet = (e) => {
        let newAmount = {...reverb};
        newAmount.reverbNode.wet.value = e;
        newAmount.wet = e;
        setReverb(newAmount)
    }

    const updateDry = (e) => {
        let newAmount = {...reverb};
        newAmount.reverbNode.dry.value = e;
        newAmount.dry = e;
        setReverb(newAmount)
    }

    const updateDecay = (e) => {
        let newAmount = {...reverb};
        newAmount.reverbNode.time = e;
        newAmount.decay = e;
        setReverb(newAmount)
    }

    const switchOnOffReverb=()=>{
        if(offOn) {
            setOffOn(false)
            reverb.reverbNode.disconnect(Audio.context.destination);
        }
        else {
            setOffOn(true)
            reverb.reverbNode.connect(Audio.context.destination);
        }
    }

    if(reverb===undefined)
    {
        return null
    }
    else {
        return (
            <div className="oscillator-container">
                <h1 className="oscillator-title">REVERB</h1>
    
                {/* Set the value of .frequency element to be the frequency of the selected oscillator
                and add onChange handler to change the frequency of selectedOscillatorNode */}
                <div className="oscillator-tune-container">
                    <h3 className={"oscillator-title-small"}>DECAY</h3>
                    <Knob
                        onChange={updateDecay}
                        unlockDistance={10}
                        min={0}
                        max={10}
                        preciseMode={true}
                        rotateDegrees={220}
                        value={reverb.decay} />
                    <p>{Math.round(reverb.decay)}sec</p>
                </div>
    
                {/* Set the value of .wave-type element to be the type of the selected oscillator
                and add onChange handler to change the type of selectedOscillatorNode */}
                <div className="oscillator-tune-container">
                    <h3 className={"oscillator-title-small"}>WET</h3>
                    <Knob
                        onChange={updateWet}
                        unlockDistance={10}
                        min={0}
                        max={1}
                        preciseMode={true}
                        rotateDegrees={220}
                        value={reverb.wet} />
                    <p>{reverb.wet.toFixed(2)}</p>
                </div>
    
                {/* <div className="oscillator-vol-container">
                    <h3 className={"oscillator-title-small"}>DRY</h3>
                    <Knob
                        onChange={updateDry}
                        unlockDistance={10}
                        preciseMode={true}
                        min={0}
                        max={1}
                        rotateDegrees={220}
                        value={reverb.dry} />
                    <p>{(reverb.dry).toFixed(2)}</p>
                </div> */}
                <h3 style={{"cursor": "pointer"}} className="oscillator-title-small" onClick={switchOnOffReverb}>{offOn? "Turn Off" : "Turn On"}</h3>
            </div>
        );
    }

}
export default Reverb;
