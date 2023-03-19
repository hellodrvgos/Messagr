import Box from "@mui/material/Box";

import UpdateProfileForm from "../components/user/update/updateForm/UpdateProfileForm";

export default function Update() {
  return (
    <div className="update-page">
      <Box sx={{ height: "100%" }}>
        <div className="update-form-wrapper">
          <UpdateProfileForm />
        </div>
      </Box>
    </div>
  );
}
