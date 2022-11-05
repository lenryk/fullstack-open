import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const fetchRepositories = async () => {
    setLoading(true);

    const { data, error } = await useQuery(GET_REPOSITORIES, {
      fetchPolicy: "cache-and-network",
    });

    // // Replace the IP address part with your own IP address!
    // const response = await fetch("http://192.168.100.16:5000/api/repositories");
    // const json = await response.json();

    setLoading(false);
    setRepositories(data);

    if (error?.message) {
      throw new Error(`GraphQL error ${error.message}`);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
