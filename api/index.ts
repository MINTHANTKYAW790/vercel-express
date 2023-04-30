import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import formidable from "formidable";
const app = express();
const port = 3000;
const apiUrl = process.env.API_URL;
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req: Request, res: Response) => {
    res.send("Hello");
});

const html = `
<!DOCTYPE html>
<html lang="en">


<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>

<body>
  <script type="text/javascript">
    localStorage.setItem('apiUrl','${apiUrl}')
    window.location.href = "/"
  </script>
  
</body>

</html>
`;

app.get("/api", (req: Request, res: Response) => {
    res.send(html);
});

app.get("/api/users", (req: Request, res: Response) => {
    res.send({
        name: "Min Thant Kyaw",
        age: 52,
        gmail: "minthantkyaw1@ucsm.edu.mm",
    });
});

app.post("/api/uploadFile", (req: Request, res: Response) => {
    const fileId = uuidv4();
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.writeHead(err.httpCode || 400, {
                "Content-Type": "text/plain",
            });
            return res.end(String(err));
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ fields, files }, null, 2));
    });

    /*console.log(req.headers)
  const writeStream = fs.createWriteStream("./test.jpg");
  req.pipe(writeStream);*/
    res.end();
});

app.listen(3000, () => {
    console.log("The server is listening on port : ", port);
});
