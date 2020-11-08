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
    return (
        <div
            className={cls.frame}
            ref={ref}
            style={{
                position: "absolute",
                width, // TODO size of object so we can place handles
                height,
                left: x,
                top: y,
            }}
        >
            <div className={cls.textblock}>{text}</div>
            <svg width={width} height={height}>
                <circle cx={width/2} cy={height/2} r={(width-1)/2} stroke={strokeColor} strokeWidth={strokeWidth} fill={fillColor} />
            </svg>
            {selected && <SelectionHandles width={width} height={height} setSize={setSize} />}
        </div>
    )
}
export default CircleSVG;