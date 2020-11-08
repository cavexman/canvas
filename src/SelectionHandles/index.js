import React  from 'react';

import cls from './SelectionHandles.module.sass';

import {useResizing} from "../hooks/useResizing";

export const SelectionHandles = ({
    width,
    height,
    setSize,
}) => { // render prop
    const [ref, deltaW, deltaH, isDragging] = useResizing(() => setSize({width: width + deltaW, height: height + deltaH}));
    console.log("top", {deltaW, deltaH})
    return (
        <div className={cls.handles} ref={ref}>
            <div className={cls.topLeftHandle} />
            <div className={cls.topRightHandle} />
            <div className={cls.bottomLeftHandle} />
            <div className={cls.bottomRightHandle} />
        </div>
    )
}
export default SelectionHandles;