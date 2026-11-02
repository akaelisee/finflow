import { useState } from "react";
import { CreateBudgetsInput, Budgets } from "../types/budget.types";
import { BudgetsApi } from "../api/budgetsApi";

type Options = {
    onSuccess?: (created: Budgets) => void
}

export function useCreateBudget (options: Options = {}) {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const create = async (payload: CreateBudgetsInput) => {
        try {
            setIsPending(true)
            setError(null)
            const created = await BudgetsApi.create(payload);
            options.onSuccess?.(created)
            return created;
        } catch (err) {
            setError(err as Error)
            throw err;
        }finally {
             setIsPending(false)
        }
    }


    return {
        isPending,
        create,
        error
    }
}