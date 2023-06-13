import { type NextApiHandler } from "next";
import { z } from "zod";

import { agent } from "~/core/agent";

const handler: NextApiHandler = async (req, res) => {
  try {
    const input = z.string().parse(req.query.input);

    const agentResult = await agent(input);

    res.status(200).json({ output: agentResult });
  } catch (error) {
    console.error(error);
  }
};

export default handler;
