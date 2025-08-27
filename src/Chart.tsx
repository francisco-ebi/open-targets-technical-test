import type { Target } from "@/models";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePolarBar } from "@nivo/polar-bar";
import { useMemo } from "react";
import { animated } from "@react-spring/web";
import { Text } from "@nivo/text";
import type { CircularAxisTickProps } from "@nivo/polar-axes";

type ChartProps = {
  type: "bar" | "polar";
  selectedTarget: Target;
};

const colorMap = {
  literature: "#E69F00",
  rna_expression: "#56B4E9",
  genetic_association: "#009E73",
  somatic_mutation: "#F0E442",
  known_drug: "#0072B2",
  animal_model: "#D55E00",
  affected_pathway: "#CC79A7",
};

const getBarColor = (bar: any) => colorMap[bar.indexValue];

const getRadarColor = (bar: any) => colorMap[bar.index];

const formatAxisLabel = (label: string) => {
  return label
    .split("_")
    .map((subs) => {
      if (subs === "rna") {
        return "RNA";
      }
      return `${subs[0].toUpperCase()}${subs.slice(1)}`;
    })
    .join(" ");
};

const CustomCircularAxisTick = ({
  label,
  theme,
  animated: animatedProps,
}: CircularAxisTickProps) => {
  return (
    <animated.g opacity={animatedProps.opacity}>
      <animated.line
        x1={animatedProps.x1}
        y1={animatedProps.y1}
        x2={animatedProps.x2}
        y2={animatedProps.y2}
        style={theme.ticks.line}
      />
      <Text
        dx={animatedProps.textX}
        dy={animatedProps.textY}
        dominantBaseline="central"
        style={theme.ticks.text}
        textAnchor="middle"
      >
        {formatAxisLabel(label)}
      </Text>
    </animated.g>
  );
};

export const Chart = ({ type, selectedTarget: target }: ChartProps) => {
  const chartData = useMemo(() => {
    return target.datatypeScores.map((score) => ({
      ...score,
      score: score.score.toFixed(5),
    }));
  }, [target]);

  if (type === "bar") {
    return (
      <ResponsiveBar
        data={chartData}
        indexBy="id"
        keys={["score"]}
        colors={getBarColor}
        axisBottom={{
          legend: "Data type",
          legendOffset: 32,
          format: formatAxisLabel,
        }}
        axisLeft={{ legend: "Score", legendOffset: -40 }}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        labelSkipWidth={12}
        labelSkipHeight={12}
      />
    );
  }
  if (type === "polar") {
    return (
      <ResponsivePolarBar
        data={chartData}
        indexBy="id"
        keys={["score"]}
        colors={getRadarColor}
        valueSteps={5}
        margin={{ top: 30, right: 20, bottom: 70, left: 20 }}
        innerRadius={0.25}
        cornerRadius={2}
        borderWidth={1}
        arcLabelsSkipRadius={28}
        enableArcLabels={true}
        circularAxisOuter={{
          tickSize: 5,
          tickPadding: 15,
          tickRotation: 0,
          tickComponent: CustomCircularAxisTick,
        }}
      />
    );
  }
};
