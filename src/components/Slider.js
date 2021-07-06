import React from "react";
import "./Slider.css";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import HelpIcon from "@material-ui/icons/Help";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    textTransform: "none",
    lineHeight: 1,
    letterSpacing: 1,
    fontFamily: "poppins",
    fontWeight: "bold",
  },
}));

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="container-fluid">
    <div className={classes.root}>
      <AppBar position="static" color="default" className="slider-menu">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="black"
          aria-label="scrollable force tabs example"
          className="slider-tabs"
         
        >
          <Tab
            className={classes.tab}
            label="Mobiles"
            icon={<img src="images/1.png" alt="Mobiles" className="slider_img"/>}
            {...a11yProps(0)}
          />
          <Tab
            className={classes.tab}
            label="Fashion"
            icon={<img src="images/2.png" alt="clothes"  className="slider_img"/>}
            {...a11yProps(0)}
          />
          <Tab
            className={classes.tab}
            label="Television"
            icon={<img src="images/3.png" alt="Television" className="slider_img"/>}
            {...a11yProps(1)}
          />
          <Tab
            className={classes.tab}
            label="Home Furniture"
            icon={<img src="images/4.png" alt="Furniture" className="slider_img"/>}
            {...a11yProps(2)}
          />
          <Tab
            className={classes.tab}
            label="Home Appliances"
            icon={<img src="images/5.png" alt="Electric Appliances" className="slider_img"/>}
            {...a11yProps(3)}
          />
          <Tab
            className={classes.tab}
            label="Kids Wear"
            icon={<img src="images/6.png" alt="Kids Wear" className="slider_img"/>}
            {...a11yProps(4)}
          />
          <Tab
            className={classes.tab}
            label="Luggage Bags"
            icon={<img src="images/7.png" alt="Luggage Bags" className="slider_img"/>}
            {...a11yProps(5)}
          />
          <Tab
            className={classes.tab}
            label="Fitness"
            icon={<img src="images/8.png" alt="Fitness" className="slider_img" />}
            {...a11yProps(6)}
          />
          <Tab
            className={classes.tab}
            label="Makeup"
            icon={<img src="images/9.png" alt="Makeup" className="slider_img"/>}
            {...a11yProps(7)}
          />
          <Tab
            className={classes.tab}
            label="Gifts"
            icon={<img src="images/10.png" alt="Gifts" className="slider_img"/>}
            {...a11yProps(8)}
          />
          <Tab
            className={classes.tab}
            label="Grocery"
            icon={<img src="images/11.png" alt="Chocolates & Dry fruits" className="slider_img"/>}
            {...a11yProps(9)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
       
      </TabPanel>
      <TabPanel value={value} index={1}>
        
      </TabPanel>
      <TabPanel value={value} index={2}>
       
      </TabPanel>
      <TabPanel value={value} index={3}>
       
      </TabPanel>
      <TabPanel value={value} index={4}>
        
      </TabPanel>
      <TabPanel value={value} index={5}>
        
      </TabPanel>
      <TabPanel value={value} index={6}>
       
      </TabPanel>
    </div>
    </div>
  );
}
