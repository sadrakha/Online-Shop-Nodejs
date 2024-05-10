const bcrypt = require("bcryptjs");

const sequelize = require("../../utils/sequelize.service");
const User = require("../../model/user");
const Products = require("../../model/product");
const comment = require("../../model/comment");
const Category = require("../../model/mainCategory");
const SubCategory = require("../../model/subCategory");
const { generateToken } = require("../../helper/jwt");
const { Op } = require("sequelize");
const { webConvertor } = require("../../helper/imageConvertor");

class UserService {
  constructor() {
    this.User = new sequelize(User);
    this.Products = new sequelize(Products);
    this.comment = new sequelize(comment);
    this.Category = new sequelize(Category);
    this.SubCategory = new sequelize(SubCategory);
  }

  async signUp(req) {
    try {
      const userName = req.body.userName;
      const email = req.body.email;
      const age = req.body.age;
      const phone = req.body.phone;
      const address = req.body.address;
      const photo = await webConvertor(
        req.files.profile[0].path,
        "upload/images/",
        req.files.profile[0].filename.split(".")[0],
        40,
        40
      );
      const roleId = 1;
      if (req.body.password !== req.body.comfirmPass) {
        return error;
      }
      const password = await bcrypt.hash(req.body.password, 12);
      const user = await this.User.create({
        userName,
        email,
        age,
        phone,
        photo,
        address,
        password,
        roleId,
      });
      const accessToken = generateToken(user.id);
      return { user, accessToken };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async logIn(req) {
    try {
      let user;
      if (req.email) {
        user = await this.User.findOne({ where: { email: req.email } });
      }
      if (req.userName) {
        user = await this.User.findOne({ where: { userName: req.userName } });
      }
      const password = req.body.password;
      if (!bcrypt.compareSync(password, user.password)) {
        return error;
      }
      req.user = user;
      const accessToken = generateToken(user.id);
      let result = { accessToken };
      result.user = user;
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async main(req) {
    try {
      const products = await this.Products.findAll();
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }
  async user(req) {
    try {
      const result = await this.User.findOne({ where: { id: req.params.id } });
      if (!result) {
        throw new Error("no such user");
      }
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateUser(req) {
    try {
      const userName = req.body.userName;
      const email = req.body.email;
      const photo = req.files.profile[0].path;
      const age = req.body.age;
      const phone = req.body.phone;
      const address = req.body.address;
      if (req.body.password !== req.body.comfirmPass) {
        return error;
      }
      const password = await bcrypt.hash(req.body.password, 12);
      const user = await this.User.findOneAndUpdate(
        {
          userName,
          email,
          age,
          phone,
          photo,
          address,
          password,
        },
        req.user.id
      );
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(req) {
    try {
      const result = await this.User.delete({ where: { id: req.user.id } });
      return { result };
    } catch (error) {
      throw new Error(error);
    }
  }
  async product(req) {
    try {
      const product = await this.Products.findOne({
        where: { id: req.params.id },
      });
      const comment = await this.comment.findAll({
        where: { productId: product.id },
      });
      return [product, comment];
    } catch (error) {
      throw new Error(error);
    }
  }
  async provider(req) {
    try {
      const provider = await this.User.findOne({
        where: { id: req.params.id },
      });
      return provider;
    } catch (error) {
      throw new Error(error);
    }
  }
  async category(req) {
    try {
      const category = await this.Category.findAll();
      const categoryCount = await this.Category.count();
      let result = [];

      for (let i = 0; i < categoryCount; i++) {
        const categoryId = category[i].id;
        if (await this.SubCategory.findAll({ where: { categoryId } })) {
          const subCategory = await this.SubCategory.findAll({
            where: { categoryId },
          });
          result.push({ category: category[i], subcategory: subCategory });
        }
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async search(req) {
    try {
      let tag = req.query.tag;
      let tagArry = [];
      let result = [];

      if (tag.split(" ") || tag.split("&")) {
        for (let i = 0; i < tag.split(" ").length; i++) {
          tagArry.push(tag.split(" ")[i]);
          const product = await this.Products.findAll({
            where: { name: { [Op.like]: "%" + tagArry[i] + "%" } },
          });
          if (!result) {
            throw new Error("no such product");
          }
          result.push(product);
        }
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = UserService;
