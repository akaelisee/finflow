import { useState, useCallback, useEffect } from "react";
import { Accounts } from "../types/accounts.types";
import { AccountApi } from "../api/accountApi";

export const useAccount = (id: string) => {
    const [account, setAccount] = useState<Accounts>();
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await AccountApi.getById(id)
                setAccount(data)
            } catch (err) {
                setError(err as Error)
            } finally {
                setIsLoading(false)
            }
        })();
    }, [id])

    return {
        account,
        setAccount,
        isLoading,
        error
    }
}