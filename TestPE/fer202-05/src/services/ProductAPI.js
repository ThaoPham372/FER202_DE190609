import axios from 'axios';

const API_URL = 'http://localhost:3005/store'; // Truy cập thẳng vào object store vì db.json có cấu trúc lồng nhau

export const fetchProductsAction = async (dispatch) => {
    try {
        const res = await axios.get(API_URL);
        // Do db.json bọc array ở trong biến products (res.data.products)
        dispatch({ type: 'SET_PRODUCTS', payload: res.data.products });
    } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error);
    }
};

export const buyProductAction = async (dispatch, product) => {
    if (product.stock <= 0) return alert("Hết hàng!");

    try {
        // 1. Lấy toàn bộ Store hiện tại trên Server
        const res = await axios.get(API_URL);
        const currentStore = res.data;

        // 2. Tìm và giảm stock của sản phẩm được click
        currentStore.products = currentStore.products.map(p => 
            p.id === product.id ? { ...p, stock: p.stock - 1 } : p
        );

        // 3. Ghi đè toàn bộ object Store mới lên Server (PUT nguyên object)
        await axios.put(API_URL, currentStore);

        // 4. Cập nhật lại State ở máy khách để con số trên màn hình nhảy liền
        dispatch({ type: 'UPDATE_STOCK', payload: product });
    } catch (error) {
        console.error("Lỗi khi mua hàng:", error);
    }
};
