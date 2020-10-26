const router = require("express").Router();
const verify = require("./pvtroute");

router.get("/",verify, (req, res) => {
  res.json({
    post: { 
        title: "Dream Dooniya", 
        description: "Welcome to Dream Dooniya" 
    },
  });
});

module.exports = router;
