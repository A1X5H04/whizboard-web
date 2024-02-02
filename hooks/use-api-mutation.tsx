import { useState } from "react";
import { useMutation } from "convex/react";

export function useApiMutation(mutationFunction: any) {
  const [loading, setLoading] = useState(false);
  const apiMutation = useMutation(mutationFunction);

  const mutate = (payload: any) => {
    setLoading(true);
    return apiMutation(payload)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => setLoading(false));
  };

  return { mutate, loading };
}
