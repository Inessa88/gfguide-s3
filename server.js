import express from 'express';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/db.js';
import router from './routes/Users.js'
import db2 from './config/db2.js';
import path from 'path';
import {fileURLToPath} from 'url';
import { on } from 'events';


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(router);
// app.use(express.static('public'))
app.use(express.static(__dirname));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '/client/public/'));
  },
  filename: (req, file, cb) => {
      // cb(null, Date.now() + '-' + file.originalname)
      cb(null, file.originalname)
  }
});

const upload = multer({storage}).single('file');


// app.listen(process.env.PORT||8080, ()=>{
//     console.log(`run on ${process.env.PORT||8080}`);
// })
app.listen(3001, ()=>{
  console.log(`run on ${3001}`);
})

// try{
//     await db.authenticate();
//     console.log('Database connected');
// }
// catch(e){
//     console.log(e);
// }


app.get('/products',(req,res)=>{
  db2('products')
    
  .select('name', 'url')
  .from('products')
  .orderBy ('products.post_date', 'desc') 
  .join('pictures', 'products.main_picture_id', '=', 'pictures.id')
  .then(rows=>{
      res.json(rows);
    })
    .catch(err=>{
      console.log(err);
    })
  })

  app.get('/map',(req,res)=>{
    db2('restaurants')
      
    .select('name', 'address', 'lat', 'lng')
    .from('restaurants')
    .then(rows=>{
        res.json(rows);
      })
      .catch(err=>{
        console.log(err);
      })
    })


  app.get('/categories',(req,res)=>{
    db2('category')
    
  .select('id','name')
  .from('category')
  .then(rows=>{
      res.json(rows);
    })
    .catch(err=>{
      console.log(err);
        })
  })

  app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json(err)
        }

        // return res.status(200).send(req.file)
        let filename = req.file.originalname
        let {name, category} = req.body
        db2('pictures').insert({'url': filename}).returning('id')//to check after what we added 
        .then((data) => {
          db2('products').insert({'name': name, 'category_id': Number(category), 'main_picture_id': data[0].id, 'post_date': new Date().toISOString().split('T')[0]})
          .then(rows=>{
              res.json(rows);
            })
        })    
        .catch(err=>{
          console.log(err);
        })
    })

});


app.get('/search',(req,res)=>{
  const {q} = req.query; 
  db2('products')
  .select('name','url')
  .join('pictures', 'pictures.id', '=', 'products.main_picture_id')
  .whereILike('products.name',`%${q}%`)
  .then(rows=>{
      if(rows.length ===0){
          return res.status(404).json({msg:'not found'})
      }
      console.log(rows);
      res.json(rows)
  })
  .catch(e=>{
      console.log(e);
      res.status(404).json({msg:e.message})
  })
})


app.get('/search/category',(req,res)=>{
  const {q} = req.query; 
  db2('products')
  .select('products.name','pictures.url', 'category.name')
  .join('pictures', 'pictures.id', '=', 'products.main_picture_id')
  .join('category', 'category.id', '=', 'products.category_id')
  .where('category.id',q)
  .then(rows=>{
      if(rows.length ===0){
          return res.status(404).json({msg:'not found'})
      }
      console.log(rows);
      res.json(rows)
  })
  .catch(e=>{
      console.log(e);
      res.status(404).json({msg:e.message})
  })
})
// app.get('/search/category',(req,res)=>{

//   let {q} = req.query;
//   if (q) {
//     q = q.split(',');
//     db2('products')
//     .select('products.name','pictures.url', 'category.name')
//     .join('pictures', 'pictures.id', '=', 'products.main_picture_id')
//     .join('category', 'category.id', '=', 'products.category_id')
//     .whereIn('category.id', q)
//     .then(rows=>{
//         if(rows.length ===0){
//             return res.json({msg:'not found'})
//         }
//         console.log(rows);
//         res.json(rows)
//     })
//     .catch(e=>{
//         console.log(e);
//         res.status(404).json({msg:e.message})
//     })
//   } else {
//     db2('products')
//     .select('products.name','pictures.url', 'category.name')
//     .join('pictures', 'pictures.id', '=', 'products.main_picture_id')
//     .join('category', 'category.id', '=', 'products.category_id')
//     .then(rows=>{
//         if(rows.length ===0){
//             return res.json({msg:'not found'})
//         }
//         console.log(rows);
//         res.json(rows)
//     })
//     .catch(e=>{
//         console.log(e);
//         res.status(404).json({msg:e.message})
//     })
//   }

// })




const __dirname2 = path.resolve();

app.use(express.static(path.join(__dirname2, './client/build')))

app.get('*', (req,res)=>{
  res.sendFile(path.resolve(__dirname2, './client/build', 'index.html'))
})

