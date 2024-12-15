import { useState, useEffect, useRef } from "react";

const useDimensions = () => {
  const ref = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    borderRadius: 0,
  });

  useEffect(() => {
    if (ref.current) {
      const { offsetWidth, offsetHeight } = ref.current;
      const computedStyles = window.getComputedStyle(ref.current);
      const borderRadius = computedStyles.borderRadius || "0px";
      setDimensions({
        width: offsetWidth,
        height: offsetHeight,
        borderRadius,
      });
    }
  }, []);

  return { ref, dimensions };
};

export default useDimensions;
