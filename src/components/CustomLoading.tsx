import React from "react";
import { Loading as LoadingComponent } from "../appBase/components"
import { ConfigurationInterface } from "../helpers";
import { Header } from "./Header";
import { Theme } from "./Theme";

interface Props { config: ConfigurationInterface }

export const CustomLoading: React.FC<Props> = (props) => (
  <>
    <Theme config={props.config} />
    <div id="liveContainer">
      <Header user={null} nameUpdateFunction={() => { }} config={props.config} />
      <div id="body">
        <div id="videoContainer">
          <div style={{ marginLeft: "auto", marginRight: "auto", marginTop: "10%" }}>
            <LoadingComponent size="lg" color="#FFFFFF" />
          </div>
        </div>
        <div id="interactionContainer">
          <table id="altTabs">
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>
)

