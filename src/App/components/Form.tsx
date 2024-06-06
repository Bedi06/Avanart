import React, { useState, useEffect } from "react";
import {
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

  const pictureByClickingArrow = () => {
    if (avatarImageDataUrl) {
      fetch(avatarImageDataUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const dataURL = URL.createObjectURL(blob);
          setImageDataUrl(dataURL);
          const pictureDiv = document.getElementById("picture");
          if (pictureDiv) {
            pictureDiv.innerHTML = "";
            const img = document.createElement("img");
            img.src = dataURL;
            img.style.position = "relative";
            pictureDiv.appendChild(img);
          }
          onSubmit(formData, dataURL);
        });
    } else {
      console.error("No avatar image URL provided.");
    }
  };

  useEffect(() => {
    pictureByClickingArrow();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (avatarImageDataUrl) {
      fetch(avatarImageDataUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const dataURL = URL.createObjectURL(blob);
          setImageDataUrl(dataURL);

          const pictureDiv = document.getElementById("picture");
          if (pictureDiv) {
            pictureDiv.innerHTML = "";

            // Role
            const roleP = document.createElement("p");
            roleP.innerText = formData.role;
            roleP.style.position = "absolute";
            roleP.style.top = "1px";
            roleP.style.left = "100px";
            roleP.style.right = "100px";
            roleP.style.color = "black";
            roleP.style.backgroundColor = "transparent";

            // Region
            const regionP = document.createElement("p");
            regionP.innerText = formData.region;
            regionP.style.position = "absolute";
            regionP.style.bottom = "1px";
            regionP.style.left = "100px";
            regionP.style.right = "100px";
            regionP.style.color = "black";
            regionP.style.backgroundColor = "transparent";

            const img = document.createElement("img");
            img.src = dataURL;
            img.style.position = "relative";

            pictureDiv.style.position = "relative";
            pictureDiv.appendChild(img);
            pictureDiv.appendChild(roleP);
            pictureDiv.appendChild(regionP);
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
          <div id="picture" style={{ position: "relative" }}>
            {/* {imageDataUrl && <img src={imageDataUrl} alt="Avatar" />} */}
          </div>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Form;
