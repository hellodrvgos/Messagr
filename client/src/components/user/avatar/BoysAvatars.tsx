import * as React from "react";
import {
  CardActionArea,
  Card,
  CardMedia,
  Box,
  RadioGroup,
} from "@mui/material";

import avatarboy1 from "../../../assets/images/avatars/boy/avatar_boy1.png";
import avatarboy2 from "../../../assets/images/avatars/boy/avatar_boy2.png";
import avatarboy3 from "../../../assets/images/avatars/boy/avatar_boy3.png";
import avatarboy4 from "../../../assets/images/avatars/boy/avatar_boy4.png";

export default function BoysAvatars() {
  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };
  return (
    <div>
      <RadioGroup>
        <Box
          sx={{
            width: 350,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 5,
            mx: 3,
          }}
        >
          <Card sx={{ width: 150, boxShadow: "none" }}>
            <CardActionArea sx={{ borderRadius: "50%" }}>
              <CardMedia
                component="img"
                height="150"
                image={avatarboy1}
                alt="green iguana"
                sx={{
                  border: "1",
                  borderColor: "#b6b6b6",
                  borderStyle: "dashed",
                  borderRadius: "50%",
                }}
              />
            </CardActionArea>
          </Card>
          <Card sx={{ width: 150, boxShadow: "none" }}>
            <CardActionArea sx={{ borderRadius: "50%" }}>
              <CardMedia
                component="img"
                height="150"
                image={avatarboy2}
                alt="green iguana"
                sx={{
                  border: "1",
                  borderColor: "#b6b6b6",
                  borderStyle: "dashed",
                  borderRadius: "50%",
                }}
              />
            </CardActionArea>
          </Card>
          <Card sx={{ width: 150, boxShadow: "none" }}>
            <CardActionArea sx={{ borderRadius: "50%" }}>
              <CardMedia
                component="img"
                height="150"
                image={avatarboy3}
                alt="green iguana"
                sx={{ border: 1, borderStyle: "dashed", borderRadius: "50%" }}
              />
            </CardActionArea>
          </Card>
          <Card sx={{ width: 150, boxShadow: "none" }}>
            <CardActionArea sx={{ borderRadius: "50%" }}>
              <CardMedia
                component="img"
                height="150"
                image={avatarboy4}
                alt="green iguana"
                sx={{
                  border: "1",
                  borderColor: "#b6b6b6",
                  borderStyle: "dashed",
                  borderRadius: "50%",
                }}
              />
            </CardActionArea>
          </Card>
        </Box>
      </RadioGroup>
    </div>
  );
}
