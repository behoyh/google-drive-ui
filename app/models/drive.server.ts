import { ServerConfig } from "./config.server";

import { google } from "googleapis";
const drive = google.drive("v3");

export async function auth() {
    console.log(ServerConfig.config);
    var jwtClient = new google.auth.JWT(
        ServerConfig.getConfig().key.client_email,
        undefined,
        ServerConfig.getConfig().key.private_key,
        ['https://www.googleapis.com/auth/drive']
    );

    return new Promise((resolve, reject) => {
        jwtClient.authorize(err => {
            if (err) {
                reject(err);
            }
            resolve(jwtClient);
        });
    });
}

export async function getFiles(client) {
    return new Promise((resolve, reject) => {
        drive.files.list({
            auth: client,
            fields: "files(id, name, mimeType, thumbnailLink)"
        }, (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res.data.files);
        });
    });
}

export async function getStorageQuota(client) {
    return new Promise((resolve, reject) => {
        drive.about.get({
            auth: client,
            fields: "*"
        }, (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res.data.storageQuota);
        });
    });
}

export async function deleteFile(client, fileId) {

    if (!fileId)
    {
        console.error("file id is not defined.", fileId);
        return;
    }

    return new Promise((resolve, reject) => {
        drive.files.delete({
            fileId: fileId,
            auth: client,
        }, (err, res) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            console.log(res.data.files);
            return resolve(res.data);
        });
    });
}