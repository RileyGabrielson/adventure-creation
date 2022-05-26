import React, { createContext, useEffect, useState } from "react";
import { NetworkDomain } from "../domain/network_domain/network_domain";
import makeContextHook from "../common/hooks/make_context_hook";

const networkDomainContext = createContext<NetworkDomain<any, any> | undefined>(
  undefined
);

export const useNetworkDomain = makeContextHook(networkDomainContext);

interface NetworkDomainProviderProps<TNode, TConnection> {
  children: React.ReactNode;
  customDomain?: NetworkDomain<TNode, TConnection>;
}

function NetworkDomainProvider<TNode, TConnection>({
  children,
  customDomain,
}: NetworkDomainProviderProps<TNode, TConnection>) {
  const [domain] = useState(
    () => customDomain ?? new NetworkDomain<TNode, TConnection>()
  );

  useEffect(() => () => domain.dispose(), [domain]);

  return (
    <networkDomainContext.Provider value={domain}>
      {children}
    </networkDomainContext.Provider>
  );
}

export default NetworkDomainProvider;
