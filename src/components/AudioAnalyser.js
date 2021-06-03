import React, { useState, useEffect } from "react";
import Audio from "./Audio";
import Visualiser from "./Visualiser";

const AudioAnalyser = () => {
  const [audioData, setAudioData] = useState(new Uint8Array(0));
  let analyser;

  // Initialise reverb node and set default values
  useEffect(() => {
    const initiateVisualiser = () => {
      analyser = Audio.context.createAnalyser();
      Audio.masterGainNode.connect(analyser);

      analyser.fftSize = 2048;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteTimeDomainData(dataArray);
      // eslint-disable-next-line no-unused-vars
      // const rafId = requestAnimationFrame(tick);
    };
    initiateVisualiser();
  }, []);

  useEffect(() => {
    if (analyser !== undefined) {
      tick();
    }
  }, [audioData]);

  function tick() {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);
    setAudioData(dataArray);
    // eslint-disable-next-line no-unused-vars
    const rafId = requestAnimationFrame(tick);
  }

  return <Visualiser audioData={audioData} />;
};
export default AudioAnalyser;
