import { useReducer } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'

const initialState = { count: 0 }

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 }
    case 'DECREMENT':
      return { count: Math.max(0, state.count - 1) }
    case 'SET_INPUT':
      return { count: Math.max(0, action.value) }
    default:
      return state
  }
}

export default function QuantityController2() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleDecrease = () => dispatch({ type: 'DECREMENT' })
  const handleIncrease = () => dispatch({ type: 'INCREMENT' })
  
  const handleChange = (e) => {
    const value = parseInt(e.target.value) || 0
    dispatch({ type: 'SET_INPUT', value })
  }

  return (
    <div className="d-flex justify-content-center mt-4">
      <InputGroup style={{ maxWidth: '250px' }}>
        <Button 
          variant="outline-secondary" 
          onClick={handleDecrease}
          style={{ 
            minWidth: '50px',
            fontSize: '1.25rem',
            fontWeight: 'bold'
          }}
        >
          -
        </Button>
        <Form.Control 
          type="number" 
          value={state.count} 
          onChange={handleChange}
          min="0"
          aria-label="Quantity"
          className="text-center"
          style={{ 
            fontSize: '1.1rem',
            fontWeight: '500'
          }}
        />
        <Button 
          variant="outline-secondary" 
          onClick={handleIncrease}
          style={{ 
            minWidth: '50px',
            fontSize: '1.25rem',
            fontWeight: 'bold'
          }}
        >
          +
        </Button>
      </InputGroup>
    </div>
  )
}
