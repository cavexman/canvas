import React  from 'react';

import cls from './SelectionHandles.module.sass';

import {useResizing} from "../hooks/useResizing";

export const SelectionHandles = ({
    width,
    height,
    setSize,
}) => {
    const [ref, isDragging] = useResizing(({w, h}) => {
        setSize({width: width + w, height: height + h})
    });
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