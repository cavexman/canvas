import React, {useEffect, useRef}  from 'react';

import FluxStore from "../state/FluxStore"; // calling this FluxStore just for educational purposes...should be called ShapeModels
import {useForceUpdate} from "../hooks/useForceUpdate";

import cls from './CircleSVG.module.sass';

import {SelectionHandles} from "../SelectionHandles";

// we need a derivable class involved so we can  put Selectable and forceUpdate into a base class
export const CircleSVG = ({
    shape,
}) => {
    const forceUpdate = useForceUpdate();
    // const shape = useRef(FluxStore.shapes()[shapeIndex]);
    // const shapeRef = useRef(shape);

    // experimenting with having each shape listen to its model for changes
    // so we could trigger render on just the shape without re-traversing the tree
    // downside is we register a lot of listeners, which might be just as expensive to traverse.
    // also creates high level of entanglement
    useEffect(() => {
        FluxStore.addChangeListener('STORE_UPDATE_OBJECT_' + shape.id, () => {console.log("update", shape.id); forceUpdate()}); // call forceUpdate whenever we get the update message

        // tell the store to stop sending change messages when we tear down this component
        return () => FluxStore.removeChangeListener('STORE_UPDATE_OBJECT_' + shape.id, forceUpdate); // return a cleanup function
    }, []);

// console.log(shapeRef.current)
    // console.log("same?", shapeRef.current === FluxStore.shapes()[shapeIndex])
    const {
        x,
        y,
        width,
        height,
        strokeWidth,
        strokeColor,
        fillColor,
        text,
        selected, // the model can set a selected flag on each shape, or we could query the model to ask if we are selected, or a Selection view could decorate the shapes, like a could be a Selectable
    } = shape;
    const size = Math.min(width, height); // circle wants width == height
    return (
        <div
            className={cls.frame}
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
            {selected && <SelectionHandles />}
        </div>
    )
}
export default CircleSVG;