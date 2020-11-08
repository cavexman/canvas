import React, {useState} from 'react';

import CircleSVG from "../CircleSVG";
import PolygonSVG from "../PolygonSVG";

import cls from './Canvas.module.sass';

export const Canvas = () => {
    const [nextId, setId] = useState(1);
    const [displayList, setDisplaylist] = useState([]);
    const [selection, setSelection] = useState([]);

    const onNewObject = (type) => {
        setDisplaylist([...displayList, {
            id: nextId,
            type: type,
            width: 50,
            height: 50,
            radius: 24,
            strokeWidth: 2,
            strokeColor: 'none',
            fillColor: 'grey',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
            zOrder: displayList.length, // do I need this? zorder is just order of the list
        }]);
        setId(nextId + 1);
    }

    const onChange = (shape) => { // TODO insert in zorder
        console.log("shape", shape)
        const trimDisplayList = displayList.filter((s) => s.id != shape.id);
        setDisplaylist([...trimDisplayList, shape])
    }

    console.log(selection)
    return (
        <div>
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
            </div>
            {
                displayList.map((shape) => { // TODO use a factory
                    switch (shape.type) {
                        case 'circle':
                            return (
                                <CircleSVG
                                    key={shape.id}
                                    id={shape.id}
                                    width={shape.width}
                                    height={shape.height}
                                    radius={shape.radius}
                                    strokeWidth={shape.strokeWidth}
                                    strokeColor={shape.strokeColor}
                                    fillColor={shape.fillColor}
                                    text={shape.text}
                                    setSelection={setSelection}
                                    selected={selection.includes(shape.id)}
                                    setSize={({width, height}) => onChange({...shape, width, height })}
                                />
                            );
                            break;
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
                                    setSelection={setSelection}
                                    selected={selection.includes(shape.id)}
                                />
                            );
                            break;
                        default:
                            return null;
                    }
                }
            )}

        </div>
    )
}
export default Canvas;