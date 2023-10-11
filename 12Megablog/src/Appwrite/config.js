import config from "../conf/config";
import { Client,Databases,Storage,Query, ID } from "appwrite";

class Service{


    client = new Client

    databases ;
    buckets ;
    constructor(){
        this.client
        .setEndPoint(config.appwriteUrl)
        .setProject(config.appwriteProjectid);
        
        this.databases = new Databases(this.client);
        this.buckets = new Storage(this.client);

    }


    async createPost({title,slug,content,featuredImage,status,userId}){

        try {
            
            return await this.databases.createDocument(
                config.appwriteDatabaseid
                ,config.appwriteCollectionid
                ,slug,
                {title,content ,featuredImage,status,userId}
   
                )
        } catch (error) {
            console.log(error);
            
        }




    }


    async updatePost(slug, {title,content,featuredImage,status}) {
        try {
            return await this.databases.updateDocument(config.appwriteDatabaseid,config.appwriteCollectionid,slug,
                {   title,content,featuredImage,status })
        } catch (error) {
            console.log(error);
            
        }
    }

    async deletePost(slug) {
                try {
                  await this.databases.deleteDocument(config.appwriteDatabaseid, config.appwriteCollectionid,slug);   
                  return true  
                } catch (error) {
                    console.log("Appright service :: logout :: error", error);
                    return false;
                }

    }

    async getPost(slug){
        try {

            return await this.databases.getDocument(config.appwriteDatabaseid, config.appwriteCollectionid,slug)
        } catch (error) {
            console.log("Appright service :: logout :: error", error);
        }
    }


    async getPosts(queries = [ Query.equal("status","active") ]){

        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseid,
                 config.appwriteCollectionid ,
                 queries,
            )
        } catch (error) {
            console.log("Appright service :: logout :: error", error);
            return false;
        }



    }

//  file upload :: services :: code

    async uploadFile(file){
        try {
            return await this.buckets.createFile(config.appwriteBucketid,ID.unique(),file)
        } catch (error) {
            console.log("Appright service :: logout :: error", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                config.appwriteBucketid,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appright service :: logout :: error", error);
            return false
        }
    }



          getFilepreview(fileId){
        return this.bucket.getFilepreview(config.appwriteBucket,fileId )
    }

        



}


 const service = new Service();

 export default service