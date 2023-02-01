import express from "express";
import {
  ChangeRole,
  getSession,
  signin,
  signup,
  checkIn,
  getUsers,
  affectAttendeeToCategory,
  notifCategory,
  getNotif,
  deleteCustomer,
  hashPass,
  updateProfile,
  getUtilisateur,
  getDetailsById,
  reset,
  resetPassword,
  resetSubmission,
} from "../controllers/user.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// const UserRouter = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/role/:id", ChangeRole);
router.get("/session", auth, getSession);
router.patch("/check", auth, checkIn);
router.get("/users", auth, getUsers);
router.patch("/users/affect", auth, affectAttendeeToCategory);
router.patch("/notif", auth, notifCategory);
router.get("/notif/get", auth, getNotif);
router.delete("/delete/:customerId", deleteCustomer);
router.post("/hashPass", hashPass);

router.patch("/profile", auth, updateProfile);
router.get("/details", auth, getUtilisateur);
router.get("/qr-details/:id", getDetailsById);

/* reset routes */
router.get("/reset-password", (req, res) => {
  res.render("reset-password");
});
router.get("/reset", (req, res) => {
  res.render("reset");
});
router.post("/reset", reset);
router.get("/reset/:token", resetPassword);
router.post("/reset-password", resetSubmission);
export default router;
