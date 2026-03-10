import axios from 'axios';

// [NOTE]: ĐỊA CHỈ API
// Đi thi chỉ cần thay 'expenses' thành tên mảng đề bài cho (ví dụ: 'students', 'products').
const API_URL = 'http://localhost:3001/expenses';

/**
 * 1. Hàm READ (Lấy dữ liệu) - Ăn điểm phần "List expenses" (0.75 mark)
 * - Bước 1: axios.get -> Chạy tới server lấy danh sách về.
 * - Bước 2: dispatch({ type: 'SET_ITEMS' }) -> Đổ danh sách đó vào Context để Table hiển thị.
 */
export const fetchExpensesAction = async (dispatch) => {
  try {
    const response = await axios.get(API_URL);
    dispatch({ type: 'SET_ITEMS', payload: response.data });
  } catch (error) {
    console.error('Lỗi lấy dữ liệu:', error);
  }
};

/**
 * 2. Hàm CREATE (Thêm mới) - Ăn điểm phần "Add successfully" (0.5 mark)
 * - Bước 1: axios.post -> Gửi cục dữ liệu mới xuống db.json.
 * - Bước 2: dispatch({ type: 'ADD_ITEM' }) -> Cập nhật "kho" ngay lập tức để bảng tự nhảy thêm 1 dòng mà không cần F5.
 */
export const addExpenseAction = async (dispatch, expenseData) => {
  try {
    const response = await axios.post(API_URL, expenseData);
    dispatch({ type: 'ADD_ITEM', payload: response.data });
    return { success: true };
  } catch (error) {
    console.error('Lỗi thêm mới:', error);
    return { success: false };
  }
};

/**
 * 3. Hàm DELETE (Xóa) - Ăn điểm phần "Delete expense" (0.5 mark)
 * - Bước 1: axios.delete -> Xóa dòng dữ liệu dưới server dựa trên id.
 * - Bước 2: dispatch({ type: 'DELETE_ITEM' }) -> Xóa dòng đó khỏi "kho" để bảng tự biến mất dòng đó (Real-time).
 */
export const deleteExpenseAction = async (dispatch, id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    dispatch({ type: 'DELETE_ITEM', payload: id });
  } catch (error) {
    console.error('Lỗi xóa:', error);
  }
};

/**
 * 4. Hàm Cập nhật chi tiêu (Update)
 */
export const updateExpenseAction = async (dispatch, id, expenseData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, expenseData);
    dispatch({ type: 'UPDATE_ITEM', payload: response.data });
    return { success: true };
  } catch (error) {
    console.error('Error updating expense:', error);
    return { success: false };
  }
};
