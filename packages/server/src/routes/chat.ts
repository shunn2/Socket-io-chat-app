import { Router } from "express";

import Chat from "../schemes/chat";
import Room from "../schemes/room";
import User from "../schemes/user";

const router = Router();

/*채팅 목록*/
router.get("/:roomId", async (req, res) => {
  try {
    const chat = await Chat.findAll({
      where: {
        roomId: req.params.roomId,
      },
      include: [User, Room],
    });
    res.json(chat);
  } catch (e) {}
});

/*채팅 전송*/
router.post("/:roomId", async (req, res) => {
  try {
    const chat = await Chat.create({
      senderId: req.session.userId,
      content: req.body.content,
      roomId: req.params.roomId,
    });

    /*TODO:: socket*/
    res.json({ message: "OK" });
  } catch (e) {}
});

export default router;
