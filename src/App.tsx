import React from "react";
import { makeStyles } from "./common/hooks/make_styles";
import { useAsyncValue } from "./common/hooks/use_async_value";
import AdventureDomainProvider, {
  useAdventureDomain,
} from "./providers/adventure_domain_provider";
import { AdventureEditor } from "./react/adventure_editor/AdventureEditor";
import { AdventureViewer } from "./react/adventure_viewer/AdventureViewer";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.page,
    minHeight: "100vh",
    minWidth: "100vw",
    fontSize: "calc(10px + 2vmin)",
  },
}));

function App() {
  const styles = useStyles();
  return (
    <div style={{ textAlign: "center" }}>
      <AdventureDomainProvider>
        <header style={styles.root}>
          <AppContents />
        </header>
      </AdventureDomainProvider>
    </div>
  );
}

const AppContents = () => {
  const domain = useAdventureDomain();
  const status = useAsyncValue(domain.activity);

  return status === "Editing" ? <AdventureEditor /> : <AdventureViewer />;
};

export default App;
