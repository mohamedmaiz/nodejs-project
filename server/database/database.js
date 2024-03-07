const mongoose = require("mongoose");
const userModel = require("../schemas/user");
const user = require("../schemas/user");

class DataBase{
    constructor(){
         this.url = "mongodb://localhost:27017/test";
    }

    conecte(){
        mongoose.connect(this.url , {connectTimeoutMS:5000})
        .then(()=>{
            console.log("suceess connecte to mongo db");
        })
        .catch((err)=>{
            console.log("error to connecte to db : " + err);
        })
    }
    insert(body){
        body["creationDate"] = new Date();
     let user = new userModel(body);
      return new Promise((resolve , reject) =>{
        user.save()
        .then(res =>{
         resolve(res);
        })
        .catch(err=>{
         reject(err);
        })
      });
    }

    getUsers(){
        return new Promise((resolve , reject)=>{
          userModel.find({})
          .then(res=>{
            resolve(res);
          })
          .catch(err =>{
            reject(err);
          })
        });
    }
    getUserById(id , name){
        return new Promise((resolve , reject)=>{
          userModel.findOne({_id : id } | {username : name} )
          .then(res=>{
            resolve(res);
          })
          .catch(err =>{
            reject(err);
          })
        });
    }

    updateUser(id , body){
        body["updateDate"] = new Date();
        return new Promise((resolve , reject) => {
            userModel.findByIdAndUpdate(id , body)
            .then(data => {
             resolve(data);
            })
            .catch(err =>{
             reject(err);
            })
        });
    }

    deleteUser(id){
      return new Promise((resolve , reject)=>{
        userModel.findByIdAndDelete(id)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        })
      })
    }
}

module.exports = DataBase;
