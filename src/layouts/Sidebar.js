import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from "@mui/material/MenuItem";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExploreIcon from '@mui/icons-material/Explore';
import LoginIcon from '@mui/icons-material/Login';
import { useAuth } from '../contexts/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';
import WidgetsIcon from '@mui/icons-material/Widgets';
import SearchBar from '../component/SearchBar';
import { Link } from 'react-router-dom';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';


const drawerWidth = 200;

function SideBar(props) {
  const auth = useAuth();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogOut = () => {
    auth.signOut();
  }

  const drawer = (
    <div>
      <Box height="50px" textAlign="center" marginTop="10px">
        <img width="40px" height="40px" src='../logo.png' alt='logo'/>
      </Box>
     
      <List>
          <MenuItem component={Link} to="/">
              <IconButton
                  size="large"
                  color="inherit"
                  disableRipple={true}
                  children={<HomeIcon />}
              />
                Home
            </MenuItem>
          <MenuItem component={Link} to="/discovery/1">
              <IconButton
                  size="large"
                  color="inherit"
                  disableRipple={true}
                  children={<ExploreIcon />}
              />
                Discovery
            </MenuItem>       
            <MenuItem component={Link} to="/trending/1">
              <IconButton
                  size="large"
                  color="inherit"
                  disableRipple={true}
                  children={<WhatshotIcon />}
              />
                Trending
            </MenuItem>       
      </List>
    
      <List>
        {auth.user? (
          <>
            <MenuItem>
            <IconButton
                size="large"
                color="inherit"
                disableRipple={true}
                children={<PersonPinIcon />}
            />
            <Typography> {auth?.user.username}</Typography>
            </MenuItem>
            </>
          ) : (
            <>
            <MenuItem>
            <IconButton
                size="large"
                color="inherit"
                disableRipple={true}
                children={<AccountCircleIcon />}
            />
              Profile
            </MenuItem>
          </>
          )
      }   
            <MenuItem component={Link} to="/favorite">
            <IconButton
                size="large"
                color="inherit"
                disableRipple={true}
                children={<FavoriteIcon />}
            />
             Favorite
            </MenuItem>
          {auth.user ? (
             <MenuItem
               onClick={() => handleLogOut()}
             >
             <IconButton
                 size="large"
                 color="inherit"
                 disableRipple={true}
                 children={<LogoutIcon/>}
             />
               Logout
         </MenuItem>
          ) : (
            <MenuItem component={Link} to="/login">
            <IconButton
                size="large"
                color="inherit"
                disableRipple={true}
                children={<LoginIcon/>}
            />
              Login
        </MenuItem>
          )
        }
         
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: 'none' } }}
          >
            <WidgetsIcon />
            
          </IconButton>
          <SearchBar/>

        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >

        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'block', md: 'block', lg: 'none'},
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'none', md: 'none',lg: 'block'},
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { lg: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}

SideBar.propTypes = {
  window: PropTypes.func,
};

export default SideBar;
