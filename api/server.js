import express from "express";
import multer from "multer";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
import router from "./routes/Users.js";
import db2 from "./config/db2.js";
import path from "path";
import { fileURLToPath } from "url";
import AWS from "aws-sdk";
import fs from "fs";
import bodyParser from "body-parser";


const upload = multer({ dest: "uploads/" });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use("/api/images", express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
// app.listen(process.env.PORT||8080, ()=>{
//     console.log(`run on ${process.env.PORT||8080}`);
// })

const s3 = new AWS.S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: region,
});

app.listen(4000, () => {
    console.log(`run on ${4000}`);
});

app.post("/api/uploadfile", upload.single("file"), (req, res) => {
    console.log(req.file);
    if (req.file == null) {
        return res.status(400).json({ message: "Please choose the file" });
    }

    let file = req.file;
    let fileUrl;

    const uploadImage = (file) => {
        const fileStream = fs.createReadStream(file.path);

        const params = {
            Bucket: bucketName,
            Key: file.originalname,
            Body: fileStream,
        };

        s3.upload(params, function (err, data) {
            console.log(data);
            if (err) {
                throw err;
            }
            console.log(`File uploaded successfully.${data.Location}`);
            fileUrl = data.Location;
            let { name, category } = req.body;
            db2("pictures")
                .insert({ url: fileUrl })
                .returning("id")
                .then((data) => {
                    db2("products")
                        .insert({
                            name: name,
                            category_id: Number(category),
                            main_picture_id: data[0].id,
                            post_date: new Date().toISOString().split("T")[0],
                            approved: false,
                        })
                        .then((rows) => {
                            res.json(rows);
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    };
    uploadImage(file);

    return res;
});

app.get("/api/products", (req, res) => {
    db2("products")
        .select("name", "url")
        .from("products")
        .orderBy("products.post_date", "desc")
        .join("pictures", "products.main_picture_id", "=", "pictures.id")
        .then((rows) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/api/map", (req, res) => {
    db2("restaurants")
        .select("name", "address", "lat", "lng")
        .from("restaurants")
        .then((rows) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/api/categories", (req, res) => {
    db2("category")
        .select("id", "name")
        .from("category")
        .then((rows) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/api/search", (req, res) => {
    const { q } = req.query;
    db2("products")
        .select("name", "url")
        .join("pictures", "pictures.id", "=", "products.main_picture_id")
        .whereILike("products.name", `%${q}%`)
        .then((rows) => {
            if (rows.length === 0) {
                return res.status(404).json({ msg: "not found" });
            }
            console.log(rows);
            res.json(rows);
        })
        .catch((e) => {
            console.log(e);
            res.status(404).json({ msg: e.message });
        });
});

app.get("/api/search/category", (req, res) => {
    const { q } = req.query;
    db2("products")
        .select("products.name", "pictures.url", "category.name")
        .join("pictures", "pictures.id", "=", "products.main_picture_id")
        .join("category", "category.id", "=", "products.category_id")
        .where("category.id", q)
        .then((rows) => {
            if (rows.length === 0) {
                return res.status(404).json({ msg: "not found" });
            }
            console.log(rows);
            res.json(rows);
        })
        .catch((e) => {
            console.log(e);
            res.status(404).json({ msg: e.message });
        });
});

// const __dirname2 = path.resolve();
// app.use(express.static(path.join(__dirname2, "./client/build")));
// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname2, "./client/build", "index.html"));
// });
