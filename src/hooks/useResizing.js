import { useState, useEffect } from 'react';
var startPos = {x: 0, y: 0}; // TODO...useState doesn't update between mousedown and mousemove...maybe instead a this.startPos?

export const useResizing = (
    ref,
    onDragStart = () => true,
    onDrag = () => {},
    onDragEnd = () => {}
)  => {
    const [isDragging, setIsDragging] = useState(false);

    function onMouseMove(e) {
        if (!isDragging) return;
        onDrag({
            w: e.x - startPos.x,
            h: e.y - startPos.y,
            target: isDragging,
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
        startPos = {
            x: e.x,
            y: e.y,
        };
        const target = onDragStart({x: e.x, y: e.y,});
        if (target) { // ask host if ok to start drag
            setIsDragging(target);
            e.stopPropagation();
            e.preventDefault();
        }
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