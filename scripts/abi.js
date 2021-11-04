const fs = require("fs");
const ABI_PATH = "./src/utils/abi.json";

async function main() {
  const contractArtifact = await hre.artifacts.readArtifact("IconicIndex");
  fs.writeFileSync(ABI_PATH, JSON.stringify(contractArtifact.abi));
  console.log("IconicIndex ABI Updated");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
