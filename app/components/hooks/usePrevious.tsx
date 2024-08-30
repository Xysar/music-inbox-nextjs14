import React, { useEffect, useRef } from "react";

const usePrevious = (value: any) => {
  const prevChildrenRef = useRef();

  useEffect(() => {
    prevChildrenRef.current = value;
  }, [value]);

  return prevChildrenRef.current;
};

export default usePrevious;
