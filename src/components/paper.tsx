import { ReactNode } from "react";
import { Context } from "../context/global";
import { Segments } from "./segments";

export interface PaperProps {
  segments: number;
  centerIndex: number;
  content: ReactNode;
}

export const Paper = ({ segments, centerIndex, content }: PaperProps) => {
  return (
    <Context.Provider value={{ segments, centerIndex, content }}>
      <div className="paper">
        <Segments level={segments} root={true} index={segments} />
      </div>
    </Context.Provider>
  );
};
