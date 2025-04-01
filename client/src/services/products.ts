import axios, { AxiosError } from "axios";

export interface ProductData {
  id?: number;
  title: string;
  description: string;
  price?: number;
  category: string;
  condition: string;
  isForSale: boolean;
  images?: File[];
}

const API_BASE_URL = "http://localhost:5000/api";

const getAuthHeaders = (token: string | null, isFormData = false) => {
  return token
    ? {
        Authorization: `Bearer ${token}`,
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      }
    : {};
};

export const getUserProducts = async (
  token: string
): Promise<{
  success: boolean;
  products?: ProductData[];
  message?: string;
}> => {
  try {
    const response = await axios.get<ProductData[]>(
      `${API_BASE_URL}/products`,
      {
        headers: getAuthHeaders(token),
      }
    );
    return { success: true, products: response.data };
  } catch (error) {
    const err = error as AxiosError<{ error: string }>;
    return {
      success: false,
      message: err.response?.data?.error || "Failed to fetch products",
    };
  }
};

export const addProduct = async (
  token: string,
  productData: ProductData
): Promise<{ success: boolean; product?: ProductData; message?: string }> => {
  try {
    const formData = new FormData();

    Object.entries(productData).forEach(([key, value]) => {
      if (key !== "images") {
        formData.append(key, String(value));
      }
    });

    if (productData.images) {
      productData.images.forEach((image) => formData.append("images", image));
    }

    const response = await axios.post<ProductData>(
      `${API_BASE_URL}/products`,
      formData,
      {
        headers: getAuthHeaders(token, true),
      }
    );

    return { success: true, product: response.data };
  } catch (error) {
    const err = error as AxiosError<{ error: string }>;
    return {
      success: false,
      message: err.response?.data?.error || "Failed to add product",
    };
  }
};

// ✅ Delete Product
export const deleteProduct = async (
  token: string,
  productId: number
): Promise<{ success: boolean; message?: string }> => {
  try {
    await axios.delete(`${API_BASE_URL}/products/${productId}`, {
      headers: getAuthHeaders(token),
    });
    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    const err = error as AxiosError<{ error: string }>;
    return {
      success: false,
      message: err.response?.data?.error || "Failed to delete product",
    };
  }
};
