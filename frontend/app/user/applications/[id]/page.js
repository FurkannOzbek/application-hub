import { Box, Container, Paper, Typography } from "@mui/material";
import Dashboard from "./Dashboard";

export default function Application() {
  return (
    <Box component="main" sx={{ padding: 2 }}>
      <Container>
      <Typography variant="h5">Job title</Typography>
      <Typography variant="h6">Company</Typography>
        <Dashboard />
      </Container>
      
    </Box>
  );
}