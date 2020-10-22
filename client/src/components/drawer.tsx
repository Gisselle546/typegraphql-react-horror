import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer
 } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display:"flex",
      position:"fixed",
      top:0,
      left:0,
      zIndex:40000
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color:"#fff",
    
      padding:"20px",
      
      

    },
    drawer:{
      width:300
    },
    nav:{
      display:"flex",
      flexDirection:"column",
      marginTop:"3rem"
    

    },
    links:{
      textDecoration:"none",
      padding:"40px",
      color:"#935785",
      fontSize:"1.2rem",
      
      
      
    }
    
    
    
  }),
);




const Drawers: React.FC = () => {
    const classes = useStyles();
  
    const [isOpen, setIsOpen] = useState(false);
    const toggleDrawer = (open: boolean) => (
      event: React.KeyboardEvent | React.MouseEvent,
    ) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
  
      setIsOpen(open);
    };
  console.log(isOpen);
  
    return (
        <>
      <div className={classes.root}>
        <AppBar position="sticky" style={{ background: 'transparent', boxShadow: 'none'}}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon fontSize="large"/>
            </IconButton>
           
          </Toolbar>
        </AppBar>
      </div>
      
        <Drawer open={isOpen} classes={{
                paper: classes.drawer,
              }}onClose={toggleDrawer(false) }>
            <nav className={classes.nav}>
            <Link className={classes.links}to="/">Home</Link>
            <Link className={classes.links}to="/tours">Tours</Link>
            <Link className={classes.links}to="/cart">Cart</Link>
            </nav>
        </Drawer>
      
      </>
    );
  }
  
  export default Drawers;
  