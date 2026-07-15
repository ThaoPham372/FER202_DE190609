/**
 * 2. Định dạng ngày DD-MM-YYYY [cite: 557]
 * Mục đích: Chuyển ngày từ định dạng Input (YYYY-MM-DD) sang định dạng đề bài yêu cầu hiển thị trên bảng (DD-MM-YYYY)[cite: 557].
 * * Note tái sử dụng:
 * - .padStart(2, '0'): Đảm bảo ngày/tháng luôn có 2 chữ số (Ví dụ: 3 thành 03)[cite: 557].
 * - Bạn có thể thay đổi thứ tự ${day}-${month}-${year} tùy theo đề bài (Ví dụ: MM/DD/YYYY).
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString); // Chuyển chuỗi chữ thành đối tượng Date của JS

  const day = String(date.getDate()).padStart(2, '0'); // Lấy ngày và thêm số 0 nếu cần
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng trong JS bắt đầu từ 0 nên phải +1
  const year = date.getFullYear(); // Lấy năm 4 chữ số

  return `${day}-${month}-${year}`; // Trả về chuỗi định dạng DD-MM-YYYY [cite: 557]
};
