import { useState, useEffect } from 'react';

let startPos = {x: 0, y: 0}; // TODO...useState doesn't update between mousedown and mousemove...maybe instead a this.startPos? or useRef?

// pass in a ref to connect to the div that wants to listen
// pass in callbacks for various mouse tracking
export const useMouse = (ref,
    onDragStart = () => true,
)  => {
    const [dragTarget, setDragTarget] = useState(false);

    function onMouseMove(e) {
        if (!dragTarget) return;
        dragTarget.onDrag({
            startX: startPos.x,
            startY: startPos.y,
            x: e.pageX,
            y: e.pageY,
            target: dragTarget,
        }, e);
        e.stopPropagation();
        e.preventDefault();
    }

    function onMouseUp(e) {
        e.stopPropagation();
        e.preventDefault();
        dragTarget.onDragEnd(e);
        setDragTarget(null);
    }

    function onMouseDown(e) {
        if (e.button !== 0) return;
        startPos = {
            x: e.pageX, // use pageX so we are relative to top of page; works when scrolled
            y: e.pageY,
        };
        const target = onDragStart({x: e.pageX, y: e.pageY,}, e);
        if (target) { // ask host if ok to start drag
            setDragTarget(target);
        }
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

    // Everytime the dragTarget state changes, assign or remove
    // the corresponding mousemove and mouseup handlers
    useEffect(() => {
        if (dragTarget) {
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
    }, [dragTarget]);

    return dragTarget;
}