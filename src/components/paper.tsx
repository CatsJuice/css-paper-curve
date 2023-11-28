import { ReactNode } from "react";
import { Context, IPaper } from "../context/global";
import { Segments } from "./segments";

export interface PaperProps {
  segments: number;
  centerIndex: number;
  content: ReactNode;
}

export const Paper = ({ segments, content,  centerIndex }: PaperProps) => {
  return (
    <Context.Provider value={{ segments, centerIndex, content }}>
      <div className="paper">
        <Segments level={segments} root={true} index={segments} />
      </div>
    </Context.Provider>
  );
};
