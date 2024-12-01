const express = require("express");
const router = express.Router();
const petController = require("../controllers/petController");

// GET all pets
router.get("/", petController.getAllPets);

// GET single pet
router.get("/:id", petController.getPet);

// POST new pet
router.post("/", petController.createPet);

// PUT update pet
router.put("/:id", petController.updatePet);

// DELETE pet
router.delete("/:id", petController.deletePet);

module.exports = router;
