import { ADD_NEW_TASK, DELETE_CLOSED_TASK, GET_TASKS } from '../constants/actionTypes'

const initialState = {
  allTasks: null
}

export default function tasksReducer (state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return {...state, allTasks: action.tasks}
    case ADD_NEW_TASK:
      return {...state, allTasks: [...state.allTasks, action.newTask]}
    case DELETE_CLOSED_TASK:
      return {...state, allTasks: [...state.allTasks.filter(task => task.id !== action.task.id)]}
    default:
      return state
  }
}
