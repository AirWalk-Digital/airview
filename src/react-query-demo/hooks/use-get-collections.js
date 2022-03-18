import { config } from "../config";
import { useMemo } from "react";

export function useGetCollections() {
  const collections = useMemo(() => {
    return Object.values(config.collections).map((collection) => ({
      id: collection.id,
      name: collection.name,
    }));
  }, []);

  return collections;
}
