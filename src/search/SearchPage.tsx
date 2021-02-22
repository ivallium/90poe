import React, {ChangeEvent, useState} from "react";
import {SearchResults} from "./SearchResults";
import styled from "styled-components";
import {GoMarkGithub} from "react-icons/all";
import "./styles.css";

const SearchPageContainer = styled.div`
    margin-left: 20%;
    margin-right: 20%;
    text-align: center;
`;

const iconStyles = { color: "white" };

export const SearchPage = () => {
    const [query, setQuery] = useState<string>("React");

    return (
        <SearchPageContainer>
            <h1>
                <GoMarkGithub style={iconStyles}/> GitHub Repository Searcher
            </h1>
            <input
                value={query}
                placeholder={"Enter your search here..."}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
            />
            <SearchResults
                query={query}
            />
        </SearchPageContainer>
    )
};