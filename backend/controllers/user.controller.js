import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
// import { generatetoken } from "../lib/utils.js"
// import cloudinary from "../lib/cloudinary.js"


export const signup = async(req,res)=>{
    const {email,fullname,password} = req.body
    try {


        if(!fullname || !password || ! email){
           return res.status(400).json({message:"provide full details"})
        }
        
        if(password.length <6){
            return res.status(400).json({message:"password must be 6 characters"})
        }   

        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:"user already exist"})
        }
        // hash passwords

        const salt = await bcrypt.genSalt(10)
        const hashedpasssword = await bcrypt.hash(password,salt)


        const newuser = new User({
            fullname:fullname,
            password:hashedpasssword,
            email:email
        })
    

        if(newuser){
            
            await newuser.save();

            res.status(201).json({
                id:newuser._id,
                fullname:newuser.fullname,
                email:newuser.email,
                profilepic:newuser.profilepic,


            })// 201 means somethinfg has created
            

        }else{
            res.status(400).json({messaage:"Invalid user data"})
        }



    } catch (error) {
        console.log(`error in signup controller ${error.message}`)
        res.status(500).json({message:"internal server error"});
        
    }
}
export const updateprofile = async (req, res) => {
    try {
        const { profilepic } = req.body;
        const userId = req.user._id;

        if (!profilepic) {
            return res.status(400).json({ message: "Profile picture is required" });
        }

        // Upload to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(profilepic);
        const updatedUser = await User.findByIdAndUpdate(userId, {
            profilepic: uploadResponse.secure_url
        }, { new: true });

        res.status(200).json(updatedUser);

    } catch (error) {
        console.error("Error in updating profile:", error.message);  // More detailed logging
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  const { fullname, email, password, userType } = req.body;

  if (!fullname || !email || !password) {
    return res.status(400).json({ message: "Please provide full details" });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      userType,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user" });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const updated = await User.findByIdAndUpdate(userId, req.body, { new: true }).select("-password");
    if (!updated) return res.status(404).json({ message: "User not found" });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};


