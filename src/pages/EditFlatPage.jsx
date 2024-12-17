import PropTypes from "prop-types";
import FlatForm from "../components/Flats/FlatForm";

const EditFlatPage = ({ flat, onClose }) => {
  console.log("Flat ID in EditFlatPage:", flat.flatId); // Debugging
  return (
    <div>
      {/* Pass the flat data and set isEditing to true */}
      <FlatForm initialFlat={flat} isEditing={true} onFormSubmit={onClose} />
    </div>
  );
};

EditFlatPage.propTypes = {
  flat: PropTypes.shape({
    flatId: PropTypes.string,
    // Add other properties of the flat object if needed
  }),
  onClose: PropTypes.func,
};

export default EditFlatPage;
