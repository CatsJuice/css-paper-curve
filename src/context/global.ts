import { ReactNode, createContext } from "react";

export interface GlobalContext {
  content?: ReactNode;
  segments: number;
  centerIndex: number;
}

export const Context = createContext<GlobalContext>({
  segments: 8,
  centerIndex: 4,
});
