import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate, useParams } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useGetPokemonDetails } from '../../hooks/useGetPokemonDetails';
import { maxWidth } from '@mui/system';
import { CONSTANTS } from '../../constants';

export const PokemonDetails = () => {
  const classes = useStyles();
  let { id } = useParams();
  if (!id) return <>Id not provided.</>;

  let navigate = useNavigate();
  const { pokemon, loading, error } = useGetPokemonDetails(id);

  const handleDialogClose = () => {
    navigate(CONSTANTS.POKEMONLIST);
  };

  return (
    <div id="dialogWrap">
      <Dialog
        onClose={handleDialogClose}
        open={true}
        fullWidth={true}
        className={classes.root}
        container={() => document.getElementById('dialogWrap')}
      >
        {pokemon.name && (
          <DialogTitle>
            {pokemon.number}:{pokemon.name}
          </DialogTitle>
        )}
        {loading && <div className={classes.root}>Loading details...</div>}
        {error && <div className={classes.root}>Errored...</div>}
        {pokemon.name && (
          <div className={classes.details}>
            <img src={pokemon.image} alt="" />
            <div className={classes.grid}>
              {pokemon.types && (
                <>
                  <div>Types</div>
                  <div>{pokemon.types.join(', ')}</div>
                </>
              )}
              <div>Classification</div>
              <div>{pokemon.classification}</div>
              <div>Weight</div>
              <div>
                {pokemon.weight.minimum}-{pokemon.weight.maximum}
              </div>
              <div>Height</div>
              <div>
                {pokemon.height.minimum}-{pokemon.height.maximum}
              </div>
              <div>Resistant</div>
              <div>{pokemon.resistant.join(', ')}</div>
              <div>Weaknesses</div>
              <div>{pokemon.weaknesses.join(', ')}</div>
              <div>FleeRate</div>
              <div>{pokemon.fleeRate}</div>
              <div>MaxCP</div>
              <div>{pokemon.maxCP}</div>
              <div>MaxHP</div>
              <div>{pokemon.maxHP}</div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      padding: '32px',
      boxSizing: 'border-box',
      color: '#000',
      '& .MuiDialogTitle-root': { color: '#000' },
    },
    details: {
      padding: '0 20px 20px 20px',
      textAlign: 'center',
      '& div': { color: '#000' },
      '& img ': { maxWidth: '100%' },
    },
    grid: {
      border: '1px solid',
      display: 'grid',
      gridTemplateColumns: 'auto auto',
      '& div': { border: '1px solid', padding: '5px 0' },
    },
  },
  { name: 'PokemonDetails' }
);
