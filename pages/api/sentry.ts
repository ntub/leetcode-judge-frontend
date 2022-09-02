import type { NextApiRequest, NextApiResponse } from "next"
import { withSentry } from "@sentry/nextjs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ name: "Hello Sentry." });
};

export default withSentry(handler);