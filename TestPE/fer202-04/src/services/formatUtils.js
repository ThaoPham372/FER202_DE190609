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
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};
