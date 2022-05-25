import React, { createContext, useEffect, useState } from "react";
import makeContextHook from "../common/hooks/make_context_hook";
import { AdventureEditorDomain } from "../domain/adventure_domain/adventure_editor_domain";
import { Moment } from "../domain/adventure_domain/types";
import { NetworkDomain } from "../domain/network_domain/network_domain";

const adventureEditorDomainContext = createContext<
  AdventureEditorDomain | undefined
>(undefined);

export const useAdventureEditorDomain = makeContextHook(
  adventureEditorDomainContext
);

interface AdventureEditorProviderProps {
  children: React.ReactNode;
  networkDomain: NetworkDomain<Moment>;
}

const AdventureEditorDomainProvider = ({
  children,
  networkDomain,
}: AdventureEditorProviderProps) => {
  const [domain] = useState(() => new AdventureEditorDomain(networkDomain));

  useEffect(() => () => domain.dispose(), [domain]);

  return (
    <adventureEditorDomainContext.Provider value={domain}>
      {children}
    </adventureEditorDomainContext.Provider>
  );
};

export default AdventureEditorDomainProvider;
