const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const HauseSchema = require('../models/housemodels');
const HauseController = require('../controllers/Hausecontrollers');
const hauseController = new HauseController();
const multer = require("multer");

router.get("/house", hauseController.validateToken, async (req, res) => {
    //Traer todas las casas
    let users = await HauseSchema.find();
  res.json(users);
});

router.get("/hause/:id", async (req, res) => {
    //traer una casa en especifico con el id
    var id = req.params.id;
    let user = await HauseSchema.findByid(id);
    res.json(user);
});



router.post("/house", async (req, res) => {
    //Crear una casa
    //   const hashedPassword = await bcrypt.hash(req.body.password, 10);

  let hause = HauseSchema({
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    size: req.body.size,
    type: req.body.type,
    zip_code: req.body.zip_code,
    rooms: req.body.rooms,
    bathrooms: req.body.bathrooms ,
    parking: req.body.parking,
    price: req.body.price, 
    code: req.body.code,
    image: req.body.image
  });

  hause.save().then((result) => {
      res.send(result);
    })
    .catch((err) => {
      if (err.code === 11000) {
        res.send({ status: "error", message: "Error al registrar la casa" });
      } else {
        res.send({ status: "error", message: err.message });
      }
    });
});

router.patch('/hause/:id,', (req, res) =>{
//Actualizar usuario
    var id = req.params.id

    var updateHause = {
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    size: req.body.size,
    type: req.body.type,
    zip_code: req.body.zip_code,
    rooms: req.body.rooms,
    bathrooms: req.body.bathrooms ,
    parking: req.body.parking,
    price: req.body.price, 
    code: req.body.code,
    image: req.body.image

    }

    HauseSchema.findByidAndUpdate(id, updateHause , {new: true}).then((result)=>{
     res.send(result)
    }).catch((err) => {
        console.log(error)
        res.send("Error actualizando el registro")
    })
})

router.delete('/users/:id,',(req,res)=>{
//Eliminar casa
    var id = req.params.id

HauseSchema.deleteOne({_id: id}).then(()=>{
        res.json({"status": "success", "message" : "User delete successfully"})
    }).catch((error)=>{
        console.log(error)
        res.json({"status": "error", "message" : "Error al eliminar el usuario"})
    })
})




//configuaracion libreria Multer
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'uploads/')//Definimos donde queremos que se guarden los archivos
    },
    filename : function(req,file,cb){
        cb(null,Date.now()+'_'+File.originalname)
    }
});

const fileFilter = (req,file,cb) => {
    if(file.mimetype.startsWith('image/')){
        cb(null,true)
    }else{
        cb(new Error('Error archivo no es imagen'))
    }
}


const upload = multer({storage: storage,fileFilter : fileFilter})// seteando el objeto de la libreria multer


router.post('/upload/:id/house', upload.single('file'),(req,res)=>{
    if(!req.file){
        return res.status(400).send({'status':'error','message':"No se ha subido el archivo"})
    }
    var id = req.params.id

    var updateHouse={
        image: req.file.path
    }

    HauseSchema.findByIdAndUpdate(id, updateHouse, {new: true}).then((result)=>{
        res.send({"status": "sucess","message": "Archivo subido correctamente"})
    }).catch((error)=>{
        console.log(error)
        res.send({"status":"secesso","message":"Error al actualizar el archivo"})
    })

})

module.exports = router