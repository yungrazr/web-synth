import React, { useState, useCallback, useEffect } from "react";
import WebMidi from "webmidi";

const MidiInputSelector = ({ setPlayNote, onKeyDown }) => {
  const [midiInputDevices, setMidiInputDevices] = useState([]);
  const [midiError, setMidiError] = useState(null);
  const [activeMidiDevice, setActiveMidiDevice] = useState(null);
  const [changed, setChanged] = useState(null);

  useEffect(() => {
    WebMidi.enable((err) => {
      if (err) {
        setMidiError(err);
      } else {
        console.log("WebMidi enabled!");
        WebMidi.addListener("connected", _handleConnection);
        WebMidi.addListener("disconnected", _handleConnection);
      }
    });

    return () => {
      WebMidi.removeListener("connected", _handleConnection);
      WebMidi.removeListener("disconnected", _handleConnection);
    };
  }, []);

  useEffect(() => {
    setMidiInputDevices(WebMidi.inputs);
  }, [changed]);

  const _handleConnection = useCallback((e) => {
    if (e.port.type === "input") {
      setChanged(e);
    }
  }, []);

  const midiNoteOn = useCallback((e) => {
    onKeyDown(e.note.number);
  }, []);

  const midiNoteOff = useCallback((e) => {
    setPlayNote({ stopNote: e.note.number, playNote: null });
  }, []);

  const _handleOnChange = (e) => {
    if (e.target.value === "disable") {
      const selectedDevice = activeMidiDevice;
      selectedDevice.removeListener("noteon", "all", midiNoteOn);
      selectedDevice.removeListener("noteoff", "all", midiNoteOff);
      setActiveMidiDevice(null);
    } else {
      if (activeMidiDevice != null) {
        const activeDevice = activeMidiDevice;
        activeDevice.removeListener("noteon", "all", midiNoteOn);
        activeDevice.removeListener("noteoff", "all", midiNoteOff);
      }
      const selectedDevice = midiInputDevices[parseInt(e.target.value)];
      selectedDevice.addListener("noteon", "all", midiNoteOn);
      selectedDevice.addListener("noteoff", "all", midiNoteOff);
      setActiveMidiDevice(selectedDevice);
    }
  };

  if (midiError != null) {
    return <p>MIDI Disabled</p>;
  }

  if (midiInputDevices.length > 0) {
    return (
      <>
        <p>MIDI Input:</p>
        <select
          className="midiDeviceSelect"
          onChange={_handleOnChange}
          name="midiDeviceSelect"
          id="midiDeviceSelect"
        >
          <option value={"disable"}>Turn Off</option>
          {midiInputDevices.map((item, index) => {
            return (
              <option key={item} value={index}>
                {item.name}
              </option>
            );
          })}
        </select>
      </>
    );
  } else {
    return <p>No MIDI Devices connected</p>;
  }
};
export default MidiInputSelector;
