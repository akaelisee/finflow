import axios from "axios";
import { Accounts, CreateAccountInput, UpdateAccountInput } from "../types/accounts.types";
import { create } from "domain";

const API = "http://localhost:3000/api/accounts";

export const AccountApi = {
    
    getAll: async (): Promise<Accounts[]> => {
        const { data }  = await axios.get<Accounts[]>(API);
        return data
    },

    getById: async (id: string): Promise<Accounts> => {
        const { data } = await axios.get<Accounts>(`${API}/${id}`)
        return data
    },

    create:  async (payload: CreateAccountInput ): Promise<Accounts> => {
        const { data } = await axios.post<Accounts>(API, payload);
        return data
    },

    update: async (id: string, payload: UpdateAccountInput): Promise<Accounts> => {
        const { data } = await axios.patch<Accounts>(`${API}/${id}`, payload);
        return data
    },

    delete: async (id: string): Promise<void> => {
        await axios.delete(`${API}/${id}`);
    }

}