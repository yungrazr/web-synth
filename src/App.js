import React, { useState} from 'react';
import './App.css';
import Audio from './components/Audio'
import Oscillator from './components/Oscillator'
import Delay from './components/Delay'
import Filter from './components/Filter'
import Reverb from './components/Reverb'
import { Knob } from "react-rotary-knob";
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import './CustomPianoStyles.css';  // import a set of overrides

const App = () => {
    const [start, setStart] = useState(false)
    const firstNote = MidiNumbers.fromNote('c3');
    const lastNote = MidiNumbers.fromNote('c5');
    const notes = [
        { key: 'z', midiNumber: 48 },{ key: 's', midiNumber:49 },{ key: 'x', midiNumber: 50 },{ key: 'd', midiNumber: 51 },{ key: 'c', midiNumber: 52 },
        { key: 'v', midiNumber: 53 },{ key: 'g', midiNumber:54 },{ key: 'b', midiNumber: 55 },{ key: 'h', midiNumber: 56 },{ key: 'n', midiNumber: 57 },
        { key: 'j', midiNumber: 58 },{ key: 'm', midiNumber:59 },{ key: 'q', midiNumber: 60 },{ key: '2', midiNumber: 61 },{ key: 'w', midiNumber: 62 },
        { key: '3', midiNumber: 63 },{ key: 'e', midiNumber:64 },{ key: 'r', midiNumber: 65 },{ key: '5', midiNumber: 66 },{ key: 't', midiNumber: 67 },
        { key: '6', midiNumber: 68 },{ key: 'y', midiNumber:69 },{ key: '7', midiNumber: 70 },{ key: 'u', midiNumber: 71 },{ key: 'i', midiNumber: 72 }]
    // const keyboardShortcuts = KeyboardShortcuts.create(notes);

    // [midiNumber, frequency]
    const noteFrequencies = new Map([
        [48, 130.8], [49, 138.6], [50, 146.8],
        [51, 155.6], [52, 164.8], [53, 174.61],
        [54, 185], [55, 196], [56, 207.65],
        [57, 220], [58, 233.08], [59, 246.9],
        [60, 262], [61, 277.2], [62, 293.7],
        [63, 311.2], [64, 329.7], [65, 349.3],
        [66, 370.1], [67, 392.1], [68, 415.4],
        [69, 440], [70, 466.1], [71, 493.8],
        [72, 523.2]
    ]);

    // set state to represent initial value of masterGainNode
    const [masterGainValue, setMasterGainValue] = useState(0.5)
    const [playNote, setPlayNote] = useState({ playNote: null, stopNote: null })

    const initializeMasterGain = () => {
        setStart(true)
        // Connect the masterGainNode to the audio context to allow it to output sound.
        Audio.masterGainNode.connect(Audio.context.destination)

        // Set masterGain Value to 0
        Audio.masterGainNode.gain.setValueAtTime(0.2, Audio.context.currentTime)
    }

    // // initialize masterGainNode on first render
    // useEffect(() => {
    //     initializeMasterGain()
    // }, [])

    function PianoRoll() {
        return (
        <div className="piano-container">
            <Piano
                noteRange={{ first: firstNote, last: lastNote }}
                playNote={(midiNumber) => {
                    onKeyDown(midiNumber);
                }}
                stopNote={(midiNumber) => {
                    setPlayNote({ stopNote: midiNumber, playNote: null })
                }}
                keyboardShortcuts={notes}
            />
        </div>)
    }

    const changeMasterVolume = (e) => {
        setMasterGainValue(Math.round(e) / 100)
        Audio.masterGainNode.gain.setValueAtTime(Math.round(e) / 100, Audio.context.currentTime)
    }

    function onKeyDown(midiNumber) {
        setPlayNote({ playNote: midiNumber, frequency: noteFrequencies.get(midiNumber), stopNote: null })
    }

    function MasterVolume() {
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
                value={masterGainValue * 100} />
            <p>{Math.round(masterGainValue * 100)}</p>
        </div>
        )
    }


    if(start===false)
    {
        return (        
        <div className="App">
            <div className="splash-screen">
                <h1>Moms.On.My.Synth</h1>
                <p style={{"cursor": "pointer"}} onClick={()=>initializeMasterGain()}>Click here to start</p>
            </div>
        </div>);
    }
    else {
        return (
            <div className="App">
                <div className="top-row">
                    <Oscillator oscNum={1} play={playNote} />
                    <Oscillator oscNum={2} play={playNote} />
                    <Oscillator oscNum={3} play={playNote} />
                    <Filter />
                    <Delay />
                    <Reverb />
                    {MasterVolume()}
                </div>
                <div className="bottom-row">
                    {PianoRoll()}
                </div>
            </div>
        );
    }
}
export default App;
