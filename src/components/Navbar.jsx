import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link, useNavigate } from "react-router-dom";

const options = ["Map", "Tables"];

const Navbar = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate("/");
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    console.log(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="navbar-container">
      <div className="page-location">
        <h2>{options[selectedIndex]}</h2>
      </div>
      <div className="nav">
        <List
          component="nav"
          aria-label="Device settings"
          sx={{ bgcolor: "background.paper" }}
        >
          <ListItem
            button
            id="lock-button"
            aria-haspopup="listbox"
            aria-controls="lock-menu"
            aria-label="when device is locked"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClickListItem}
          >
            <ListItemText primary="Menu" />
          </ListItem>
        </List>
        <Menu
          sx={{ border: 1 }}
          id="lock-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "lock-button",
            role: "listbox",
          }}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              <Link to={option === "Map" ? "/" : "/tables"}>{option}</Link>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
