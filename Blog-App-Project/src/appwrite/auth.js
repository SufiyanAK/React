import config from "../config/config";
import { Client, Account, ID } from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (!userAccount) {
                return console.log('error happened');
            }
            return await this.loginAccount({ email, password });
        } catch (error) {
            console.log(`Error happened: ${error.message}`);
        }
    }

    async loginAccount({ email, password }) {
        try {
            const userAccount = await this.account.createEmailPasswordSession(email, password);
            if (!userAccount) {
                return console.log('error Happened');
            }
        } catch (error) {
            console.log(`Error happened: ${error.message}`);
        }
    }

    async logoutAccount() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log(`Error happened: ${error.message}`);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log(`Error happened: ${error.message}`);
        }
    }
}

const authService = new AuthService();

export default authService;
