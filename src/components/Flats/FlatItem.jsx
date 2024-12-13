import PropTypes from 'prop-types';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import EditFlatPage from '../../pages/EditFlatPage';
import { Avatar } from 'primereact/avatar';
import FlatImg from './../../images/apt-21.jpg';
import { useAuth } from '../../hooks/useAuth';
import FlatDetailsPage from '../../pages/FlatDetailsPage';

// Import your API service here
// import { getUserByEmail, toggleFavoriteFlat } from '../../services/api';

const FlatItem = ({ flat, activeDialog, setActiveDialog, onDeleteRequest, onFavoriteToggle }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewDialogVisible, setViewDialogVisible] = useState(false);
    const [editDialogVisible, setEditDialogVisible] = useState(false);
    const { user: loggedUser } = useAuth();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Replace with your API call
                // const fetchedUser = await getUserByEmail(flat.flatUser);
                const fetchedUser = []; // Placeholder
                setUser(fetchedUser.length > 0 ? fetchedUser[0] : null);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [flat.flatUser]);

    useEffect(() => {
        const checkIfFavorite = async () => {
            if (loggedUser) {
                // Replace with your API call
                // const userData = await getUserFavorites(loggedUser.email);
                const userData = {}; // Placeholder
                setIsFavorite(userData.favoriteFlats?.includes(flat.flatId));
            }
        };
        checkIfFavorite();
    }, [loggedUser, flat.flatId]);

    const formatDate = (date) => {
        const dateObj = date.toDate ? date.toDate() : date;
        const formatter = new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
        return formatter.format(dateObj);
    };

    const formattedDate = flat.dateAvailable ? formatDate(flat.dateAvailable) : 'N/A';

    const handleCardClick = () => {
        setViewDialogVisible(true);
        setActiveDialog(flat.flatId);
    };

    const handleViewDialogClose = () => {
        setViewDialogVisible(false);
        setActiveDialog(null);
    };

    const handleEditClick = (event) => {
        event.stopPropagation();
        setEditDialogVisible(true);
        setActiveDialog(flat.flatId);
    };

    const handleEditDialogClose = () => {
        setEditDialogVisible(false);
        setActiveDialog(null);
    };

    const handleDeleteClick = (event) => {
        event.stopPropagation();
        onDeleteRequest(flat.flatId);
    };

    const handleFavoriteClick = async (event) => {
        event.stopPropagation();
        if (loggedUser) {
            try {
                // Replace with your API call
                // await toggleFavoriteFlat(loggedUser.email, flat.flatId, isFavorite);
                setIsFavorite(!isFavorite);
                if (onFavoriteToggle) {
                    onFavoriteToggle(flat.flatId, !isFavorite);
                }
            } catch (error) {
                console.error('Error toggling favorite:', error);
            }
        } else {
            console.error('User is not logged in');
        }
    };

    if (loading) {
        return (
            <div>
                <i className="pi pi-spin pi-spinner"></i> Loading...
            </div>
        );
    }

    if (!user) {
        return <div>User not found</div>;
    }

    const headerCard = (
        <img alt={`${flat.streetNumber} ${flat.streetName}`} src={flat.flatImage || FlatImg} />
    );

    const footerCard = (
        <div className="flex gap-2">
            {loggedUser && loggedUser.email === flat.flatUser && (
                <Button
                    icon="pi pi-trash"
                    className="bg-primary-100"
                    size="small"
                    rounded
                    text
                    raised
                    aria-label="Delete"
                    onClick={handleDeleteClick}
                />
            )}
            {loggedUser && loggedUser.email === flat.flatUser && (
                <Button
                    icon="pi pi-pencil"
                    className="bg-primary-100"
                    size="small"
                    rounded
                    text
                    raised
                    aria-label="Edit"
                    onClick={handleEditClick}
                />
            )}
            <Button
                icon={isFavorite ? 'pi pi-heart-fill' : 'pi pi-heart'}
                className="bg-primary-100"
                size="small"
                rounded
                text
                raised
                aria-label="Favorite"
                onClick={handleFavoriteClick}
            />
        </div>
    );

    return (
        <>
            <Card
                title={`${flat.streetName} ${flat.streetNumber}`}
                subTitle={flat.city}
                footer={footerCard}
                header={headerCard}
                onClick={handleCardClick}
                className="flat-card border-round-xl"
                style={{ cursor: 'pointer' }}
            >
                <div className="flex flex-column gap-1 mb-3 pt-2">
                    <p className="text-lg font-bold p-0 m-0">Price: ${flat.price}</p>
                    <p className="p-0 m-0 text-600">
                        Built on {flat.yearBuilt ? flat.yearBuilt : 'N/A'}
                    </p>
                    <div className="flex gap-2">
                        <p className="p-0 m-0 text-600">{flat.areaSize} m²</p>
                        <p className="p-0 m-0 text-600">{flat.rooms} rooms</p>
                        <p className="p-0 m-0 text-600">{flat.bathrooms} baths</p>
                    </div>
                </div>
                <p className="p-0 m-0 text-600">
                    Available on: <span className="font-bold">{formattedDate}</span>
                </p>
                <p className="p-0 m-0 text-600">
                    Description: <span className="font-bold">{flat.description}</span>
                </p>
                <Chip
                    className={`text-indigo-500 mt-2 ${flat.hasAc ? 'chip-yes' : 'chip-no'}`}
                    label={flat.hasAc ? 'Has AC' : 'No AC'}
                    icon="pi pi-asterisk"
                />
                {user && (
                    <div className="mt-4 flex gap-2 align-items-center">
                        <Avatar
                            image={user.profile}
                            imageAlt={`${user.firstName} ${user.lastName}`}
                            className="mr-2"
                            size="large"
                            shape="circle"
                        />
                        <div>
                            <p className="text-600 m-0">
                                Listed by {user.firstName} {user.lastName}
                            </p>
                            <p className="text-600 m-0">{user.email}</p>
                        </div>
                    </div>
                )}
            </Card>
            <Dialog
                visible={activeDialog === flat.flatId && viewDialogVisible}
                className="w-full md:w-9 lg:w-6"
                onHide={handleViewDialogClose}
            >
                {flat ? <FlatDetailsPage flat={flat} /> : <div>Loading...</div>}
            </Dialog>
            <Dialog
                header="Edit Flat"
                visible={activeDialog === flat.flatId && editDialogVisible}
                className="w-full md:w-9 lg:w-6"
                onHide={handleEditDialogClose}
            >
                {flat ? (
                    <EditFlatPage flat={flat} onClose={handleEditDialogClose} />
                ) : (
                    <div>Loading...</div>
                )}
            </Dialog>
        </>
    );
};

FlatItem.propTypes = {
    flat: PropTypes.shape({
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
    }).isRequired,
    activeDialog: PropTypes.string,
    setActiveDialog: PropTypes.func.isRequired,
    onDeleteRequest: PropTypes.func.isRequired,
    onFavoriteToggle: PropTypes.func,
};

export default FlatItem;
