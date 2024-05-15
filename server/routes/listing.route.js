import express from "express";
import { createEstateListing, deleteListing, updateListing } from "../controller/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();
router.post("/createlisting", verifyToken, createEstateListing);
router.delete("/delete/:id", verifyToken,deleteListing)
router.post('/update/:id', verifyToken,updateListing)
export default router;
