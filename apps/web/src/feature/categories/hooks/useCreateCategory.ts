import { useState } from "react";
import { categoryApi } from "../api/categoryApi";
import type { Category, CreateCategoryInput } from "../types/category.types";

type Options = {
  onSuccess?: (created: Category) => void;
};

export function useCreateCategory(options: Options = {}) {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const create = async (payload: CreateCategoryInput) => {
        try {
            setIsPending(true)
            setError(null)
            const creaded = await categoryApi.create(payload);
            options.onSuccess?.(creaded)
            return creaded;

        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setIsPending(false);
        }
    }
    return {
        create, 
        error,
        isPending
    };
}