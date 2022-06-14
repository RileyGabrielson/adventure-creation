import React, { createContext, useEffect, useState } from "react";
import makeContextHook from "../common/hooks/make_context_hook";
import { AdventureDomain } from "../domain/adventure_domain/adventure_domain";

const adventureDomainContext = createContext<AdventureDomain | undefined>(
  undefined
);

export const useAdventureDomain = makeContextHook(adventureDomainContext);

interface AdventureProviderProps {
  children: React.ReactNode;
}

const AdventureDomainProvider = ({ children }: AdventureProviderProps) => {
  const [domain] = useState(() => new AdventureDomain());

  useEffect(() => () => domain.dispose(), [domain]);

  return (
    <adventureDomainContext.Provider value={domain}>
      {children}
    </adventureDomainContext.Provider>
  );
};

export default AdventureDomainProvider;
