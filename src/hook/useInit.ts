import { useCallback, useState } from "react";

export function useInit() {
  const [mount, setMount] = useState(false);

  const closeMount = useCallback(() => setMount(true), []);

  const openMount = useCallback(() => setMount(false), []);

  return {
    closeMount,
    openMount,
    mount,
  };
}
