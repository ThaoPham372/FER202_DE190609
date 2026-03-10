import axios from 'axios';

export const loginAction = async (dispatch, credentials) => {
  dispatch({ type: 'LOGIN_START' }); // Thông báo bắt đầu quá trình đăng nhập [cite: 157]
  try {
    // Lấy danh sách users từ json-server [cite: 161]
    const response = await axios.get('http://localhost:3001/users');
    const users = response.data;

    // Tìm user khớp với username và password người dùng nhập [cite: 164, 165]
    const user = users.find(
      (u) =>
        u.username === credentials.username &&
        u.password === credentials.password,
    );

    if (user) {
      // Nếu thấy user, gửi dữ liệu vào Context để lưu trạng thái [cite: 170]
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user } });
      return { success: true, user };
    } else {
      // Nếu không khớp, báo lỗi [cite: 175]
      const errorMessage = 'Tài khoản hoặc mật khẩu không chính xác';
      dispatch({ type: 'LOGIN_FAILURE', payload: { error: errorMessage } });
      return { success: false, message: errorMessage };
    }
  } catch (error) {
    const errorMessage = 'Không thể kết nối đến máy chủ';
    dispatch({ type: 'LOGIN_FAILURE', payload: { error: errorMessage } });
    return { success: false, message: errorMessage };
  }
};
