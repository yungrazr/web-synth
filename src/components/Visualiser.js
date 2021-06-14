/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from "react";
import "../styles/Visualiser.scss";

const Visualiser = ({ audioData }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    draw();
  }, [audioData]);

  function draw() {
    const canvas = canvasRef.current;
    const height = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext("2d");
    let x = 0;
    const sliceWidth = (width * 1.0) / audioData.length;

    context.lineWidth = 2;
    context.strokeStyle = "#ffffff";
    context.clearRect(0, 0, width, height);

    context.beginPath();
    context.moveTo(0, height / 2);

    for (const item of audioData) {
      const y = (item / 255.0) * height;
      context.lineTo(x, y);
      x += sliceWidth;
    }

    context.lineTo(x, height / 2);
    context.stroke();
  }

  return (
    <canvas
      className="visualiser"
      width="500px"
      height="500px"
      ref={canvasRef}
    />
  );
};
export default Visualiser;
