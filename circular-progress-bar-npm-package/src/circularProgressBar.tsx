import { MutableRefObject, useEffect, useRef } from "react";
import "./circularProgressBar.css";

interface circularProgressBarPropsInterface {
  color: string;
  diameter: number;
  percentage: number;
  borderWidth?: number;
  contentBackgroundColor?: string;
  className?: string;
  contentClassName?: string;
  children?: JSX.Element;
}

export function CircularProgressBar({
  color,
  diameter,
  percentage,
  borderWidth,
  contentBackgroundColor,
  className,
  contentClassName,
  children,
}: circularProgressBarPropsInterface) {
  const rightBar = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;
  const rightProgress = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;
  const leftBar = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;
  const leftProgress = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;
  const content = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    if (borderWidth) {
      content.current.style.height = diameter - borderWidth + "px";
      content.current.style.width = diameter - borderWidth + "px";
    }

    if (contentBackgroundColor) {
      content.current.style.backgroundColor = contentBackgroundColor;
    }

    rightBar.current.style.clip = `rect(0px, ${diameter}px, ${diameter}px, ${diameter / 2}px)`;
    rightProgress.current.style.clip = `rect(0px, ${diameter / 2}px, ${diameter}px, 0px)`;

    leftBar.current.style.clip = `rect(0px, ${diameter / 2}px, ${diameter}px, 0px)`;
    leftProgress.current.style.clip = `rect(0px, ${diameter}px, ${diameter}px, ${diameter / 2}px)`;

    rightProgress.current.style.backgroundColor = `${color}`;
    leftProgress.current.style.backgroundColor = `${color}`;
  }, [color, diameter, borderWidth, contentBackgroundColor]);

  useEffect(() => {
    if (!percentage) {
      rightProgress.current.style.transform = `rotate(0deg)`;
      leftProgress.current.style.transform = `rotate(0deg)`;
      return;
    }

    let floatPercentage = percentage / 100;
    rightProgress.current.style.transform = `rotate(${floatPercentage < 0.5 ? floatPercentage * 2 * 180 : 180}deg)`;
    leftProgress.current.style.transform = `rotate(${floatPercentage > 0.5 ? floatPercentage * 2 * 180 + 180 : 0}deg)`;
  }, [percentage]);

  return (
    <div className={`container ${className ?? ""}`}>
      <div className='circular' style={{ height: diameter, width: diameter }}>
        <div className='circle'>
          <div className='bar right' ref={rightBar}>
            <div className='progress' ref={rightProgress} />
          </div>
          <div className='bar left' ref={leftBar}>
            <div className='progress' ref={leftProgress} />
          </div>
        </div>
      </div>
      <div className={`content ${contentClassName ?? ""}`} ref={content}>
        {children}
      </div>
    </div>
  );
}
