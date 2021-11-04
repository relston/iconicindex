import Cors from "cors";
import token0 from "../../tokens/0/tokenData";

const { HOSTNAME } = process.env;
const tokenIndex = [token0];

/**
 * @todo move the middleware somewhere else
 */
const cors = Cors({
  methods: ["GET", "HEAD"],
});
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

function getMetadata({
  tokenPath,
  imageSrc,
  name,
  description,
  animationPath,
  backgroundColor,
}) {
  return {
    name,
    description,
    image: `${HOSTNAME}${imageSrc}`,
    external_url: `${HOSTNAME}${tokenPath}`,
    animation_url: `${HOSTNAME}${animationPath}`,
    background_color: backgroundColor,
  };
}

export default async function metadataHandler(req, res) {
  await runMiddleware(req, res, cors);

  const { tokenId } = req.query;
  const tokenData = tokenIndex[tokenId];
  if (!tokenData) {
    return res.status(404).json({ error: "Unknown token ID" });
  }

  const metadata = getMetadata(tokenData);
  res.status(200).json(metadata);
}
