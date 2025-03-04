import express, {Router } from "express"
import * as controller from "../../controllers/admin/settingGeneral.controller";

const router : Router = express.Router();

router.get("/about-website", controller.aboutWebsite);

export const settingGeneral : Router = router;