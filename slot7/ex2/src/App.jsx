import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import NavBar from './components/NavBar'
import QuantityController from './components/QuantityController'
import OrderProcessingModal from './components/OrderProcessingModal'
import ProductForm from './components/ProductForm'
import TodoList from './components/TodoList'
import './App.css'

function Exercise1() {
  return (
    <Container className="mt-4 mb-5">
      <h2>Exercise 1: Quantity Controller</h2>
      <p className="lead">Chỉnh sửa số lượng sản phẩm với input và nút +/-</p>
      <QuantityController />
    </Container>
  )
}

function Exercise2() {
  return (
    <Container className="mt-4 mb-5">
      <h2>Exercise 2: Order Processing Modal</h2>
      <p className="lead">Modal xác nhận xử lý đơn hàng</p>
      <OrderProcessingModal />
    </Container>
  )
}

function Exercise3() {
  return (
    <Container className="mt-4 mb-5">
      <h2>Exercise 3: Product Form</h2>
      <p className="lead">Form thêm sản phẩm sử dụng object state</p>
      <ProductForm />
    </Container>
  )
}

function Exercise4() {
  return (
    <Container className="mt-4 mb-5">
      <h2>Exercise 4: Todo List</h2>
      <p className="lead">Danh sách công việc với chức năng thêm và xóa</p>
      <TodoList />
    </Container>
  )
}

function Home() {
  return (
    <Container className="mt-5 mb-5 text-center">
      <h1>Chào mừng đến với React Exercises</h1>
      <p className="lead" style={{ fontSize: '1.25rem', color: '#6c757d' }}>
        Chọn một bài tập từ menu để bắt đầu
      </p>
    </Container>
  )
}

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercise1" element={<Exercise1 />} />
        <Route path="/exercise2" element={<Exercise2 />} />
        <Route path="/exercise3" element={<Exercise3 />} />
        <Route path="/exercise4" element={<Exercise4 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
