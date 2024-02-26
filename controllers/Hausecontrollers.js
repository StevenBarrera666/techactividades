const bcrypt = require("bcrypt");
const HouseSchema = require("../models/housemodels");
const jwt = require("jsonwebtoken");


class HouseController {
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || "";
  }

  async login(adress, code) {
    try {
      //Buscar la casa con la direccion
      const hause = await HouseSchema.findOne({ adress });
      if (!hause) {
        return { status: "error", message: "La casa no existe" };
      }
      //comparar el codigo con el que esta en la base de datos
      const codeHause = await bcrypt.compare(code,id.code)
      if(!codeHause) {
        return { status: "error", message: "El codigo no es correcto" };
      }


      const token = jwt.sign({ hauseId: hause._id }, "secreto", {expiresIn: "1h",});

      return { status: "success", token: token };


    } catch (error) {
      console.log(error);
      return { status: "error", message: "Error al iniciar sesion" };
    }
  }
  validateToken(req,res,next) {
    const bearerToken = req.headers['authorization']
    if(!bearerToken){
        return res.status(401).send({message: 'No token provided'})
    }

    const token = bearerToken.startsWith("Bearer")? bearerToken.slince(7) : bearerToken;
    jwt.verify(token,this.jwtSecret,(err,decoded)=>{
        if(err){
            return res.status(401).json({"message":"Token invalido"});
             }
             req.hauseId = decoded.hauseId;
             next();
    })
}
}

module.exports = HouseController;


