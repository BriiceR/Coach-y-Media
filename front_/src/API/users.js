const apiUrl = 'http://localhost:8000';

export const getUsers = async () => {
    try {
        const response = await fetch(`${apiUrl}/users`);
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        throw new Error('Error fetching users:', error);
    }
};

export const getUser = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/user/${id}`);
      const data = await response.json();
      // console.log(data);
      return data;
    } catch (error) {
      throw new Error('Error fetching user:', error);
    }
  };

  export const updateUser = async (userId, resultIndex, isValidModuleIndex) => {
    try {
      const response = await fetch(`${apiUrl}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resultIndex,
          isValidModuleIndex,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
  
      const updatedUser = await response.json();
      return updatedUser;
    } catch (error) {
      throw new Error('Error updating user:', error);
    }
  };
  

  export const updateAllUsers = async (id, isPaid) => {
    try {
      const response = await fetch(`${apiUrl}/users/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          isPaid,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update users');
      }
  
      const updatedUsers = await response.json();
      return updatedUsers;
    } catch (error) {
      throw new Error('Error updating users: ' + error.message);
    }
  };
  

  export const deleteResult = async (userId, resultId) => {
    try {
      const response = await fetch(`${apiUrl}/users/${userId}/results/${resultId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete user result');
      }
  
      const deletedResult = await response.json();
      return deletedResult;
    } catch (error) {
      throw new Error('Error deleting user result: ' + error.message);
    }
  };
  

  export const getIsValidModule = async (userId) => {
    try {
      const response = await fetch(`${apiUrl}/users/${userId}/isValidModule`);
      const data = await response.json();
      return data.isValidModule;
    } catch (error) {
      throw new Error(`Error fetching isValidModule for user ${userId}: ${error}`);
    }
  };

  export const getUsersWithValidModule = async () => {
    try {
      const users = await getUsers();
  
      // Parcourir les utilisateurs et ajouter la propriété `isValidModule` à chacun
      const usersWithValidModule = await Promise.all(
        users.map(async (user) => {
          const isValidModule = await getIsValidModule(user._id);
          return { ...user, isValidModule };
        })
      );
  
      return usersWithValidModule;
    } catch (error) {
      throw new Error('Error fetching users with valid module:', error);
    }
  };
  
  export const updateAllUsersModified = async (moduleId) => {
    try {
      const response = await fetch(`${apiUrl}/users/updateStep/${moduleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update users');
      }
  
      const updatedUsers = await response.json();
      return updatedUsers;
    } catch (error) {
      throw new Error('Error updating users: ' + error.message);
    }
  };
  
  


  ///////////////////////////////// Modification pour le SQL //////////////////////////////

  export const getResults = async (userId) => {
    try {
      const response = await fetch(`${apiUrl}/users/${userId}/results`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error fetching results:', error);
    }
  };

  export const createResults = async (userId) => {
    try {
      const response = await fetch(`${apiUrl}/users/${userId}/results`, {
        method: 'POST'
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error creating result:', error);
    }
  };

  export const updateResult = async (userId, missingResults) => {
    try {
      const response = await fetch(`${apiUrl}/results`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          missingResults: missingResults, 
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error updating results:', error);
    }
  };
  
  

  export const getAllResults = async () => {
    try {
      const response = await fetch(`${apiUrl}/users/results`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error fetching results:', error);
    }
  };
  

  export const getOrders = async (userId) => {
    try {
      const response = await fetch(`${apiUrl}/users/${userId}/orders`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error fetching results:', error);
    }
  };

  export const getStatus = async (userId) => {
    try {
      const response = await fetch(`${apiUrl}/users/${userId}/status`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error fetching results:', error);
    }
  };

  export const getPaid = async (userId) => {
    try {
      const response = await fetch(`${apiUrl}/users/${userId}/paid`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error fetching results:', error);
    }
  };