import { useState } from "react";
import { getTargetsQuery } from "@/hooks/get-targets.query";
import "./App.css";

function App() {
  const { loading, error, targets } = getTargetsQuery();
  console.log({ loading, error, targets });
  return (
    <>
      <h1>
        Overall highest scored drug targets associated with lung carcinoma
      </h1>
      <table className="striped">
        <thead>
          <tr>
            <th>Approved Symbol</th>
            <th>Gene Name</th>
            <th>Overall Association Score</th>
          </tr>
        </thead>
        <tbody>
          {targets.map((targetData) => (
            <tr>
              <td>
                <a
                  target="_blank"
                  rel="noopener"
                  href={`https://platform.opentargets.org/target/${targetData.target.id}`}
                >
                  {targetData.target.approvedSymbol}
                </a>
              </td>
              <td>{targetData.target.approvedName}</td>
              <td>{targetData.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
