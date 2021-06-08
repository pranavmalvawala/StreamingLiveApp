import React from "react";

export const Loading = () => {
  const imgSrc = "/images/logo-login.png";
  return (
    <div className="smallCenterBlock" style={{ marginTop: 100 }}>
      <img src={imgSrc} alt="logo" className="img-fluid" style={{ marginBottom: 50 }} />
      <div className="text-center">Loading..</div>
    </div>
  )
}

