import {gql} from "@apollo/client";

export const SEARCH = gql`
    query listRepositories($queryString: String!, $cursor: String) {
        search(first: 20, query: $queryString, type: REPOSITORY, after: $cursor) {
            repositoryCount
            pageInfo {
                endCursor
                hasNextPage
            }
            edges {
                node {
                    ... on Repository {
                        id
                        name
                        createdAt 
                        description 
                        forkCount
                        stargazerCount
                        url
                        owner {
                            login
                            id
                            url
                        }
                    }
                }
            }
        }
    }
`;