import express from "express";
const router = express.Router();

import {
  createArtwork,
  getAllArtworks,
  getArtworkById,
  updateArtwork,
  deleteArtwork,
  getArtworkByCategory,
  createStripePaymentIntent,
  confirmStripePayment,
  getUserPurchases,
  searchArtworksByTitle,
  getPurchaseArtworks,
  getAuctionArtworks,
} from "../controllers/show_artwork.js";

import {verifyToken} from "../utils/verifyToken.js";

router.post("/create",verifyToken, createArtwork);

router.get("/all", getAllArtworks);
router.get("/getbyId/:id", getArtworkById);
router.get("/getArtworkByCategory/:category", getArtworkByCategory);
router.put("/update/:id", updateArtwork);
router.delete("/delete/:id",verifyToken, deleteArtwork);


router.post("/:artworkId/create-payment-intent", verifyToken, createStripePaymentIntent);
router.post("/confirm-payment", verifyToken, confirmStripePayment);
router.get("/user-purchases", verifyToken, getUserPurchases);
router.get('/search', searchArtworksByTitle);


router.get("/purchaseartworks", getPurchaseArtworks);
router.get("/auctionsartworks", getAuctionArtworks);



export default router;
