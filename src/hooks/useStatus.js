import { useMemo, useState } from "react";

export const useStatus = (defaultValue) => {
  const [status, setStatus] = useState(defaultValue);
  const setters = useMemo(
    () => ({
      loading() {
        setStatus("LOADING");
      },
      resolved() {
        setStatus("RESOLVED");
      },
      error() {
        setStatus("ERROR");
      },
    }),
    [setStatus]
  );
  return [status, setters];
};
