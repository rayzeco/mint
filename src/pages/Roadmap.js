import * as React from "react";
import "./styles/roadmap.scss";
import useWindowDimensions from "../utils/helper";
import { UserContext } from "../App";

const Roadmap = () => {
  const value = React.useContext(UserContext);
  const phaseKey = Object.keys(value.collection).filter(
    (key) => key.search("phase") > -1
  );
  const windowDimensions = useWindowDimensions();
  const { width } = windowDimensions;

  const hexToRGB = (hex) => {
    let r = parseInt("0x" + hex.slice(1, 3), 16);
    let g = parseInt("0x" + hex.slice(3, 5), 16);
    let b = parseInt("0x" + hex.slice(5, 7), 16);
    return { r, g, b };
  };

  return (
    <div className="roadmap-container" id="roadmap">
      <div className="container">
        <div className="roadmap-left">
          <h1>Project Roadmap</h1>
          <div className="img">
            <svg
              width="100%"
              height="auto"
              viewBox="0 0 341 427"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M341 226.015L340.601 0.0224609L114.419 0.420874L187.604 73.3339L-15.1535 276.596C-22.3345 283.792 -32.0812 287.845 -42.2514 287.864C-52.4216 287.882 -62.1829 283.864 -69.3897 276.694L-215 131.702L-214.714 291.727L-106.573 399.413C-89.43 416.48 -66.2054 426.044 -42.0068 426.001C-17.8081 425.959 5.38287 416.314 22.4658 399.188L267.785 153.147L341 226.015Z"
                fill="url(#paint0_linear_437_617)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_437_617"
                  x1="-212.912"
                  y1="215.495"
                  x2="344.699"
                  y2="214.34"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" stopOpacity="0" />
                  <stop offset="0.3" stopColor="white" stopOpacity="0.02" />
                  <stop offset="1" stopColor="var(--theme-color)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="roadmap-right">
          {phaseKey.map((data, index, arr) => {
            const baseWidth = width > 768 ? 30 : 40;
            const compWidth = baseWidth + (45 * (index + 1)) / arr.length + "%";
            let { r, b, g } = hexToRGB(value.collection.background);
            return (
              <div
                className="roadmap-component"
                style={{ width: compWidth }}
                key={`roadmap-${index}`}
              >
                <div
                  className="phase-background"
                  style={{
                    backgroundColor: `rgba(${r}, ${g}, ${b}, ${
                      0.3 + (0.7 * (index + 1)) / phaseKey.length
                    })`,
                  }}
                ></div>
                <h2>{`Phase ${index}`}</h2>
                <p>{value.collection[data]}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
