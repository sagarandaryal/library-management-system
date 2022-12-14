import React from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Rightbar from "./components/Rightbar";

import { Box, Stack } from "@mui/material";

function App() {
  return (
    <Box>
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar />
        <Rightbar />
      </Stack>
    </Box>
  );
}

export default App;
