import StarBorderIcon from '@mui/icons-material/StarBorder';
import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function StarRating({ item }) {
  return (
    <Stack direction="row" spacing={1}>
      <Chip size="small" variant="fill" label={item.vote_average.toFixed(1)} color="info" icon={<StarBorderIcon />} /> 
    </Stack>
  );
}