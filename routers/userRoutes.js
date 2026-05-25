import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Getting all users");
});
router.post("/", (req, res) => {
  res.send("Creating a new user");
});
router.get("/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`Getting user with ID: ${userId}`);
});
router.put("/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`Updating user with ID: ${userId}`);
});
router.delete("/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`Deleting user with ID: ${userId}`);
});

export default router;
