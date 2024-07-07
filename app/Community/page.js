"use client"

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import Post from "@/components/community/Post";



const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [expandedFirstSet, setExpandedFirstSet] = React.useState(Array(3).fill(false));
  const [expandedSecondSet, setExpandedSecondSet] = React.useState(Array(3).fill(false));

  const handleExpandClickFirstSet = (index) => {
    const newExpanded = [...expandedFirstSet];
    newExpanded[index] = !newExpanded[index];
    setExpandedFirstSet(newExpanded);
  };

  const handleExpandClickSecondSet = (index) => {
    const newExpanded = [...expandedSecondSet];
    newExpanded[index] = !newExpanded[index];
    setExpandedSecondSet(newExpanded);
  };

  

  return (
    <>

    <div>
      <Post/>
    </div>

    {/* <div className='flex gap-14 mt-4 ml-48'>

    {[0, 1, 2].map((index) => (
          <div key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
              />
              <CardMedia
                component="img"
                height="194"
                image="https://cdn.dnaindia.com/sites/default/files/styles/full/public/2017/01/10/536948-gift-city-pti-010917.jpg"
                alt="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <ExpandMore
                  expand={expandedFirstSet[index]}
                  onClick={() => handleExpandClickFirstSet(index)}
                  aria-expanded={setExpandedFirstSet[index]}
                  aria-label="show more"
                >
                  <CommentIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expandedFirstSet[index]} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Method:</Typography>
                  <Typography paragraph>
                    hello
                  </Typography>
                  <Typography paragraph>
                    hello
                  </Typography>
                  <Typography paragraph>
                    hello
                  </Typography>
                  <Typography>
                    hello
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </div>
        ))}


    </div>



      <div className='flex gap-14 mt-4 ml-48'>
      {[0, 1, 2].map((index) => (
          <div key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
              />
              <CardMedia
                component="img"
                height="194"
                image="https://cdn.dnaindia.com/sites/default/files/styles/full/public/2017/01/10/536948-gift-city-pti-010917.jpg"
                alt="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <ExpandMore
                  expand={expandedSecondSet[index]}
                  onClick={() => handleExpandClickSecondSet(index)}
                  aria-expanded={setExpandedSecondSet[index]}
                  aria-label="show more"
                >
                  <CommentIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expandedSecondSet[index]} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Method:</Typography>
                  <Typography paragraph>
                    hello
                  </Typography>
                  <Typography paragraph>
                    hello
                  </Typography>
                  <Typography paragraph>
                    hello
                  </Typography>
                  <Typography>
                    hello
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </div>
        ))}
        
         </div>
         
         */}


     
    </>
  );
  
}
