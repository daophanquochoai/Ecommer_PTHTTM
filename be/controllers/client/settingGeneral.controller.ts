import { Request, Response } from "express";
import Role from "../../models/roles.model";
import { Op } from "sequelize";
import SettingGeneral from "../../models/setting_general";
import { raw } from "mysql2";

//[GET] /settings/about-website
export const aboutWebsite = async (req: Request, res: Response) => {
    try {
        
        const settingGeneral = await SettingGeneral.findOne({raw: true});

        console.log(settingGeneral);

        return res.json({
            code: 200,
            message: "Lấy thông tin cài đặt thành công",
            data: settingGeneral
        });
    } catch (error) {
        return res.json({
            code: 400,
            message: "Lỗi lấy thông tin cài đặt " + error
        });
    }
}