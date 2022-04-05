import { useMemo } from "react";
import { useConfig } from "../airview-config";

export function useGetCollections() {
  const config = useConfig();

  const collections = useMemo(() => {
    return Object.values(config.collections).map((collection) => ({
      id: collection.id,
      name: collection.name,
    }));
  }, [config]);

  return collections;
}
