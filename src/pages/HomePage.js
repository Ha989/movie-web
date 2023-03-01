import React, { useState, useEffect } from 'react';
import { Container, Stack, Skeleton, Grid, Typography, Box, Button } from "@mui/material";
import { Link } from 'react-router-dom';
import SideBar from '../layouts/Sidebar';
import apiService from '../api/apiService';
import TrendingCard from '../component/TrendingCard';
import Genres from './Genres';
import { API_KEY } from '../api/config';
import MCard from '../component/MCard';
import Footer from '../layouts/Footer';
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./styles.css";


function HomePage() {

  const [loading, setLoading] = useState();
  const [movieList, setMovieList] = useState({
    topRated: [],
    popular: [],
    upcoming: [],
  })

  useEffect(() => {
    const fetchData = async () => {
          try {
          setLoading(true);
          const resTopRated = await apiService.get(
            `movie/top_rated?api_key=${API_KEY}&page=1`
          )
          const resPopular = await apiService.get(
            `movie/popular?api_key=${API_KEY}&page=2`
          );
          const resUpcoming = await apiService.get(
            `movie/upcoming?api_key=${API_KEY}&page=2`
          );
          const topRated = resTopRated.data.results;
          const popular = resPopular.data.results;
          const upcoming = resUpcoming.data.results;
    
          setMovieList({ topRated, popular, upcoming });
          setLoading(false);
        } catch (error)  {
          console.log(error.message);
        }
      };
      fetchData();
  }, [])
  
  const placeholder = [0, 1, 2, 3];
  const detailSkeleton = (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="circular" width={60} height={60} />
      <Skeleton variant="rectangular" width="100%" height={300} />
    </Stack>
  );

  return (
    <>  
    <Container>
    <SideBar />
      <Stack ml={{xs: 0, sm: 3, lg: 10}}>
        <Genres />
      </Stack>

     
      <Stack mt={5} ml={{xs: 0, sm: 3, lg: 10}}>
        <Box display="flex" justifyContent="space-between" mt={2} mb={3}>
          <Typography variant='h5' fontWeight="bolder">
              TOP RATED
          </Typography>
          <Button component={Link} to="/top_rated/1">
            See More
          </Button>
        </Box>
        <Swiper 
        navigation={true} 
        modules={[Navigation]} 
        className="mySwiper" 
        slidesPerView={1}
        breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 5,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 5,
            },
          }}>
        {loading ? placeholder.map((item) => (
                <Grid item xs={6} md={4} lg={3}>
                    {detailSkeleton}
                </Grid>
             )) : movieList.topRated.map((item) => (      
                    <SwiperSlide> 
                          <MCard key={item.id} item={item}/>
                    </SwiperSlide>
             ))
            }
       </Swiper>
      </Stack>

      <Stack mt={5} ml={{xs: 0, sm: 3, lg: 10}}>
        <Box display="flex" justifyContent="space-between" mt={2} mb={3}>
          <Typography variant='h5' fontWeight="bolder">
              POPULAR
          </Typography>
          <Button component={Link} to="/popular/1">
            See More
          </Button>
        </Box>
      <Swiper 
        navigation={true} 
        modules={[Navigation]} 
        className="mySwiper" 
        slidesPerView={1}
        breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 5,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 5,
            },
          }}>
             {loading ? placeholder.map((item) => (
                <Grid item xs={6} md={4} lg={3}>
                    {detailSkeleton}
                </Grid>
             )) : movieList.popular.map((item) => (      
                    <SwiperSlide > 
                          <MCard key={item.id} item={item}/>
                    </SwiperSlide>
             ))
            }
        </Swiper>  
      </Stack>

      <Stack mt={5} ml={{xs: 0, sm: 3, lg: 10}}>
        <Box display="flex" justifyContent="space-between" mt={2} mb={3}>
          <Typography variant='h5' fontWeight="bolder">
              UPCOMING
          </Typography>
          <Button component={Link} to="/upcoming/1">
            See More
          </Button>
        </Box>
      <Swiper 
        navigation={true} 
        modules={[Navigation]} 
        className="mySwiper" 
        slidesPerView={1}
        breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 2,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 5,
            },
          }}>
             {loading ? placeholder.map((item) => (
                <Grid item xs={6} md={4} lg={3}>
                    {detailSkeleton}
                </Grid>
             )) : movieList.upcoming.map((item) => (      
                    <SwiperSlide > 
                        <TrendingCard key={item.id} item={item}/>
                    </SwiperSlide>
             ))
            }
        </Swiper>  
      </Stack>
    </Container>
    <Footer />
    </>
  )
}

export default HomePage;