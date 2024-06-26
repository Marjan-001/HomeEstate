import express from "express";
import { createEstateListing, deleteListing, getListing, getListings, updateListing } from "../controller/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();
router.post("/createlisting", verifyToken, createEstateListing);
router.delete("/delete/:id", verifyToken,deleteListing)
router.post('/update/:id', verifyToken,updateListing)
router.get('/getListing/:id', getListing)
router.get('/get', getListings)
export default router;
