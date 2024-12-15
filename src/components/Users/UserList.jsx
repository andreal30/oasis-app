import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import UserCard from "./../Commons/Cards/UserCard";
import { allowAdmin, deleteUser, denyAdmin } from "../../services/userService";
import PropTypes from "prop-types";

const UserList = ({ users, setUsers, setUpdated, loading }) => {
  const toastCenter = useRef(null);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [confirmDeleteDialogVisible, setConfirmDeleteDialogVisible] =
    useState(false);
  const [selectedUserForAdminToggle, setSelectedUserForAdminToggle] =
    useState(null);
  const [selectedUserForDelete, setSelectedUserForDelete] = useState(null);

  if (!Array.isArray(users)) {
    console.error(
      "Invalid data passed to UserList. Expected an array but received:",
      users
    );
    return null;
  }

  const isUserAdmin = selectedUserForAdminToggle?.isAdmin;
  const userId = selectedUserForAdminToggle?._id;

  const handleToggleAdmin = (user) => {
    setSelectedUserForAdminToggle(user);
    setConfirmDialogVisible(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUserForDelete(user); // Pass the full user object
    setConfirmDeleteDialogVisible(true);
  };

  const handleConfirmToggleAdmin = async () => {
    try {
      if (!Array.isArray(users) || users.some((user) => !user._id)) {
        console.error(
          "Invalid data passed to UserList. Each user must have a '_id'.",
          users
        );
        return null;
      }

      if (selectedUserForAdminToggle && isUserAdmin) {
        await denyAdmin(userId); // API call to remove admin status
        toastCenter.current?.show({
          severity: "success",
          summary: "Success",
          detail: "User is no longer an Admin",
          life: 2000,
        });
      } else if (selectedUserForAdminToggle && !isUserAdmin) {
        await allowAdmin(userId); // API call to grant admin status
        toastCenter.current?.show({
          severity: "success",
          summary: "Success",
          detail: "User is now an Admin",
          life: 2000,
        });
      }

      // Update the user list to reflect the new admin status
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === selectedUserForAdminToggle._id
            ? { ...user, isAdmin: !user.isAdmin } // Toggle admin status
            : user
        )
      );
      setUpdated((prev) => !prev); // Notify parent component

      console.log(
        `Admin status toggled for user with email ${selectedUserForAdminToggle.email}`
      );
    } catch (error) {
      toastCenter.current?.show({
        severity: "error",
        summary: "Error",
        detail: `Error toggling admin status. ${error.message}`,
        life: 2000,
      });
      console.error("Error toggling admin status:", error);
    }
    setConfirmDialogVisible(false);
  };

  const handleConfirmDeleteUser = async () => {
    if (selectedUserForDelete) {
      try {
        await deleteUser(selectedUserForDelete._id); // Ensure correct user_id
        toastCenter.current?.show({
          severity: "success",
          summary: "Success",
          detail: `User with email ${selectedUserForDelete.email} deleted successfully`,
          life: 2000,
        });

        // Filter out the deleted user from the user list
        setUsers((prevUsers) =>
          prevUsers.filter(
            (user) => user.user_id !== selectedUserForDelete.user_id
          )
        );
        setUpdated((prev) => !prev); // Notify parent component

        console.log(
          `User with email ${selectedUserForDelete.email} deleted successfully`
        );
      } catch (error) {
        toastCenter.current?.show({
          severity: "error",
          summary: "Error",
          detail: `Error deleting user: ${error.message}`,
          life: 2000,
        });
        console.error("Error deleting user:", error);
      }
      setConfirmDeleteDialogVisible(false);
    }
  };

  const handleCancel = () => {
    setConfirmDialogVisible(false);
    setConfirmDeleteDialogVisible(false);
  };

  return (
    <>
      <Toast ref={toastCenter} />
      <div className='grid'>
        {users.map((user, index) => (
          <div
            key={index}
            className='col-12 xl:col-4 lg:col-4 md:col-6 sm:col-12'
          >
            <UserCard
              user={user}
              onToggleAdmin={() => handleToggleAdmin(user)}
              onDeleteUser={() => handleDeleteUser(user)}
              setUpdated={setUpdated}
              loading={loading}
            />
          </div>
        ))}
        {selectedUserForAdminToggle && (
          <ConfirmDialog
            visible={confirmDialogVisible}
            onHide={handleCancel}
            message='Are you sure you want to toggle the admin status of this user?'
            header='Confirmation'
            icon='pi pi-exclamation-triangle'
            acceptClassName='p-button-danger'
            accept={handleConfirmToggleAdmin}
            reject={handleCancel}
          />
        )}
        {selectedUserForDelete && (
          <ConfirmDialog
            visible={confirmDeleteDialogVisible}
            onHide={handleCancel}
            message='Are you sure you want to delete the user?'
            header='Confirmation'
            icon='pi pi-exclamation-triangle'
            acceptClassName='p-button-danger'
            accept={handleConfirmDeleteUser}
            reject={handleCancel}
          />
        )}
      </div>
    </>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  setUsers: PropTypes.func.isRequired,
  setUpdated: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

// Helper function to calculate age from birthday

export default UserList;
