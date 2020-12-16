import {isMatch} from 'lodash';

import FluxDispatcher from "./FluxDispatcher";
import {EventEmitter} from 'events';
import {pointInRect, rectAroundPoint} from "./graphUtils";

let _shapes = []; // shape storage

class FluxStore extends EventEmitter {
    nextId = 1;
    constructor() {
        super();
        this.dispatchToken = FluxDispatcher.register(this.dispatchCallback.bind(this));
    }

    emitChange(eventName) {
        this.emit(eventName);
    }


    /****************
     * accessors
     * ******************/
    shapes() {
        return _shapes;
    }

    selection() {
        return _shapes.filter((s) => s.selected);
    }

    selectionHandles(shape) {
        if (shape.selected) {
            return [
                rectAroundPoint({x: shape.x, y: shape.y}, 6), // t,l
                rectAroundPoint({
                    x: shape.x + shape.width,
                    y: shape.y + shape.height
                }, 6), // b,r
            ]
        }
        return [];
    }

    handleEvent(e) {
        const point = {x: e.pageX, y: e.pageY};
        for (let i = _shapes.length - 1; i >= 0; i--) { // work backwards in z-order
            const shape = _shapes[i];
            const handle = this.selectionHandles(shape).findIndex((rect) => pointInRect(point, rect));
            if (handle > -1) {
                return {hitObject: shape, handle};
            }
            // TODO hit functions for different shapes, i.e. circle
            if (pointInRect(point, {t: shape.y, l: shape.x, b: shape.y + shape.height, r: shape.x + shape.width})) {
                return {hitObject: shape, handle};
            }
        }
        return null;
    }



    newObject(shape) {
        // TODO if no x/y then set x/y as 50*shapes.len
        _shapes = [..._shapes, {...shape, id: this.nextId++}]; // TODO make a new array to trigger render, need optimize to just add to end
    }

    // TODO can we allow update to take just one property instead of whole shape?
    updateObject(shape) {
        const shapeIndex = _shapes.findIndex((s) => s.id === shape.id);
        const changed = !isMatch(shape, _shapes[shapeIndex]); // isMatch does a partial compare
        if (changed) {
            _shapes[shapeIndex] = shape;
        }
        return changed;
    }

    // needs at least an id
    patchObject(patch) {
        if (patch.id === undefined) throw Error("id required");
        const shapeIndex = _shapes.findIndex((s) => s.id === patch.id); // TODO cache and check for last used before searching entire store
        const changed = !isMatch(patch, _shapes[shapeIndex]); // isMatch does a partial compare
        if (changed) {
            /* mutate the object in storage
            * important not to create a new object in storage as we rely on the view having
            * a reference to the object in storage
            * if there was a need to create new obj in storage, we can fix by invalidating the canvas and do a full re-render
            *  */
            console.log("keys in patch", Object.keys(patch))
            Object.keys(patch).forEach((key) => _shapes[shapeIndex][key] = patch[key]);
        }
        return changed;
    }

    // TODO can we allow update to take just one property instead of whole shape?
    nudgeSelection(delta, direction) {
        const selected = _shapes.filter((s) => s.selected);
        selected.forEach((shape) => this.patchObject({id: shape.id, x: shape.x + delta}))
        return selected.map((shape) => shape.id);
    }

    selectObjectForId(shape_id, multiSelect = false) {
        const select = _shapes.find((s) => s.id === shape_id);
        const selected = _shapes.filter((s) => s.selected);

        if (!multiSelect) {
            selected.forEach((shape) => this.patchObject({id: shape.id, selected: false})); // clear selected
        }
        this.patchObject({id: select.id, selected: true}); // new selection
        return [select, ...selected];
    }

    unselectAll() {
        const selected = _shapes.filter((s) => s.selected);
        selected.forEach((shape) => this.updateObject({...shape, selected: false})); // clear selected
        return selected;
    }



    addChangeListener(eventName, callback) {
        this.on(eventName, callback);
    }

    removeChangeListener(eventName, callback) {
        this.removeListener(eventName, callback);
    }

    // Actions dispatch a command to filter thru this dispatcher (a switch statement)
    // dispatcher then calls a method in the store
    // then fires message to the listeners via emitChange
    dispatchCallback(action) {
        let messages = [];
        switch (action.actionType) {
            case 'NEW_OBJECT':
                this.newObject(action.value);
                messages.push('STORE_NEW_OBJECT');
                break;
            case 'UPDATE_OBJECT':
                const didChange = this.updateObject(action.value);
                if (didChange) { // only set msg if we actually changed something
                    messages.push('STORE_' + action.actionType + '_' + action.value.id);
                }
                break;
            case 'PATCH_OBJECT':
                if (this.patchObject(action.value)) { // only set msg if we actually changed something
                    messages.push(`STORE_UPDATE_OBJECT_${action.value.id}`);
                    console.log(messages)
                }
                break;
            case 'NUDGE_SELECTION_RIGHT':
                const changes = this.nudgeSelection(action.value, 'RIGHT');
                if (changes.length > 0) { // only set msg if we actually changed something
                    messages = changes.map((change_id) => `STORE_UPDATE_OBJECT_${change_id}`);
                }
                break;
            case 'SELECT_OBJECT': {
                const selected = this.selectObjectForId(action.value);
                if (selected) { // only set msg if we actually changed something
                    messages = selected.map(({id}) => `STORE_UPDATE_OBJECT_${id}`);
                }
            }
                break;
            case 'MULTI_SELECT_OBJECT': {
                const selected = this.selectObjectForId(action.value, true);
                if (selected) { // only set msg if we actually changed something
                    messages = selected.map(({id}) => `STORE_UPDATE_OBJECT_${id}`);
                }
            }
                break;
            case 'UNSELECT_ALL':
                const dirtyObjs = this.unselectAll();
                if (dirtyObjs) { // only set msg if we actually changed something
                    messages = dirtyObjs.map(({id}) => `STORE_UPDATE_OBJECT_${id}`);
                }
                break;

            default:
                console.log("unknown action");
        }
        // if no change, then no message, so don't tell anybody
        if (messages.length > 0) {
            messages.forEach((message) => this.emitChange(message));
        }
        return true;
    }
}


export default new FluxStore();