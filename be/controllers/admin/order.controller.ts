import { Express, Request, Response } from "express";
import Category from "../../models/category.model";
import { createTreeHelper } from "../../helpers/create-tree.helper";
import { paginationHelper } from "../../helpers/pagination.helper";
import sequelize from "../../configs/database";
import { Op, QueryTypes } from "sequelize";
import Blog from "../../models/blog.model";
import Contact from "../../models/contact.model";
import Order from "../../models/order.model";
import Payment from "../../models/payment.model";
import Address from "../../models/address.model";
import Product from "../../models/product.model";
import OrderItem from "../../models/order-item.model";
import Cart from "../../models/cart.model";
import User from "../../models/user.model";
import OrderStatus from "../../models/orderStatus.model";



//[GET] admin/orders
export const index = async (req: Request, res: Response) => {
    try {

        const listOrder = await Order.findAll({
            where: {
                deleted: false
            },
            order: [
                ['order_date', 'desc']
            ],
            raw: true
        })

        for (const item of listOrder) {
            const infoPayment = {};
            const orderStatus = await OrderStatus.findOne({
                where: {
                    id: item["order_status"]
                },
                raw: true
            });

            
            // lấy thông in payment luôn -- lỡ rồi
            const paymentInfo = await Payment.findOne({
                where:{
                    order_id: item["order_id"],
                },
                raw: true
            })

            infoPayment["order_id"] = item["order_id"];
            infoPayment["payment_status"] = orderStatus["status"];
            infoPayment["payment_status_id"] = orderStatus["id"];
            infoPayment["payment_id"] = paymentInfo["payment_id"];
            infoPayment["is_payed"] = paymentInfo["is_payed"];
            infoPayment["method_payment"] = paymentInfo["method_payment"];
            
            // console.log("payment=====================>", paymentInfo)
            //end lấy thông in payment luôn

            item["infoPayment"] = infoPayment

            // const infoAddress = await Address.findOne({
            //     where:{
            //         address_id: item["address"]
            //     },
            //     raw: true
            // });

            // item["address"] = infoAddress["address_name"];


            const cart = await Cart.findOne({
                where: {
                    cart_id: item["cart_id"]
                },
                raw: true
            });

            const user = await User.findOne({
                where: {
                    user_id: cart["user_id"],
                },
                attributes:{exclude: ['deleted', 'createdAt', 'updatedAt']},
                raw: true
            });
            item["infoUser"] = user;
        }

        const objectPagination = paginationHelper(req, listOrder.length);

        const paginatedOrders = listOrder.slice(objectPagination["offset"], objectPagination["offset"] + objectPagination["limit"]);
        

        return res.json({
            code: 200,
            message: "Lấy danh sách đơn hàng thành công",
            data: paginatedOrders,
            totalPage: objectPagination["totalPage"],
            pageNow: objectPagination["page"]
        })
        
    } catch (error) {
        return res.json({
            code: 400,
            message: "Lỗi lấy danh sách đơn hàng " + error
        })
    }
}

//[GET] admin/orders/status-payment
export const statusPayment = async (req: Request, res: Response) => {
    try {
        
        const listStatus = await OrderStatus.findAll({raw: true});

        return res.json({
            code: 200,
            message: "Lấy danh sách trạng thái thành công",
            data: listStatus
        })
        
    } catch (error) {
        return res.json({
            code: 400,
            message: "Lỗi lấy danh sách trạng thái " + error
        })
    }
}


//[post] admin/orders/status-change/order-id/:status-id
export const changeStatus = async (req: Request, res: Response) => {
    try {
        
        const statusId= parseInt(req.params["statusId"] as string);
        const orderId = parseInt(req.params["orderId"] as string);

        const orderExist = await Order.findOne({
            where: {
                order_id: orderId,
                deleted: 0,
            },
            raw: true
        });

        // console.log("---------------------------------------------")
        // console.log(orderExist)

        if(!orderExist)
        {
            return res.json({
                code: 400,
                message: "Không có đơn hàng!"
            })  
        }

        const orderExistStatus = await OrderStatus.findOne({
            where: {
                id: orderExist["order_status"]
            },
            raw: true
        });

        // if(orderExistStatus["status"] != 'PENDING' && orderExistStatus["status"] != 'PROCESS' && orderExistStatus["status"] != 'SHIPING')
        // {
        //     return res.json({
        //         code: 400,
        //         message: "Không thể thay đổi trạng thái đơn hàng đã hủy hoặc đã được giao!"
        //     })  
        // }


        if(orderExistStatus["status"] == 'CANCEL USER' || orderExistStatus["status"] == 'CANCEL MANAGER') // đã hủy
        {
            return res.json({
                code: 400,
                message: "Không thể thay đổi trạng thái đã hủy sản phẩm"
            })  
        }

        if(orderExistStatus["status"] == 'DELIVERIED') // sản phẩm đã được giao hàng 
        {
            return res.json({
                code: 400,
                message: "Không thể thay đổi trạng thái đã được giao"
            })  
        }

        const orderStatusChange =  await OrderStatus.findOne({
            where: {
                id: statusId
            },
            raw: true
        });


        // nếu đang ship thì không thể hủy đơn hàng VÀ chỉ có thể là đã giao hàng. Nếu khác ship thì có 2 trường hợp:
        // - Có thể là pending hoặc process thôi. Từ đây có thể hủy đơn hàng hoặc đi lên một bậc (pending --> process --> ship)

        if(orderExistStatus["status"]  != "SHIPING")
        {
            // Nếu từ PROCESS quay về PENDING thì không cho
            if(orderExistStatus["status"]  == "PROCESS" &&  orderStatusChange["status"] == 'PENDING')
            {
                return res.json({
                    code: 400,
                    message: "Không thể thay đổi trạng thái từ PROCESS về " + orderStatusChange["status"]
                })  
            }

            // Nếu từ PROCESS lên DELEVERID thì không cho
            if(orderExistStatus["status"]  == "PROCESS" &&  orderStatusChange["status"] == 'DELIVERIED')
                {
                    return res.json({
                        code: 400,
                        message: "Không thể thay đổi trạng thái từ PROCESS lên " + orderStatusChange["status"]
                    })  
                }

            // Nếu là PENDING thì phải lên PROCESS
            if(orderExistStatus["status"]  == "PENDING" && orderStatusChange["status"] != 'PROCESS')
            {
                return res.json({
                    code: 400,
                    message: "Không thể thay đổi trạng thái từ PENDING lên " + orderStatusChange["status"]
                })  
            }

            // Tại các trạng thái này thì shop có thể hủy đơn hàng
            if(orderStatusChange["status"] == 'CANCEL MANAGER' || orderStatusChange["status"] == 'CANCEL USER')  // nếu lựa chọn là hủy
            {
                // tìm những sản phẩm của đơn hàng
                const orderItems = await OrderItem.findAll({
                    where: {
                        order_id: orderId
                    },
                    raw: true
                });

                for (const item of orderItems) {

                    const infoProduct = await Product.findOne({
                        where: {
                            product_id : item["product_id"]
                        },
                        raw: true
                    })

                    //  trả lại số lượng sản phẩm cho kho
                    await Product.increment("quantity", {
                        by: item["ordered_quantity"],
                        where: {
                            product_id: infoProduct["product_id"],
                        }
                    })

                    //  Hủy sản phẩm khỏi đơn hàng

                    // await OrderItem.destroy({
                    //     where: {
                    //         [Op.and]: [{ order_id: orderId }, { product_id: infoProduct["product_id"] }],
                    //     }
                    // })

                    // 
                    await Order.update({
                        order_status: statusId
                    }, {
                        where: {
                            order_id: orderId
                        }
                    })
                }
            }
        }
        else
        {
            // Nếu là ship thì chỉ có thể đi lên deliveried
            if(orderStatusChange["status"] != 'DELIVERIED')
            {
                const statusChange = orderStatusChange["status"] == "CANCEL MANAGER" ? "CANCEL" :  orderStatusChange["status"];
                return res.json({
                    code: 400,
                    message: "Không thể thay đổi trạng thái SHIPING thành " + statusChange
                })  
            }
        }

        // đúng thì cập nhật trạng thái
        await Order.update({
            order_status: statusId
        }, {
            where: {
                order_id: orderId
            }
        })

        // Nếu trạng thái là GIAO HÀNG và thanh toán là Tiền mặt thì cập nhật lại đã thanh toán đơn hàng
        const paymentOfOrder = await Payment.findOne({
            where: {
                order_id: orderId,
            },
            raw: true
        });

        if(orderStatusChange["status"] == 'DELIVERIED' && paymentOfOrder["method_payment"] == "cash")
        {
            await Payment.update({
                is_payed: 1
            }, {
                where: {
                    payment_id: paymentOfOrder["payment_id"]
                }
            })
        }

        
        

        return res.json({
            code: 200,
            message: "Thay đổi trạng thái thành công",
        })
        
    } catch (error) {
        return res.json({
            code: 400,
            message: "Lỗi thay đổi trạng thái " + error
        })
    }
}


