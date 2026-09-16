import axios from "axios";
import { Budgets, CreateBudgetsInput, UpdateBudgetsInput } from "../types/budget.types";

const API = "http://localhost:3000/api/budgets";

export const BudgetsApi = {
    getAll: async (): Promise<Budgets[]> => {
        const { data } = await axios.get<Budgets[]>(API);
        return data 
    },

    getById: async (id: string): Promise<Budgets> => {
        const { data } = await axios.get<Budgets>(`${API}/${id}`);
        return data 
    },

    create: async (payload: CreateBudgetsInput): Promise<Budgets> => {
        const { data } = await axios.post<Budgets>(API, payload);
        return data
    },

    update: async (id: string, payload: UpdateBudgetsInput): Promise<Budgets> => {
        const { data } = await axios.patch<Budgets>(`${API}/${id}`, payload);
        return data
    },

     delete: async (id: string): Promise<void> => {
        await axios.delete<Budgets>(`${API}/${id}`);
    }
}  