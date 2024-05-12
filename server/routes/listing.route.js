import express from "express";
import { createEstateListing } from "../controller/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();
router.post("/createlisting", verifyToken, createEstateListing);
export default router;
