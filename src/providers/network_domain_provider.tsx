import React, { createContext, useEffect, useState } from "react";
import { NetworkDomain } from "../domain/network_domain/network_domain";
import makeContextHook from "../common/hooks/make_context_hook";

const networkDomainContext = createContext<NetworkDomain<any> | undefined>(
  undefined
);

export const useNetworkDomain = makeContextHook(networkDomainContext);

interface NetworkDomainProviderProps<T> {
  children: React.ReactNode;
  customDomain?: NetworkDomain<T>;
}

function NetworkDomainProvider<T>({
  children,
  customDomain,
}: NetworkDomainProviderProps<T>) {
  const [domain] = useState(() => customDomain ?? new NetworkDomain<T>());

  useEffect(() => () => domain.dispose(), [domain]);

  return (
    <networkDomainContext.Provider value={domain}>
      {children}
    </networkDomainContext.Provider>
  );
}

export default NetworkDomainProvider;
