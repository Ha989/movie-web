import React from "react";
import { Typography } from "@mui/material";
import CopyrightIcon from '@mui/icons-material/Copyright';


function Footer () {
    return (
        <Typography variant="body2"
        color="text.secondary"
        align="center"
        p={1}
        mt={2}>
            {"CopyRight  "}
            <CopyrightIcon fontSize="small"/>
            {"2023"}
        </Typography>
    )
};

export default Footer;