import { User } from '../models/user.model.js '; 

const registerUser = async ( req , res ) => { 
    try {
        const { username , password , email  } = req.body ; 
        if ( !username || !password || !email ){ 
            return res.status(400).json({ message : "All fields are required !" })
        }; 
        const existing = await User.findOne({ email : email.toLowerCase() }); 
        if (!existing){ 
            return res.status(400).json({ message : "User already exists !" });
        };
        const user = await User.create({
            username , 
            email : email.toLowerCase , 
            password ,
        })

        res.status(201).json({ 
            message: "User registered !",
            user : {  
                userId :user._id ,
                username :user.username ,
                email : user.email ,
            }
         })

    } catch (error) {
        res.status(500).json({ message: "Internal server error : ", error })
    }
}

export { 
    registerUser 
}