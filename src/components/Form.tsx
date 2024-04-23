import React, { useState } from "react";
import { TextField, Button, Grid, Card, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface FormProps {
  onSubmit: (formData: FormData, imageDataUrl: string) => void;
  selectedRole: string; // Define selectedRole prop
  setSelectedRole: React.Dispatch<React.SetStateAction<string>>;
}

interface FormData {
  name: string;
  region: string;
  role: string;
}

const Form: React.FC<FormProps> = ({ onSubmit, selectedRole, setSelectedRole }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    region: "",
    role: "",
  })

  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
   

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegionChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setFormData({ ...formData, region: value });
  };

  const handleRoleChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
     setSelectedRole(value);
    setFormData({ ...formData, role: value });
  };
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const img = document.createElement('img');
    const url = `https://robohash.org/${formData.name}?size=200x200`;
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const dataURL = URL.createObjectURL(blob);
        document.body.appendChild(img);
        setImageDataUrl(dataURL);
        onSubmit(formData, dataURL);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card
            sx={{ width: "100%", maxWidth: 400, height: 300, padding: "2em" }}
          >
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
                <Select
                  sx={{ m: 1, width: "25ch" }}
                  id="region"
                  name="region"
                  label="Region"
                  variant="outlined"
                  value={formData.region}
                  onChange={handleRegionChange}
                >
                  <MenuItem value="London">London</MenuItem>
                  <MenuItem value="Birmingham">Birmingham</MenuItem>
                  <MenuItem value="Glasgow">Glasgow</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <Select
                  sx={{ m: 1, width: "25ch" }}
                  id="role"
                  name="role"
                  label="Role"
                  variant="outlined"
                  value={formData.role}
                  onChange={handleRoleChange}
                >
                  <MenuItem value="volunteer">Volunteer</MenuItem>
                  <MenuItem value="trainee">Trainee</MenuItem>
                </Select>
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
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
