// Utility to map user data from the database response
const mapUserData = (userData) => {
  if (!userData) throw new Error("Invalid user data provided for mapping.");

  return {
    firstName: userData.firstName,
    lastName: userData.lastName,
    username: userData.username,
    email: userData.email,
    birthDate: userData.birthDate || new Date(),
    _id: userData._id || "",
    profileImage: userData.profileImage || "",
    isAdmin: userData.isAdmin ?? false,
  };
};

export default mapUserData;
