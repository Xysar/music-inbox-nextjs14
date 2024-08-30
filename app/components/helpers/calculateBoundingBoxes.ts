import React from "react";

const calculateBoundingBoxes = (children: any) => {
  const boundingBoxes: any = {};

  React.Children.forEach(children, (child) => {
    const domNode = child.ref.current;
    const nodeBoundingBox = domNode.getBoundingClientRect();

    boundingBoxes[child.key] = nodeBoundingBox;
  });

  return boundingBoxes;
};

export default calculateBoundingBoxes;
