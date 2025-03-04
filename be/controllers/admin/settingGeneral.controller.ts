import { Request, Response } from "express";
import Role from "../../models/roles.model";
import { Op } from "sequelize";
import SettingGeneral from "../../models/setting_general";
import { raw } from "mysql2";

//[GET] /admin/settings/about-website
export const aboutWebsite = async (req: Request, res: Response) => {
    try {
        
        const settingGeneral = await SettingGeneral.findOne({raw: true});

        console.log(settingGeneral);

        return res.json({
            code: 200,
            message: "Lấy thông tin cài đặt logo thành công",
            data: settingGeneral
        });
    } catch (error) {
        return res.json({
            code: 400,
            message: "Lỗi lấy thông tin cài đặt - logo - " + error
        });
    }
}

//[PATCH] /admin/settings/about-website
export const aboutWebsitePatch = async (req: Request, res: Response) => {
    try {
        
        const settingGeneral = await SettingGeneral.findOne({raw: true});

        console.log(settingGeneral);

        console.log(req.body.name); // logo, name
        console.log(req.body.logo); // logo, name

        if(settingGeneral)
        {
            // update
            await SettingGeneral.update({
                // ...req.body
                name: req.body["name"] ? req.body["name"] : null,
                logo: req.body["logo"] ? req.body["logo"] : null
            }, {
                where: {
                    id: settingGeneral["id"]
                }
            })
        }
        else
        {
            await SettingGeneral.create(req.body);
        }

        return res.json({
            code: 200,
            message: "Cập nhật thông tin cài đặt logo thành công",
        });
    } catch (error) {
        return res.json({
            code: 400,
            message: "Lỗi cập nhật thông tin cài đặt - logo - " + error
        });
    }
}

//[PATCH] /admin/settings/contact-infomation
export const contactsInfomationPatch = async (req: Request, res: Response) => {
    try {
        
        const settingGeneral = await SettingGeneral.findOne({raw: true});

        console.log(settingGeneral);
        console.log(req.body);

        if(settingGeneral)
        {
            // update
            await SettingGeneral.update({
                // ...req.body
                address: req.body["address"] ? req.body["address"] : null,
                contact_phone: req.body["contact_phone"] ? req.body["contact_phone"] : null,
                contact_email: req.body["contact_email"] ? req.body["contact_email"] : null
            }, {
                where: {
                    id: settingGeneral["id"]
                }
            })
        }
        else
        {
            await SettingGeneral.create(req.body);
        }

        return res.json({
            code: 200,
            message: "Cập nhật thông tin liên lạc thành công",
        });
    } catch (error) {
        return res.json({
            code: 400,
            message: "Lỗi cập nhật thông tin liên lạc " + error
        });
    }
}


