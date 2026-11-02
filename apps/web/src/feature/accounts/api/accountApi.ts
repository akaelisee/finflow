import axios from "axios";
import { Accounts } from "../types/accounts.types";

const API = "http://localhost:3000/api/accounts";

export const AccountApi = {
    
    getAll: async (): Promise<Accounts[]> => {
        const { data }  = await axios.get<Accounts[]>(API);
        return data
    },

    getById: async (id: string): Promise<Accounts> => {
        const { data } = await axios.get<Accounts>(`${API}/${id}`)
        return data
    }

}