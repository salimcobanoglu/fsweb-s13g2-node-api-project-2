// posts için gerekli routerları buraya yazın
const router = require("express").Router();
const postsModel = require("./posts-model");

// api/posts --->GET
router.get("/", async (req, res) => {
  try {
    const allPosts = await postsModel.find();
    res.json(allPosts);
  } catch (error) {
    res.status(500).json({ message: "Gönderiler alınamadı" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await postsModel.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" });
    } else {
      res.json(post);
    }
  } catch (error) {
    res.status(500).json("Gönderi bilgisi alınamadı");
  }
});

//create
router.post("/api/users", (req, res) => {
  const newUser = {
    id: getId(),
    name: req.body.name,
  };
  hobbits.push(newUser);
  res.status(201).json(newUser);
});

router.post("/", async (req, res) => {
  try {
    /*let title = req.body.title;
        let contents = req.body.contents;*/
    let { title, contents } = req.body;
    if (!title || !contents) {
      res.status(400).json({
        message: "Lütfen gönderi için bir title ve contents sağlayın",
      });
    } else {
      const insertedId = await postsModel.insert({ title, contents });
      const insertedPost = await postsModel.findById(insertedId.id);
      res.status(201).json(insertedPost);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Veritabanına kaydedilirken bir hata oluştu" });
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const post = await postsModel.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" });
    } else {
      let { title, contents } = req.body;
      if (!title || !contents) {
        res.status(400).json({
          message: "Lütfen gönderi için bir title ve contents sağlayın",
        });
      } else {
        await postsModel.update(req.params.id, { title, contents });
        const updatedPost = await postsModel.findById(req.params.id);
        res.json(updatedPost);
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Gönderi bilgileri güncellenemedi" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await postsModel.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" });
    } else {
      await postsModel.remove(req.params.id);
      res.json(post);
    }
  } catch (error) {
    res.status(500).json({ message: "Gönderi silinemedi" });
  }
});

router.get("/:id/comments", async (req, res) => {
  try {
    const post = await postsModel.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" });
    } else {
      const postsComments = await postsModel.findPostComments(req.params.id);
      res.json(postsComments);
    }
  } catch (error) {
    res.status(500).json({ message: "Yorumlar bilgisi getirilemedi" });
  }
});

module.exports = router;
