const con = require('../config/db');


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
     if (!username || !email || !password) {
         return res.status(400).json({
             message: "Please fill all fields"
         });
     }
         con.query('Insert into Users (username,email,pw) values(?,?,?)', [username, email, password], (err, result) => {
 
             if (err) {
                 res.status(500).json({ message: "Database Error" });
             } else {
                 const insertinfo = ({
                     id: result.insertId,
                     username: username,
                     email: email
                 })
 
                 res.status(200).json(insertinfo)
             }
 
         })
 
 }


 exports.DeleteUser =(req, res) => {
     const index = req.params.id;
     con.query('Delete from Users where id = ?', [index], (err, result) => {
         if (err) {
             res.status(500).json({ message: "Database Error" });
         }
         if (result.affectedRows === 0) {
             res.status(404).json({ message: "No userid found" });
         } else {
             res.status(200).json({ messge: "Delete Complete", index })
         }
 
     })
 }


 exports.UpdateUser = (req,res)=>{
    const index = req.params.id;
    const {username,email,password} = req.body
    con.query('Update Users set username=?, email=?, pw=? where id=?',[username,email,password,index],(err,result)=>{
          if (err) {
                res.status(500).json({ message: "Database Error" });
            } else {
                const insertinfo = ({
                    id:index,
                    username: username,
                    email: email,
                    password:password
                })

                res.status(200).json(insertinfo)
            }
    })
}