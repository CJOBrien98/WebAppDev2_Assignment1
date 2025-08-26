import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { MoviesContext } from "../../contexts/moviesContext";
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import Stack from "@mui/material/Stack";
import AvatarGroup from "@mui/material/AvatarGroup";

export default function MovieCard({ movie, action }) {
  const { favorites, addToFavorites } = useContext(MoviesContext);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };

  const { watchlist, addToWatchList } = useContext(MoviesContext);

  if (watchlist.find((id) => id === movie.id)) {
    movie.watchlist = true;
  } else {
    movie.watchlist = false
  }

  const handleAddToWatchlist = (e) => {
    e.preventDefault();
    addToWatchList(movie);
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <AvatarGroup max={2}>
            {movie.favorite && (
              <Avatar sx={{ backgroundColor: 'red' }}>
                <FavoriteIcon />
              </Avatar>
            )}
            {movie.watchlist && (
              <Avatar sx={{ backgroundColor: 'green' }}>
                <PlaylistAddCheckCircleIcon />
              </Avatar>
            )}
          </AvatarGroup>
        }
        title={
          <Typography variant="h5" component="p">
            {movie.title}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 500 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid size={{ xs: 6 }}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>

        {action(movie)}

        <Stack direction="column" spacing={1}>
          <Link to={`/movies/${movie.id}`}>
            <Button variant="outlined" size="medium" color="primary">
              More Info ...
            </Button>
          </Link>
          <Link to={`/movies/${movie.id}/recommendations`}>
            <Button variant="outlined" size="medium" color="primary">
              Recommendations...
            </Button>
          </Link>
        </Stack>

      </CardActions>
    </Card>
  );
}