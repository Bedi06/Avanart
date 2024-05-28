import React, { useState } from "react";
import { TextField, Button, Grid, Card } from "@mui/material";

interface FormProps {
  onSubmit: (formData: FormData, imageDataUrl: string) => void;
  avatarImageDataUrl: string | null;
}

interface FormData {
  name: string;
  region: string;
  role: string;
}

const Form: React.FC<FormProps> = ({ onSubmit, avatarImageDataUrl }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    region: "",
    role: "",
  });
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("clicked")
    console.log(avatarImageDataUrl)
    if (avatarImageDataUrl) {
      
      fetch(avatarImageDataUrl)
        .then(response => response.blob())
        .then(blob => {
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
          <Card sx={{ width: "100%", maxWidth: "100%", height: 500, padding: "2em" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  sx={{ m: 1, width: "25ch" }}
                  id="name"
                  name="name"
                  label="Name"
                  variant="outlined"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{ m: 1, width: "25ch" }}
                  id="region"
                  name="region"
                  label="Region"
                  variant="outlined"
                  value={formData.region}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{ m: 1, width: "25ch" }}
                  id="role"
                  name="role"
                  label="Role"
                  variant="outlined"
                  value={formData.role}
                  onChange={handleChange}
                />
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
