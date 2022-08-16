import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { PokemonList } from './PokemonList';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { GET_POKEMONS } from '../../hooks/useGetPokemons';

const request = {
  query: GET_POKEMONS,
  variables: {
    first: 151,
  },
};

describe('renders pokemon list', () => {
  test('should show loading state', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <PokemonList />
      </MockedProvider>,
      { wrapper: BrowserRouter }
    );

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
  });

  test('should render list without error', async () => {
    const mocks = [
      {
        request: request,
        result: {
          data: {
            pokemons: [
              {
                id: '1',
                name: 'Mer',
                image: 'http://imagepath',
                number: '01',
                types: ['a', 'b'],
              },
            ],
          },
        },
      },
    ];

    const { debug, rerender } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PokemonList />
      </MockedProvider>,
      { wrapper: BrowserRouter }
    );
    expect(await screen.findByText('Mer')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByTestId('p-1'));
      fireEvent.change(screen.getByTestId('search'), {
        target: { value: 'me' },
      });
    });
  });

  it('should show error state', async () => {
    const mocks = [
      {
        request: request,
        error: new Error('An error'),
      },
    ];
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PokemonList />
      </MockedProvider>,
      { wrapper: BrowserRouter }
    );
    expect(await screen.findByText('Errored...')).toBeInTheDocument();
  });
});
