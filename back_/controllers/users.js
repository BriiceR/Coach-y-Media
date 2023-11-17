const mysql = require('mysql2');
const pool = require('../database');
const express = require('express');
const Results = require("../Model/Results");
const Module = require('../Model/Module');
const dotenv = require('dotenv');
const router = require('../router');

exports.getUsers = async (req, res) => {
  try {
      const connection = await pool.getConnection();
      const [results] = await connection.query('SELECT * FROM `coach_users`');
      connection.release();

      console.log('Users:', results);
      res.status(200).json({ users: results });
  } catch (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).json({ error: 'Failed to execute SQL query' });
  }
};


exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
      const connection = await pool.getConnection();
      const [results] = await connection.query('SELECT * FROM `coach_users` WHERE id = ?', [userId]);
      connection.release(); // Libération de la connexion

      if (results.length === 0) {
          res.status(404).json({ error: 'User not found' });
      } else {
          const user = results[0];
          console.log(user);
          res.status(200).json(user);
      }
  } catch (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).json({ error: 'Failed to execute SQL query' });
  }
};


exports.getResults = async (req, res) => {
  try {
      const userId = req.params.userId;

      const connection = await pool.getConnection();
      const [results] = await connection.query('SELECT * FROM `coach_users` WHERE id = ?', [userId]);
      connection.release(); // Libération de la connexion

      if (results.length === 0) {
          res.status(404).json({ error: 'Results not found' });
      } else {
          const user = results[0];
          console.log(user);

          try {
              const userResults = await Results.find({ id: user.ID }); // Modifier cette ligne selon votre modèle MongoDB
              res.json(userResults);
          } catch (error) {
              console.error('Error executing MongoDB query:', error);
              res.status(500).json({ error: 'Failed to execute MongoDB query' });
          }
      }
  } catch (error) {
      console.error('Erreur lors de la récupération des résultats:', error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des résultats' });
  }
};

  const getModuleIds = async () => {
    try {
      const modules = await Module.find({}, 'id'); // Récupère tous les documents des modules et sélectionne uniquement la propriété `id`
      const moduleIds = modules.map(module => module.id); // Mappe les documents des modules pour obtenir uniquement les `id`
      return moduleIds;
    } catch (error) {
      console.error('Erreur lors de la récupération des ids des modules :', error);
      return []; // En cas d'erreur, retourner un tableau vide ou gérer l'erreur selon vos besoins
    }
  };

  exports.createResults = async (req, res) => {
    try {
      const userId = req.params.userId;
      console.log(userId);
  
      // Appel de la fonction getModuleIds pour récupérer les id des modules
      const moduleIds = await getModuleIds();
  
      const resultObjects = moduleIds.map(moduleId => ({
        id: moduleId,
        isValidModule: [] // Remplacez [true, false, true] par les valeurs souhaitées pour la propriété isValidModule
      }));
  
      const newResult = new Results({
        id: userId,
        results: resultObjects
      });
  
      await newResult.save();
  
      // Envoyer une réponse de succès
      res.json({ success: true });
    } catch (error) {
      console.error('Erreur lors de la création du résultat :', error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la création du résultat' });
    }
  };
  

  exports.getAllResults = async (req, res) => {
    try {
      const allUserResults = await Results.find();
      res.json(allUserResults);
    } catch (error) {
      console.error('Error executing MongoDB query:', error);
      res.status(500).json({ error: 'Failed to execute MongoDB query' });
    }
  };
  

  exports.deleteResult = async (req, res) => {
    try {
      const userId = req.params.userId;
      const resultId = req.params.resultId;
  
      // Supprimer le résultat spécifié de l'utilisateur avec l'ID userId
      await Results.updateOne({ id: userId }, { $pull: { results: { id: resultId } } });
  
      res.status(200).json({ message: 'Le résultat de l\'utilisateur a été supprimé avec succès' });
    } catch (error) {
      console.error('Erreur lors de la suppression du résultat de l\'utilisateur :', error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du résultat de l\'utilisateur' });
    }
  };
  
  
  
  exports.getOrders = async (req, res) => {
    try {
        const userId = req.params.userId;

        const connection = await pool.getConnection();
        const [orders] = await connection.query('SELECT `product_id` FROM `coach_wc_order_product_lookup` WHERE customer_id = ?', [userId]);
        connection.release(); // Libération de la connexion

        res.status(200).json({ orders: orders });
    } catch (error) {
        console.error('Erreur lors de la récupération des commandes:', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des commandes' });
    }
};

exports.getStatus = async (req, res) => {
  try {
      const userId = req.params.userId;

      const connection = await pool.getConnection();
      const [status] = await connection.query('SELECT `action` FROM `coach_wflogins` WHERE `userID`= ? ORDER BY `coach_wflogins`.`ctime` DESC LIMIT 1;', [userId]);
      connection.release(); // Libération de la connexion

      console.log('Status:', status);
      res.status(200).json({ status });
  } catch (error) {
      console.error('Erreur lors de la récupération du statut:', error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du statut' });
  }
};

exports.getPaid = async (req, res) => {
  try {
      const userId = req.params.userId;

      const connection = await pool.getConnection();
      const [modules] = await connection.query('SELECT pm.meta_value AS module_id, ol.customer_id FROM coach_postmeta pm JOIN coach_wc_order_product_lookup ol ON pm.post_id = ol.product_id WHERE pm.meta_key = "module_id" AND ol.customer_id = ?;', [userId]);
      connection.release(); // Libération de la connexion

      console.log('Paid Modules ici:', modules);
      res.status(200).json({ modules });
  } catch (error) {
      console.error('Erreur lors de la récupération des modules payés:', error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des modules payés' });
  }
};

exports.updateResults = (req, res) => {
  const userId = req.params.userId; // Extraire l'ID de l'utilisateur depuis l'URL
  const resultIndex = req.params.resultIndex; // Extraire l'indice du résultat depuis l'URL
  const isValidModuleIndex = req.params.isValidModuleIndex; // Extraire l'indice de isValidModule depuis l'URL

  // Construire le chemin d'accès dynamique pour mettre à jour la propriété spécifiée
  const updatePath = `results.${resultIndex}.isValidModule.${isValidModuleIndex}`;

  // Mettre à jour la propriété isValidModule dans le document Results correspondant
  Results.updateOne(
    { id: userId },
    { $set: { [updatePath]: true } }
  )
    .then((result) => {
      res.status(200).json({ message: "Résultat mis à jour avec succès." });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Une erreur s'est produite lors de la mise à jour du résultat." });
    });
  
};

exports.updateAllUsersResults = async (req, res) => {
  const moduleId = req.params.moduleId;

  try {
    // Update the results of all users with the specified module ID
    await Results.updateMany({ "results.moduleId": moduleId }, { $set: { "results.$[elem].isValidModule": true } }, { arrayFilters: [{ "elem.moduleId": moduleId }] });

    res.status(200).json({ message: "Results updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating the results." });
  }
};

exports.updateResult = async (req, res) => {
  try {
    const { userId, missingResults } = req.body;

    // Rechercher le document Results correspondant à l'ID de l'utilisateur
    const result = await Results.findOne({ id: userId });

    if (!result) {
      return res.status(404).json({ message: 'Results not found' });
    }

    // Mettre à jour le tableau results en ajoutant les missingResults
    missingResults.forEach(missingResultId => {
      const existingResult = result.results.find(r => r.id === missingResultId);
      if (!existingResult) {
        result.results.push({
          id: missingResultId,
          isValidModule: [],
        });
      }
    });

    // Enregistrer les modifications
    await result.save();

    return res.status(200).json({ message: 'Results updated successfully' });
  } catch (error) {
    console.error('Error updating results:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};






