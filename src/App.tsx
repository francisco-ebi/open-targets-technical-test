import { useState } from "react";
import { getTargetsQuery } from "@/hooks/get-targets.query";
import type { Target } from "@/models";
import cx from "classnames";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Chart } from "./Chart";
import "./App.css";

function App() {
  const { loading, targets } = getTargetsQuery();
  const [selectedTarget, setSelectedTarget] = useState<Target | null>(null);
  const [selectedChart, setSelectedChart] = useState<"bar" | "polar">("bar");

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
          {loading &&
            targets.length === 0 &&
            [...Array(10)].map(() => (
              <tr>
                <td>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
              </tr>
            ))}
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
                    title={`View data charts for gene ${targetData.target.approvedSymbol}`}
                  >
                    +
                  </button>
                </td>
                <td>{targetData.target.approvedName}</td>
                <td>{targetData.score.toFixed(5)}</td>
              </tr>
              {targetData.target.id === selectedTarget?.target.id && (
                <tr>
                  <td colSpan={3} style={{ textAlign: "center" }}>
                    <div className="tabs" role="group">
                      <button
                        className={cx({ outline: selectedChart !== "bar" })}
                        onClick={() => setSelectedChart("bar")}
                      >
                        Bar chart
                      </button>
                      <button
                        className={cx({ outline: selectedChart !== "polar" })}
                        onClick={() => setSelectedChart("polar")}
                      >
                        Polar chart
                      </button>
                    </div>
                    <h4>
                      Data Type Scores: {selectedTarget.target.approvedSymbol}{" "}
                      and lung carcinoma
                    </h4>
                    <div className="chart-container">
                      <Chart
                        type={selectedChart}
                        selectedTarget={selectedTarget}
                      />
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
