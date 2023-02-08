import React, {useState, useEffect }from 'react';
import apiService from '../api/apiService';
import { API_KEY } from '../api/config';
import MCard from '../component/MCard';
import { Skeleton, Stack, Chip, Grid, Box } from '@mui/material';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "./styles.css";



function Genres() {
   const [loading, setLoading] = useState();
   const [movies,setMovies] = useState([]);
   const [genresList, setGenresList] = useState([]);
   const [genreId, setGenreId] = useState();



   useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await apiService.get(
                `genre/movie/list?api_key=${API_KEY}&language=en-US`
            );
            const results = response.data.genres
            setGenresList(results);
            setLoading(false);
        } catch (error) {
            console.log(error.message);
        }
    };
    fetchData();
   }, [])

   useEffect(() => {
    const fetchData = async () => {
        let url=`discover/movie?api_key=${API_KEY}&language=en-US&append_to_response=videos`
        try {
            setLoading(true);
            const response = await apiService.get(
                `${url}&with_genres=${genreId}`
            );
            setMovies(response.data.results);
            setLoading(false);
        } catch (error) {
            console.log(error.message);
        }
    };
    fetchData();
   }, [genreId]);

   const placeholder = [0, 1, 2, 3];
   const detailSkeleton = (
       <Stack spacing={1}>
           <Skeleton variant='text'/>
           <Skeleton variant='rectangular' width="100%" height={300}/>
       </Stack>
   );


  return (
     <>
     <Stack>
     <Stack display="flex" direction="row" justifyContent="center"  mt={1}>
     <Swiper 
        scrollbar={{
            hide: true,
          }}
        modules={[Scrollbar]}
        className="mySwiper" 
        slidesPerView={1}
        breakpoints={{
            390: {
                slidesPerView: 3,
                spaceBetween: 2,
            },
            640: {
              slidesPerView: 5,
              spaceBetween: 5,
            },
            768: {
              slidesPerView: 6,
              spaceBetween: 2,
            },
            1024: {
              slidesPerView: 10,
              spaceBetween: 5,
            },
          }}>
      {genresList.map((genre, index) => (
        <Stack spacing={1} >
            <SwiperSlide key={index}>
            <Box ml={1} mb={1} >
           <Chip
              margin={5}
              label={genre.name}
              variant="outlined"
              key={genre.id}
              onClick={() => setGenreId(genre.id)}
              color="primary"
            />
            </Box>
            </SwiperSlide>
        </Stack>
      ))
      }
      </Swiper>
      </Stack>
      <Stack mt={5}>
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
             )) : movies.map((item) => (      
                    <SwiperSlide > 
                          <MCard key={item.id} item={item}/>
                    </SwiperSlide>
             ))
            }
        </Swiper>  
        </Stack>
      </Stack>
     </>
   
    
  )
}

export default Genres;