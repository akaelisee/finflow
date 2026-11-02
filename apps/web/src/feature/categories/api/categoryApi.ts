import axios from "axios";
import { 
    Category, 
    CreateCategoryInput, 
    UpdateCategoryInput 
} from "../types/category.types";

const API = 'http://localhost:3000/api/categories';

export const categoryApi = {
    getAll: async (): Promise<Category[]> => {
        const { data } = await axios.get<Category[]>(API);
        return data;
    },

    getById: async (id: string): Promise<Category> => {
        const { data } =  await axios.get<Category>(`${API}/${id}`);
        return data;
    },

    create: async (payload: CreateCategoryInput): Promise<Category> => {
        const { data } =  await axios.post<Category>(API, payload);
        return data;
    },

    update: async (id: string, payload: UpdateCategoryInput): Promise<Category> => {
        const { data } =  await axios.patch<Category>(`${API}/${id}`, payload);
        return data;
    },

    delete: async (id: string): Promise<void> => {
        await axios.delete(`${API}/${id}`);
    }
} 