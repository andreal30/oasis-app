import PropTypes from "prop-types";
import { Card } from "primereact/card";
import useAuth from "../../hooks/useAuth";
import { toggleFavourites } from "../../services/userService";
import { useState } from "react";
import LoadingSkeleton from "../Commons/Misc/LoadingSkeleton";
import IconButton from "../Commons/Buttons/IconButton";
import { Avatar } from "primereact/avatar";
import { Chip } from "primereact/chip";
import { Dialog } from "primereact/dialog";
// import EditFlatPage from "../../pages/EditFlatPage";
import FlatDetailsPage from "../../pages/FlatDetailsPage";
import { formatDateInWords } from "../../utils/date";

const FlatItem = ({
  flat,
  onDeleteRequest,
  setUpdated,
  loading,
  setActiveDialog,
  activeDialog,
}) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(flat.isFavorite);
  const [viewDialogVisible, setViewDialogVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);

  const flatId = flat.flatId || flat._id;
  console.log("1. FLAT ITEM: flatId:", flatId);

  const handleViewDialogClose = () => {
    setViewDialogVisible(false);
    setActiveDialog(null);
  };

  const handleEditClick = (event) => {
    event.stopPropagation(); // Prevent card click from triggering
    setEditDialogVisible(true);
    setActiveDialog(flatId);
  };

  const handleEditDialogClose = () => {
    setEditDialogVisible(false);
    setActiveDialog(null);
  };

  const handleFavoriteClick = async () => {
    if (!user) {
      console.error("User must be logged in to favorite a flat.");
      return;
    }
    try {
      const updatedFavorite = await toggleFavourites(flatId);
      console.log("2. FLAT ITEM: updatedFavorite:", updatedFavorite);
      setIsFavorite(updatedFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setUpdated((prev) => !prev); // Notify parent component
    }
  };

  const headerCard = (
    <img alt={`${flat.streetNumber} ${flat.streetName}`} src={flat.image} />
  );

  const footerCard = (
    <div className='flex gap-2'>
      {user && user._id === flat.ownerId && (
        <IconButton
          iconClass='trash'
          className='btn-card'
          size='small'
          label='Delete'
          onClick={() => onDeleteRequest(flatId)}
        />
      )}
      {user && user._id === flat.ownerId && (
        <IconButton
          iconClass='pencil'
          className='btn-card'
          size='small'
          label='Edit'
          onClick={handleEditClick}
        />
      )}
      <IconButton
        iconClass={isFavorite ? "pi pi-heart-fill" : "pi pi-heart"}
        className='btn-heart'
        size='small'
        label='Favorite'
        onClick={handleFavoriteClick}
      />
    </div>
  );

  return (
    <>
      <LoadingSkeleton loading={loading}>
        <Card
          title={`${flat.streetName} ${flat.streetNumber}`}
          subTitle={flat.city}
          footer={footerCard}
          header={headerCard}
        >
          <div className='flex flex-column gap-1 mb-3 pt-2'>
            <p className='text-lg font-bold p-0 m-0'>{`Price: $${flat.rentPrice}`}</p>
            <p className='p-0 m-0 text-600'>
              Built on {flat.yearBuilt ? flat.yearBuilt : "N/A"}
            </p>
            <p>{`${flat.areaSize} m² | ${flat.rooms} rooms | ${flat.bathrooms} baths`}</p>
          </div>
          <p className='p-0 m-0 text-600'>
            Available on:{" "}
            <span className='font-bold'>
              {formatDateInWords(flat.dateAvailable)}
            </span>
          </p>
          <Chip
            className={`text-main-500 mt-2 ${
              flat.hasAc ? "chip-yes" : "chip-no"
            }`}
            label={flat.hasAc ? "Has AC" : "No AC"}
            icon='pi pi-asterisk'
          />

          {flat.description && (
            // actualizar con elemento de prime
            <p>{flat.description}</p>
          )}

          {user && (
            <div className='mt-4 flex gap-2 align-items-center'>
              <Avatar
                image={user.profile}
                imageAlt={user.firstName && user.lastName}
                className='mr-2'
                size='large'
                shape='circle'
              />
              <div>
                <p className='text-600 m-0'>
                  Listed by {user.firstName} {user.lastName}
                </p>
                <p className='text-600 m-0'>{user.email}</p>
              </div>
            </div>
          )}
        </Card>
      </LoadingSkeleton>
      <Dialog
        // header={headerDetails}
        visible={activeDialog === flat.flatId && viewDialogVisible}
        className='w-full md:w-9 lg:w-6'
        onHide={handleViewDialogClose}
      >
        {flat ? (
          <FlatDetailsPage flat={flatId} />
        ) : (
          <LoadingSkeleton loading={true} />
        )}
      </Dialog>

      {/* Edit Flat Dialog */}
      <Dialog
        header='Edit Flat'
        visible={activeDialog === flatId && editDialogVisible}
        className='w-full md:w-9 lg:w-6'
        onHide={handleEditDialogClose}
      >
        {flat ? (
          "Edit Flat"
        ) : (
          // <EditFlatPage flat={flatId} onClose={handleEditDialogClose} />
          <LoadingSkeleton loading={true} />
        )}
      </Dialog>
    </>
  );
};

FlatItem.propTypes = {
  flat: PropTypes.object.isRequired,
  onDeleteRequest: PropTypes.func.isRequired,
  setUpdated: PropTypes.func,
  loading: PropTypes.bool,
  setActiveDialog: PropTypes.func,
  activeDialog: PropTypes.func,
};

export default FlatItem;
