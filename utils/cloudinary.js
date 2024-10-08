const cloudinary = require('cloudinary').v2
const fs=require('fs') 
  
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME , 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uniquePublicId = `${Date.now()}`;


    const uploadOnCloudinary= async (localFilePath)=>{
        try{
            if(!localFilePath) return null
            
            
            const response= await cloudinary.uploader.upload(localFilePath,{public_id:uniquePublicId,
                resource_type:"auto" }
           )

            // console.log("File is uploaded on cloudinary",response.url)

            fs.unlinkSync(localFilePath)
            return response;
        }
        catch(error){
            console.log("File is corrupt")
            fs.unlinkSync(localFilePath) // remove the locally saved 
           // temporary file as the upload operation got failed

           return null;
        }
    }

   module.exports= uploadOnCloudinary