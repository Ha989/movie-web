import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Box, Paper, Divider, alpha, Typography } from '@mui/material';
import  SearchIcon  from '@mui/icons-material/Search';
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import styled from "@emotion/styled";
import InputBase from "@mui/material/InputBase";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));
  
  const style = {
    position: "relative",
    top: "45%",
    left: "50%",
    backgroundColor: "#000000",
    color: "white",
    transform: "translate(-50%, -50%)",
    with: 500,
    height: 550,
    p: 1,
    textDecoration: "none",
  };
  
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));
  
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));
  




function SearchPage({ handleClose }) {
    let [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState("");
    const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
        try {
            const response = await apiService.get(
                `search/movie?api_key=${API_KEY}&language=en-US&query=${query}`
            );
            const result = response.data.results;
            setSearchList(result);
        } catch (error) {
            console.log(error.message);
        }
    };
    fetchData()
  },[query]);



  return (
    <Paper elevation={24} sx={style}>
      <Search
        value={searchParams.get("query") || ""}
        onChange={(event) => {
          let query = event.target.value;
          if (query) {
            setSearchParams({ query });
            setQuery(query);
          } else {
            setSearchParams({});
          }
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 0.5,
        }}
      >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>

        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <Divider variant="middle" color="primary.dark" sx={{ mt: 1 }} />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          p: 1,
          ml: 1,
          flexDirection: "column",
          textDecoration: "none",
          color: "white",
        }}
      >
        {searchList.map((item) => (
          <Box>
          <Typography
            key={item.id}
            component={Link}
            to={`/movie/${item.id}`}
            sx={{ textDecoration: "none", color: "white" }}
            onClick={handleClose}
          >
            {item.title}
          </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

export default SearchPage;