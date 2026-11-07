import { useState, useCallback, useEffect } from "react";
import { Accounts, CreateAccountInput } from "../types/accounts.types";
import { AccountApi } from "../api/accountApi";

type Options = {
    onSucces?: (created: Accounts) => void 
}

export const useCreateAccount = (options: Options = {}) => {
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    const create =  async (payload: CreateAccountInput) => {
        try {
            setIsPending(true);
            setError(null);
            const created = await AccountApi.create(payload)
            options.onSucces?.(created)
            return created;
        } catch (err) {
            setError(err as Error)
            throw err;
        } finally {
            setIsPending(false)
        }
    }

    return {
        isPending,
        create,
        error
    }
}