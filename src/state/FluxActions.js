import FluxDispatcher from "./FluxDispatcher";

class FluxActions {
    newObject(shape) {
        FluxDispatcher.dispatch({
            actionType: 'NEW_OBJECT',
            value: shape,
        });
    }
    updateObject(shape) {
        FluxDispatcher.dispatch({
            actionType: 'UPDATE_OBJECT',
            value: shape,
        });
    }
    patchObject(shape) {
        FluxDispatcher.dispatch({
            actionType: 'PATCH_OBJECT',
            value: shape,
        });
    }
    unselectAll() {
        FluxDispatcher.dispatch({
            actionType: 'UNSELECT_ALL',
            value: null, // no value req'd
        });
    }
    selectObject(shape_id) { // select one, deselct others
        FluxDispatcher.dispatch({
            actionType: 'SELECT_OBJECT',
            value: shape_id,
        });
    }
    multiSelectObject(shape_id) { // add an object to the selection
        FluxDispatcher.dispatch({
            actionType: 'MULTI_SELECT_OBJECT',
            value: shape_id,
        });
    }
    nudgeSelection(delta, direction) {
        FluxDispatcher.dispatch({
            actionType: 'NUDGE_SELECTION_RIGHT',
            value: delta,
        });
    }
}

export default new FluxActions();