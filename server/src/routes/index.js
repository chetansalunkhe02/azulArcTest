import express from "express"
var router = express.Router();
router.get('/', (req, res) => {
  return res.status(200).send({
    message: 'Hello World!',
  })
})

export default router