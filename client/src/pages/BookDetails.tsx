import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useGetBookByIdQuery } from "../redux/services/bookApi";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { Container } from "@mui/system";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useGetBookByIdQuery(id!);

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {data && data.title}
        </Typography>

        <Typography color="text.secondary">
          ISBN - {data && data.isbn}
        </Typography>
        <Typography color="text.secondary">
          Publisher {data && data.category}
        </Typography>
        <Typography color="text.secondary">
          Publisher {data && data.publisher}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Publication Year {data && data.publishedDate}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 1.5 }}>
          Publisher {data && data.description}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Authors
        </Typography>
        <Typography color="text.secondary">
          {data &&
            data.authors.map((author: string, index: number) => (
              <li key={index}>{author}</li>
            ))}
          <br />
        </Typography>
        <Typography color="text.secondary" mt={2}>
          {data && data.status}
        </Typography>
      </CardContent>
    </React.Fragment>
  );

  return (
    <Container sx={{ marginBottom: "5rem" }}>
      <Grid container direction="column">
        <Grid item mb={2}>
          <CardActions>
            <Button
              size="small"
              variant="contained"
              onClick={() => navigate("/")}
            >
              Go Back
            </Button>
          </CardActions>
        </Grid>
        <Grid item>
          <Box>
            <Card variant="outlined">{card}</Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookDetails;
