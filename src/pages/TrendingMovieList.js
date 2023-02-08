import { Divider, Grid, Typography, Skeleton, 
    Stack, Container, Pagination, Box, PaginationItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import apiService from '../api/apiService';
import { API_KEY } from '../api/config';
import TrendingCard from '../component/TrendingCard';
import SideBar from '../layouts/Sidebar';
import { Link } from 'react-router-dom';



function TrendingMovieList() {
  const [loading, setLoading] = useState();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [pagesTotal, setPagesTotal] = React.useState(0);
  

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiService.get(
            `trending/movie/day?api_key=${API_KEY}&page=${page}`
        );
        setMovies(response.data.results);
        setPagesTotal(response.data.total_pages)
        setLoading(false);
      } catch (error) {
        console.log(error.message)
      }
    };
    fetchData();
  },[page]);
  

  const placeholder = [0, 1, 2, 3, 4];
   const detailSkeleton = (
        <Stack spacing={1}>
           <Skeleton variant='text'/>
           <Skeleton variant='rectangular' width="100%" height={200}/>
        </Stack>
   );



  return (
    <>
      <Container>
        <SideBar/>
      <Typography variant='h5' mb={2} mt={1} ml={{ xs: 1, md: 10}}>
        TRENDING MOVIES
        <Divider/>
      </Typography>
      

      <Grid container direction="row" spacing={5} mt={1} ml={{ xs: -4, md: 5}}>
         {loading ? 
            placeholder.map((item, i) => (
                <Grid key={item.id} item xs={12} sm={6} md={4} >
                    {detailSkeleton}
                </Grid>
            ))
            : movies.map((item, i) => (
                <Grid key={item.id} item xs={12} sm={6} md={4}>
                    <TrendingCard key={item.id} item={item}/>
                </Grid>
            ))    
         }
      </Grid>
      <Box spacing={2} sx={{ mt: 2, display: 'flex', justifyContent: 'center'}}>
        <Pagination 
            size='large'
            count={pagesTotal}
            sx={{ display: 'flex', justifyContent: "center", margin: "2rem" }}
            color="secondary"
            onChange={(e, value) => 
                setPage(value)
            }
            renderItem={(item) => (
              <PaginationItem 
                  component={Link}
                  to={`/trending/${item.page}`}
                  {...item}
              />
            )}
          />
        </Box>
      </Container>
    </>
  )
}

export default TrendingMovieList;