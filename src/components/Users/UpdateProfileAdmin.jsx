import PropTypes from "prop-types";
import UserForm from "./UserForm";

const UpdateProfileAdmin = ({ user, onClose, setUpdated }) => {
  if (!user) {
    return <div>No user data available for updating.</div>;
  }

  return (
    <div className='update-profile-admin'>
      <h1 className='update-profile-header'>
        Update {user.firstName} {user.lastName}&apos; Profile
      </h1>
      <UserForm user={user} onClose={onClose} setUpdated={setUpdated} />
    </div>
  );
};

UpdateProfileAdmin.propTypes = {
  user: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  setUpdated: PropTypes.func.isRequired,
};

export default UpdateProfileAdmin;
