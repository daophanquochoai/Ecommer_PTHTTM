import express, {Router } from "express"
import * as controller from "../../controllers/admin/settingGeneral.controller";
import verifyToken from "../../middlewares/admin/verifyToken.middleware";


const router : Router = express.Router();

router.get("/about-website", controller.aboutWebsite);

router.use(verifyToken);

router.patch("/about-website", controller.aboutWebsitePatch);

router.patch("/contact-infomation", controller.contactsInfomationPatch);

export const settingGeneral : Router = router;