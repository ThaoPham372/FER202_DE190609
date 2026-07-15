import axios from 'axios';

/**
 * Hàm xử lý Đăng nhập cho dự án fer202-03
 * Yêu cầu: Kiểm tra cứng admin/admin và báo lỗi 'Login failed' khi sai.
 */
export const loginAction = async (dispatch, credentials) => {
  const { username, password } = credentials;

  // [SỬA TẠI ĐÂY]: Kiểm tra trực tiếp Username và Password
  if (username === 'admin' && password === 'admin') {
    // Tạo object user giả lập để lưu vào kho Context
    const user = { username: 'admin', role: 'admin' };

    // Báo cho toàn App biết là đã đăng nhập thành công
    dispatch({ type: 'LOGIN_SUCCESS', payload: { user } });

    return { success: true };
  } else {
    // [SỬA TẠI ĐÂY]: Nếu sai thì báo lỗi đúng câu chữ đề thi yêu cầu
    dispatch({ type: 'LOGIN_FAILURE', payload: 'Login failed' });

    return { success: false };
  }
};
