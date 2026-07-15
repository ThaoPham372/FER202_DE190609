import React, { createContext, useReducer, useContext } from 'react';

// [NOTE]: initialState - Nơi định nghĩa "hình dáng" dữ liệu ban đầu.
// Đối với các bài CRUD, luôn cần một mảng rỗng (items) để chứa dữ liệu từ API.
const initialState = {
  items: [],         // Danh sách chính (Ví dụ: chi tiêu, sinh viên, hàng hóa) [cite: 555]
  editingItem: null, // Cực kỳ quan trọng: Dùng để biết đang "Sửa" mục nào 
};

// [NOTE]: Reducer - "Bộ não" xử lý thay đổi dữ liệu.
// Khi đi thi, bạn chỉ cần nhớ các hành động (Action) cơ bản này:
const motorbikeReducer = (state, action) => {
  switch (action.type) {
    // 1. Lấy dữ liệu từ server và đổ vào kho [cite: 556]
    case 'SET_MOTORBIKE':
      return { ...state, items: action.payload };

    // 2. Thêm một mục mới vào mảng hiện tại [cite: 559]
    case 'ADD_MOTORBIKE':
      return { ...state, items: [...state.items, action.payload] };

    // 3. Xóa mục dựa trên ID [cite: 562]
    case 'DELETE_MOTORBIKE':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };

    // 4. Cập nhật thông tin mục đã sửa 
    case 'UPDATE_MOTORBIKE':
      return {
        ...state,
        items: state.items.map(i => i.id === action.payload.id ? action.payload : i),
        editingItem: null // Sau khi sửa xong thì reset về null
      };

    // 5. Lưu tạm mục muốn sửa vào kho để hiện lên Form 
    case 'SET_EDITING':
      return { ...state, editingItem: action.payload };

    // 6. Cập nhật tiêu chí lọc [cite: 567]
    case 'SET_FILTER':
      return { ...state, filter: action.payload };

    default:
      return state;
  }
};

export const MotorbikeContext = createContext();

// [NOTE]: Provider - "Cái ô" bọc ngoài App.js
export const MotorbikeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(motorbikeReducer, initialState);
  return (
    <MotorbikeContext.Provider value={{ state, dispatch }}>
      {children}
    </MotorbikeContext.Provider>
  );
};

// [NOTE]: Custom Hook - Giúp các Component lấy dữ liệu cực nhanh
export const useMotorbikes = () => useContext(MotorbikeContext); 