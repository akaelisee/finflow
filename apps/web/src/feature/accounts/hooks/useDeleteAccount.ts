import { useState } from "react";
import { AccountApi } from "../api/accountApi";


type Options = {
    onSuccess?: (id: string) => void
}

export const useDeleteAccount = (options: Options = {}) => {
     const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const remove =  async (id: string) => {
        try {
            setIsPending(true); 
            setError(null);
            await AccountApi.delete(id);
            options.onSuccess?.(id);
        } catch (err) {
            setError(err as Error)
        } finally {
            setIsPending(false)
        }
    }

    return {
        isPending,
        remove,
        error
    }
}