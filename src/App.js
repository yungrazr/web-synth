import React, { useState } from "react";
import "./styles/App.scss";
import Audio from "./components/Audio";
import Oscillator from "./components/Oscillator";
import Delay from "./components/Delay";
import Filter from "./components/Filter";
import Reverb from "./components/Reverb";
import AudioAnalyser from "./components/AudioAnalyser";
import MidiInputSelector from "./components/MidiInputSelector";
import MasterVolume from "./components/MasterVolume";
import PianoRoll from "./components/PianoRoll";
import { noteFrequencies } from "./components/Notes";

const App = () => {
  const [start, setStart] = useState(false);

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

  const onKeyDown = (midiNumber) => {
    setPlayNote({
      playNote: midiNumber,
      frequency: noteFrequencies.get(midiNumber),
      stopNote: null,
    });
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
          <MasterVolume
            masterGainValue={masterGainValue}
            setMasterGainValue={setMasterGainValue}
          />
        </div>
        <div className="bottom-row">
          <PianoRoll setPlayNote={setPlayNote} onKeyDown={onKeyDown} />
          <AudioAnalyser />
        </div>
      </div>
    );
  }
};
export default App;
