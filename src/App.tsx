import { useState } from "react";
import { getTargetsQuery } from "@/hooks/get-targets.query";
import "./App.css";

function App() {
  const { loading, error, targets } = getTargetsQuery();
  console.log({ loading, error, targets });
  return (
    <>
      <h1>Overall highest drug targets associated with lung carcinoma</h1>
    </>
  );
}

export default App;
