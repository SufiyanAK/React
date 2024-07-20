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

    async createAccount({ email, password, name }, res) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (!userAccount) {
                return res.status(400).send({
                    message: "Something went wrong, please try again"
                });
            }
            await this.loginAccount({ email, password }, res);
            return res.status(201).send(userAccount);
        } catch (error) {
            console.log(`Error happened: ${error.message}`);
            return res.status(500).send({ message: error.message });
        }
    }

    async loginAccount({ email, password }, res) {
        try {
            const userAccount = await this.account.createEmailPasswordSession(email, password);
            if (!userAccount) {
                return res.status(400).send({
                    message: "Wrong Email or Password"
                });
            }
            return res.status(200).send(userAccount);
        } catch (error) {
            console.log(`Error happened: ${error.message}`);
            return res.status(500).send({ message: error.message });
        }
    }

    async logoutAccount(res) {
        try {
            await this.account.deleteSessions();
            return res.status(204).send();
        } catch (error) {
            console.log(`Error happened: ${error.message}`);
            return res.status(500).send({ message: error.message });
        }
    }

    async getCurrentUser(res) {
        try {
            const user = await this.account.get();
            return res.status(200).send(user);
        } catch (error) {
            console.log(`Error happened: ${error.message}`);
            return res.status(500).send({ message: error.message });
        }
    }
}

const authService = new AuthService();

export default authService;
