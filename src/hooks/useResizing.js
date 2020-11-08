import { useState, useRef, useEffect } from 'react';

export const useResizing = (onResize = () => {})  => {
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 50, y: 50 });
    const ref = useRef(null);

    function onMouseMove(e) {
        if (!isDragging) return;
        onResize({
            deltaW: e.x - startPos.x, // TODO adjust x,y for container margins and offsets because mouse pointer is in global coords
            deltaH: e.y - startPos.y, // TODO handle drag from other than lower right
        });
        e.stopPropagation();
        e.preventDefault();
    }

    function onMouseUp(e) {
        setIsDragging(false);
        e.stopPropagation();
        e.preventDefault();
    }

    function onMouseDown(e) {
        if (e.button !== 0) return;
        setIsDragging(true);
        setStartPos({
            x: e.x, // TODO adjust x,y for container margins and offsets because mouse pointer is in global coords
            y: e.y, // TODO handle drag from other than lower right
        });

        e.stopPropagation();
        e.preventDefault();
    }

    // When the element mounts, attach an mousedown listener
    useEffect(() => {
        const {current} = ref;
        current.addEventListener("mousedown", onMouseDown);

        return () => {
            current && current.removeEventListener("mousedown", onMouseDown);
        };
    }, []);

    // Everytime the isDragging state changes, assign or remove
    // the corresponding mousemove and mouseup handlers
    useEffect(() => {
        if (isDragging) {
            document.addEventListener("mouseup", onMouseUp);
            document.addEventListener("mousemove", onMouseMove);
        } else {
            document.removeEventListener("mouseup", onMouseUp);
            document.removeEventListener("mousemove", onMouseMove);
        }
        return () => {
            document.removeEventListener("mouseup", onMouseUp);
            document.removeEventListener("mousemove", onMouseMove);
        };
    }, [isDragging]);

    return [ref, startPos.x, startPos.y, isDragging];
}