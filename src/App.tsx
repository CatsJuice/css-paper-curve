import "./app.sass";
import { CSSProperties, useEffect, useState } from "react";
import { Paper } from "./components/paper";
import anime from "animejs";
import { Content } from "./components/content";
import { useControls, Leva } from "leva";
import { copy2clipboard } from "./utils/clipboard";

const easing = "spring(5, 100, 10, 0)";

const App = () => {
  const [key, setKey] = useState(0);

  const { segments, curveCenter, curve } = useControls("Paper curve", {
    segments: {
      value: 8,
      min: 1,
      max: 20,
      step: 1,
    },
    curveCenter: {
      value: 3,
      min: 0,
      max: 19,
      step: 1,
    },
    curve: {
      value: 360,
      min: 0,
      max: 1800,
      step: 1,
    },
  });
  const rotateX = curve / segments;

  const {
    x: fromX,
    y: fromY,
    z: fromZ,
    rotateX: fromRotateX,
    rotateY: fromRotateY,
    rotateZ: fromRotateZ,
  } = useControls("Enter from", {
    z: {
      value: 4000,
      min: 0,
      max: 100000,
      step: 100,
    },
    x: {
      value: -100,
      min: -100,
      max: 100,
      step: 1,
    },
    y: {
      value: 50,
      min: -100,
      max: 100,
      step: 1,
    },
    rotateX: {
      value: 20,
      min: -360,
      max: 360,
      step: 1,
    },
    rotateY: {
      value: -40,
      min: -360,
      max: 360,
      step: 1,
    },
    rotateZ: {
      value: -80,
      min: -360,
      max: 360,
      step: 1,
    },
  });

  useEffect(() => {
    replay();
  }, [
    segments,
    curveCenter,
    curve,
    fromX,
    fromY,
    fromZ,
    fromRotateX,
    fromRotateY,
    fromRotateZ,
  ]);

  const variables = {
    "--fromX": `${fromX}vw`,
    "--fromY": `${fromY}vh`,
    "--fromZ": `${fromZ}px`,
    "--fromRotateX": `${fromRotateX}deg`,
    "--fromRotateY": `${fromRotateY}deg`,
    "--fromRotateZ": `${fromRotateZ}deg`,
  } as CSSProperties;

  useEffect(() => {
    anime({
      targets: '.segment[data-direction="up"]',
      rotateX: [-rotateX, 0],
      easing,
    });
    anime({
      targets: '.segment[data-direction="down"]',
      rotateX: [rotateX, 0],
      easing,
    });
  }, [key]);

  const replay = () => setKey(key + 1);
  const copy = () => {
    const json = JSON.stringify({
      segments,
      curveCenter,
      curve,
      fromX,
      fromY,
      fromZ,
      fromRotateX,
      fromRotateY,
      fromRotateZ,
    });
    copy2clipboard(json);
  };

  return (
    <>
      <div className="leva">
        <Leva />
      </div>
      <div className="move-in" key={key} style={variables}>
        <Paper
          segments={segments}
          centerIndex={Math.min(segments - 1, Math.max(0, curveCenter))}
          content={<Content />}
        />
      </div>
      <div className="operations flex items-center gap2 fixed bottom-20px left-1/2 -translate-x-1/2">
        <button className="replay-btn btn" onClick={replay}>
          <span className="i-fa6-solid:"></span>
          Replay
        </button>
        <button className="export-btn btn" onClick={copy}>
          <span className="i-fa6-solid:clipboard"></span>
          Copy Configuration
        </button>
      </div>
    </>
  );
};

export default App;
