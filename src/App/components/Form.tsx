import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Card,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";

interface FormProps {
  onSubmit: (formData: FormData, imageDataUrl: string) => void;
  avatarImageDataUrl: string | null;
  setSelectedRegion: React.Dispatch<React.SetStateAction<string>>;
  setSelectedRole: React.Dispatch<React.SetStateAction<string>>;
}

interface FormData {
  name: string;
  region: string;
  role: string;
}

const Form: React.FC<FormProps> = ({
  onSubmit,
  avatarImageDataUrl,
  setSelectedRegion,
  setSelectedRole,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    region: "",
    role: "",
  });
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log(formData)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("clicked");
    console.log(avatarImageDataUrl);
    if (avatarImageDataUrl) {
      fetch(avatarImageDataUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const dataURL = URL.createObjectURL(blob);
          setImageDataUrl(dataURL);

          // Display the image in the <div> with the id "picture"
          const pictureDiv = document.getElementById("picture");
          if (pictureDiv) {
            // Clear previous content in the pictureDiv
            pictureDiv.innerHTML = "";
            // Create an img element
            const img = document.createElement("img");
            // Set the src attribute to the blob URL
            img.src = dataURL;
            // Append the img element to the pictureDiv
            pictureDiv.appendChild(img);
          }

          onSubmit(formData, dataURL);
        });
    } else {
      console.error("No avatar image URL provided.");
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <form onSubmit={handleSubmit}>
          <Card
            sx={{
              width: "100%",
              maxWidth: "100%",
              height: 500,
              padding: "2em",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: "25ch" }}>
                  <InputLabel id="region-label">Region</InputLabel>
                  <Select
                    labelId="region-label"
                    id="region"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    label="Region"
                  >
                    <MenuItem value="london">London</MenuItem>
                    <MenuItem value="birmingham">Birmingham</MenuItem>
                    <MenuItem value="glasgow">Glasgow</MenuItem>
                    <MenuItem value="manchester">Manchester</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: "25ch" }}>
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    label="Role"
                  >
                    <MenuItem value="volunteer">Volunteer</MenuItem>
                    <MenuItem value="trainee">Trainee</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mr: 1 }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Card>
        </form>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={{ width: "100%", maxWidth: "100%", padding: "2em" }}>
          <div id="picture">
            {/* {imageDataUrl && <img src={imageDataUrl} alt="Avatar" />} */}
          </div>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Form;
