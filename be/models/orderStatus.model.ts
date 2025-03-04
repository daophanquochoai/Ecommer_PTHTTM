import { DataTypes } from "sequelize";
import sequelize from "../configs/database";


const OrderStatus = sequelize.define("OrderStatus", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    status: {
        type: DataTypes.STRING(30),
    }
 },{
    tableName: 'orderstatus',
    timestamps: false, // Tự động quản lý createdAt và updatedAt
  });


export default OrderStatus;