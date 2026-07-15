import { Button, Table } from 'react-bootstrap';

const ExpenseTable = ({ expenses, onEdit, onDelete }) => {
    return (
        <Table responsive hover borderless className="mb-0 align-middle">
            <thead style={{ borderBottom: '1px solid #dee2e6' }}>
                <tr>
                    <th className="fw-bold text-dark" style={{ width: '25%' }}>Name</th>
                    <th className="fw-bold text-dark" style={{ width: '20%' }}>Amount</th>
                    <th className="fw-bold text-dark" style={{ width: '20%' }}>Category</th>
                    <th className="fw-bold text-dark" style={{ width: '20%' }}>Date</th>
                    <th style={{ width: '15%' }}></th>
                </tr>
            </thead>
            <tbody>
                {expenses.length === 0 ? (
                    <tr>
                        <td colSpan="5" className="text-center py-4 text-muted">
                            No expenses found.
                        </td>
                    </tr>
                ) : (
                    expenses.map(expense => {
                        const amountStr = new Intl.NumberFormat('vi-VN').format(expense.amount) + ' ₫';
                        let dateStr = expense.date;
                        try {
                            const [yyyy, mm, dd] = expense.date.split('-');
                            if (yyyy && mm && dd) {
                                dateStr = `${dd}-${mm}-${yyyy}`;
                            }
                        } catch (e) {
                            // ignore
                        }

                        return (
                            <tr key={expense.id} style={{ borderBottom: '1px solid #f1f3f5' }}>
                                <td className="py-3">{expense.name}</td>
                                <td className="py-3">{amountStr}</td>
                                <td className="py-3">{expense.category}</td>
                                <td className="py-3">{dateStr}</td>
                                <td className="py-3 d-flex gap-2 justify-content-end">
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        onClick={() => onEdit(expense)}
                                        className="text-white"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => onDelete(expense.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })
                )}
            </tbody>
        </Table>
    );
};

export default ExpenseTable;
