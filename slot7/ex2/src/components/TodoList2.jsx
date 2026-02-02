import { useReducer, useState } from 'react'
import { Button, Card, Form, InputGroup, ListGroup, Stack } from 'react-bootstrap'

const initialState = []

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, { id: Date.now(), text: action.text }]
    case 'DELETE_TASK':
      return state.filter(todo => todo.id !== action.id)
    default:
      return state
  }
}

export default function TodoList2() {
  const [todos, dispatch] = useReducer(reducer, initialState)
  const [inputValue, setInputValue] = useState('')

  const handleAddTodo = () => {
    if (inputValue.trim() === '') return
    
    dispatch({ type: 'ADD_TASK', text: inputValue })
    setInputValue('')
  }

  const handleDeleteTodo = (id) => {
    dispatch({ type: 'DELETE_TASK', id })
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo()
    }
  }

  return (
    <Stack gap={3} className="mt-3" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Card>
        <Card.Header>
          <Card.Title className="text-center mb-0">Todo List</Card.Title>
        </Card.Header>
        <Card.Body>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Please input a Task"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button variant="danger" onClick={handleAddTodo}>
              Add Todo
            </Button>
          </InputGroup>

          {todos.length > 0 && (
            <ListGroup>
              {todos.map((todo) => (
                <ListGroup.Item key={todo.id} className="d-flex justify-content-between align-items-center">
                  <span>{todo.text}</span>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Delete
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Stack>
  )
}
