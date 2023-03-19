import * as React from 'react';
import Radio from '@mui/material/Radio';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import avatarboy1 from "../../../assets/images/avatars/boy/avatar_boy1.png"
import avatarboy2 from "../../../assets/images/avatars/boy/avatar_boy2.png"
import avatarboy3 from "../../../assets/images/avatars/boy/avatar_boy3.png"
import avatarboy4 from "../../../assets/images/avatars/boy/avatar_boy4.png"

import Box from '@mui/material/Box';


import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import BoysAvatars from './BoysAvatars';
import GirlsAvatars from './GirlsAvatars';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export default function AvatarTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

  return (
    <div>
        <Box sx={{width: 350, display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", mx: 3 }}>

        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Girl" {...a11yProps(0)} />
          <Tab label="Boy" {...a11yProps(1)} />
        </Tabs>

      <TabPanel value={value} index={0}>
        <GirlsAvatars/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <BoysAvatars/>
      </TabPanel>

        </Box>
    </div>
  );
}