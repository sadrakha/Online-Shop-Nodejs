const router = require("express").Router();

const userController = require("../app/user/user.controller");
const { uploadImage } = require("../middleware/upload");
const validator=require('../middleware/validation')
const authorization=require('../middleware/authorization')

router.get('/',userController.main)
router.get('/product/:id',userController.product)
router.get('/provider/:id',userController.provider)
router.get('/category',userController.category)
router.post("/signUp", uploadImage,validator.signIn, userController.signUp);
router.post('/logIn',uploadImage,validator.logIn,userController.logIn)
router.post('/search',userController.search)


module.exports = router;
