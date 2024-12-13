import PropTypes from 'prop-types';
import FlatItem from './FlatItem';
import { useState } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
// Import your backend API service here
// import { deleteFlat } from '../../services/api';

const FlatList = ({ flats, onFlatDeleted, onFavoriteToggle }) => {
    const [activeDialog, setActiveDialog] = useState(null);

    const handleDeleteRequest = (flatId) => {
        confirmDialog({
            message: 'Are you sure you want to delete this flat?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptClassName: 'p-button-danger',
            accept: async () => {
                try {
                    // Replace with your backend API call
                    // await deleteFlat(flatId);
                    if (onFlatDeleted) {
                        onFlatDeleted(flatId); // Optionally trigger any additional actions after deletion
                    }
                } catch (error) {
                    console.error('Error deleting flat:', error);
                }
            },
            reject: () => { },
        });
    };

    return (
        <div className="grid">
            {flats.map((flat, index) => (
                <div key={index} className="col-12 md:col-6 lg:col-4">
                    <FlatItem
                        flat={flat}
                        activeDialog={activeDialog}
                        setActiveDialog={setActiveDialog}
                        onDeleteRequest={handleDeleteRequest}
                        onFavoriteToggle={onFavoriteToggle} // Pass the callback down
                    />
                </div>
            ))}
            <ConfirmDialog />
        </div>
    );
};

FlatList.propTypes = {
    flats: PropTypes.arrayOf(
        PropTypes.shape({
            flatId: PropTypes.string.isRequired,
            flatUser: PropTypes.string.isRequired,
            dateAvailable: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.object]),
            streetNumber: PropTypes.string.isRequired,
            streetName: PropTypes.string.isRequired,
            flatImage: PropTypes.string,
            city: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            yearBuilt: PropTypes.number,
            areaSize: PropTypes.number.isRequired,
            rooms: PropTypes.number.isRequired,
            bathrooms: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
            hasAc: PropTypes.bool.isRequired,
        }).isRequired
    ).isRequired,
    onFlatDeleted: PropTypes.func,
    onFavoriteToggle: PropTypes.func,
};

export default FlatList;