const validateUnique = async (field, value) => {
  try {
    const response = await fetch("http://localhost:8080/auth/validate-unique", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ field, value }),
    });

    // Check if the response is okay
    if (!response.ok) {
      console.error(`Server returned status: ${response.status}`);
      return false; // Consider it not unique if server returns an error
    }

    // Safely parse JSON if the response has a body
    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    // Validate the response format
    if (data && typeof data.isUnique === "boolean") {
      return data.isUnique;
    } else {
      console.error("Invalid response format:", data);
      return false;
    }
  } catch (error) {
    console.error("Error validating uniqueness:", error);
    return false; // Default to not unique on error
  }
};

export default validateUnique;
