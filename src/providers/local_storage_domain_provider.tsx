import React, { createContext, useState } from "react";
import makeContextHook from "../common/hooks/make_context_hook";
import { LocalStorageDomain } from "../domain/adventure_domain/local_storage_domain";

const localStorageDomainContext = createContext<LocalStorageDomain | undefined>(
  undefined
);

export const useLocalStorageDomain = makeContextHook(localStorageDomainContext);

const LocalStorageDomainProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [domain] = useState(() => new LocalStorageDomain());

  return (
    <localStorageDomainContext.Provider value={domain}>
      {children}
    </localStorageDomainContext.Provider>
  );
};

export default LocalStorageDomainProvider;
