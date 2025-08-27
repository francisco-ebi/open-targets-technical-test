import { useQuery } from "@apollo/client/react";
import { GET_TARGETS } from "@/graphql/queries";
import { useEffect } from "react";
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
    targets: data?.disease?.associatedTargets?.rows ?? [],
  };
};
