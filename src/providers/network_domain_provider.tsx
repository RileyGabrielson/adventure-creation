import React, { createContext, useEffect, useState } from "react";
import { NetworkDomain } from "../domain/network_domain/network_domain";
import makeContextHook from "../react/hooks/make_context_hook";

const networkDomainContext = createContext<NetworkDomain | undefined>(
  undefined
);

export const useNetworkDomain = makeContextHook(networkDomainContext);

const NetworkDomainProvider = ({ children }: { children: React.ReactNode }) => {
  const [domain] = useState(() => new NetworkDomain());

  useEffect(() => () => domain.dispose(), [domain]);

  return (
    <networkDomainContext.Provider value={domain}>
      {children}
    </networkDomainContext.Provider>
  );
};

export default NetworkDomainProvider;
