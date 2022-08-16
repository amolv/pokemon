import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PokemonDetails } from './PokemonDetails';
import { MockedProvider } from '@apollo/client/testing';
import { GET_POKEMONS_DETAILS } from '../../hooks/useGetPokemonDetails';
import userEvent from '@testing-library/user-event';

describe('pokemom details', () => {
  const request = {
    query: GET_POKEMONS_DETAILS,
    variables: {
      id: '123',
    },
  };

  test('loading', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <MemoryRouter initialEntries={['/pokemon/123']} initialIndex={0}>
          <Routes>
            <Route path="/pokemon/:id" element={<PokemonDetails />}></Route>
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    expect(await screen.findByText('Loading details...')).toBeInTheDocument();
  });

  test('render pokemon details', async () => {
    const mocks = [
      {
        request: request,
        result: {
          data: {
            pokemon: {
              id: '1',
              name: 'Mer',
              image: 'http://imagepath',
              number: '01',
              types: ['a', 'b'],
              weight: {
                minimum: '1',
                maximum: '1',
              },
              height: {
                minimum: '1',
                maximum: '1',
              },
              classification: '',
              resistant: [],
              weaknesses: [],
              fleeRate: '',
              maxCP: '',
              maxHP: '',
            },
          },
        },
      },
    ];
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/pokemon/123']} initialIndex={0}>
          <Routes>
            <Route path="/pokemon/:id" element={<PokemonDetails />}></Route>
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );
    expect(await screen.findByText('01:Mer')).toBeInTheDocument();

    await userEvent.keyboard('{esc}');
  });
});
