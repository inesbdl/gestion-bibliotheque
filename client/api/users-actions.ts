export const checkUserSession = async () => {
  try {
    const response = await fetch('http://localhost:2000/api/v1/users/currentUser', {
      method: 'GET',
      credentials: 'include', 
    });

    if (!response.ok) throw new Error("Not authenticated");

    const data = await response.json();
    console.log("data", data)
    return data;
  } catch (error) {
    return null;
  }
};