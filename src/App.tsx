import React, { CSSProperties } from "react";
import { Network } from "./react/network/Network";

const style: CSSProperties = {
  backgroundColor: "#282c34",
  minHeight: "100vh",
  fontSize: "calc(10px + 2vmin)",
};

function App() {
  return (
    <div style={{ textAlign: "center" }}>
      <header style={style}>
        <Network />
      </header>
    </div>
  );
}

export default App;
