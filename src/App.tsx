import "./app.sass";
import { useEffect, useState } from "react";
import { Paper } from "./components/paper";
import anime from "animejs";
import { Content } from "./components/content";

const segments = 8;
const centerIndex = 3;
const rotateX = 360 / segments;
const easing = "spring(5, 100, 10, 0)";

const App = () => {
  const [key, setKey] = useState(0);

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
  }, []);

  return (
    <>
      <div className="move-in" key={key}>
        <Paper
          segments={segments}
          centerIndex={Math.min(segments - 1, Math.max(0, centerIndex))}
          content={<Content />}
        />
      </div>
      <button
        className="replay-btn px5 py2 rounded-2 bg-primary-1 text-white fixed bottom-20px left-1/2 -translate-x-1/2 border-none cursor-pointer gap1"
        onClick={() => setKey(key + 1)}
      >
        Replay
      </button>
    </>
  );
};

export default App;
