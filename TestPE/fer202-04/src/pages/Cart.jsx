import { Container, Table, Button, Form } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext';
import { useMotorbikes } from '../contexts/MotorbikeContext';
import { updateMotorbikeAction } from '../services/MotorbikeAPI';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Cart() {
    const { state: cartState, dispatch: cartDispatch } = useCart();
    const { state: motorbikeState, dispatch: motorbikeDispatch } = useMotorbikes();

    const handleRemove = async (item) => {
        // 1. Phải trả lại Stock cho Motorbike trên Server
        const originMotorbike = motorbikeState.items.find(m => m.id === item.id);
        const updatedMotorbike = { ...originMotorbike, stock: originMotorbike.stock + item.qty };
        await updateMotorbikeAction(motorbikeDispatch, item.id, updatedMotorbike);

        // 2. Xóa khỏi giỏ hàng
        cartDispatch({ type: 'REMOVE_FROM_CART', payload: item.id });
    };

    const total = cartState.items.reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <Container className="mt-4 flex-grow-1">
                <h2 className="text-center mb-4">Your Cart</h2>
                <Table bordered hover responsive>
                    <thead className="table-light">
                        <tr>
                            <th>Model</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartState.items.map(item => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>${item.price}</td>
                                <td>{item.qty}</td>
                                <td>${item.price * item.qty}</td>
                                <td>
                                    <Button variant="danger" size="sm" onClick={() => handleRemove(item)}>Remove</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="text-end h4">
                    Total: <span className="text-success">${total.toFixed(2)}</span>
                </div>
            </Container>
            <Footer />
        </div>
    );
}

export default Cart;
