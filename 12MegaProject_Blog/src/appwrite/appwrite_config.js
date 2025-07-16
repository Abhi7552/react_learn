import config from "../config/config";
import { Client, ID, Storage, Databases, Query } from "appwrite";

export class AppwriteServices {
    client = new Client();
    storage;
    databases;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.storage = new Storage(this.client);
        this.databases = new Databases(this.client, config.appwriteDatabaseId);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            const response = await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug, // Using slug as the document ID
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
            return response;
        } catch (error) {
            // throw error;
            console.error("Error in creating post:", error);
            throw new Error("Post creation failed. Please try again later.");
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug, // Using slug as the document ID
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            );
        }
        catch (error) {
            // throw error;
            console.error("Error updating post:", error);
            throw new Error("Post update failed. Please try again later.");
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug // Using slug as the document ID
            );
            return true; // Return true on successful deletion
        }
        catch (error) {
            console.error("Error deleting post:", error);
            return false; // Return false if deletion fails
        }
    }

    async getPost(slug) {
        try {
            const response = await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug // Using slug as the document ID
            );
            return response;
        } catch (error) {
            console.error("Error fetching post:", error);
            throw new Error("Post retrieval failed. Please try again later.");
        }
    }

    async getPosts(queries = [Query.equal('status', 'active')]) {
        try {
            const response = await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            );
            return response.documents;
        } catch (error) {
            console.error("Error fetching posts:", error);
            throw new Error("Posts retrieval failed. Please try again later.");
        }
    }

    // Appwrite storage services
    async uploadFile(file) {
        try {
            const response = await this.storage.createFile(config.appwriteBucketId, ID.unique(), file);
            return response;
        } catch (error) {
            // throw error;
            console.error("Error uploading file:", error);
            throw new Error("File upload failed. Please try again later.");
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(config.appwriteBucketId, fileId);
            return true; // Return true on successful deletion
        } catch (error) {
            console.error("Error deleting file:", error);
            return false; // Return false if deletion fails
        }
    }

    getFilePreview(fileId) {
        return this.storage.getFilePreview(config.appwriteBucketId, fileId);
    }
    
}


const service = new AppwriteServices();

export default service;