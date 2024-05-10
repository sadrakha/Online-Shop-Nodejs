const productservice = require("./product.service");
const productService = new productservice();

exports.creat = async (req, res, next) => {
  try {
    const product = await productService.create(req);
    return res.status(201).send(product);
  } catch (error) {
    req.status = 400;
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const product = await productService.edit(req);
    return res.status(201).send(product);
  } catch (error) {
    req.status = 400;
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const deleted = await productService.delete(req);
    return res.status(201).redirect("/");
  } catch (error) {
    req.status = 400;
    next(error);
  }
};

exports.showFav = async (req, res, next) => {
  try {
    const fav = await productService.showFav(req);
    return res.send(fav);
  } catch (error) {
    req.status = 400;
    next(error);
  }
};
exports.addToFav = async (req, res, next) => {
  try {
    const fav = await productService.addToFav(req);
    return res.status(201).send(fav);
  } catch (error) {
    req.status = 400;
    next(error);
  }
};
exports.removeFromFav = async (req, res, next) => {
  try {
    const fav = await productService.removeFromFav(req);
    return res.status(201).send(fav);
  } catch (error) {
    req.status = 400;
    next(error);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await productService.getOrder(req);
    return res.status(200).send(order);
  } catch (error) {
    req.status = 400;
    next(error);
  }
};

exports.addOrder = async (req, res, next) => {
  try {
    const order = await productService.addOrder(req);
    return res.status(201).send(order);
  } catch (error) {
    req.status = 400;
    next(error);
  }
};
exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await productService.deleteFromOrder(req);
    return res.redirect("/");
  } catch (error) {
    req.status = 400;
    next(error);
  }
};
exports.sentOrders = async (req, res, next) => {
  try {
    const order = await productService.orderSent(req);
    return res.status(201).send(order);
  } catch (error) {
    req.status = 400;
    next(error);
  }
};
exports.getFormerOrders = async (req, res, next) => {
  try {
    const orders = await productService.getFormer(req);
    return res.send(orders);
  } catch (error) {
    req.status = 400;
    next(error);
  }
};
exports.addList = async (req, res, next) => {
  try {
    const list = await productService.addList(req);
    return res.status(201).send(list);
  } catch (error) {
    req.status = 400;
    next(error);
  }
};
exports.showLists = async (req, res, next) => {
  try {
    const list = await productService.showLists(req);
    return res.status(201).send(list);
  } catch (error) {
    req.status = 400;
    next(error);
  }
};
exports.deleteList = async (req, res, next) => {
  try {
    const list = await productService.deleteList(req);
    return res.status(201).redirect("/");
  } catch (error) {
    req.status = 400;
    next(error);
  }
};
exports.addProductToList = async (req, res, next) => {
  try {
    const list = await productService.addProductToList(req);
    return res.status(201).send(list);
  } catch (error) {
    req.status = 400;
    next(error);
  }
};
exports.addCat = async (req, res, next) => {
  try {
    const category = await productService.addCat(req);
    return res.status(201).send(category);
  } catch (error) {
    req.status = 400;
    next(error);
  }
};

exports.editCat = async (req, res, next) => {
  try {
    const category = await productService.editCat(req);
    return res.status(201).send(category);
  } catch (error) {
    req.status = 400;
    next(error);
  }
};

exports.deleteCat = async (req, res, next) => {
  try {
    const category = await productService.deleteCat(req);
    return res.status(201).redirect("/");
  } catch (error) {
    req.status = 400;
    next(error);
  }
};

exports.addSubCat = async (req, res, next) => {
  try {
    const category = await productService.addSubCat(req);
    return res.status(201).send(category);
  } catch (error) {
    req.status = 400;
    next(error);
  }
};

exports.editSubCat = async (req, res, next) => {
  try {
    const category = await productService.editSubCat(req);
    return res.status(201).send(category);
  } catch (error) {
    req.status = 400;
    next(error);
  }
};

exports.deleteSubCat = async (req, res, next) => {
  try {
    const category = await productService.deleteSubCat(req);
    return res.status(201).redirect("/");
  } catch (error) {
    req.status = 400;
    next(error);
  }
};

exports.addComment = async (req, res, next) => {
  try {
    const result = await productService.addComment(req);
    return res.status(201).send(result);
  } catch (error) {
    req.status = 400;
    next(error);
  }
};

exports.editComment = async (req, res, next) => {
  try {
    const result = await productService.editComment(req);
    return res.status(201).send(result);
  } catch (error) {
    req.status = 400;
    next(error);
  }
};
exports.deleteComment = async (req, res, next) => {
  try {
    const result = await productService.deleteComment(req);
    return res.status(201).redirect("/");
  } catch (error) {
    req.status = 400;
    next(error);
  }
};
