require("dotenv").config();

const urlRegex = /localhost:[0-9]{1,5}/g;

expect.addSnapshotSerializer({
  test: (val) => {
    return typeof val === "string" && urlRegex.test(val);
  },
  print: (val) => {
    return val.replace(urlRegex, "localhost.com");
  },
});
