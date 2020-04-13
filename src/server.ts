import bodyParser from "body-parser";
import express from "express";
import {filterImageFromURL, isURL} from "./util/util";
import * as fs from "fs";

(async () => {

    // Init the Express application
    const app = express();

    // Set the network port
    const port = process.env.PORT || 8082;

    // Use the body parser middleware for post requests
    app.use(bodyParser.json());

    // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
    // GET /filteredimage?image_url={{URL}}
    // endpoint to filter an image from a public url.
    // IT SHOULD
    //    1
    //    1. validate the image_url query - done
    //    2. call filterImageFromURL(image_url) to filter the image - done
    //    3. send the resulting file in the response
    //    4. deletes any files on the server on finish of the response
    // QUERY PARAMATERS
    //    image_url: URL of a publicly accessible image
    // RETURNS
    //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

    /**************************************************************************** */

    // ! END @TODO1

    // Root Endpoint
    // Displays a simple message to the user
    app.get("/", async (req, res) => {
        res.send("try GET /filteredimage?image_url={{}}");
    });

    app.get("/filteredimage", async (req, res) => {
        const imageUri = req.query.image_url;
        if (!imageUri || !isURL(imageUri)) {
            return res.status(400).send("malformed url, only is https supported");
        }
        const imagePath = await filterImageFromURL(imageUri);

        res.setHeader("Content-Type", "image/jpg; charset=utf-8");
        res.setHeader("Transfer-Encoding", "chunked");
        fs.readFile(imagePath, (err, data) => {
            res.write(data);
        });
    });

    // Start the Server
    app.listen(port, () => {
        // tslint:disable-next-line:no-console
        console.log(`server running http://localhost:${port}`);
        // tslint:disable-next-line:no-console
        console.log(`press CTRL+C to stop server`);
    });
})();
