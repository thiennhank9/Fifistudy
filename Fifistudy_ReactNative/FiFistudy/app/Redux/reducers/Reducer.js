import initialState from '../InitialState.js';
import types from '../Types.js';

export default reducer = (state = initialState, action) => {
    const {ex_state} = state;
    const {type, payload} = action;

    switch (type) {
        case types.EXAMPLE_TYPE:
            return {
                ...state,
                ex_state: ex_state + ' dispatched!'
            };
            break;



        default :
            return state;
    }
}