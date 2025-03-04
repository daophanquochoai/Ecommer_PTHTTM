import { Express, Request, Response } from "express";
import Cart from "../../models/cart.model";
import User from "../../models/user.model";
import CartItem from "../../models/cart_item.model";
import Product from "../../models/product.model";
import OrderItem from "../../models/order-item.model";
import Order from "../../models/order.model";
import { DATE, Op, QueryTypes, where } from "sequelize";
import Payment from "../../models/payment.model";
import Rate from "../../models/rate.model";
import sequelize from "../../configs/database";
import Comment from "../../models/comment.model";
import jwt from "jsonwebtoken";
import Blog from "../../models/blog.model";
import { paginationHelper } from "../../helpers/pagination.helper";
import { convertToSlug } from "../../helpers/convert-to-slug.helper";


//[GET] /blogs
export const listBlog = async (req: Request, res: Response) => {
    try {
        const find = {
            deleted: false
        }

        if(req.query["searchKey"])
        {
            const titleFromSearh = req.query["searchKey"] as string;
            let title = convertToSlug(titleFromSearh.toLowerCase());
            find["slug"] = { [Op.like]: `%${title}%` };
            console.log(title)
        }

        const blogsList = await Blog.findAll({
            where: find,
            attributes: {exclude: ['deleted', 'updatedAt']},
            order: [
                ["createdAt", "DESC"]
            ],
            raw: true
       })

       console.log(blogsList);

        const objectPagination = paginationHelper(req, blogsList.length);

        const paginatedBlogs = blogsList.slice(objectPagination["offset"], objectPagination["offset"] + objectPagination["limit"]);
        

        return res.json({
            code: 200,
            message: "Lấy danh sách blogs thành công",
            data: paginatedBlogs,
            totalPage: objectPagination["totalPage"],
            pageNow: objectPagination["page"]
        })
    } catch (error) {
        return res.json({
            code: 500,
            message: "Lỗi lấy danh sách blogs " + error
        })
    }
}

//[GET] /blogs/top-newest
export const listNewestBlog = async (req: Request, res: Response) => {
    try {
        const blogsList = await Blog.findAll({
            where: {
                deleted: false
            },
            attributes: {exclude: ['deleted', 'updatedAt']},
            order: [
                ["createdAt", "DESC"]
            ],
            limit: 6,
            raw: true
       });

        return res.json({
            code: 200,
            message: "Lấy danh sách blogs mới nhất thành công",
            data: blogsList,
        })
    } catch (error) {
        return res.json({
            code: 500,
            message: "Lỗi lấy danh sách blogs mới nhất " + error
        })
    }
}