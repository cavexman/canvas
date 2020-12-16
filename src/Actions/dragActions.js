import FluxActions from "../state/FluxActions";

// class to give to useMouse
class Draggable {
    draggables = [];
    constructor(target) {
        this.draggables = target.map((shape) => Object.assign({}, {
            id: shape.id,
            x: shape.x,
            y: shape.y,
            width: shape.width,
            height: shape.height,
        })); // copy initial obj state;
    }

    onDrag({startX, startY, x,y, target}, e) {

    };

    onDragEnd(){
        this.draggables = [];
    };
}

export class MoveObject extends Draggable {
    onDrag({startX, startY, x,y}, e) {
        this.draggables.forEach((draggable) => FluxActions.patchObject({...draggable, x: draggable.x + (x - startX), y: draggable.y + (y - startY)}));
    };
}

export class ResizeObject extends Draggable {
    onDrag({startX, startY, x,y}, e) {
        this.draggables.forEach((draggable) => FluxActions.patchObject({...draggable, width: draggable.width + (x - startX), height: draggable.height + (y - startY)}));
    };
}