import express, {Router } from "express"
import * as controller from "../../controllers/client/order.controller";


const router : Router = express.Router();

router.post("/", controller.index);

router.get("/status", controller.orderStatus);

router.get("/detail/:orderId", controller.orderDetail);

router.get("/management", controller.orderManage);

router.get("/history", controller.ordersHistory);

router.get("/recent", controller.ordersRecent);

router.patch("/cancel/:orderId", controller.cancelOrder);


export const orderRoute : Router = router;