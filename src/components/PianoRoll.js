/* eslint-disable react/prop-types */
import React from "react";

import { notes } from "./Notes";
import { Piano, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import "../styles/CustomPianoStyles.scss";

const PianoRoll = ({ onKeyDown, setPlayNote }) => {
  const firstNote = MidiNumbers.fromNote("c3");
  const lastNote = MidiNumbers.fromNote("c5");

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
export default PianoRoll;
