import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export type PokemonDetails = {
  id: string;
  name: string;
  image: string;
  number: string;
  weight: { minimum: string; maximum: string };
  height: { minimum: string; maximum: string };
  classification: string;
  types: string[];
  resistant: string[];
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
};

export type PokemonOption = {
  value: PokemonDetails['id'];
  label: PokemonDetails['name'];
};

export const GET_POKEMONS_DETAILS = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const useGetPokemonDetails = (id: string) => {
  const { data, ...queryRes } = useQuery(GET_POKEMONS_DETAILS, {
    variables: {
      id,
    },
  });

  const pokemon: PokemonDetails = useMemo(() => data?.pokemon || {}, [data]);

  // const pokemonOptions: PokemonOption[] = useMemo(
  //   () => pokemons.map((p: Pokemon) => ({ value: p.id, label: p.name })),
  //   [pokemons]
  // );

  return {
    pokemon,
    //pokemonOptions,
    ...queryRes,
  };
};
