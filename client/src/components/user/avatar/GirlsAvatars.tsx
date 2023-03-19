import * as React from 'react';
import Radio from '@mui/material/Radio';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import avatargirl1 from "../../../assets/images/avatars/girl/avatar_girl1.png"
import avatargirl2 from "../../../assets/images/avatars/girl/avatar_girl2.png"
import avatargirl3 from "../../../assets/images/avatars/girl/avatar_girl3.png"
import avatargirl4 from "../../../assets/images/avatars/girl/avatar_girl4.png"

import Box from '@mui/material/Box';


import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function GirlsAvatars() {
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
  <RadioGroup>
  <Box sx={{width: 350, display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 5, mx: 3 }}>
  <Card sx={{ width: 150, boxShadow: "none" }}>
  <CardActionArea sx={{ borderRadius: "50%"}}>
        <CardMedia
          component="img"
          height="150"
          image={avatargirl1}
          alt="green iguana"
          sx={{border: "1", borderColor: "#b6b6b6", borderStyle: "dashed", borderRadius: "50%"}}
          />
        {/* <CardContent>
        <Radio
        onChange={handleChange}
        value="boy1"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'A' }}
      />
        </CardContent> */}
            </CardActionArea>
    </Card>
    <Card sx={{ width: 150, boxShadow: "none" }}>
  <CardActionArea sx={{ borderRadius: "50%"}}>
        <CardMedia
          component="img"
          height="150"
          image={avatargirl2}
          alt="green iguana"
          sx={{border: "1", borderColor: "#b6b6b6", borderStyle: "dashed", borderRadius: "50%"}}
          />
        {/* <CardContent>
        <Radio
        onChange={handleChange}
        value="boy1"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'A' }}
      />
        </CardContent> */}
            </CardActionArea>
    </Card>
    <Card sx={{ width: 150, boxShadow: "none" }}>
  <CardActionArea sx={{ borderRadius: "50%"}}>
        <CardMedia
          component="img"
          height="150"
          image={avatargirl3}
          alt="green iguana"
          sx={{border: 1, borderStyle: "dashed", borderRadius: "50%"}}
          />
        {/* <CardContent>
        <Radio
        onChange={handleChange}
        value="boy1"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'A' }}
      />
        </CardContent> */}
            </CardActionArea>
    </Card>
    <Card sx={{ width: 150, boxShadow: "none" }}>
  <CardActionArea sx={{ borderRadius: "50%"}}>
        <CardMedia
          component="img"
          height="150"
          image={avatargirl4}
          alt="green iguana"
          sx={{border: "1", borderColor: "#b6b6b6", borderStyle: "dashed", borderRadius: "50%"}}
          />
        {/* <CardContent>
        <Radio
        onChange={handleChange}
        value="boy1"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'A' }}
      />
        </CardContent> */}
            </CardActionArea>
    </Card>
    </Box>
  </RadioGroup>
    </div>
  );
}