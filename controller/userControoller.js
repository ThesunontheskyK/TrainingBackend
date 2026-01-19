const con = require('../config/db');
const bcrypts =require('bcryptjs');

exports.GetAllUser =(req,res)=>{

        con.query('Select * from Users', (err, result) => {
            if (result.length === 0) {
                console.error('No Data');
            }
            if (err) {
                res.status(500).json({ message: "Database Error" })
            } else {
                res.status(200).json(result)
            }

        })

}



 exports.GetUserbyID = (req,res)=>{
    const index = req.params.id;
    con.query('Select * from Users where id =?', [index], (err, result) => {
        if (result.length === 0) {
            console.error('No Data');
        }
        if (err) {
            res.status(500).json({ message: "Database Error" })
        } else {
            res.status(200).json(result)
        }

    })
 }


exports.RegisterUser = (req, res) => {
     const { username, email, password } = req.body;
     const salt = bcrypts.genSaltSync(10);
    const hash = bcrypts.hashSync(password,salt);

     if (!username || !email || !password) {
         return res.status(400).json({
             message: "Please fill all fields"
         });
     }
         con.query('Insert into Users (username,email,pw) values(?,?,?)', [username, email, hash], (err, result) => {
 
             if (err) {
                return res.status(500).json({ message: "Database Error" });
             } else {
                 const insertinfo = ({
                     id: result.insertId,
                     username: username,
                     email: email
                 })
 
               return  res.status(200).json(insertinfo)
             }
 
         })
 
 }


 exports.DeleteUser =(req, res) => {
     const index = req.params.id;
     con.query('Delete from Users where id = ?', [index], (err, result) => {
         if (err) {
           return  res.status(500).json({ message: "Database Error" });
         }
         if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No userid found" });
         } else {
          return   res.status(200).json({ messge: "Delete Complete", index })
         }
 
     })
 }


 exports.UpdateUser = (req,res)=>{
    const index = req.params.id;
    const {username,email,password} = req.body
    con.query('Update Users set username=?, email=?, pw=? where id=?',[username,email,password,index],(err,result)=>{
          if (err) {
               return res.status(500).json({ message: "Database Error" });
            } else {
                const insertinfo = ({
                    id:index,
                    username: username,
                    email: email,
                    password:password
                })

               return res.status(200).json(insertinfo)
            }
    })
}


exports.LoginUser =(req,res)=>{
    const {username,password} = req.body
       if (!username || !password) {
         return res.status(400).json({
             message: "Please fill all fields"
         });
     }
    con.query('Select * from Users where username =?',[username],(err,result)=>{
        if(err){
           return res.status(500).json({ message: "Database Error" });
        }

        if(result.length===0){
           return res.status(401).json({message:"No User Found"});
        }
        const user = result[0];
        const isMatch = bcrypts.compareSync(password,user.PW);

        if(!isMatch){
           return res.status(401).json({message:"Invalid Password"});

        }else{
            return res.json({message:"Login Success"});
        }

    })


}