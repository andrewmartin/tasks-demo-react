import { createAction, handleActions } from 'redux-actions';

const fetchTaskStart = createAction('task/FETCH_START');
const getTasks = createAction('task/GET_TASKS');
const taskError = createAction('task/ERROR');

export const actions = {
  getTasks: (params, replace) => async (
    dispatch,
    _state,
    { instance: api }
  ) => {
    dispatch(fetchTaskStart());
    try {
      const data = await api.get('/tasks', { params });
      dispatch(getTasks(data));
    } catch (error) {
      console.log('error', error);
      return dispatch(
        taskError({
          error
        })
      );
    }
  }
};

const defaultState = {
  isLoading: false,
  serverError: null,
  items: []
};

// const appendItem = (stateKey, payload) => stateKey.concat(payload);

// const removeItem = (stateKey, payload) =>
//   stateKey.filter(i => i.id !== payload).filter(n => n);

// const replaceItem = (stateKey, payload) => {
//   const newState = stateKey.slice(0).filter(item => item.id !== payload.id);
//   newState.push(payload);

//   return newState.filter(n => n);
// };

export default handleActions(
  {
    [fetchTaskStart]: {
      next: state => {
        return {
          ...state,
          isLoading: true,
          serverError: null
        };
      }
    },
    [getTasks]: {
      next: (state, { payload: { data } }) => {
        return {
          ...state,
          isLoading: false,
          serverError: null,
          ...data
        };
      }
    }
  },

  defaultState
);
