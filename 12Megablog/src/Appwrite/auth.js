// WE CAN USE THIS ENTIRE CODE AS A SNIPPET
import config from "../conf/config";
import { Client, Account, ID } from "appwrite";

 export class Authservice{ 
    client = new Client();

    account;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectid);
        
        this.account = new Account(this.client);
    }

    async createaccount({email, password, name}){

            try {
            const useraccount   =  await this.account.create(ID.unique(), email, password, name)
            if (useraccount) {
                //  call another mathod 
                this.login({email, password})
            } else {
                return useraccount;
            }
            } catch (error) {
                throw error
            }


    }

    async login({email, password}){
        try {
          return  await this.account.createEmailSession(email, password)
        } catch (error) {
            throw error;
            
        }


 
 
 
 
 
 
 
 
 
    }

    async getCurrrentuser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appright service :: getCurrentuser :: error", error);
            
        }
        return null
    }

    async logout(){

        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appright service :: logout :: error", error);
        }





    }


}
const authservice = new Authservice();

export default authservice;