import React, { Component } from "react";
// import ImageGenerator from "./components/ImageGenerator";
// import Header from "./components/Header";
// import Form from "./components/Form";
// import { Grid } from "@mui/material";
// import Avatar, { genConfig } from "react-nice-avatar";
import AvatarList from "./components/AvatarList";
import AvatarEditor from "./components/AvatarEditor";
import Footer from "./components/Footer";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import ReactNiceAvatar, { genConfig } from "./config/index";
import "./index.scss";

interface AppState {
  config: { [key: string]: any };
  shape: AvatarShape;
  avatarId: string;
}

type AvatarShape = "circle" | "rounded" | "square";

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      config: genConfig({
        isGradient: Boolean(Math.round(Math.random())),
      }),
      shape: "circle",
      avatarId: "myAvatar", // Declare avatarId here
    };
  }

  selectConfig(config: { [key: string]: any }) {
    this.setState({ config });
  }

  updateConfig(key: string, value: any) {
    // Specify type for value
    const { config } = this.state;
    config[key] = value;
    this.setState({ config });
  }

  updateShape(shape: AvatarShape) {
    // Specify type for shape
    this.setState({ shape });
  }

  async download() {
    const scale = 2;
    const node = document.getElementById(this.state.avatarId);
    if (node) {
      const blob = await domtoimage.toBlob(node, {
        height: node.offsetHeight * scale,
        style: {
          transform: `scale(${scale}) translate(${
            node.offsetWidth / 2 / scale
          }px, ${node.offsetHeight / 2 / scale}px)`,
          "border-radius": 0,
        },
        width: node.offsetWidth * scale,
      });

      saveAs(blob, "avatar.png");
    }
  }

  onInputKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    this.setState({
      config: genConfig(e.currentTarget.value),
    });
  }

  render() {
    const { config, shape } = this.state;
    return (
      <div className="App flex flex-col min-h-screen">
        <main className="flex-1 flex flex-col items-center justify-center">
          <div id={this.state.avatarId} className="mb-10">
            <ReactNiceAvatar
              className="w-64 h-64 highres:w-80 highres:h-80"
              hairColorRandom
              shape={this.state.shape}
              {...config}
            />
          </div>
          <AvatarEditor
            config={config}
            shape={shape}
            updateConfig={this.updateConfig.bind(this)}
            updateShape={this.updateShape.bind(this)}
            download={this.download.bind(this)}
          />
          <input
            className="inputField w-64 h-10 p-2 rounded-full mt-10 text-center outline-none"
            placeholder="input name or email ..."
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
              this.onInputKeyUp(e)
            }
          />
        </main>

        {/* Avatar list */}
        <AvatarList selectConfig={this.selectConfig.bind(this)} />

        {/* Footer */}
        <Footer />
      </div>
    );
  }
}

export default App;
