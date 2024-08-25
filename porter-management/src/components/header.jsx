import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Badge
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8080/users";

const drawerWidth = 240;
const navItems = ['Products', 'Storage'];

function Header(props) {
  const { window } = props;
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(3); // Example cart count, should be dynamic in a real app
  const authbtn = sessionStorage.getItem('token') ? 'Logout' : 'Login';

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Earthen Shopping App
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem key='auth_btn_list' disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }} onClick={() => routes(authbtn)}>
            <ListItemText primary={authbtn} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const Logout = () => {
    fetch(`${API}/logout`)
    .then(() => {
      navigate('/');
      sessionStorage.setItem('token', '');
    })
    .catch();
  }

  const routes = (item) => {
    switch(item) {
      case 'Products':
        navigate('/user-dashboard');
      break;
      case 'Storage':
        navigate('/storage');
      break;
      case 'Logout': 
        Logout();
      break;
      default:
        navigate('/');
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" position='fixed' sx={{ top: 0, left: 0, width: '100%' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Earthen Shopping App
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff', ml: 2 }} onClick={() => routes(item)}>
                {item}
              </Button>
            ))}
            <Button key='auth_btn' sx={{ color: '#fff', ml: 2 }} onClick={() => routes(authbtn)}>
              {authbtn}
            </Button>
            <IconButton
              color="inherit"
              aria-label="add to cart"
              edge="end"
              sx={{ ml: 2 }}
              onClick={() => navigate('/cart')} // Update the navigation path as needed
            >
              <Badge badgeContent={cartItemCount} color="error" sx={{ top: 8, right: -3 }}>
                <AddShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      {/* Add padding to the top of the page content to avoid overlap with the header */}
      <Box sx={{ mt: 8 }} />
    </Box>
  );
}

Header.propTypes = {
  window: PropTypes.func,
};

export default Header;
