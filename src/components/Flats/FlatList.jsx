import PropTypes from "prop-types";
import FlatItem from "./FlatItem";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { deleteFlat } from "../../services/flatService";

const FlatList = ({ flats, onFlatDeleted, setUpdated, loading }) => {
  const handleDeleteRequest = (flatId) => {
    confirmDialog({
      message: "Are you sure you want to delete this flat?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      accept: async () => {
        try {
          await deleteFlat(flatId);
          if (onFlatDeleted) onFlatDeleted(flatId);
        } catch (err) {
          console.error("Error deleting flat:", err);
        } finally {
          setUpdated((prev) => !prev); // Notify parent component
        }
      },
    });
  };

  return (
    <div className='grid'>
      {flats.map((flat, index) => (
        <div key={index} className='col-12 md:col-6 lg:col-4'>
          <FlatItem
            flat={flat}
            onDeleteRequest={() => handleDeleteRequest(flat._id)}
            setUpdated={setUpdated}
            loading={loading}
          />
        </div>
      ))}
      <ConfirmDialog />
    </div>
  );
};

FlatList.propTypes = {
  flats: PropTypes.array.isRequired,
  onFlatDeleted: PropTypes.func,
  setUpdated: PropTypes.func,
  loading: PropTypes.bool,
};

export default FlatList;
