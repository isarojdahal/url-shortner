const app = require("express").Router();
const DataModel = require("../models/data.model");
const { generateSlug } = require("../util/slug.util");
const sequelize = require("../config/db.config");

app.get("/", async (req, res) => {
  const url = await sequelize.models.Data.create({
    url: "https://google.com/12321/12321",
    slug: "12345",
  });
  console.log("inserted url", url);

  res.send("Hello World");
});

app.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  const url = await sequelize.models.Data.findOne({
    where: { slug },
  });

  if (!url) {
    return res.json({ status: "error", message: "Invalid URL" });
  }

  res.redirect(url.url);
});

app.post("/create", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.json({ status: "error", message: "url is required" });

  // generate recursive function to check if slug exists

  async function checkSlug() {
    const slug = generateSlug();
    const doesExists = await sequelize.models.Data.findOne({
      where: { slug },
    });

    if (doesExists) {
      checkSlug();
    }
    return slug;
  }

  const slug = await checkSlug();
  console.log("slug", slug);

  const response = await sequelize.models.Data.create({
    url,
    slug,
  });
  // console.log("inserted url", response);

  res.send({
    status: "success",
    url: "http://localhost:4000/" + slug,
  });
});

module.exports = app;
