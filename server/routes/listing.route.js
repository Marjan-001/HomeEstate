import express from "express";
import { createEstateListing, deleteListing } from "../controller/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();
router.post("/createlisting", verifyToken, createEstateListing);
router.delete("/delete/:id", verifyToken,deleteListing)
export default router;
