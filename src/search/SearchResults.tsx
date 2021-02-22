import {SEARCH} from "./queries";
import {useQuery} from "@apollo/client";
import React from "react";
import {Repository} from "../repository/Repository";
import {Waypoint} from "react-waypoint";

export interface SearchResultsProps {
    query: string;
}

interface SearchResult {
    search: {
        edges: any[];
        pageInfo: any;
    };
}

export const SearchResults = ({ query }: SearchResultsProps) => {

    const { data, loading, error, fetchMore } = useQuery(SEARCH, { variables: { queryString: query } });

    if (error) return <p>Error...</p>;
    if (loading) return <p>Loading...</p>;

    const { search } = data ?? [];
    const { edges, pageInfo: { endCursor } } = search;

    // Only render the waypoint near the bottom of the list
    const shouldRenderWaypoint = (index: number, edges: any[]) => (index + 1) % (edges.length - 3) === 0;

    // Use Apollo fetchMore to get more repositories using the cursor
    const loadMoreRepositories = () => {
        return fetchMore({
            query: SEARCH,
            variables: {
                queryString: query,
                cursor: endCursor
            },
            // @ts-ignore - Update query overload error `https://github.com/apollographql/react-apollo/issues/2443`
            updateQuery: (previousResult: SearchResult, {fetchMoreResult}: {fetchMoreResult: SearchResult}) => {
                // fetchMoreResult can be undefined from its typing, so we can't return it directly
                if (!fetchMoreResult) return previousResult;
                if (fetchMoreResult?.search?.edges)
                    // Mutation is hopefully okay here, since fetchMoreResult is a new object and not cached yet
                    // Otherwise create a new object and return this instead
                    fetchMoreResult.search.edges = [
                        ...(previousResult.search?.edges || []),
                        ...fetchMoreResult.search?.edges,
                    ];

                return fetchMoreResult;
            }
        })
    };

    return (
        <div>
            {edges &&
                edges.map((item: any, index: number) => {
                    return (
                        <div key={item.node.id}>
                            <Repository
                                stars={item.node.stargazerCount}
                                forks={item.node.forkCount}
                                name={item.node.name}
                                url={item.node.url}
                                owner={item.node.owner.login}
                                description={item.node.description}
                            />
                            {
                                shouldRenderWaypoint(index, edges) &&
                                    <Waypoint onEnter={loadMoreRepositories}/>
                            }
                        </div>
                    )
                })
            }
        </div>
    );
};

