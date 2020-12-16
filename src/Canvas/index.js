import React, {useEffect} from 'react';
import FluxStore from "../state/FluxStore";
import {useForceUpdate} from "../hooks/useForceUpdate";

import CircleSVG from "../CircleSVG";
import PolygonSVG from "../PolygonSVG";

import Toolbar from "../Toolbar";
import SelectionController from "../SelectionController";

import cls from './Canvas.module.sass';

/*
* lets do hit testing at canvas
* get the click
* find the object hit
* focus hit obj
* track drag, modify focused obj
* */

const Canvas = (props) => {
    const forceUpdate = useForceUpdate();
    useEffect(() => { // when the store gets longer/shorter we have to re-render the array, if shape props change then just that instance needs to re-render
        FluxStore.addChangeListener('STORE_NEW_OBJECT', forceUpdate);
        FluxStore.addChangeListener('STORE_DELETE_OBJECT', forceUpdate);
    }, []);
    const shapes = FluxStore.shapes(); // TODO use connect to get shapes via props
console.log("render canvas");
    return (
        <div className={cls.rootcanvas}>
            <Toolbar />
            <SelectionController>
                {
                    // loop thru shapes which are in shared storage
                    shapes.map((shape, shapeIndex) => {
                        switch (shape.type) { // TODO use a node factory
                            case 'circle':
                                return (
                                    <CircleSVG
                                        key={shape.id}
                                        shapeIndex={shapeIndex}
                                        shape={shape}
                                    />
                                );
                            case 'polygon':
                                return (
                                    <PolygonSVG
                                        key={shape.id}
                                        id={shape.id}
                                        width={shape.width}
                                        height={shape.height}
                                        radius={shape.radius}
                                        strokeWidth={shape.strokeWidth}
                                        strokeColor={shape.strokeColor}
                                        fillColor={shape.fillColor}
                                    />
                                );
                            default:
                                return null;
                        }
                    }
                )}
            </SelectionController>
        </div>
    )
}
export default Canvas;