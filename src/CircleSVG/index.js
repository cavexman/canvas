import React  from 'react';

import cls from './CircleSVG.module.sass';

import {useDragging} from "../hooks/useDragging";
import {SelectionHandles} from "../SelectionHandles";

export const CircleSVG = ({
    id,
    width,
    height,
    radius,
    strokeWidth,
    strokeColor,
    fillColor,
    text,
    setSelection,
    selected,
    setSize,
}) => { // render prop
    const [ref, x, y, isDragging] = useDragging(() => setSelection([id]));
    const size = Math.min(width, height); // circle wants width == height
    return (
        <div
            className={cls.frame}
            ref={ref}
            style={{
                position: "absolute",
                width,
                height,
                left: x,
                top: y,
            }}
        >
            <div className={cls.textFrame}>
                <div className={cls.textblock}>{text}</div>
            </div>
            <div className={cls.frame}>
                <svg width={width} height={height}>
                    <circle cx={size/2} cy={size/2} r={(size)/2} stroke={strokeColor} strokeWidth={strokeWidth} fill={fillColor} />
                </svg>
            </div>
            {selected && <SelectionHandles width={width} height={height} setSize={setSize} />}
        </div>
    )
}
export default CircleSVG;