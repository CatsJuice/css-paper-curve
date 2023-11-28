import { PropsWithChildren, useContext } from "react";
import { Context } from "../context/global";

export interface SegmentProps extends PropsWithChildren {
  index: number;
  direction?: "up" | "down";
  [key: string]: any;
}

export const Segment = ({
  children,
  index,
  direction,
  ...attrs
}: SegmentProps) => {
  const { content } = useContext(Context);
  const style = { "--index": index } as React.CSSProperties;
  return (
    <div className="segment" {...attrs} data-direction={direction}>
      <div className="content-wrapper" style={style}>
        <div className="content">{content}</div>
      </div>
      {children}
    </div>
  );
};
