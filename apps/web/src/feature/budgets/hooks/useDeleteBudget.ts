import { useState } from "react";
import { CreateBudgetsInput, UpdateBudgetsInput, Budgets } from "../types/budget.types";
import { BudgetsApi } from "../api/budgetsApi";

type Options = {
    onSuccess?: (id: string) => void
}

export function useDeleteBudget (option: Options = {}) {
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const remove = async (id: string) => {
        try {
            setIsPending(true)
            setError(null)
            await BudgetsApi.delete(id);
            option.onSuccess?.(id)
        } catch (err) {
            setError(err as Error)
            throw err
        }finally {
             setIsPending(false)
        }
    }


    return {
        isPending,
        remove,
        error
    }
}