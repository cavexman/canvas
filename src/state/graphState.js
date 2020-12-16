export const initialState = {
    shapes: [],
    nextId: 1,
};

// patches element with matching id
// returns updated array
const updateItem = (shapes, shape) => {
    const index = shapes.findIndex((item) => shape.id === item.id); // TODO keep a map of id => index
    return [
        ...shapes.slice(0,index),
        {
            ...shapes[index],
            ...shape,
        },
        ...shapes.slice(index+1)
    ];
};

export function shapesReducer(state, action) {
    switch (action.type) {
        case 'add_shape':
            return {
                shapes: [...state.shapes, {id: state.nextId, ...action.payload}], // append new shape TODO sort by zorder or update zorder map
                nextId: state.nextId + 1,
            };

        case 'update':
            return {
                shapes: updateItem(state.shapes, action.payload)
            };

        default:
            throw new Error();
    }
}