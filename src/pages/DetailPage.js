import { Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../api/apiService';
import { API_KEY } from '../api/config';
import MDetailCard from '../component/MDetailCard';





function DetailPage() {
   let { movieId } = useParams();
   const [loading, setLoading] = useState();
   const [movieDetail, setMovieDetail] = useState(null);
   
   useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const res = await apiService.get(
            `movie/${movieId}?api_key=${API_KEY}&language=en-US`
          );
          console.log(res.data);
          setMovieDetail(res.data);
          setLoading(false);
        } catch (error) {
          console.log(error.message);         
        }
      };
      fetchData();
   }, [movieId]);

  return (
    <>
      <Typography variant='h5' mb={2} mt={5} ml={{xs:3, md: 30}}>
        Movie Information
      </Typography>
      <Divider/>
      <MDetailCard movieDetail={movieDetail} loading={loading}/>
    </>
  );
}

export default DetailPage;