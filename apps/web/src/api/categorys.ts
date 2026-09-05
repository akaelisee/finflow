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

export async function updateCategories(id: string, data: CategoriesPlayload): Promise<Categories> {
    console.log("ID envoyé :", id);
    console.log("URL appelée :", `${API}/${id}`);
    console.log("DATA :", data);
    const response = await axios.patch(`${API}/${id}`, data );
    return response.data;
}

export async function deleteCategories(id: string): Promise<void> {
    await axios.delete(`${API}/${id}`);
}