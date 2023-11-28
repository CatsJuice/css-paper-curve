import "./app.sass";
import { useCallback, useEffect, useRef, useState } from "react";
import { Paper } from "./components/paper";
import anime from "animejs";
import { Content } from "./components/content";
import { useControls, Leva } from "leva";
import { copy2clipboard } from "./utils/clipboard";
import {
  curveConfig,
  enterFromConfig,
  paperCssVars,
  randomConfig,
} from "./context/global";

const easing = "spring(5, 100, 10, 0)";

const AnimateIn = ({
  id,
  segments,
  onUpdate,
}: {
  id: number;
  segments: number;
  onUpdate: (args: { [k: number]: any }) => void;
}) => {
  const paper = useControls(
    `Paper ${id}`,
    randomConfig({ ...curveConfig, ...enterFromConfig }),
    { collapsed: true }
  );

  const rotateX = paper.curve / segments;

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
  onUpdate({ [id]: paper });

  const variables = paperCssVars(paper);

  return (
    <div className="move-in absolute" style={variables}>
      <Paper
        segments={segments}
        centerIndex={Math.min(segments - 1, Math.max(0, paper.curveCenter))}
        content={<Content id={id} />}
      />
    </div>
  );
};

const App = () => {
  const configRef = useRef<Record<string, any>>({});
  const [key, setKey] = useState(0);

  const { segments } = useControls({
    segments: {
      value: 8,
      min: 1,
      max: 20,
      step: 1,
    },
  });

  useEffect(() => {
    replay();
  }, [segments]);

  const replay = () => setKey(key + 1);
  const copy = useCallback(
    () => copy2clipboard(JSON.stringify(configRef.current)),
    []
  );

  return (
    <>
      <div className="leva z99">
        <Leva />
      </div>

      <div key={key}>
        {Array.from({ length: 5 }).map((_, i) => (
          <AnimateIn
            key={i}
            id={i}
            segments={segments}
            onUpdate={(payload) =>
              (configRef.current = { ...configRef.current, ...payload })
            }
          />
        ))}
      </div>

      <div className="operations z99 flex items-center gap2 fixed bottom-20px left-1/2 -translate-x-1/2">
        <button className="replay-btn btn" onClick={replay}>
          <span className="i-fa6-solid:arrow-rotate-left"></span>
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
