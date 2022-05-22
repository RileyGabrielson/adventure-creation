import React from "react";
import CanvasDomainProvider, {
  useCanvasDomain,
} from "../../providers/canvas_domain_provider";
import { useAsyncValue } from "../../common/hooks/use_async_value";
import { makeStyles } from "../../common/hooks/make_styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    position: "relative",
    overflow: "hidden",
  },
}));

interface CanvasProps {
  children: React.ReactNode;
}

export const Canvas = (props: CanvasProps) => {
  return (
    <CanvasDomainProvider>
      <CanvasContent {...props} />
    </CanvasDomainProvider>
  );
};

const CanvasContent = ({ children }: CanvasProps) => {
  const styles = useStyles();
  const domain = useCanvasDomain();
  const activeComponent = useAsyncValue(domain.draggableComponents).find(
    (v) => v.isActive
  );

  return (
    <div
      onMouseUp={() => domain.clearLastClicked()}
      onMouseMove={(e) => {
        if (activeComponent) {
          const mousePos = { x: e.pageX, y: e.pageY };
          domain.handleMouseMove(activeComponent.id, mousePos);
        }
      }}
      style={styles.root}
    >
      {children}
    </div>
  );
};
