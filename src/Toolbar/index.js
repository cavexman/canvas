import React from 'react';
import FluxActions from "../state/FluxActions";
import FluxStore from "../state/FluxStore";

import cls from './Toolbar.module.sass';
let clickcount = 0;

export const Toolbar = () => {
    const onNewObject = (type) => {
        FluxActions.newObject({
            type: type,
            x: 50 + (10 * clickcount),
            y: 50 + (10 * clickcount),
            width: 150,
            height: 150,
            strokeWidth: 2,
            strokeColor: 'none',
            fillColor: 'grey',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
            zOrder: clickcount++, // do I need this? zorder is just order of the list
            selected: false,
        });
    };

    const onMutateObject = (patch) => {
        const selection = FluxStore.selection();
        selection.forEach( shape => FluxActions.patchObject({
            id: shape.id,
            ...patch,
        }));
    };

    const onNudgeSelection = (delta, direction) => {
        FluxActions.nudgeSelection(delta, direction);
    };

    return (
        <div className={cls.buttonBar}>
            <button
                onClick={() => onNewObject('circle')}
            >
                New Circle
            </button>
            <button
                onClick={() => onNewObject('polygon')}
            >
                New Polygon
            </button>
            <button
                onClick={() => onMutateObject({fillColor: 'blue'})}
            >
                Make Selected Blue
            </button>
            <button
                onClick={() => onNudgeSelection(10, 'RIGHT')}
            >
                Nudge Right
            </button>
        </div>
    )
}
export default Toolbar;