import ReactCurvedText from 'react-curved-text';
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
import ReactDOM from 'react-dom';

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
            roleP.style.left = "0px";
            roleP.style.right = "0px";
            roleP.style.color = "black";
            roleP.style.backgroundColor = "transparent";
  
            // Image
            const img = document.createElement("img");
            img.src = dataURL;
            img.style.position = "relative";
            img.style.border = "40px solid red";
            img.style.borderRadius = "160px";
            img.style.width = "256px";
            img.style.height = "256px";
  
            // Create a wrapper div for ReactCurvedText
            const curvedTextDiv = document.createElement("div");
            curvedTextDiv.id = "curvedTextDiv";
            curvedTextDiv.style.position = "absolute";
            curvedTextDiv.style.top = "0";
            curvedTextDiv.style.left = "0";
            curvedTextDiv.style.width = "100%";
            curvedTextDiv.style.height = "100%";
            curvedTextDiv.style.pointerEvents = "none"; 
  
            pictureDiv.style.position = "relative";
            pictureDiv.style.width = "256px"; // 
            pictureDiv.style.height = "256px"; 
  
            pictureDiv.appendChild(img);
            pictureDiv.appendChild(roleP);
            pictureDiv.appendChild(curvedTextDiv);
  
            // Render the ReactCurvedText component into the wrapper div
            ReactDOM.render(
              <ReactCurvedText
                width={256}
                height={256}
                cx={125}
                cy={130}
                rx={105}
                ry={109}
                startOffset={130} 
                reversed={false}
                text={formData.region}
                textProps={{ style: { fontSize: 25, fill: 'black' } }}
                tspanProps={{ dy: '0.3em' }}
                svgProps={{rotate:10}}
              />,
              curvedTextDiv
            );

            //
            ReactDOM.render(
              <ReactCurvedText
                width={256}
                height={256}
                cx={125}
                cy={130}
                rx={105}
                ry={109}
                startOffset={130} 
                reversed={true}
                text={formData.role}
                textProps={{ style: { fontSize: 25, fill: 'black' } }}
                tspanProps={{ dy: '0.3em' }}
                svgProps={{rotate:13}}
              />,
              roleP
            );
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
          </div>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Form;
