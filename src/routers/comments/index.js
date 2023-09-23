const { addMessage, getMessages } = require("../../controllers/messageController");
const MessagesController = require('../../controllers/messageController')
const asyncHandler = require('../../helpers/asyncHandle')
const { authenticationV2 } = require('../../auth/authUntil')
const router = require("express").Router();
//check _id của users
router.use(authenticationV2)

router.post('/addmsg', asyncHandler(MessagesController.addMessage))
router.post('/getmsg', asyncHandler(MessagesController.getMessages))


// router.post("/addmsg", addMessage);
// router.post("/getmsg", getMessages);

module.exports = router;
