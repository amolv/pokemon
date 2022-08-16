import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import { useGetPokemons } from '../../hooks/useGetPokemons';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, pokemonOptions, loading, error } = useGetPokemons();

  const [searchQuery, setSearchQuery] = useState('');
  const [pokemonList, setPokemanList] = useState(pokemons);

  useEffect(() => {
    if (searchQuery) {
      const searchQueryFor = searchQuery.toLowerCase();
      setPokemanList(
        pokemons.filter((item) => {
          return (
            item.name.toLowerCase().includes(searchQueryFor) ||
            item.number.toLowerCase().includes(searchQueryFor) ||
            item.types.toString().toLowerCase().includes(searchQueryFor)
          );
        })
      );
    } else setPokemanList(pokemons);
  }, [searchQuery, pokemons]);

  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    navigate(`${id}`);
  };

  if (loading) return <div className={classes.root}>Loading...</div>;
  if (error) return <div className={classes.root}>Errored...</div>;

  return (
    <div className={classes.root}>
      <div className={classes.searchBox}>
        <input
          data-testid={`search`}
          type="search"
          placeholder="Search"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
      </div>

      <div className={classes.list}>
        {pokemonList.map((pkmn) => (
          <div
            data-testid={`p-${pkmn.id}`}
            className={classes.card}
            key={pkmn.id}
            onClick={() => handleCardClick(pkmn.id)}
          >
            <img src={pkmn.image} alt="" />
            <div>{pkmn.name}</div>
            <div>Number: {pkmn.number}</div>
            <div>Types : {pkmn.types.join(', ')}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
    },
    searchBox: {
      color: '#000',
      margin: '10px',
      textAlign: 'left',
      '& input': { color: '#000', padding: '10px', width: '170px' },
    },
    list: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    card: {
      background: '#fff',
      border: '2px solid #fff',
      borderRadius: '10px',
      cursor: 'pointer',
      margin: '10px',
      padding: '10px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      '&:hover': { borderColor: 'red' },
      '& img': {
        maxWidth: '100px',
        maxHeight: '100px',
      },
      '& div': { color: '#000' },
      width: '170px',
    },
  },
  { name: 'PokemonList' }
);
