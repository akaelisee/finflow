import { useCallback, useEffect, useState } from "react";
import { categoryApi } from "../api/categoryApi";
import type { Category, UpdateCategoryInput  } from "../types/category.types";

type Options = {
  onSuccess?: (updated: Category) => void;
};

export function useUpdateCategory(options: Options = {}) {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const update = async (id: string, payload: UpdateCategoryInput) => {
        try {
            setIsPending(true)
            setError(null)
            const updated = await categoryApi.update(id, payload);
            options.onSuccess?.(updated)
            return updated;

        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setIsPending(false)
        }
    }

    return {
        update, 
        error,
        isPending
    };
}