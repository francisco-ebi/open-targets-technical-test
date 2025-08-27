import type { Target } from "@/models";
import { ResponsiveBar } from "@nivo/bar";
import { useMemo } from "react";

type ChartProps = {
  type: "bar" | "radar";
  selectedTarget: Target;
};

export const Chart = ({ type, selectedTarget: target }: ChartProps) => {
  const chartData = useMemo(() => {
    if (type === "bar") {
      return target.datatypeScores;
    }
  }, [type, target]);

  console.log({ chartData });
  if (type === "bar") {
    return (
      <ResponsiveBar
        data={chartData}
        indexBy="id"
        keys={["score"]}
        defaultHeight={500}
        axisBottom={{ legend: "Data type", legendOffset: 32 }}
        axisLeft={{ legend: "Score", legendOffset: -40 }}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      />
    );
  }
};
