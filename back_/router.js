const express = require('express');
const router = express.Router();

const { getModules, getModule, createModule, updateModule, deleteModule, createStep, updateStep, getStep, deleteStep } = require("./controllers/modules");
const { getUsers, getUserById, getResults, getOrders, getStatus, getPaid, updateResults, updateAllUsersResults, getAllResults, createResults, updateResult, deleteResult } = require('./controllers/users');



// Route racine
router.get('/', (req, res) => {
    res.send('Hello, World!');
});

router.get("/users", getUsers);
router.get("/user/:id", getUserById);
router.get('/users/:userId/results', getResults);
router.post('/users/:userId/results', createResults);
router.delete('/users/:userId/results/:resultId', deleteResult);
router.put('/results', updateResult);
router.get('/users/:userId/orders', getOrders);
router.get('/users/:userId/status', getStatus);
router.get('/users/:userId/paid', getPaid);
router.put("/quizzPage/:userId/:resultIndex/isValidModule/:isValidModuleIndex", updateResults);
router.put("/users/updateStep/:moduleId", updateAllUsersResults);
router.get('/users/results', getAllResults);

router.get("/modules", getModules);
router.get("/modules/:id", getModule);
router.post("/modules", createModule);
router.put("/modules/:id", updateModule);
router.delete("/modules/:id", deleteModule);
router.patch("/modules/:id/steps", createStep);
router.get("/modules/:moduleId/steps/:stepId", getStep);
router.patch("/modules/:moduleId/steps/:stepId", updateStep);
router.delete("/modules/:moduleId/steps/:stepId", deleteStep);

module.exports = router;
