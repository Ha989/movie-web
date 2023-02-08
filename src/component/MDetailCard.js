import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import RecommendIcon from "@mui/icons-material/Recommend";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Divider from "@mui/material/Divider";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import { Container } from "@mui/system";



function MDetailCard({ movieDetail, loading}) {

  

  const detailSkeleton = (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="circular" width={60} height={60} />
      <Skeleton variant="rectangular" width="100%" height={300} />
    </Stack>
  );
  return (
    <>
    <Container width="80vw">
      {loading ? (
        detailSkeleton
      ) : movieDetail ? (
        <Stack
          width="100%"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="center"
          sx={{ borderRadius: "10px" }}
        >
          <Stack
            my={3}
            minWidth="350px"
            sx={{
              borderRadius: "10px",
            }}
          >
            <Box>
              <img
                alt={`${movieDetail.original_title}`}
                height="500px"
                src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}
                style={{ borderRadius: "10px" }}
              />
            </Box>
          </Stack>

          <Stack
            my={3}
            pl={{ xs: 0, md: 1 }}
            minHeight="100%"
            minWidth="350px"
            justifyContent="space-between"
          >
            <Stack
              justifyContent="space-between"
              alignItems="center"
              flexDirection="row"
            >
              <Typography mb={1} variant="h5" color="orange">
                {`${movieDetail.original_title}`}
              </Typography>
              <Stack flexDirection="column" alignItems="end">
                <IconButton
                  size="medium"
                  children={<StarIcon fontSize="medium" />}
                  sx={{
                    backgroundColor: "blue",
                    marginRight: "50px",
                  }}
                />
                <Typography
                  sx={{
                    marginRight: "34px",
                    marginTop: "10px",
                  }}
                  color="error"
                >
                </Typography>
              </Stack>
            </Stack>
            <Stack my={{ xs: 2, md: 0 }}>
              <Typography variant="body">
                {`${movieDetail.overview}`}
              </Typography>
            </Stack>

            <Stack
              my={{ xs: 2, md: 1 }}
              flexDirection="row"
              flexWrap="wrap"
              alignItems="center"
            >
              <Typography mr={1} variant="caption">
                Genres: 
              </Typography>
              {movieDetail.genres.map((item) => (
                <Box mb={1}>
                <Chip
                  key={`${item.id}`}
                  label={`${item.name}`}
                  size="medium"
                  variant="outlined"
                  color="primary"
                />
                </Box>
              ))}

            </Stack>
            <Stack
              my={{ xs: 2, md: 1 }}
              flexDirection="row"
              alignItems="center"
              flexWrap="wrap"
            >
              <Typography mr={1} variant="caption">
                Companies: 
              </Typography>
              {movieDetail.production_companies
                .filter((item) => item.logo_path !== null)
                .map((item) => (
                <Box mb={1}>
                  <Chip
                    key={`${item.id}`}
                    avatar={
                      <Avatar
                        alt="Natacha"
                        src={`https://image.tmdb.org/t/p/w500/${item.logo_path}`}
                      />
                    }
                    label={`${item.name}`}
                    size="medium"
                    variant="filled"
                    color="secondary"
                    mb={1}
                  />
                </Box>
                ))}
            </Stack>
            <Stack
              my={{ xs: 2, md: 1 }}
              flexDirection="row"
              alignItems="center"
            >
              <Typography mr={1} variant="caption">
                Released:
              </Typography>
            <Box mb={1}>
              <Chip
                label={`${movieDetail.release_date}`}
                size="medium"
                variant="outlined"
                color="primary"
                mb={1}
              />
            </Box>
            </Stack>

            <Stack flexDirection="row" justifyContent="flex-end" mt={1}>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                mr={3}
              >
                <RecommendIcon className="recommend_icon" fontSize="small" />
                <Typography variant="subtitle2" ml={1}>
                  {`${movieDetail.vote_count}`}
                </Typography>
              </Box>
              <Box display="flex" flexDirection="row" justifyContent="center">
                <FavoriteIcon className="favorite_icon" fontSize="small" />
                <Typography variant="subtitle2" ml={1}>
                  {`${movieDetail.vote_average}`}
                </Typography>
              </Box> 
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <Typography variant="h4" m={5}>
          Movie not found!
        </Typography>
      )}
      <Divider />
    </Container>
    </>
  
  );
}

export default MDetailCard;