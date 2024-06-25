import { Request, Response, Router } from "express";
import { db } from "./db";
import multer from "multer";
import os from "os";

const router = Router();

const upload = multer({ dest: os.tmpdir() });

router.get("/users", (req: Request, res: Response) => {
  const users = db.prepare("SELECT * FROM users").all();

  res.json({
    users: users,
  });
});

router.post("/users", (req: Request, res: Response) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.birthdate) {
    res.status(400).json({error: "all fields must be write"});
    return;
  }

  const user = db
    .prepare(
      "INSERT INTO users (first_name, last_name,email, birthdate) VALUES (@firstName, @lastName, @email, @birthdate)"
    )
    .run({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      birthdate: req.body.birthdate,
    });

  res.json({
    id: user.lastInsertRowid,
  });
});

router.get("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const users = db.prepare("SELECT * FROM users WHERE id=?").get(id);

  if(!users){
    return res.status(0).json({error:"User not found"})
  }

  res.json({
    users: users,
  });
});

router.put("/updateUsers/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.birthdate || !req.body.birthdate) {
    res.status(400).json({error: "all fields must be write"});
    return;
  }

  const user = db
    .prepare(
      `UPDATE users SET 
        first_name = @firstName,
        last_name = @lastName,
        email = @email,
        birthdate = @birthdate
      WHERE id = @id`
    )
    .run({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      birthdate: req.body.birthdate,
      id: id,
    });

    if(!user){
      return res.status(404).json({ error: "User not found or nothing change"});
    }

  res.json({
    id: id,
  });
});

router.post(
  "/users/bulk",
  upload.single("file"),
  (req: Request, res: Response) => {
    const file = req.file;

    console.log(file);

    res.sendStatus(200);
  }
);

export default router;
