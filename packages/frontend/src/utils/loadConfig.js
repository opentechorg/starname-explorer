function loadConfig(path) {
  var fs = require("fs");
  const content = fs.readFileSync(path);

  return JSON.parse(content);
}

export default loadConfig;

/* Usage example 
import loadConfig from "./utils/loadConfig";

const config = loadConfig(path.resolve("./config/config.json"));
*/
