import { useCallback, useEffect, useState } from "react";
import { categoryApi } from "../api/categoryApi";
import type { Category, UpdateCategoryInput,   } from "../types/category.types";

type Options = {
  onSuccess?: (deleteID: string) => void;
};

export function useDeleteCategory(options: Options = {}) {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const remove = async (id: string) => {
        try {
            setIsPending(true)
            setError(null)
            await categoryApi.delete(id);
            options.onSuccess?.(id)
        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setIsPending(false)
        }
    }

    return {
        remove, 
        error,
        isPending
    };
}