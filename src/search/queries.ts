import {gql} from "@apollo/client";

export const SEARCH = gql`
    query listRepositories($queryString: String!, $cursor: String) {
        search(first: 20, query: $queryString, type: REPOSITORY, after: $cursor) {
            repositoryCount
            pageInfo {
                endCursor
                startCursor
                hasNextPage
                hasPreviousPage
            }
            edges {
                node {
                    ... on Repository {
                        id
                        name
                        createdAt 
                        description 
                        isArchived
                        isPrivate
                        forkCount
                        stargazerCount
                        url
                        owner {
                            login
                            id
                            __typename
                            url
                        }
                        licenseInfo {
                            key
                        }
                    }
                }
            }
        }
    }
`;