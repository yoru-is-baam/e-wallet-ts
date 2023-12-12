import { Router } from "express";
const router: Router = Router();

import AuthRouter from "./auth.route.js";

router.use("/v1/auth", AuthRouter);

export default router;
