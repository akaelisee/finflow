import { useState, useCallback, useEffect } from "react";
import { Accounts } from "../types/accounts.types";
import { AccountApi } from "../api/accountApi";

export const useAccounts = () => {
    const [accounts, setAccounts] = useState<Accounts[]>([]);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    const fetchAccounts = useCallback(async() => {
        try {
            setIsLoading(true)
            setError(null)
            const data = await AccountApi.getAll();
            setAccounts(data)
        } catch (err) {
            setError(err as Error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchAccounts()
    }, [fetchAccounts])

    return {
        accounts,
        setAccounts,
        isLoading,
        fetch: fetchAccounts,
        error
    }
}