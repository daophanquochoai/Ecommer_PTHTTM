import { Express, Request, Response } from "express";
import Cart from "../../models/cart.model";
import User from "../../models/user.model";
import CartItem from "../../models/cart_item.model";
import Product from "../../models/product.model";
import OrderItem from "../../models/order-item.model";
import Order from "../../models/order.model";
import { DATE, Op, or, QueryTypes, where } from "sequelize";
import Payment from "../../models/payment.model";
import sequelize from "../../configs/database";
import { raw } from "body-parser";
import OrderStatus from "../../models/orderStatus.model";
import Address from "../../models/address.model";


//[POST] /orders
export const index = async (req: Request, res: Response) => {
    try {

        console.log(req.body);

        let {note, address, phone} = req.body["infoCustomer"];
        const method_payment = req.body["method_payment"];

        const user = res.locals.user;

        const cart = await Cart.findOne({
            where: {
                user_id: user["user_id"]
            },
            raw: true,
        });

        if(!cart)
        {
            return res.json({
                code: 404,
                message: "Giỏ hàng không tồn tại!"
            })
        }

        const cartItems = await CartItem.findAll({
            where: {
                cart_id: cart["cart_id"]
            },
            raw: true,
        });

        if(cartItems.length === 0)
        {
            return res.json({
                code: 200,
                message: "Giỏ hàng trống!"
            })
        }
        
        let totalPrice : number = 0;

        // Lưu orders
        const orders = await Order.create({
            cart_id: cart["cart_id"],
            order_status: 1,
            order_date: new Date(),
            order_desc: note,
            order_fee: totalPrice,
            address: address,
            phone: phone
        });

        for (const item of cartItems) {
            const infoProduct = await Product.findOne({
                where: {
                    product_id: item["product_id"],
                },
                raw: true,
            });

            const newPrice = Math.ceil(infoProduct["price_unit"] * ( 1 - (infoProduct["discount"] || 0) / 100));
            const totalPriceItem = newPrice * item["ordered_quantity"];
            totalPrice += totalPriceItem;

            await OrderItem.create({
                order_id: orders.dataValues["order_id"],
                product_id: infoProduct["product_id"],
                ordered_quantity: item["ordered_quantity"],
                price_unit: infoProduct["price_unit"],
                discount: infoProduct["discount"]
            });

            await Product.decrement("quantity", {
                by: item["ordered_quantity"],
                where: {
                    product_id: infoProduct["product_id"],
                }
            })
        }

        await Order.update({
            order_fee: totalPrice,
        },{
            where:{
                order_id: orders.dataValues["order_id"]
            }
        });

        // xóa mục cartItem
        await CartItem.destroy({
            where:{
                cart_id: cart["cart_id"]
            }
        })

        if(method_payment == 1)
        {
            // payment
            await Payment.create({
                order_id: orders.dataValues["order_id"],
                is_payed: 0
                // is_payed: 0, // giả sử mặc định là chưa trả
            });
        }
        else
        {
            // method_payment = momo
        }

        return res.json({
            code: 200,
            message: "Đặt hàng thành công!",
        })

            // return res.json("oke");
    } catch (error) {
        return res.json({
            code: 500,
            message: "Lỗi đặt hàng " + error
        })
    }
}



//[GET] /orders/status
export const orderStatus = async (req: Request, res: Response) => {
    try {
        
        const user = res.locals.user;

        const cart = await Cart.findOne({
            where: {
                user_id: user["user_id"],
            },
            raw: true
        });

        const orderStatus = await OrderStatus.findAll({
            where:{
                [Op.not]: [
                    {status: ['CANCEL MANAGER', 'CANCEL USER', 'DELIVERIED']}
                ]
            },
            raw: true
        });

        console.log(orderStatus);

        const arrayStatus = orderStatus.map(item => {return item["status"]});

        return res.json({
            code: 200,
            message: "Lấy danh sách trạng thái đơn hàng thành công!",
            data: arrayStatus 
        })
    } catch (error) {
        return res.json({
            code: 500,
            message: "Lỗi lấy danh sách trạng thái đơn hàng "  + error
        })
    }
}

//[PATCH] /orders/cancel/:orderId
export const cancelOrder = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.orderId;
        
        const orderExist = await Order.findOne({
            where: {
                order_id: orderId,
                deleted: 0,
            },
            raw: true
        });

        console.log("-----------------------orderOriginal----------------------")
        console.log(orderExist)

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

        if(orderExistStatus["status"] != 'PENDING' && orderExistStatus["status"] != 'PROCESS' && orderExistStatus["status"] != 'SHIPING')
        {
            return res.json({
                code: 400,
                message: "Trạng thái đơn hàng không hợp lệ!"
            })  
        }

        const findIdOrderStatus = await OrderStatus.findOne({
            where: {
                status: 'CANCEL USER'
            },
            raw: true
        })

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
                order_status: findIdOrderStatus["id"]
            }, {
                where: {
                    order_id: orderId
                }
            })
        }
        

        return res.json({
            code: 200,
            message: "Hủy đơn hàng thành công!",
        })
    } catch (error) {
        return res.json({
            code: 500,
            message: "Lỗi hủy đơn hàng "  + error
        })
    }
}

//[GET] /orders/detail/:orderId
export const orderDetail = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.orderId;

        const orderStatus = await OrderStatus.findAll({
            where:{
                [Op.not]: [
                    {status: ['CANCEL MANAGER', 'CANCEL USER']}
                ]
            },
            raw: true
        });

        const order = await Order.findOne({
            where: {
                order_id: orderId,
                deleted: false
            },
            attributes: {exclude: ['deleted']},
            raw: true
        });

        const orderItems = await OrderItem.findAll({
            where: {
                order_id: orderId,
                deleted: false
            },
            raw: true
        });

        // const infoAddress = await Address.findOne({
        //     where: {
        //         address_id: order["address"]
        //     },
        //     raw: true
        // });
        // order["address_name"] = infoAddress["address_name"]

        const dataOrderItem = [];

        for (let item of orderItems) {
            const infoProduct = await Product.findOne({
                where: {
                    product_id: item["product_id"],
                    deleted: false
                },
                attributes: {exclude: ['deleted', 'createdAt', 'updatedAt']},
                raw: true
            });
            const newPrice = Math.ceil(infoProduct["price_unit"] * (1 - (infoProduct["discount"] || 0) / 100));
            dataOrderItem.push({
                ...infoProduct,
                newPrice: newPrice,
                image_url: JSON.parse(infoProduct["image_url"])[0]
            })
        }

        

        return res.json({
            code: 200,
            message: "Lấy đơn hàng chi tiết thành công!",
            listStatus: orderStatus,
            statusActive: order["order_status"],
            dataOrder: order,
            dataOrderItem: dataOrderItem
        })
    } catch (error) {
        return res.json({
            code: 500,
            message: "Lỗi lấy đơn hàng chi tiết "  +error
        })
    }
}

//[GET] /orders/management
export const orderManage = async (req: Request, res: Response) => {
    try {
        
        const user = res.locals.user;


        const cart = await Cart.findOne({
            where: {
                user_id: user["user_id"],
            },
            raw: true
        });


        const orders = await sequelize.query(`
            SELECT orders.order_id, orders.order_status, orderstatus.status, order_fee, order_date, order_desc, orders.phone
            FROM orders 
            JOIN 
                order_items ON orders.order_id = order_items.order_id
            JOIN
                orderstatus ON orders.order_status = orderstatus.id
            WHERE orders.cart_id = ${cart["cart_id"]}
            `
        ,
           {
                type: QueryTypes.SELECT,
                raw: true
           }
        )

        return res.json({
            code: 200,
            message: "Lấy danh sách đặt hàng thành công!",
            data: orders
        })
    } catch (error) {
        return res.json({
            code: 500,
            message: "Lỗi lấy danh sách đặt hàng "  +error
        })
    }
}

//[GET] /orders/history
export const ordersHistory = async (req: Request, res: Response) => {
    try {
        
        const user = res.locals.user;


        const cart = await Cart.findOne({
            where: {
                user_id: user["user_id"],
            },
            raw: true
        });


        const orders = await sequelize.query(`
            SELECT orders.order_id, orders.order_status, order_date
            FROM orders 
            JOIN
                orderstatus ON orders.order_status = orderstatus.id and orderstatus.status='DELIVERIED'
            WHERE orders.cart_id = ${cart["cart_id"]}
            `
        ,
           {
                type: QueryTypes.SELECT,
                raw: true
           }
        )

        for (const item of orders) {
            const ordersItem = await OrderItem.findAll({
                where: {
                    order_id: item["order_id"]
                },
                attributes: {exclude: ['createdAt', 'updatedAt', 'deleted']},
                raw: true
            });
            // console.log(ordersItem);
            for (const orderItem of ordersItem) {
                const infoProduct = await Product.findOne({
                    where: {
                        product_id: orderItem["product_id"],
                    },
                    raw: true
                });
                orderItem["image_url"] = infoProduct["image_url"];
                orderItem["product_title"] = infoProduct["product_title"];
                orderItem["newPrice"] = Math.ceil(infoProduct["price_unit"] * (1 - (infoProduct["discount"] == null ? 0 : infoProduct["discount"]) / 100))
            }
            item["orderItems"] = ordersItem;
        }

        return res.json({
            code: 200,
            message: "Lấy danh sách đơn hàng đã giao thành công!",
            data: orders
        })
    } catch (error) {
        return res.json({
            code: 500,
            message: "Lỗi lấy danh sách đơn hàng đã giao "  +error
        })
    }
}

//[GET] /orders/recent
export const ordersRecent= async (req: Request, res: Response) => {
    try {
        
        const user = res.locals.user;


        const cart = await Cart.findOne({
            where: {
                user_id: user["user_id"],
            },
            raw: true
        });

        const orderStatus = await OrderStatus.findAll({
            where:{
                [Op.not]: [
                    {status: ['CANCEL MANAGER', 'CANCEL USER', 'DELIVERIED']}
                ]
            },
            raw: true
        });

        const arrayStatus = orderStatus.map(item => {return item["status"]});


        const orders = await sequelize.query(`
            SELECT orders.order_id, orderstatus.status
            FROM orders 
            JOIN
                orderstatus ON orders.order_status = orderstatus.id and orderstatus.status !='DELIVERIED' and orderstatus.status !='CANCEL USER' and orderstatus.status !='CANCEL MANAGER'
            WHERE orders.cart_id = ${cart["cart_id"]}
            ORDER BY orders.createdAt DESC
            `
        ,
           {
                type: QueryTypes.SELECT,
                raw: true
           }
        )

        for (const item of orders) {

            item["index"] = arrayStatus.findIndex(i => i == item["status"]);

            const ordersItem = await OrderItem.findAll({
                where: {
                    order_id: item["order_id"]
                },
                attributes: {exclude: ['createdAt', 'updatedAt', 'deleted', 'order_id']},
                raw: true
            });
            // console.log(ordersItem);
            for (const orderItem of ordersItem) {
                const infoProduct = await Product.findOne({
                    where: {
                        product_id: orderItem["product_id"],
                    },
                    raw: true
                });
                orderItem["image_url"] = infoProduct["image_url"];
                orderItem["product_title"] = infoProduct["product_title"];
                orderItem["newPrice"] = Math.ceil(infoProduct["price_unit"] * (1 - (infoProduct["discount"] == null ? 0 : infoProduct["discount"]) / 100))
            }
            item["orderItems"] = ordersItem;
        }

        return res.json({
            code: 200,
            message: "Lấy danh sách đơn hàng gần đây thành công!",
            data: orders
        })
    } catch (error) {
        return res.json({
            code: 500,
            message: "Lỗi lấy danh sách đơn hàng gần đây "  +error
        })
    }
}

//[GET] /orders/index-status/
export const orderIndexStatus= async (req: Request, res: Response) => {
    try {
        
        const user = res.locals.user;


        const cart = await Cart.findOne({
            where: {
                user_id: user["user_id"],
            },
            raw: true
        });


        const orders = await sequelize.query(`
            SELECT orders.order_id, orderstatus.status
            FROM orders 
            JOIN
                orderstatus ON orders.order_status = orderstatus.id and orderstatus.status !='DELIVERIED' and orderstatus.status !='CANCEL USER' and orderstatus.status !='CANCEL MANAGER'
            WHERE orders.cart_id = ${cart["cart_id"]}
            ORDER BY orders.createdAt DESC
            `
        ,
           {
                type: QueryTypes.SELECT,
                raw: true
           }
        )

        for (const item of orders) {
            const ordersItem = await OrderItem.findAll({
                where: {
                    order_id: item["order_id"]
                },
                attributes: {exclude: ['createdAt', 'updatedAt', 'deleted', 'order_id']},
                raw: true
            });
            // console.log(ordersItem);
            for (const orderItem of ordersItem) {
                const infoProduct = await Product.findOne({
                    where: {
                        product_id: orderItem["product_id"],
                    },
                    raw: true
                });
                orderItem["image_url"] = infoProduct["image_url"];
                orderItem["product_title"] = infoProduct["product_title"];
                orderItem["newPrice"] = Math.ceil(infoProduct["price_unit"] * (1 - (infoProduct["discount"] == null ? 0 : infoProduct["discount"]) / 100))
            }
            item["orderItems"] = ordersItem;
        }

        return res.json({
            code: 200,
            message: "Lấy danh sách đơn hàng gần đây thành công!",
            data: orders
        })
    } catch (error) {
        return res.json({
            code: 500,
            message: "Lỗi lấy danh sách đơn hàng gần đây "  +error
        })
    }
}

