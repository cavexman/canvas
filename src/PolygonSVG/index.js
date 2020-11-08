import React  from 'react';

import cls from './PolygonSVG.module.sass';

import {useDragging} from "../hooks/useDragging";
import {SelectionHandles} from "../SelectionHandles";

export const PolygonSVG = ({
    id,
    width,
    height,
    strokeWidth,
    strokeColor,
    fillColor,
    setSelection,
    selected,
}) => {
    const [ref, x, y, isDragging] = useDragging(() => setSelection([id]));
    const points = `${width/2},0 0,${height} ${width},${height}`; //200,10 250,190 160,210
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
            {selected && <SelectionHandles />}
            <svg height={height} width={width}>
                <polygon points={points} style={{fill:fillColor,stroke:strokeColor,strokeWidth:strokeWidth}} />
            </svg>
        </div>
    )
}
export default PolygonSVG;