import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 3000;
const apiUrl = process.env.API_URL;

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

app.listen(3000, () => {
    console.log("The server is listening on port : ", port);
});
