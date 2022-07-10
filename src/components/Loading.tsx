import React from "react";
import { Loading as LoadingComponent } from "../appBase/components"

export const Loading = () => {
  const imgSrc = "/images/logo-loading.png";
  return (
    <div id="liveContainer">
      <div className="smallCenterBlock" style={{ marginTop: 150 }}>
        <img src={imgSrc} alt="logo" />
        <LoadingComponent color="#FFFFFF" />
      </div>
    </div>
  )
}

