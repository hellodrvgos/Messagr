import * as React from 'react';
import Radio from '@mui/material/Radio';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import avatarboy1 from "../../../assets/images/avatars/boy/avatar_boy1.png"

export default function Avatars() {
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>

<Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={avatarboy1}
          alt="green iguana"
          />
        <CardContent>
        <Radio
        checked={selectedValue === 'a'}
        onChange={handleChange}
        value="a"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'A' }}
      />
        </CardContent>
    </Card>

      <Radio
        checked={selectedValue === 'b'}
        onChange={handleChange}
        value="b"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'B' }}
      />
    </div>
  );
}