import { useCallback, useEffect, useState, useTransition } from "react";
import { Budgets } from "../types/budget.types";
import { BudgetsApi } from "../api/budgetsApi";

export function useBudget (id: string) {
    const [budget, setBudget] = useState<Budgets>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        (async () => {
            try {
               setIsLoading(true)
               setError(null)
               const data = await BudgetsApi.getById(id); 
               setBudget(data)
           } catch (err) {
               setError(err as Error)
           } finally {
               setIsLoading(false)
           }
        })();

    }, [id]);

    return {
        budget,
        setBudget,
        isLoading,
        error
    }
}