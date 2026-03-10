/**
 * 1. Định dạng tiền VND [cite: 565]
 * Mục đích: Chuyển con số thô (ví dụ: 450000) thành chuỗi tiền tệ chuẩn Việt Nam (450.000 ₫)[cite: 565].
 * * Note tái sử dụng: 
 * - 'vi-VN': Đảm bảo dấu phân cách phần nghìn là dấu chấm (.) theo chuẩn Việt Nam.
 * - currency: 'VND': Tự động thêm ký hiệu ₫ ở cuối[cite: 565].
 * - Có thể thay 'VND' thành 'USD' nếu đề bài yêu cầu quản lý tiền đô.
 */
export const formatVND = (amount) => {
  // Intl.NumberFormat là công cụ có sẵn cực mạnh của trình duyệt để xử lý số [cite: 565]
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND' 
  }).format(amount);
};

/**
 * 2. Định dạng ngày DD-MM-YYYY [cite: 557]
 * Mục đích: Chuyển ngày từ định dạng Input (YYYY-MM-DD) sang định dạng đề bài yêu cầu hiển thị trên bảng (DD-MM-YYYY)[cite: 557].
 * * Note tái sử dụng:
 * - .padStart(2, '0'): Đảm bảo ngày/tháng luôn có 2 chữ số (Ví dụ: 3 thành 03)[cite: 557].
 * - Bạn có thể thay đổi thứ tự ${day}-${month}-${year} tùy theo đề bài (Ví dụ: MM/DD/YYYY).
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString); // Chuyển chuỗi chữ thành đối tượng Date của JS
  
  const day = String(date.getDate()).padStart(2, '0');    // Lấy ngày và thêm số 0 nếu cần
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng trong JS bắt đầu từ 0 nên phải +1
  const year = date.getFullYear(); // Lấy năm 4 chữ số
  
  return `${day}-${month}-${year}`; // Trả về chuỗi định dạng DD-MM-YYYY [cite: 557]
};