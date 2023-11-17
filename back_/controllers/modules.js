const Module = require("../Model/Module");

const getModules = (req, res) => {
  Module.find()
      .then((modules) => {
          res.json(modules);
          console.log('les modules');
      })
      .catch((err) => {
          res.status(500).send(err.message);
      });
};

const getModule = (req, res) => {
  const moduleId = req.params.id; 

  Module.findById(moduleId)
    .then((module) => {
      if (!module) {
        
        return res.status(404).json({ message: "Module not found" });
      }
      console.log('le module')
      res.json(module);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createModule = async (req, res) => {
  try {
    const newModule = new Module({
      id: req.body.id,
      module_img: req.body.module_img,
      title: req.body.title,
      description: req.body.description,
      welcome: req.body.welcome,
      subtitle: req.body.subtitle,
      presentation_gen: req.body.presentation_gen,
      presentation_spe: req.body.presentation_spe,
    });
    // Enregistrer le module dans la base de données
    const savedModule = await newModule.save();
    res.json(savedModule);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateModule = (req, res) => {
  const moduleId = req.params.id;

  Module.findByIdAndUpdate(
    moduleId,
    {
      $set: req.body,
    },
    { new: true }
  )
    .then((updatedModule) => {
      if (!updatedModule) {
        return res.status(404).json({ message: "Module not found" });
      }
      res.json(updatedModule);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const deleteModule = (req, res) => {
  const moduleId = req.params.id;

  Module.findByIdAndRemove(moduleId)
    .then((deletedModule) => {
      if (!deletedModule) {
        return res.status(404).json({ message: "Module not found" });
      }
      res.json({ message: "Module deleted successfully" });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createStep = async (req, res) => {
  try {
    const moduleId = req.params.id;
    const stepData = req.body;

    // Vérifier si le module existe et le récupérer de la base de données
    const module = await Module.findById(moduleId);

    if (!module) {
      return res.status(404).json({ message: "Module non trouvé" });
    }

    // Ajouter la nouvelle étape au tableau "steps" du module
    module.steps.push(stepData);
    await module.save();

    res.status(201).json(module);
  } catch (error) {
    console.error("Erreur lors de la création de l'étape :", error);
    res.status(500).json({ message: "Erreur lors de la création de l'étape" });
  }
};

const updateStep = async (req, res) => {
  try {
    const moduleId = req.params.moduleId;
    const stepId = req.params.stepId;
    const updatedStepData = req.body;
    console.log(moduleId, stepId);


    // Vérifier si le module existe et le récupérer de la base de données
    const module = await Module.findById(moduleId);

    if (!module) {
      return res.status(404).json({ message: "Module non trouvé" });
    }

    // Vérifier si l'étape existe dans le module
    const stepIndex = module.steps.findIndex((step) => step.id === stepId);

    if (stepIndex === -1) {
      return res.status(404).json({ message: "Étape non trouvée dans le module" });
    }

    // Mettre à jour les données de l'étape
    module.steps[stepIndex] = updatedStepData;
    await module.save();

    res.json(module);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'étape :", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'étape" });
  }
};

const getStep = (req, res) => {
  const moduleId = req.params.moduleId;
  const stepId = req.params.stepId;

  Module.findById(moduleId)
    .then((module) => {
      if (!module) {
        return res.status(404).json({ message: "Module not found" });
      }

      const step = module.steps.find((step) => step.id === stepId);
      if (!step) {
        return res.status(404).json({ message: "Step not found" });
      }

      res.json(step);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const deleteStep = async (req, res) => {
  const moduleId = req.params.moduleId;
  const stepId = req.params.stepId;
  

  try {
    // Récupérer le module avec l'ID spécifié
    const module = await Module.findById(moduleId);

    if (!module) {
      return res.status(404).json({ error: 'Module non trouvé' });
    }

    // Vérifier si l'étape existe dans le module
    const stepIndex = module.steps.findIndex(step => step.id.toString() === stepId);
    
   

    if (stepIndex === -1) {
      return res.status(404).json({ error: 'Étape non trouvée' });
    }

    // Supprimer l'étape du module
    module.steps.splice(stepIndex, 1);
    console.log(stepIndex);
    // Enregistrer les modifications du module
    await module.save();

    res.status(200).json({ message: 'Étape supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de l\'étape' });
  }
};



module.exports = {
  getModules,
  getModule,
  createModule,
  updateModule,
  deleteModule,
  createStep,
  updateStep,
  getStep,
  deleteStep
};