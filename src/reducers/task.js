import { createAction, handleActions } from 'redux-actions';

const fetchTaskStart = createAction('task/FETCH_START');
const getTasks = createAction('task/GET_TASKS');
const filterTask = createAction('task/FILTER_TASK');
const unFilterTask = createAction('task/UNFILTER_TASK');
const completeTask = createAction('task/COMPLETE_TASK');
const taskError = createAction('task/ERROR');

export const actions = {
  getTasks: params => async (dispatch, _state, { instance: api }) => {
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
  },
  filterTask: ({ category, value }) => (dispatch, state) => {
    const filters = state().task.filters;

    if (filters[category].includes(value)) {
      return dispatch(unFilterTask({ category, value }));
    }

    return dispatch(filterTask({ category, value }));
  },
  completeTask: id => async (dispatch, _state, { instance: api }) => {
    dispatch(fetchTaskStart());
    const payload = {
      completed: true
    };

    try {
      const data = await api.put(`/tasks/${id}`, {
        task: payload
      });
      dispatch(completeTask(data));
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
  items: [],
  filters: {
    role: [],
    location: [],
    name: []
  }
};

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
    },
    [filterTask]: {
      next: (state, { payload: { category, value } }) => {
        return {
          ...state,
          filters: {
            ...state.filters,
            [category]: state.filters[category].concat(value)
          }
        };
      }
    },
    [unFilterTask]: {
      next: (state, { payload: { category, value } }) => {
        return {
          ...state,
          filters: {
            ...state.filters,
            [category]: state.filters[category].filter(item => item !== value)
          }
        };
      }
    },
    [completeTask]: {
      next: (
        state,
        {
          payload: {
            data: { id }
          }
        }
      ) => {
        return {
          ...state,
          items: state.items.filter(item => item.id !== id)
        };
      }
    }
  },

  defaultState
);
