import React, { createContext, useLayoutEffect, useState } from "react";
import makeContextHook from "../common/hooks/make_context_hook";
import { AdventureViewerDomain } from "../domain/adventure_domain/adventure_viewer_domain";
import { useAdventureDomain } from "./adventure_domain_provider";

const adventureViewerDomainContext = createContext<
  AdventureViewerDomain | undefined
>(undefined);

export const useAdventureViewerDomain = makeContextHook(
  adventureViewerDomainContext
);

interface AdventureViewerProviderProps {
  children: React.ReactNode;
}

const AdventureViewerDomainProvider = ({
  children,
}: AdventureViewerProviderProps) => {
  const adventureDomain = useAdventureDomain();
  const [domain, setDomain] = useState(
    () => new AdventureViewerDomain(adventureDomain)
  );

  useLayoutEffect(() => {
    setDomain(() => new AdventureViewerDomain(adventureDomain));
  }, [adventureDomain]);

  return (
    <adventureViewerDomainContext.Provider value={domain}>
      {children}
    </adventureViewerDomainContext.Provider>
  );
};

export default AdventureViewerDomainProvider;
