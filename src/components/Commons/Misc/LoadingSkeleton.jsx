import { Skeleton } from "primereact/skeleton";
import useDimensions from "./../../../hooks/useDimensions";
import PropTypes from "prop-types";

const LoadingSkeleton = ({ loading = true, children }) => {
  const { ref, dimensions } = useDimensions();

  if (loading) {
    return (
      <Skeleton
        width={`${dimensions.width}px`}
        height={`${dimensions.height}px`}
        style={{
          borderRadius: dimensions.borderRadius || "5px",
        }}
      />
    );
  }

  return <div ref={ref}>{children}</div>;
};

LoadingSkeleton.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default LoadingSkeleton;
