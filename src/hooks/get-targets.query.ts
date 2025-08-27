import { useQuery } from "@apollo/client/react";
import { GET_TARGETS } from "@/graphql/queries";
import type { Target } from "@/models";

type QueryResponse = {
  disease: {
    associatedTargets: {
      rows: Array<Target>;
    };
  };
};

export const getTargetsQuery = () => {
  const { loading, error, data } = useQuery<QueryResponse>(GET_TARGETS);

  return {
    loading,
    error,
    targets: !!data
      ? data.disease.associatedTargets.rows
          .toSorted((a, b) => b.score - a.score)
          .slice(0, 10)
      : [],
  };
};
