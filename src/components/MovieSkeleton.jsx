// src/components/MovieSkeleton.jsx
import React from "react";
import { Grid, Card, CardContent, Skeleton } from "@mui/material";

const MovieSkeleton = ({ count = 8 }) => {
    return Array(count).fill().map((_, index) => (
        <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={`skeleton-${index}`}
            sx={{ display: 'flex', justifyContent: 'center' }}
        >
            <Card sx={{
                width: { xs: '100%', sm: '220px' },
                height: { xs: '300px', sm: '350px' },
                borderRadius: 2
            }}>
                <Skeleton variant="rectangular" height="60%" animation="wave" />
                <CardContent>
                    <Skeleton variant="text" height={30} animation="wave" />
                    <Skeleton variant="text" height={20} width="60%" animation="wave" />
                    <Skeleton variant="rectangular" height={36} animation="wave" sx={{ mt: 1 }} />
                </CardContent>
            </Card>
        </Grid>
    ));
};

export default MovieSkeleton;
