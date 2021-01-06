import React from 'react'
import { connect } from 'react-redux'
import Fade from 'react-reveal/Fade'
import { TransitionGroup } from 'react-transition-group'

import { addTodo, deleteTodo, toggleCompleted, editTodoToggle, editTodoSubmit } from '../actions' 

class Todo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      todoInput: '',
      todoEdit: '',
      toggle: true,
      id: 4
    }
  }


  //Add Todos
  handleChange = e => {
    e.preventDefault()

    this.setState({todoInput: e.target.value})
  }
  handleAddTodo = e => {
    if(e.key === 'Enter') {
      this.setState({id: this.state.id + 1})
      this.props.addTodo({todo: e.target.value, id: this.state.id})
      this.setState({todoInput: ''})
    } else {
      return
    }
  }
  handleAddTodoButton = e => {
    this.setState({id: this.state.id + 1})
    this.props.addTodo({todo: this.state.todoInput, id: this.state.id})
    this.setState({todoInput: ''})
  }


  //Delete Todos
  handleDeleteTodo = e => {
    this.props.deleteTodo(e.target.dataset.id)
    console.log("delete: " + e.target.dataset.id)
  }


  //Toggle Completed Todos
  handleMarkCompleted = e => {
    this.props.toggleCompleted(e.target.dataset.id)

    this.setState({toggle: true ? false : true})
  }


  //Edit Todos
  handleEditButton = e => {
    this.setState({toggle: true ? false : true, todoEdit: e.target.dataset.todo})
    this.props.editTodoToggle(e.target.dataset.id)
  }

  handleEditTodo = e => {
    this.setState({todoEdit: e.target.value})
  }

  handleEditSubmit = e => {
    if (e.key === 'Enter') {
      this.props.editTodoSubmit(e.target.dataset.id, this.state.todoEdit)
      this.props.editTodoToggle(e.target.dataset.id)
      this.setState({todoEdit: ''})
    } else {
      return
    }
  }

  render() {
    return (
      <div className="container">
        <div className="todo-input-container">
          <input className="todo-input" type="text" placeholder="Add your to-do!" onKeyPress={this.handleAddTodo} onChange={this.handleChange} value={this.state.todoInput}/>
          <button className="add-todo-button" onClick={this.handleAddTodoButton}>+</button>
        </div>
      
          <TransitionGroup enter={true} appear={false} exit={true}>
            {this.props.todos.map((item) => {
              return (
                <Fade key={item.id} collapse bottom>
                  <div className="todo">
                    {!item.completed && <i className="far fa-circle" onClick={this.handleMarkCompleted} data-id={item.id}></i>}
                    {item.completed && <i className="far fa-check-circle" onClick={this.handleMarkCompleted} data-id={item.id}></i>}
                    
                    {
                      !item.edit ? 
                      <p className={`todo__text ${item.completed ? "completed" : ""}`} id={item.id} onClick={this.handleEditButton} data-todo={item.todo} data-id={item.id}>{item.todo}</p> : 
                      <input autoFocus={true} data-id={item.id} value={this.state.todoEdit} onChange={this.handleEditTodo} onKeyPress={this.handleEditSubmit} type="text" />
                    }

                    {/* <i className="far fa-edit"></i> */}

                    <i className="fas fa-times" onClick={this.handleDeleteTodo} data-id={item.id}></i>
                  </div>
                </Fade>
              )
            })}
          </TransitionGroup>
      </div>
    )
  }
}
 
function mapStateToProps (state) {
  return {
    todos: state.todos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (todo) => dispatch(addTodo(todo)),
    deleteTodo: (id) => dispatch(deleteTodo(id)),
    toggleCompleted: (id) => dispatch(toggleCompleted(id)),
    editTodoToggle: (id) => dispatch(editTodoToggle(id)),
    editTodoSubmit: (id, todo) => dispatch(editTodoSubmit(id, todo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo)