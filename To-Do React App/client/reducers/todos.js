import { ADD_TODO, DELETE_TODO, TOGGLE_COMPLETED, EDIT_TODO_TOGGLE, EDIT_TODO_SUBMIT } from '../actions'

const initialState = [
  {id: 1, todo: 'Build another todo list because the world needs one more', completed: true, edit: false},
  {id: 2, todo: 'Get potential employer to look at app', completed: true, edit: false},
  {id: 3, todo: 'Impress potential employer', completed: true, edit: false}
  ]

const todos = (state = initialState, action) => {

  switch (action.type) {
    case ADD_TODO:
      return ([...state, {id: action.id, todo: action.todo, completed: false, edit: false}])

    case DELETE_TODO:
      return state.filter(item => item.id != action.id)

    case TOGGLE_COMPLETED:
      return state.map(todo => {
        if(todo.id == action.id) {
          todo.completed ? todo.completed = false : todo.completed = true
        }
        return todo
      })

    case EDIT_TODO_TOGGLE:
      return state.map(todo => {
        if(todo.id == action.id) {
          todo.edit ? todo.edit = false : todo.edit = true
        }
        return todo
      })

    case EDIT_TODO_SUBMIT:
      return state.map(todo => {
        if(todo.id == action.id) {
          todo.todo = action.newTodo
        }
        return todo
      })

    default: return state
  }
}

export default todos 