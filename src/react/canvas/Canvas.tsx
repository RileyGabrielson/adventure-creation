import React from "react";
import CanvasDomainProvider, {
  useCanvasDomain,
} from "../../providers/canvas_domain_provider";
import { useAsyncValue } from "../../common/hooks/use_async_value";
import { makeStyles } from "../../common/hooks/make_styles";
import { Button } from "../common/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    position: "relative",
    overflow: "hidden",
    backgroundColor: theme.palette.background.page,
  },
  rightIncrease: {
    width: "30px",
    height: "30px",
    padding: theme.spacing(0.5),
    position: "absolute",
    right: 10,
    top: "50%",
  },
  bottomIncrease: {
    width: "30px",
    height: "30px",
    padding: theme.spacing(0.5),
    position: "absolute",
    bottom: 10,
    left: "50%",
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
  const maxDimensions = useAsyncValue(domain.maxDimensions);

  return (
    <div
      onMouseUp={() => domain.clearLastClicked()}
      onMouseMove={(e) => {
        if (activeComponent) {
          const mousePos = { x: e.pageX, y: e.pageY };
          domain.handleMouseMove(activeComponent.id, mousePos);
        }
      }}
      style={{
        ...styles.root,
        width: `calc(100vw + ${maxDimensions.x}px)`,
        height: `calc(100vh + ${maxDimensions.y}px)`,
      }}
    >
      <Button
        onClick={() => domain.increaseYSize(200)}
        style={styles.bottomIncrease}
      >
        +
      </Button>
      <Button
        onClick={() => domain.increaseXSize(200)}
        style={styles.rightIncrease}
      >
        +
      </Button>
      {children}
    </div>
  );
};
