import config from "../config/config";
import { Client,Account,ID } from "appwrite";
export class AuthService {
    client = new Client();
    acount;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const response = await this.account.create(ID.unique(), email, password, name);
            if(response) {
                //can show login page or redirect to home page
                // return response;
                return this.login({email, password});
            }else {
                throw new Error("Account creation failed");
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            const response = await this.account.createEmailPasswordSession(email, password);
            if(response) {
                //can redirect to home page
                return response;
            }else {
                throw new Error("Login failed");
            }
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const response = await this.account.get();
            if(response) {
                return response;
            } else {
                throw new Error("No user logged in");
            }
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            const response = await this.account.deleteSessions("");
            if(response) {
                //can redirect to login page
                return response;
            } else {
                throw new Error("Logout failed");
            }
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;