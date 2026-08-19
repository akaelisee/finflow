import axios from "axios";
import { Transactions } from "../types/transactions";

const API = 'http://localhost:3000/api/transactions';

interface CreateTransactionPlayloas {
    accountId: string, 
    categoryId: string,
     amount: string, 
     label: string, 
     transactionDate: Date, 
     importedFrom: string,
     note: string
}

export async function getTransactions(): Promise<Transactions[]> {
    try {
        const resposne = await axios.get(API);
        return resposne.data;
    } catch (error) {
        console.log('erreur : ', error);
        return [];
    }
}

export async function getTransactionsId(id: string): Promise<Transactions[]> {
    try {
        const response = await axios.get(`${API}/${id}`);
        return response.data; 
    } catch (error) {
        throw error;
    }
}

export async function createTransactions(data: CreateTransactionPlayloas): Promise<Transactions> {
    try {
        const resposne = await axios.post(API, data);
        return resposne.data;
    } catch (error) {
        console.log('erreur : ', error);
        throw error;
    }
}