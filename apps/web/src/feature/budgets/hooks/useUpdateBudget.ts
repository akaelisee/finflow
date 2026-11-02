import { useState } from "react";
import { CreateBudgetsInput, UpdateBudgetsInput, Budgets } from "../types/budget.types";
import { BudgetsApi } from "../api/budgetsApi";

type Options = {
    onSuccess?: (updated: Budgets) => void
}

export function useUpdateBudget (option: Options = {}) {
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const update = async (id: string, payload: UpdateBudgetsInput) => {
        try {
            setIsPending(true)
            setError(null)
            const updated = await BudgetsApi.update(id, payload);
            option.onSuccess?.(updated)
            return updated;
        } catch (err) {
            setError(err as Error)
            throw err
        }finally {
             setIsPending(false)
        }
    }


    return {
        isPending,
        update,
        error
    }
}