import { useCallback, useEffect, useState } from "react";
import { categoryApi } from "../api/categoryApi";
import type { Category } from "../types/category.types";

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchCategories = useCallback(async () => {
        try {
            setIsLoading(true)
            setError(null)
            const data = await categoryApi.getAll();
            setCategories(data)
        } catch (err) {
            setError(err as Error)
        } finally {
            setIsLoading(false)
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);


    return {
        categories,
        isLoading,
        error,
        refetch: fetchCategories,
        setCategories
    };
}