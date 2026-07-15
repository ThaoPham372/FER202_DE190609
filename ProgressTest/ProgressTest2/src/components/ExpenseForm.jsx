import { useState, useEffect } from 'react';
import { Button, Form, Row, Col, Alert } from 'react-bootstrap';

const ExpenseForm = ({ currentExpense, onSave, onReset }) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (currentExpense) {
            setName(currentExpense.name);
            setAmount(currentExpense.amount);
            setCategory(currentExpense.category);
            setDate(currentExpense.date);
            setError('');
        } else {
            resetForm();
        }
    }, [currentExpense]);

    const resetForm = () => {
        setName('');
        setAmount('');
        setCategory('');
        setDate('');
        setError('');
        if (onReset) onReset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!name.trim() || !category) {
            setError('Name and Category must not be empty.');
            return;
        }

        const amt = Number(amount);
        if (isNaN(amt) || amt <= 0) {
            setError('Amount must be a valid number greater than 0.');
            return;
        }

        if (!date) {
            setError('Date is required.');
            return;
        }

        onSave({
            name: name.trim(),
            amount: amt,
            category,
            date
        });
        resetForm();
    };

    return (
        <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger" className="py-2 px-3 mb-3">{error}</Alert>}

            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Form.Group>

            <Row className="mb-3">
                <Col>
                    <Form.Group>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Select category</option>
                            <option value="Food">Food</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Mua sắm">Mua sắm</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-4">
                <Form.Label>Date</Form.Label>
                <Form.Control
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={resetForm} size="sm">
                    Reset
                </Button>
                <Button variant="primary" type="submit" size="sm">
                    {currentExpense ? 'Save' : 'Add'}
                </Button>
            </div>
        </Form>
    );
};

export default ExpenseForm;
