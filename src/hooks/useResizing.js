import { useState, useRef, useEffect } from 'react';
var startPos = {x: 0, y: 0}; // TODO...useState doesn't update between mousedown and mousemove

export const useResizing = (onResize = () => {})  => {
    const [isDragging, setIsDragging] = useState(false);
    const ref = useRef(null);

    function onMouseMove(e) {
        if (!isDragging) return;
        onResize({
            w: e.x - startPos.x,
            h: e.y - startPos.y,
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
        startPos = {
            x: e.x,
            y: e.y,
        };

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

    return [ref, isDragging];
}