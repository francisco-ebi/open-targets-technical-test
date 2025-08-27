import { useState } from "react";
import { getTargetsQuery } from "@/hooks/get-targets.query";
import type { Target } from "@/models";
import "./App.css";

function App() {
  const { loading, error, targets } = getTargetsQuery();
  const [selectedTarget, setSelectedTarget] = useState<Target | null>(null);
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
            <>
              <tr key={targetData.target.id}>
                <td className="selection-cell">
                  <a
                    target="_blank"
                    rel="noopener"
                    href={`https://platform.opentargets.org/target/${targetData.target.id}`}
                  >
                    {targetData.target.approvedSymbol}
                  </a>
                  <button
                    className="outline open-row-button"
                    onClick={() => setSelectedTarget(targetData)}
                    aria-label={`View data charts for gene ${targetData.target.approvedSymbol}`}
                  >
                    +
                  </button>
                </td>
                <td>{targetData.target.approvedName}</td>
                <td>{targetData.score.toFixed(5)}</td>
              </tr>
              {targetData.target.id === selectedTarget?.target.id && (
                <tr>
                  <td colSpan={3}>
                    <div className="tabs" role="group">
                      <button className="outline">Bar chart</button>
                      <button className="outline">Radar chart</button>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
