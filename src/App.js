import React, { useState } from "react";
import "./styles/App.scss";
import Audio from "./components/Audio";
import Oscillator from "./components/Oscillator";
import Delay from "./components/Delay";
import Filter from "./components/Filter";
import Reverb from "./components/Reverb";
import AudioAnalyser from "./components/AudioAnalyser";
import MidiInputSelector from "./components/MidiInputSelector";
import { notes, noteFrequencies } from "./components/Notes";
import { Knob } from "react-rotary-knob";
import { Piano, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import "./styles/CustomPianoStyles.scss";

const App = () => {
  const [start, setStart] = useState(false);
  const firstNote = MidiNumbers.fromNote("c3");
  const lastNote = MidiNumbers.fromNote("c5");

  // set state to represent initial value of masterGainNode
  const [masterGainValue, setMasterGainValue] = useState(0.5);
  const [playNote, setPlayNote] = useState({ playNote: null, stopNote: null });

  const initAudio = () => {
    setStart(true);
    // Connect the masterGainNode to the audio context to allow it to output sound.
    Audio.masterGainNode.connect(Audio.context.destination);
    // Set masterGain Value to 0
    Audio.masterGainNode.gain.setValueAtTime(0.5, Audio.context.currentTime);
  };

  const PianoRoll = () => {
    return (
      <div className="piano-container">
        <Piano
          noteRange={{ first: firstNote, last: lastNote }}
          playNote={(midiNumber) => {
            onKeyDown(midiNumber);
          }}
          stopNote={(midiNumber) => {
            setPlayNote({ stopNote: midiNumber, playNote: null });
          }}
          keyboardShortcuts={notes}
        />
      </div>
    );
  };

  const changeMasterVolume = (e) => {
    setMasterGainValue(Math.round(e) / 100);
    Audio.masterGainNode.gain.setValueAtTime(
      Math.round(e) / 100,
      Audio.context.currentTime
    );
  };

  const onKeyDown = (midiNumber) => {
    setPlayNote({
      playNote: midiNumber,
      frequency: noteFrequencies.get(midiNumber),
      stopNote: null,
    });
  };

  const MasterVolume = () => {
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

  if (start === false) {
    return (
      <div className="App">
        <div className="splash-screen">
          <h1>Web.Synth</h1>
          <p style={{ cursor: "pointer" }} onClick={() => initAudio()}>
            Click here to start
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Main">
        <div className="header">
          <p>Web.Synth v1.0</p>
          <div className="header-item-container">
            <MidiInputSelector
              onKeyDown={onKeyDown}
              setPlayNote={setPlayNote}
            />
          </div>
        </div>
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
          <AudioAnalyser />
        </div>
      </div>
    );
  }
};
export default App;
