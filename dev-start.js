const concurrently = require("concurrently");

concurrently([
  {
    command: "yarn db-start",
    name: "db",
    prefixColor: "blue",
  },
  {
    command: "yarn start",
    name: "react-app",
    prefixColor: "yellow",
  },
]);
