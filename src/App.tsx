import React from "react";
import { makeStyles } from "./common/hooks/make_styles";
import { AdventureEditor } from "./react/adventure/AdventureEditor";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#282c34",
    minHeight: "100vh",
    fontSize: "calc(10px + 2vmin)",
  },
}));

function App() {
  const styles = useStyles();
  return (
    <div style={{ textAlign: "center" }}>
      <header style={styles.root}>
        <AdventureEditor />
      </header>
    </div>
  );
}

export default App;
