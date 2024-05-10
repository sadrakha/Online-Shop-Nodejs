const router = require("express").Router();

const userController = require("../app/user/user.controller");
const roleController = require("../app/rolePermission/role.controller");
const productController = require("../app/product/product.controller");
const authentication = require("../middleware/authentication");
const upload = require("../middleware/upload");
const authorization = require("../middleware/authorization");

router.get("/profile/:id", authentication.verifyToken, userController.getUser);
router.post(
  "/profile/edit",
  authentication.verifyToken,
  upload.uploadImage,
  userController.updateUser
);
router.delete(
  "/profile/delete",
  authentication.verifyToken,
  userController.deleteUser
);

router.get(
  "/role",
  authentication.verifyToken,
  authorization.admin,
  roleController.getRoles
);
router.post(
  "/role/add",
  authentication.verifyToken,
  authorization.admin,
  roleController.addRole
);
router.post(
  "/role/edit/:id",
  authentication.verifyToken,
  authorization.admin,
  roleController.editRole
);
router.delete(
  "/role/delete/:id",
  authentication.verifyToken,
  authorization.admin,
  roleController.deleteRole
);

router.post(
  "/product/add",
  authentication.verifyToken,
  authorization.provider,
  upload.uploadImage,
  productController.creat
);
router.post(
  "/product/:id/order",
  authentication.verifyToken,
  productController.addOrder
);
router.delete(
  "/product/:id/order/delete",
  authentication.verifyToken,
  productController.deleteOrder
);
router.post(
  "/product/edit/:id",
  authentication.verifyToken,
  authorization.provider,
  upload.uploadImage,
  productController.update
);
router.delete(
  "/product/delete/:id",
  authentication.verifyToken,
  authorization.provider,
  productController.delete
);

router.get(
  "/product/favourite",
  authentication.verifyToken,
  productController.showFav
);
router.post(
  "/product/addToFavourite/:id",
  authentication.verifyToken,
  upload.uploadImage,
  productController.addToFav
);
router.delete(
  "/product/removeFromFavourite/:id",
  authentication.verifyToken,
  upload.uploadImage,
  productController.removeFromFav
);

router.post(
    "/product/addComment/:id",
    authentication.verifyToken,
    productController.addComment
  );

  router.post(
    "/product/editComment/:id",
    authentication.verifyToken,
    productController.editComment
  );
  router.delete(
    "/product/deleteComment/:id",
    authentication.verifyToken,
    productController.deleteComment
  );
router.post(
  "/list/create",
  authentication.verifyToken,
  productController.addList
);
router.get(
  "/list/show",
  authentication.verifyToken,
  productController.showLists
);
router.post(
  "/list/addProduct",
  authentication.verifyToken,
  productController.addProductToList
);
router.delete(
  "/list/delete/:id",
  authentication.verifyToken,
  productController.deleteList
);

router.get("/order", authentication.verifyToken, productController.getOrder);
router.post(
  "/orderSent",
  authentication.verifyToken,
  productController.sentOrders
);
router.get(
  "/formerOrders",
  authentication.verifyToken,
  productController.getFormerOrders
);

router.post(
  "/category/add",
  authentication.verifyToken,
  authorization.admin,
  productController.addCat
);
router.post(
  "/category/edit/:id",
  authentication.verifyToken,
  authorization.admin,
  productController.editCat
);
router.delete(
  "/category/delete/:id",
  authentication.verifyToken,
  authorization.admin,
  productController.deleteCat
);

router.post(
  "/subCategory/add",
  authentication.verifyToken,
  authorization.admin,
  productController.addSubCat
);
router.post(
  "/subCategory/edit/:id",
  authentication.verifyToken,
  authorization.admin,
  productController.editSubCat
);
router.delete(
  "/subCategory/delete/:id",
  authentication.verifyToken,
  authorization.admin,
  productController.deleteSubCat
);

module.exports = router;
