import { useState, useRef, useEffect } from 'react';

export const useDragging = (ref,
                            onDragStart = () => true,
                            onDrag = () => {},
                            onDragEnd = () => {})  => {
    const [isDragging, setIsDragging] = useState(false);

    function onMouseMove(e) {
        if (!isDragging) return;
        onDrag({
            x: e.x - isDragging.width / 2, // TODO adjust x,y for container margins and offsets globalToLocal
            y: e.y - isDragging.height / 2,
            target: isDragging,
        });
        e.stopPropagation();
        e.preventDefault();
    }

    function onMouseUp(e) {
        setIsDragging(false);
        e.stopPropagation();
        e.preventDefault();
        onDragEnd(e);
    }

    function onMouseDown(e) {
        if (e.button !== 0) return;
        const target = onDragStart({x: e.x, y: e.y,});
        if (target) { // ask host if ok to start drag
            setIsDragging(target);
        }
        // e.stopPropagation();
        // e.preventDefault();
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

    return [isDragging];
}