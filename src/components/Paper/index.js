import React from 'react';
import { Paper as UIPaper } from "@mui/material";

function Paper({ children, variant = 'elevation', elevation = 1, ...props }) {

  return (
    <UIPaper variant={variant} elevation={elevation} {...props}>
      {children}
    </UIPaper>
  );
}

export default Paper;
