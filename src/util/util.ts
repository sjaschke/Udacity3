import fs from "fs";
import {v4 as uuidv4} from "uuid";
import Jimp = require("jimp");

const TMP_PATH = __dirname + "/tmp";

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to  an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
    return new Promise(async (resolve) => {
        const photo = await Jimp.read(inputURL);
        const outpath = TMP_PATH + "/filtered." + uuidv4() + ".jpg";
        photo
            .resize(256, 256) // resize
            .quality(60) // set JPEG quality
            .greyscale() // set greyscale
            .write(outpath, (img) => {
                resolve(outpath);
            });
    });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: string[]) {
    for (const file of files) {
        fs.unlinkSync(TMP_PATH + "/" + file);
    }
}

export function deleteTmpFolder(): number {
    let fileCount: number;
    if (fs.existsSync(TMP_PATH)) {
        const files = fs.readdirSync(TMP_PATH);
        fileCount = files.length;
        deleteLocalFiles(files);
    }
    return fileCount;
}

export function isURL(str: string): boolean {
    str = decodeURI(str);
    const pattern = new RegExp("^(https:\\/\\/)?" + // protocol (https only)
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$", "i"); // fragment locator
    return pattern.test(str);
}

function add({x, y}: { x: number, y: number }): number {
    return x + y;
}

function sub({x, y}: { x: number, y: number }): number {
    return x - y;
}
