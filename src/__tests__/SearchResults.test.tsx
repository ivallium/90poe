import React from 'react';
import { render, screen } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import { client } from '../graphql';
import TestRenderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import {SearchResults} from "../search/SearchResults";
import {SEARCH} from "../search/queries";

// Render the Search Results page with Loading... text
test('renders Loading...', () => {
  render(
      <ApolloProvider client={client}>
        <SearchResults query={"react"}/>
      </ApolloProvider>
  );
  const loading = screen.getByText(/Loading.../i);
  expect(loading).toBeInTheDocument();
});

test('renders Error...', async () => {

  const mock = [{
    request: {
      query: SEARCH,
    },
    error: new Error('An error occurred'),
  }];
  const component = TestRenderer.create(
      <MockedProvider mocks={mock} addTypename={false}>
        <SearchResults query={"react"}/>
      </MockedProvider>,
  );
  await new Promise(resolve => setTimeout(resolve, 0)); // wait for response

  const tree = component.toJSON();
  expect(tree.children).toContain('Error...');
});