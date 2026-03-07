import { User } from '../models/user.model.js'; 

const registerUser = async ( req , res ) => { 
    try {
        const { username , password , email  } = req.body ; 
        if ( !username || !password || !email ){ 
            return res.status(400).json({ message : "All fields are required !" })
        }; 
        const existing = await User.findOne({ email : email.toLowerCase() }); 
        if (existing){ 
            return res.status(400).json({ message : "User already exists !" });
        };
        const user = await User.create({
            username , 
            email : email.toLowerCase() , 
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
        console.log("Register error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message }) ;
    }
}

const loginUser = async ( req , res ) => { 
    try {
        const { email , password } = req.body ;
        if (!email || !password) {
            return res.status(400).json({ message : "All fields are required !" });
        }
        const user = await User.findOne({
            email : email.toLowerCase()
        }); 
        if (!user){ 
            return res.status(401).json({ message : "Invalid credentials" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch){ 
            return res.status(401).json({ message : "Invalid credentials" });
        }
        res.status(200).json({ 
            message : "user logged in" ,
            user: { 
                id : user._id ,
                username : user.username ,
                email : user.email
            }
        })
    } catch (error) {
        res.status(500).json({ message : "internal server error " });
    }
}

const logoutUser = async ( req , res ) => { 
    try {
        const { email } = req.body ;
        const user = User.findOne({ email: email.toLowerCase() }); 
        
        if ( !user ){ 
            res.status(404).json({ message : "user not found !" });
        }

        res.status(200).json({ message : "logged out !" })
    } catch (error) {
        res.status(500).json({ message : "internal server error " })
    }
}

export { 
    registerUser ,
    loginUser , 
    logoutUser
}