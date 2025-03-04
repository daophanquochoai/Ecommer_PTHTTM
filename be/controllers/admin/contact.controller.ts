import { Express, Request, Response } from "express";
import Category from "../../models/category.model";
import { createTreeHelper } from "../../helpers/create-tree.helper";
import { paginationHelper } from "../../helpers/pagination.helper";
import sequelize from "../../configs/database";
import { QueryTypes } from "sequelize";
import Blog from "../../models/blog.model";
import Contact from "../../models/contact.model";
import sendMail from "../../helpers/send-mail.helper";



//[GET] admin/contacts/
export const index = async (req: Request, res: Response) => {
    try {

        const contactList = await Contact.findAll({
            where: {
                deleted: false
            },
            order: [
                ["createdAt", "DESC"]
            ],
            attributes: {exclude: ['deleted', 'updatedAt']},
            raw: true
       })

       console.log(contactList);

        const objectPagination = paginationHelper(req, contactList.length);

        const paginatedContacts = contactList.slice(objectPagination["offset"], objectPagination["offset"] + objectPagination["limit"]);
        
       console.log(objectPagination);

        return res.json({
            code: 200,
            message: "Lấy danh sách contacts thành công",
            data: paginatedContacts,
            totalPage: objectPagination["totalPage"],
            pageNow: objectPagination["page"]
        })
        
    } catch (error) {
        return res.json({
            code: 400,
            message: "Lỗi lấy danh sách contacts " + error
        })
    }
}

//[GET] admin/contact/detail/:contact_id
export const detail = async (req: Request, res: Response) => {
    try {
        const contact_id = req.params["contact_id"];

        const contact = await Contact.findOne({
            where: {
                deleted: false,
                contact_id: contact_id 
            },
            attributes: {exclude: ['deleted', 'updatedAt']},
            raw: true
       })

        return res.json({
            code: 200,
            message: "Lấy contact thành công",
            data: contact
        })
        
    } catch (error) {
        return res.json({
            code: 400,
            message: "Lỗi lấy contact " + error
        })
    }
}

//[POST] admin/contact/reponse/:contact_id
export const response = async (req: Request, res: Response) => {
    try {
        const contact_id = req.params["contact_id"];

        const {reponseTo, titleResponse, contentResponse} = req.body;

        sendMail(reponseTo, titleResponse, contentResponse);

        await Contact.update({
            isResponsed: 1
        }, {
            where: {
                contact_id: contact_id
            }
        })

        return res.json({
            code: 200,
            message: "Response successfully",
        })
        
    } catch (error) {
        return res.json({
            code: 400,
            message: "Error: Response contact" + error
        })
    }
}

