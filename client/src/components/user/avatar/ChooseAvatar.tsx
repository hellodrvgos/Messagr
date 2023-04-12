import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AvatarTabs from "./AvatarTabs";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import { SxProps } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

type Avatar = {
  setAvatar: Function;
}

export default function ChooseAvatar({setAvatar}: Avatar) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const sx: SxProps = {
    "& .MuiDialog-container": {
      width: "600px",
      marginLeft: 12,
      mt: 2,
    },
  };

  return (
    <div>
      <Box sx={{ textAlign: "left", mt: 1 }}>
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          size={"small"}
          startIcon={<AccountCircleIcon />}
        >
          Avatar
        </Button>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          sx={sx}
        >
          <DialogContent dividers>
            <AvatarTabs setAvatar={setAvatar}/>
          </DialogContent>
        </BootstrapDialog>
      </Box>
    </div>
  );
}
