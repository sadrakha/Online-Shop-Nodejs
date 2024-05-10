const product = require("../../model/product");
const category = require("../../model/mainCategory");
const subCategory = require("../../model/subCategory");
const favourite = require("../../model/favourite");
const list = require("../../model/lists");
const listProduct = require("../../model/list");
const order = require("../../model/order");
const formerOrders = require("../../model/formerOrder");
const formerOrdersProduct = require("../../model/orders");
const sequelize = require("../../utils/sequelize.service");
const { where } = require("sequelize");
const { webConvertor } = require("../../helper/imageConvertor");
const comment = require("../../model/comment");
class productService {
  constructor() {
    this.product = new sequelize(product);
    this.favourite = new sequelize(favourite);
    this.list = new sequelize(list);
    this.listProduct = new sequelize(listProduct);
    this.order = new sequelize(order);
    this.formerOrder = new sequelize(formerOrders);
    this.formerOrdersProduct = new sequelize(formerOrdersProduct);
    this.category = new sequelize(category);
    this.comment = new sequelize(comment);
    this.subcategory = new sequelize(subCategory);
  }
  async create(req) {
    try {
      const title = req.body.title;
      const description = req.body.description;
      const price = req.body.price;
      const discount = req.body.discount;
      const visibility = req.body.visibility;
      const stock = req.body.stock;
      const userId = req.user.id;
      const subCategoryId = req.body.subCategoryId;
      const photo = await webConvertor(
        req.files.images[0].path,
        "uploads/images",
        req.files.images[0].name,
        40,
        40
      );
      const result = await this.product.create({
        name: title,
        description,
        price,
        photo,
        discount,
        visibility,
        stock,
        userId,
        // subCategoryId:1,
      });
      return result;
    } catch (error) {
      return error;
    }
  }
  async edit(req) {
    try {
      const id = req.params.id;

      const title = req.body.title;
      const description = req.body.description;
      const price = req.body.price;
      const photo = req.files.images[0].path;
      const discount = req.body.discount;
      const visibility = req.body.visibility;
      const stock = req.body.stock;
      const userId = req.user.id;
      const subCategoryId = req.body.subCategoryId;
      const result = await this.product.findOneAndUpdate(
        {
          name: title,
          description,
          price,
          photo,
          discount,
          visibility,
          stock,
          userId,
          // subCategoryId:1,
        },
        id
      );

      return result;
    } catch (error) {
      return error;
    }
  }
  async delete(req) {
    const result = await this.product.delete({ where: { id: req.params.id } });
    return { result };
  }

  async showFav(req) {
    try {
      const fav = await this.favourite.findAll({
        where: { userId: req.user.id },
      });
      let result = [];

      for (let i = 0; i < fav.length; i++) {
        console.log(i);

        const product = await this.product.findOne({
          where: { id: fav[i].productId },
        });
        result.push(product);
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addToFav(req) {
    try {
      const userId = req.user.id;

      const productId = await this.product.findOne({
        where: { id: req.params.id },
      });
      if (!productId) {
        throw new Error("no such product");
      }
      // const product=req.params.id
      const result = await this.favourite.create({
        userId,
        productId: productId.id,
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async removeFromFav(req) {
    try {
      const userId = req.user.id;

      const id = req.params.id;
      if (!id) {
        throw new Error("no such product");
      }
      const result = await this.favourite.delete({ where: { id } });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getOrder(req) {
    try {
      const result = await this.order.findAll();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addOrder(req) {
    try {
      const address = req.user.address;
      const productId = await this.product.findOne({
        where: { id: req.params.id },
      });
      const duplicateProduct = await this.order.findOne({
        where: { productId: productId.id },
      });
      if (duplicateProduct) {
        throw new Error("this product already exists");
      }
      const result = await this.order.create({
        address,
        productId: productId.id,
        userId: req.user.id,
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteFromOrder(req) {
    try {
      const productId = req.params.id;
      const result = await this.order.delete({ where: { productId } });
      return { result };
    } catch (error) {
      throw new Error(error);
    }
  }
  async getFormer(req) {
    try {
      const formerOrder = await this.formerOrder.findAll();
      let result = [];
      for (let i = 0; i < formerOrder.length; i++) {
        const productId = await this.formerOrdersProduct.findAll({
          where: { formerOrderId: formerOrder[i].id },
        });
        for (let j = 0; j < productId.length; j++) {
          const product = await this.product.findOne({
            where: { id: productId[j].productId },
          });
          result.push({ formerOrder: formerOrder[i], product: product });
        }
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async orderSent(req) {
    try {
      const product = await this.order.findAll();
      const userId = req.user.id;
      const result = await this.formerOrder.create({ userId: userId });

      for (let i = 0; i < product.length; i++) {
        const productId = product[i].productId;
        const formerProduct = await this.formerOrdersProduct.create({
          formerOrderId: result.id,
          productId,
        });
      }
      const deleteOrder = await this.order.delete({ where: {} });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async addList(req) {
    try {
      console.log(2);
      const title = req.body.title;
      const userId = req.user.id;
      const result = await this.list.create({ title, userId });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async addProductToList(req) {
    try {
      const list = req.body.listId;
      const listId = await this.list.findOne({ where: { id: list } });
      const product = await this.product.findOne({
        where: { id: req.body.productId },
      });
      const productId = product.id;

      const existedProduct = await this.listProduct.findOne({
        where: { allListId: listId.id, productId },
      });
      if (!listId || !product || existedProduct) {
        throw new Error("try again");
      }
      const result = await this.listProduct.create({
        allListId: listId.id,
        productId,
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async showLists(req) {
    try {
      const lists = await this.list.findAll();
      let result = [];
      for (let i = 0; i < lists.length; i++) {
        const listProduct = await this.listProduct.findAll({
          where: { allListId: lists[i].id },
        });
        result.push(lists[i], listProduct);
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteList(req) {
    try {
      const listId = await this.list.findOne({ where: { id: req.params.id } });
      if (!listId) {
        throw new Error("no such list");
      }
      const lists = await this.list.delete({ where: { id: req.params.id } });
      const listProduct = await this.listProduct.findAllAndDelete({
        where: { allListId: req.params.id },
      });

      return { lists, listProduct };
    } catch (error) {
      throw new Error(error);
    }
  }
  async addCat(req) {
    try {
      const title = req.body.title;
      const subTitle = req.body.subTitle;

      const result = await this.category.create({ title });
      if (subTitle) {
        const subresult = await this.subcategory.create({
          title: subTitle,
          categoryId: result.id,
        });
        return { result, subresult };
      } else {
        return result;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  async editCat(req) {
    try {
      const title = req.body.title;
      const result = await this.category.findOneAndUpdate(
        { title },
        req.params.id
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteCat(req) {
    try {
      const result = await this.category.delete({
        where: { id: req.params.id },
      });
      const subresult = await this.subcategory.delete({
        where: { categoryId: req.params.id },
      });
      return { result };
    } catch (error) {
      throw new Error(error);
    }
  }
  async addSubCat(req) {
    try {
      const title = req.body.title;
      const id = req.body.categoryId;

      const category = await this.category.findOne({ where: { id } });
      if (!category) {
        throw new Error("no such product");
      }
      const result = await this.subcategory.create({
        title,
        categoryId: category.id,
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async editSubCat(req) {
    try {
      const title = req.body.title;
      const id = req.body.categoryId;
      const category = await this.category.findOne({ where: { id } });
      if (!category) {
        throw new Error("no such product");
      }
      const result = await this.subcategory.findOneAndUpdate(
        { title, categoryId: category.id },
        req.params.id
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteSubCat(req) {
    try {
      const result = await this.subcategory.delete({
        where: { id: req.params.id },
      });
      return { result };
    } catch (error) {
      throw new Error(error);
    }
  }
  async addComment(req) {
    try {
      const product = await this.product.findOne({
        where: { id: req.params.id },
      });
      const title = req.body.title;
      const description = req.body.description;
      const comment = await this.comment.create({
        title,
        description,
        productId: product.id,
        userId: req.user.id,
      });
      return comment;
    } catch (error) {
      throw new Error(error);
    }
  }
  async editComment(req) {
    try {
      const comment = await this.comment.findOne({
        where: { id: req.params.id },
      });
      if (!comment) {
        throw new Error("no such comment");
      }
      const title = req.body.title;
      const description = req.body.description;
      const editedcomment = await this.comment.findOneAndUpdate(
        { title, description },
        comment.id
      );
      return editedcomment;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteComment(req) {
    try {
      const comment = await this.comment.findOne({
        where: { id: req.params.id },
      });
      if (!comment) {
        throw new Error("no such comment");
      }

      const editedcomment = await this.comment.delete({
        where: { id: comment.id },
      });

      return [editedcomment];
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = productService;
