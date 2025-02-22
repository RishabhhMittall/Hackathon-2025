import express from "express"
import {getAllAdmins, getSoldPlayers, getTrendingPlayers, portalHomeStats } from "../../controllers/admin/home/admin.home.controller.js";

const router=express();



router.get('/home-stats',portalHomeStats);
router.get('/trending-players',getTrendingPlayers);
router.get('/recently-sold',getSoldPlayers);
router.get('/employee-details',getAllAdmins);




export default router;