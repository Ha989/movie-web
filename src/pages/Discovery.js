import { Divider, Grid, Typography, Skeleton, 
    Stack, Container, Pagination, Box, PaginationItem } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import apiService from '../api/apiService';
import { API_KEY } from '../api/config';
import MCard from '../component/MCard';
import SideBar from '../layouts/Sidebar';
import {Link} from 'react-router-dom';
import { SearchContext } from '../contexts/SearchParam';



function Discovery() {
  const [loading, setLoading] = useState();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [pagesTotal, setPagesTotal] = React.useState(0);
  const [query] = useContext(SearchContext);
  

  
  useEffect(() => {
    const fetchData = async () => {
      
      if (query) {
        setLoading(true);
        const response = await apiService.get(
          `search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`
        )
        setMovies(response.data.results);
        setPagesTotal(response.data.total_pages)
        setLoading(false);
      } else {
        try {  
          setLoading(true);
          const response = await apiService.get(
              `discover/movie?api_key=${API_KEY}&page=${page}&language=en-US`
          );
          setMovies(response.data.results);
          setPagesTotal(response.data.total_pages);
          setLoading(false);
        } catch (error) {
          console.log(error.message)
        }
      }
    };
    fetchData();
  },[page, query]);
  

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
      
        {query? (
          <Typography variant='h5' mb={2} mt={1} ml={{ xs: 1, md: 10}}>
             Search results
            <Divider/>
          </Typography>
        ) : ( 
          <Typography variant='h5' mb={2} mt={1} ml={{ xs: 1, md: 10}}>
             DISCOVERY
          <Divider/>
          </Typography>
        )
        }

      

      <Grid container direction="row" spacing={5} mt={1} ml={{ xs: -5, md: 5}}>
         {loading ? 
            placeholder.map((item, i) => (
                <Grid key={item.id} item xs={6} sm={4} md={3} >
                    {detailSkeleton}
                </Grid>
            ))
            : movies.map((item, i) => (
                <Grid key={item.id} item xs={6} sm={4} md={3}>
                    <MCard item={item}/>
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
                    to={`/discovery/${item.page}`}
                    {...item}
                />
            )}
        />
        </Box>
      </Container>
    </>
  )
}

export default Discovery;