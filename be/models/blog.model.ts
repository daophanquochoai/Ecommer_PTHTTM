import { DataTypes, DATE } from "sequelize";
import sequelize from "../configs/database";
import slugify from "slugify";

const Blog = sequelize.define("Blog", {
    blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title:{
        type: DataTypes.STRING(500),
        allowNull: false
    },
    content:{
        type: DataTypes.TEXT('long'),
        allowNull: true,
    },
    image_url: {
        type: DataTypes.TEXT('long'),
        allowNull: true
    },
    slug:{
        type: DataTypes.STRING(600),
        allowNull: true
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    timestamps: true,
    tableName: "blogs"
});

Blog.beforeCreate((blog) => {
    blog["slug"] = slugify(`${blog["title"]}-${Date.now()}`, {
      lower: true,
      strict: true,
    });
});

export default Blog;