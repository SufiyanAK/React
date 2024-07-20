import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from 'appwrite';


export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, featureImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectiontId,
                slug,
                { title, content, featureImage, status, userId }
            )

        } catch (error) {
            console.log(`Error happened: ${error.message}`);
        }
    }

    async updatePost(slug, { title, content, featureImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectiontId,
                slug,
                { title, content, featureImage, status }
            )

        } catch (error) {
            console.log(`Error happened: ${error.message}`);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectiontId,
                slug
            )
            return true
        } catch (error) {
            console.log(`Error happened: ${error.message}`);
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectiontId,
                slug
            )
        } catch (error) {
            console.log(`Error happened: ${error.message}`);
        }
    }

    async getPosts(queries = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectiontId,
                queries,
            )
        } catch (error) {
            console.log(`Error happened: ${error.message}`);
        }
    }

    // FILE UPLOAD SERVICES
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique,
                file
            )
        } catch (error) {
            console.log(`Error happened: ${error.message}`);
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log(`Error happened: ${error.message}`);
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }

}