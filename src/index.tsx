import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {ApolloProvider} from "@apollo/client";
import {client} from "./graphql";
import {SearchPage} from "./search/SearchPage";


ReactDOM.render(
    <ApolloProvider client={client}>
        <SearchPage />
    </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
