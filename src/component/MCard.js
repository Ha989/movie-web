import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate, Link} from 'react-router-dom';
import StarRating from './StarRating';

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
    <Card sx={{ maxWidth: 230, height: 385, backgroundColor: "black"}}
        onClick={handleClick}
    >
      <CardActionArea LinkComponent={Link} to={`/movie/${item.id}`}>
        <CardMedia
          component="img"
          height="280"
          image={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
          alt={item.title}
        />
        <CardContent>
        <StarRating item={item}/>
          <Typography mt={2} fontSize="16px" fontWeight="bolder" color="#FA7D09">
             {item.original_title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}