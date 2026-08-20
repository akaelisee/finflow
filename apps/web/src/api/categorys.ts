import { CategoriesPlayload, Categories } from "@/types/category";
import axios from "axios";

const API = 'http://localhost:3000/api/categories'

export async function getCategories(): Promise<Categories[]> {
    const response = await axios.get(API);
    return response.data;
} 

export async function getCategoriesId(id: string): Promise<Categories> {
    const response = await axios.get(`${API}/${id}`);
    return response.data;
} 

export async function createCategories(data: CategoriesPlayload): Promise<Categories> {
    const response = await axios.post(API, data);
    return response.data;
}