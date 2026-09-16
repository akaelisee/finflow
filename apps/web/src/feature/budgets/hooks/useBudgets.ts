import { useCallback, useEffect, useState, useTransition } from "react";
import { Budgets } from "../types/budget.types";
import { BudgetsApi } from "../api/budgetsApi";

export function useBudgets () {
    const [budgets, setBudgets] = useState<Budgets[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchBudgets = useCallback( async() => {
        try {
            setIsLoading(true)
            setError(null)
            const data = await BudgetsApi.getAll(); 
            setBudgets(data)
        } catch (err) {
            setError(err as Error)
        } finally {
            setIsLoading(false)
        }
    }, []);

    useEffect(() => {
        fetchBudgets();
    }, [fetchBudgets]);

    return {
        budgets,
        setBudgets,
        isLoading,
        refetch: fetchBudgets,
        error
    }
}