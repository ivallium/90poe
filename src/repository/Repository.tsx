import React from "react";
import {GoRepoForked, GoStar} from "react-icons/all";
import styled from "styled-components";

export interface RepositoryProps {
    stars: number;
    forks: number;
    name: string;
    url: string;
    owner: string;
    description: string;
}

const RepositoryContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgb(60,60,60);
    border-radius: 5px;
    margin: 5px;
`;
const InfoContainer = styled.div`
    display: grid;
    text-align: left;
    padding: 10px;
    colour: white;
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    padding-left: 5px;
    padding-right: 5px;
`;


export const Repository = (props: RepositoryProps) => {
    const { stars, forks, name, url, owner, description } = props;
    return (
      <RepositoryContainer>
          <InfoContainer>
              <a style={{color: "white"}} target={"_blank"} href={url}>{owner}/{name}</a>
              <p>{description}</p>
          </InfoContainer>

          <InfoContainer>
              <Container>
                  <GoStar/>
                  <p>{stars}</p>
              </Container>
              <Container>
                  <GoRepoForked/>
                  <p>{forks}</p>
              </Container>
          </InfoContainer>

      </RepositoryContainer>
    );
};