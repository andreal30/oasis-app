import { Avatar } from "primereact/avatar";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import MainButton from "../Buttons/MainButton";
import IconButton from "../Buttons/IconButton";
import PropTypes from "prop-types";
import { formatDateInWords } from "../../../utils/date";
import LoadingSkeleton from "../Misc/LoadingSkeleton";
import UserForm from "../../Users/UserForm";

const UserCard = ({
  user,
  onToggleAdmin,
  onDeleteUser,
  setUpdated,
  loading,
}) => {
  const [dialogVisible, setDialogVisible] = useState(false);

  console.log("1. USER CARD user", user);
  const handleDialogClose = () => {
    setDialogVisible(false);
  };
  const handleEditClick = () => {
    setDialogVisible(true);
  };

  const handleToggleAdmin = async () => {
    if (onToggleAdmin) {
      await onToggleAdmin(user); // Trigger the toggle admin function
      setUpdated((prev) => !prev); // Notify the parent component
    }
  };

  const handleDeleteUser = async () => {
    if (onDeleteUser) {
      await onDeleteUser(user); // Trigger the delete user function
      setUpdated((prev) => !prev); // Notify the parent component
    }
  };

  const header = (
    <div className='flex gap-3 align-items-center w-full mb-0 p-3 pb-0'>
      <Avatar
        image={user.profileImage}
        size='xlarge'
        shape='circle'
        style={{ width: "64px" }}
      />
      <p className='text-xl font-bold flex-grow-1 line-height-2'>
        {user.firstName} {user.lastName}
      </p>

      <IconButton
        label='Edit'
        iconClass='pencil '
        className='bg-main-100 text-main-700 hover:bg-main-200'
        size='small'
        text
        raised
        onClick={handleEditClick}
      />
    </div>
  );
  const footer = (
    <>
      <div className='flex flex-column md:flex-row gap-3'>
        <MainButton
          label='Toggle Admin'
          icon
          iconClass='user-edit'
          className='w-full my-btn'
          onClick={handleToggleAdmin}
        />
        <IconButton
          label='Remove User'
          severity='secondary'
          iconClass='trash'
          className='my-btn btn-secondary'
          onClick={handleDeleteUser}
        />
      </div>
    </>
  );
  const headerDialog = (
    <p>
      Update {user.firstName} {user.lastName}&apos; Profile
    </p>
  );

  return (
    <>
      <LoadingSkeleton loading={loading}>
        <Card
          footer={footer}
          header={header}
          className='border-1 border-round-xl border-main-300 bg-main-50'
        >
          <ul className='list-none p-0 m-0 flex flex-column gap-2'>
            <li className='mt-0'>
              <i className='pi pi-user mr-2'></i>
              <span className='font-semibold'> Age:</span> {user.age}
            </li>
            <li>
              <i className='pi pi-at  mr-2'></i>
              <span className='font-semibold'> Email:</span> {user.email}
            </li>
            <li>
              <i className='pi pi-calendar-clock  mr-2'></i>
              <span className='font-semibold'> Date Of Bith:</span>{" "}
              {user.birthDate
                ? formatDateInWords(user.birthDate)
                : //   : user.birthDate.toLocaleDateString("en-GB")
                  "N/A"}
            </li>
            <li>
              <i className='pi pi-user  mr-2'></i>
              <span className='font-semibold'> #Flats:</span> {user.flatCount}
            </li>
            <li className='pt-3 '>
              <span
                className={`border-1 border-round-xl border-300 border-indigo-300 p-2 ${
                  user.isAdmin ? "bg-main-100" : "bg-main-50"
                }`}
              >
                {user.isAdmin ? "Is Admin" : "Not Admin"}
              </span>
            </li>
          </ul>
        </Card>
        <Dialog
          header={headerDialog}
          visible={dialogVisible}
          onHide={handleDialogClose}
          className='scrollbar-hidden dialog-form'
        >
          {user ? (
            <UserForm
              user={user}
              onClose={handleDialogClose}
              setUpdated={setUpdated}
            />
          ) : (
            <LoadingSkeleton loading={true} />
          )}{" "}
        </Dialog>
      </LoadingSkeleton>
    </>
  );
};

UserCard.propTypes = {
  user: PropTypes.object,
  onToggleAdmin: PropTypes.func,
  onDeleteUser: PropTypes.func,
  setUpdated: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
export default UserCard;
