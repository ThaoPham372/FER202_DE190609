import { useEffect, useState } from 'react';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { getExpensesByUser, addExpenseAPI, updateExpenseAPI, deleteExpenseAPI } from '../services/api';
import { useExpenses } from '../contexts/ExpenseContext';
import AppNavbar from '../components/AppNavbar';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';
import ConfirmModal from '../components/ConfirmModal';

const DashboardPage = () => {
    const { user } = useAuth();
    const { state, dispatch } = useExpenses();
    const [filterCategory, setFilterCategory] = useState('');
    const [editingExpense, setEditingExpense] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [expenseToDelete, setExpenseToDelete] = useState(null);

    // Initial fetch
    useEffect(() => {
        if (user) {
            getExpensesByUser(user.id).then(data => {
                // sort initial by date desc if needed, but we'll just set it
                dispatch({ type: 'SET_EXPENSES', payload: data });
            });
        }
    }, [user, dispatch]);

    const handleSaveExpense = async (expenseData) => {
        if (editingExpense) {
            const updated = await updateExpenseAPI(editingExpense.id, { ...expenseData, userId: user.id });
            dispatch({ type: 'UPDATE_EXPENSE', payload: updated });
            setEditingExpense(null);
        } else {
            const added = await addExpenseAPI({ ...expenseData, userId: user.id });
            dispatch({ type: 'ADD_EXPENSE', payload: added });
        }
    };

    const handleDeleteExpense = (id) => {
        setExpenseToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (expenseToDelete) {
            await deleteExpenseAPI(expenseToDelete);
            dispatch({ type: 'DELETE_EXPENSE', payload: expenseToDelete });
            setShowDeleteModal(false);
            setExpenseToDelete(null);
        }
    };

    const handleEditClick = (expense) => {
        setEditingExpense(expense);
    };

    const expensesToShow = filterCategory
        ? state.expenses.filter(e => e.category === filterCategory)
        : state.expenses;

    const totalAmount = expensesToShow.reduce((sum, e) => sum + Number(e.amount), 0);
    const formattedTotal = new Intl.NumberFormat('vi-VN').format(totalAmount) + ' ₫';

    return (
        <div style={{ backgroundColor: '#fafbfc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppNavbar />

            <Container fluid className="px-4 py-3 flex-grow-1" style={{ maxWidth: '1400px' }}>
                <Row className="gx-4">
                    {/* Left Column */}
                    <Col md={4} className="d-flex flex-column gap-3">
                        <Card className="rounded-2" style={{ border: '1px solid #dee2e6' }}>
                            <Card.Body>
                                <h6 className="fw-bold mb-2 text-dark">Total of Expenses</h6>
                                <p className="mb-0 text-dark">{formattedTotal}</p>
                            </Card.Body>
                        </Card>

                        <Card className="rounded-2" style={{ border: '1px solid #dee2e6' }}>
                            <Card.Body>
                                <h6 className="fw-bold mb-3 text-dark">{editingExpense ? 'Edit Expense' : 'Add Expense'}</h6>
                                <ExpenseForm
                                    currentExpense={editingExpense}
                                    onSave={handleSaveExpense}
                                    onReset={() => setEditingExpense(null)}
                                />
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Right Column */}
                    <Col md={8} className="d-flex flex-column gap-3">
                        <Card className="rounded-2" style={{ border: '1px solid #dee2e6' }}>
                            <Card.Body>
                                <h6 className="fw-bold mb-2 text-dark">Filter</h6>
                                <Form.Group>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Select
                                        value={filterCategory}
                                        onChange={(e) => setFilterCategory(e.target.value)}
                                        style={{ maxWidth: '250px' }}
                                    >
                                        <option value="">All categories</option>
                                        <option value="Food">Food</option>
                                        <option value="Utilities">Utilities</option>
                                        <option value="Entertainment">Entertainment</option>
                                        <option value="Mua sắm">Mua sắm</option>
                                    </Form.Select>
                                </Form.Group>
                            </Card.Body>
                        </Card>

                        <Card className="rounded-2" style={{ border: '1px solid #dee2e6' }}>
                            <Card.Body className="p-0">
                                <div className="p-3 border-bottom">
                                    <h6 className="fw-bold mb-0 text-dark">Expense Management</h6>
                                </div>
                                <ExpenseTable
                                    expenses={expensesToShow}
                                    onEdit={handleEditClick}
                                    onDelete={handleDeleteExpense}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <footer className="py-3 px-4 text-muted border-top d-flex justify-content-between align-items-center bg-white" style={{ fontSize: '0.85rem' }}>
                <div>© 2025 PersonalBudget Demo</div>
                <div>Built with React, Redux Toolkit & JSON Server</div>
            </footer>

            <ConfirmModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default DashboardPage;
