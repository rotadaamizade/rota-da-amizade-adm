import { createContext, useState } from "react";

export const PageContext = createContext();

export function PageProvider(props) {
  const [page, setPage] = useState("");

  return (
    <PageContext.Provider value={{ page, setPage }}>
      {props.children}
    </PageContext.Provider>
  );
}