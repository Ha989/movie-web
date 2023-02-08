import * as React from 'react';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';
import TextTruncate from 'react-text-truncate';

export default function TrendingCard({ item, category }) {
    const navigate = useNavigate();
    const handleClick = () =>  {
        if ( category === 'movie') {
            navigate(`/movie/${item.id}`)
        } else if (category === 'tvshow'){
            navigate(`/tvshow/${item.id}`)
        }
    };

  return (
    <Card sx={{ maxWidth: 345, height: 385,  backgroundColor: "black"}}
        onClick={handleClick}
    >
      <CardActionArea LinkComponent={Link} to={`/movie/${item.id}`}>
        <CardMedia
          component="img"
          minheight="200"
          image={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
          alt={item.title}
        />
        <CardContent >
        <StarRating item={item}/>
          <Typography mt={2} fontSize="18px" fontWeight="bolder" color="orange">
             {item.original_title}
          </Typography>
          <TextTruncate 
            line={3} 
            element="p"
            truncateText="…" 
            text={item.overview}/>
             
        </CardContent>
      </CardActionArea>
    </Card>
  );
}