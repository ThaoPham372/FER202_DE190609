import { useState } from 'react'
import { Button, Form, Card, ListGroup, InputGroup, Stack } from 'react-bootstrap'

export default function TodoList() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  const handleAddTodo = () => {
    if (inputValue.trim() === '') return
    
    setTodos([...todos, { id: Date.now(), text: inputValue }])
    setInputValue('')
  }

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
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
