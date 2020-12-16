import React, {useRef}  from 'react';

import FluxStore from "../state/FluxStore"; // calling this FluxStore just for educational purposes...should be called ShapeModels
import FluxActions from "../state/FluxActions";
import {pointInRect, rectAroundPoint, getAbsoluteOffsetFromBody} from "../state/graphUtils";

import {useMouse} from "../hooks/useMouse";
import {MoveObject, ResizeObject} from "../Actions/dragActions";

import cls from './SelectionController.module.sass';

export const SelectionController = (props) => {
    const {children} = props;
    const ref = useRef(null);

    const onMouseDown = ({x,y}, e) => {
        // getAbsoluteOffsetFromBody TODO going to need this to deal with scrolled viewport
        const selection = FluxStore.selection();
        const result = FluxStore.handleEvent(e);
        if (result) {
            const {hitObject, handle} = result;
            if (selection.find((shape) => shape.id === hitObject.id) === undefined) { // hitObj not in selection
                if (e.shiftKey) {
                    FluxActions.multiSelectObject(hitObject.id);
                } else {
                    FluxActions.selectObject(hitObject.id);
                    selection.length = 0;
                }
                selection.push(hitObject);
            }
            if (handle > -1) {
                return new ResizeObject(selection)
            }
            return new MoveObject(selection);
        }
    };

    // eslint-disable-next-line no-unused-vars
    const dragTarget = useMouse(
        ref,
        onMouseDown,
    );

    return (
        <div ref={ref}>
            {children}
        </div>
    )
}
export default SelectionController;