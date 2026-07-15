import axios from 'axios';

export const loginAction = async (dispatch, credentials) => {
  dispatch({ type: 'LOGIN_START' }); // Thông báo bắt đầu quá trình đăng nhập [cite: 157]
  try {
    // Lấy danh sách users từ json-server [cite: 161]
    const response = await axios.get('http://localhost:5001/accounts');
    const users = response.data;

    // Tìm user khớp với username và password người dùng nhập [cite: 164, 165]
    const user = users.find(
      (u) =>
        (u.username === credentials.identifier ||
          u.email === credentials.identifier) &&
        u.password === credentials.password,
    );

    // Không tìm thấy user khớp
    if (!user) {
      const errorMessage = 'Tài khoản hoặc mật khẩu không chính xác';
      dispatch({ type: 'LOGIN_FAILURE', payload: { error: errorMessage } });
      return { success: false, message: errorMessage };
    }
    // Tìm thấy nhưng bị khóa
    if (user.status !== 'active') {
      const errorMessage = 'Tài khoản của bạn đã bị khóa';
      dispatch({ type: 'LOGIN_FAILURE', payload: { error: errorMessage } });
      return { success: false, message: errorMessage };
    }

    // Tìm thấy và đang active
    dispatch({ type: 'LOGIN_SUCCESS', payload: { user } });
    return { success: true, user };
  } catch (error) {
    const errorMessage = 'Không thể kết nối đến máy chủ';
    dispatch({ type: 'LOGIN_FAILURE', payload: { error: errorMessage } });
    return { success: false, message: errorMessage };
  }
};
