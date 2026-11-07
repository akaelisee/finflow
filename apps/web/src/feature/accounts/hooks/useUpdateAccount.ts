import { useState, useCallback, useEffect } from "react";
import { Accounts, CreateAccountInput } from "../types/accounts.types";
import { AccountApi } from "../api/accountApi";

type Options = {
    onSucces?: (created: Accounts) => void 
}

export const useUpdateAccount = (options: Options = {}) => {
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    const update =  async (id: string,  payload: CreateAccountInput) => {
        try {
            setIsPending(true);
            setError(null);
            const updated = await AccountApi.update(id, payload)
            options.onSucces?.(updated)
            return updated;
        } catch (err) {
            setError(err as Error)
            throw err;
        } finally {
            setIsPending(false)
        }
    }

    return {
        isPending,
        update,
        error
    }
}