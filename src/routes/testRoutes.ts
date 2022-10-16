import { Request, Response } from "express";
import { Router } from "express";

const router = Router();

router.get("/test", (req: Request, res: Response) => {
  return res.status(200).send("OK - 16/10");
});

export default router;
