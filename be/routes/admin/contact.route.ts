import express, {Router } from "express"
import * as controller from "../../controllers/admin/contact.controller";

const router : Router = express.Router();

router.get("/", controller.index);

router.get("/detail/:contact_id", controller.detail);

router.post("/response/:contact_id", controller.response);

export const contactRoute : Router = router;