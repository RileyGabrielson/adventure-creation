import React, { createContext, useLayoutEffect, useState } from "react";
import makeContextHook from "../common/hooks/make_context_hook";
import { AdventureEditorDomain } from "../domain/adventure_domain/adventure_editor_domain";
import { Choice, PositionedMoment } from "../domain/adventure_domain/types";
import { NetworkDomain } from "../domain/network_domain/network_domain";
import { useAdventureDomain } from "./adventure_domain_provider";

const adventureEditorDomainContext = createContext<
  AdventureEditorDomain | undefined
>(undefined);

export const useAdventureEditorDomain = makeContextHook(
  adventureEditorDomainContext
);

interface AdventureEditorProviderProps {
  children: React.ReactNode;
  networkDomain: NetworkDomain<PositionedMoment, Choice>;
}

const AdventureEditorDomainProvider = ({
  children,
  networkDomain,
}: AdventureEditorProviderProps) => {
  const adventureDomain = useAdventureDomain();
  const [domain, setDomain] = useState(
    () => new AdventureEditorDomain(adventureDomain, networkDomain)
  );

  useLayoutEffect(() => {
    setDomain(() => new AdventureEditorDomain(adventureDomain, networkDomain));
  }, [adventureDomain, networkDomain]);

  return (
    <adventureEditorDomainContext.Provider value={domain}>
      {children}
    </adventureEditorDomainContext.Provider>
  );
};

export default AdventureEditorDomainProvider;
