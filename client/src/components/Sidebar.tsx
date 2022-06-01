import React, { useState } from "react";
import {
  AccountBox,
  Article,
  Group,
  Home,
  Storefront,
  Person,
  Mail,
  Notifications,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItemButton>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Homepage" />
        </ListItemButton>

        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <Article />
          </ListItemIcon>
          <ListItemText primary="Books" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <FormGroup sx={{ pl: 5 }}>
              <FormControlLabel control={<Checkbox />} label="Fiction" />
              <FormControlLabel control={<Checkbox />} label="Nonfiction" />
              <FormControlLabel control={<Checkbox />} label="Drama" />
              <FormControlLabel control={<Checkbox />} label="Poetry" />
              <FormControlLabel control={<Checkbox />} label="Foktale" />
            </FormGroup>
          </List>
        </Collapse>

        <ListItemButton>
          <ListItemIcon>
            <Notifications />
          </ListItemIcon>
          <ListItemText primary="Collections" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <Mail />
          </ListItemIcon>
          <ListItemText primary="Message" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>

        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <AccountBox />
          </ListItemIcon>
          <ListItemText primary="Admin" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <Storefront />
              </ListItemIcon>
              <ListItemText primary="Books" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
  );
};

export default Sidebar;