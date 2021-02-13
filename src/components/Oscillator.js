import React, { useState, useEffect } from 'react';
import './Oscillator.css';
import Audio from './Audio'
import { Knob } from "react-rotary-knob";

const Oscillator = ({ oscNum, play }) => {

    // initialize state for OscillatorNodes
    const [oscillatorNodes, setOscillatorNodes] = useState([])

    // initialize masterGainNode on first render
    useEffect(() => {
        const oscillators = [];
        const addOscillatorNode = () => {
            // Create a GainNode for the oscillator, set it to 0 volume and connect it to masterGainNode
            const oscillatorGainNode = Audio.context.createGain()
            oscillatorGainNode.gain.setValueAtTime(0.3, Audio.context.currentTime)
            oscillatorGainNode.connect(Audio.masterGainNode)

            // Create OscillatorNode, connect it to its GainNode, and make it start playing.
            const oscillatorNode = Audio.context.createOscillator()
            oscillatorNode.frequency.setValueAtTime(262, Audio.context.currentTime);
            oscillatorNode.detune.setValueAtTime(0, Audio.context.currentTime);
            // oscillatorNode.connect(oscillatorGainNode)
            oscillatorNode.start()

            // Store the nodes along with their values in state.
            // Note: When an oscillator is created, frequency is set to 440,
            // and type is set to 'sine' by default.
            const oscillatorNodeValues = {
                note: null,
                playing: false,
                oscillatorNode: oscillatorNode,
                oscillatorGainNode: oscillatorGainNode,
                frequency: oscillatorNode.frequency.value,
                detune: oscillatorNode.detune.value,
                type: oscillatorNode.type,
                gain: 30
            }
            oscillators.push(oscillatorNodeValues)
        }
        addOscillatorNode()
        addOscillatorNode()
        addOscillatorNode()
        addOscillatorNode()
        addOscillatorNode()
        addOscillatorNode()
        setOscillatorNodes(oscillators)
        return;
    }, [])

    useEffect(() => {
        if (oscillatorNodes === undefined || oscillatorNodes.length === 0) {
        }
        else {
            if(play)
            {
                if(play.playNote!=null && play.stopNote==null){
                    playOscillator(play.frequency, play.playNote)
                    return;
                }
                if(play.stopNote!=null && play.playNote==null){
                    stopOscillator(play.stopNote)
                    return;
                }
            }
        }
    }, [play])

    function playOscillator(frequency, note) {
        let nodes = [...oscillatorNodes]
        for(const index in nodes)
        {
            let node = {...nodes[index]};
            if(node.note == null) {
                node.playing=true;
                node.note=note;
                node.frequency=frequency;
                node.oscillatorNode.frequency.setValueAtTime(frequency, Audio.context.currentTime);
                try {
                    node.oscillatorNode.connect(node.oscillatorGainNode)
                    nodes[index] = node;
                } catch (error) {
                    console.log("Playing Osc"+ error)
                }
                break
            }
        }
        setOscillatorNodes([...nodes])
    }

    function stopOscillator(note) {
        for(const index in oscillatorNodes)
        {
            const selectedOscillatorNode = oscillatorNodes
            if(selectedOscillatorNode[index].note === note) {
                selectedOscillatorNode[index].note=null;
                selectedOscillatorNode[index].playing=false;
                try {
                    oscillatorNodes[index].oscillatorNode.disconnect(oscillatorNodes[index].oscillatorGainNode)
                    setOscillatorNodes(selectedOscillatorNode)
                } catch (error) {
                    console.log("Stopped osc"+ error)
                }
                break
            }
        }
    }

    const updateSelectedOscillatorTune = (e) => {
        //update selected OscillatorNode to the selected tune
        const oscillatorsCopy = [];
        for(const index in oscillatorNodes)
        {
            const selectedOscillatorNode = oscillatorNodes[index]
            // set the tune of the OscillatorNode
            selectedOscillatorNode.oscillatorNode.detune.setValueAtTime(e, Audio.context.currentTime);
            // set the value stored in state for the tune
            selectedOscillatorNode.detune = e
            oscillatorsCopy.push(selectedOscillatorNode)
        }
        setOscillatorNodes(oscillatorsCopy)
    }

    // const updateSelectedOscillatorType = (e) => {
    //     //update selected OscillatorNode to the selected frequency
    //     const oscillatorsCopy = [];
    //     for(const index in oscillatorNodes)
    //     {
    //         const selectedOscillatorNode = oscillatorNodes[index]
    //         // set the type of the OscillatorNode
    //         selectedOscillatorNode.oscillatorNode.type = e.target.value
    //         // set the value stored in state for the type
    //         selectedOscillatorNode.type = e.target.value
    //         oscillatorsCopy.push(selectedOscillatorNode)
    //     }
    //     setOscillatorNodes(oscillatorsCopy)
    // }

    const updateSelectedOscillatorVolume = (e) => {
        //update selected OscillatorNode to the selected frequency
        const oscillatorsCopy = [];
        for(const index in oscillatorNodes)
        {
            const selectedOscillatorNode = oscillatorNodes[index]
            // set the gain of the OscillatorNode's GainNode
            selectedOscillatorNode.oscillatorGainNode.gain.setValueAtTime(
                Math.round(e) / 100, Audio.context.currentTime
            )
            // set the value stored in state for the gain
            selectedOscillatorNode.gain = Math.round(e)
            oscillatorsCopy.push(selectedOscillatorNode)
        }
        setOscillatorNodes(oscillatorsCopy)
    }

    const updateSelectedOscillatorType = (e) => {
        let type = Math.round(e)
        //update selected OscillatorNode to the selected frequency
        const oscillatorsCopy = [];
        for(const index in oscillatorNodes)
        {
            const selectedOscillatorNode = oscillatorNodes[index]
            // set the type of the OscillatorNode
            switch(type) {
                case 1:
                    selectedOscillatorNode.oscillatorNode.type = "sine"
                    selectedOscillatorNode.type = "sine"
                  break;
                case 2:
                    selectedOscillatorNode.oscillatorNode.type = "sawtooth"
                    selectedOscillatorNode.type = "sawtooth"
                  break;
                case 3:
                    selectedOscillatorNode.oscillatorNode.type = "square"
                    selectedOscillatorNode.type = "square"
                    break;
                case 4:
                    selectedOscillatorNode.oscillatorNode.type = "triangle"
                    selectedOscillatorNode.type = "triangle"
                    break;
                default:
                    selectedOscillatorNode.oscillatorNode.type = "sine"
                    selectedOscillatorNode.type = "sine"
                  // code block
            }
            oscillatorsCopy.push(selectedOscillatorNode)
        }
        setOscillatorNodes(oscillatorsCopy)
    }

    const checkType = () => {
        switch(oscillatorNodes[0].type) {
            case "sine":
                return 1
            case "sawtooth":
                return 2
            case "square":
                return 3
            case "triangle":
                return 4
            default:
                return 1
              // code block
        }
    }

    if (oscillatorNodes === undefined || oscillatorNodes.length === 0) {
        return null
    }
    else {
        return (
            <div className="oscillator-container">
                <h1 className={"oscillator-title"}>OSC {oscNum}</h1>

                {/* Set the value of .frequency element to be the frequency of the selected oscillator
            and add onChange handler to change the frequency of selectedOscillatorNode */}
                <div className="oscillator-tune-container">
                    <h3 className={"oscillator-title-small"}>TUNE</h3>
                    <Knob
                        onChange={updateSelectedOscillatorTune}
                        unlockDistance={10}
                        min={-500}
                        max={500}
                        preciseMode={true}
                        rotateDegrees={180}
                        value={oscillatorNodes[0].detune} />
                    <p>{Math.round(oscillatorNodes[0].detune)} cent</p>
                </div>

                {/* Set the value of .wave-type element to be the type of the selected oscillator
            and add onChange handler to change the type of selectedOscillatorNode */}
                <div className="oscillator-type-container">
                    <h3 className={"oscillator-title-small"}>TYPE</h3>
                    <Knob
                        onChange={updateSelectedOscillatorType}
                        unlockDistance={10}
                        preciseMode={true}
                        min={1}
                        max={5}
                        rotateDegrees={180}
                        value={checkType()} />
                    <p>{oscillatorNodes[0].type}</p>
                </div>

                <div className="oscillator-vol-container">
                    <h3 className={"oscillator-title-small"}>MIX</h3>
                    {/* Set the value of .oscillator-volume element to be the gain value of the selected oscillator's GainNode
                and add onChange handler to change the gain of selectedOscillatorNode */}
                    <Knob
                        onChange={updateSelectedOscillatorVolume}
                        unlockDistance={10}
                        min={0}
                        max={100}
                        preciseMode={true}
                        rotateDegrees={225}
                        value={oscillatorNodes[0].gain} />
                    <p>{Math.round(oscillatorNodes[0].gain)}</p>
                </div>
            </div>
        );
    }

}
export default Oscillator;
