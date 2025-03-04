import { DataTypes, DATE } from "sequelize";
import sequelize from "../configs/database";

const SettingGeneral = sequelize.define("SettingGeneral", {
    id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    logo : {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
    contact_phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    contact_email:{
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    slider_image:{
        type: DataTypes.TEXT('long'),
        allowNull: true,
    },
}, {
    timestamps: false,
    tableName: "settinggeneral"
});

export default SettingGeneral;