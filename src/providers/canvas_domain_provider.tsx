import React, { createContext, useEffect, useState } from "react";
import { CanvasDomain } from "../domain/canvas_domain";
import makeContextHook from "../common/hooks/make_context_hook";

const canvasDomainContext = createContext<CanvasDomain | undefined>(undefined);

export const useCanvasDomain = makeContextHook(canvasDomainContext);

const CanvasDomainProvider = ({ children }: { children: React.ReactNode }) => {
  const [domain] = useState(() => new CanvasDomain());

  useEffect(() => () => domain.dispose(), [domain]);

  return (
    <canvasDomainContext.Provider value={domain}>
      {children}
    </canvasDomainContext.Provider>
  );
};

export default CanvasDomainProvider;
