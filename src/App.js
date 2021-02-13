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
    const firstNote = MidiNumbers.fromNote('c4');
    const lastNote = MidiNumbers.fromNote('c5');
    const keyboardShortcuts = KeyboardShortcuts.create({
        firstNote: firstNote,
        lastNote: lastNote,
        keyboardConfig: KeyboardShortcuts.HOME_ROW,
    });

    // [midiNumber, frequency]
    const noteFrequencies = new Map([
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
                keyboardShortcuts={keyboardShortcuts}
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
                <p onClick={()=>initializeMasterGain()}>Click here to start</p>
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
