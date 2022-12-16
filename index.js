const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const UserModel = require("./models/user");
const FileModel = require("./models/file");

const app = express();
mongoose.set("strictQuery", true);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const user = new UserModel({ name, email, password });
  await user.save();
  return res.status(201).send("User created successfully");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email, password });
  if (user) {
    return res.send({ message: "login Success" });
  }
  return res.status(401).send("Invalid credentials");
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, "private" + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/singlefile", upload.single("file"), async (req, res) => {
  console.log(req.file, "myFile");

  //   var newImg = fs.readFileSync(req.file.path);
  // console,log(newImg)
  const file = {
    title: req.file.fieldname,
    des: req.file.path,
    img: {
      data: fs.readFileSync(
        path.join(__dirname + "/images/" + req.file.filename)
      ),
      ContentType: "multipart/form-data",
    },
  };

  const uploadFile = new FileModel(file);
  await uploadFile.save();

  res.send("single file added");
});
app.get("/getfile", async (req, res) => {
  const files = await FileModel.find();
  res.send(files);
});

mongoose.connect("mongodb://0.0.0.0:27017/test", () => {
  app.listen(8080, () => {
    console.log("listening on port @ http://localhost:8080");
  });
});
