import { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'

export default function QuantityController() {
  const [quantity, setQuantity] = useState(0)

  const handleDecrease = () => setQuantity((q) => Math.max(0, q - 1))
  const handleIncrease = () => setQuantity((q) => q + 1)
  
  const handleChange = (e) => {
    const value = parseInt(e.target.value) || 0
    setQuantity(Math.max(0, value))
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
          value={quantity} 
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

