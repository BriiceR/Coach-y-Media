const apiUrl = 'http://localhost:8000';


export const GetModules = async () => {
    try {
      const response = await fetch(`${apiUrl}/modules`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error fetching modules:', error);
    }
};

export const GetModule = async (moduleId) => {
  try {
    const response = await fetch(`${apiUrl}/modules/${moduleId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching module:', error);
  }
};


export const createModule = async (moduleData) => {
  try {
    const response = await fetch(`${apiUrl}/modules`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(moduleData),
    });
    const data = await response.json();
    console.log(data);
    return data;
    
  } catch (error) {
    throw new Error('Error creating module:', error);
  }
};

export const updateModule = async (moduleId, moduleData) => {
  try {
    const response = await fetch(`${apiUrl}/modules/${moduleId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(moduleData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error updating module:', error);
  }
};

export const deleteModule = async (moduleId) => {
  console.log(moduleId);
  try {
    const response = await fetch(`${apiUrl}/modules/${moduleId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      // La suppression a réussi
      return true;
    } else {
      // La suppression a échoué, lancez une erreur avec le message d'erreur approprié
      const errorResponse = await response.json();
      throw new Error(`Error deleting module: ${errorResponse.message}`);
    }
  } catch (error) {
    throw new Error('Error deleting module:', error);
  }
};


export const createStep = async (moduleId, stepData) => {
  try {
    const response = await fetch(`${apiUrl}/modules/${moduleId}/steps`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stepData),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création de l\'étape');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Erreur lors de la création de l\'étape:', error);
  }
};

export const updateStep = async (moduleId, stepId, stepData) => {
  try {
    const response = await fetch(`${apiUrl}/modules/${moduleId}/steps/${stepId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stepData),
      }
    );
    console.log(moduleId, stepId, stepData)

    if (!response.ok) {
      throw new Error('Error updating step');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error updating step:', error);
  }
};

export const getStep = async (moduleId, stepId) => {
  try {
    const response = await fetch(`${apiUrl}/modules/${moduleId}/steps/${stepId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching step:', error);
  }
};

export const deleteStep = async (moduleId, stepId) => {
  try {
    const response = await fetch(`${apiUrl}/modules/${moduleId}/steps/${stepId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression de l\'étape');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Erreur lors de la suppression de l\'étape: ' + error.message);
  }
};
