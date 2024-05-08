if (process.env.NODE_ENV === "production") {
  module.exports = {
    mongoURI:
      "mongodb+srv://linsmariya:<hoku2023>@storybook-prod.eecxddh.mongodb.net/",
  };
} else {
  module.exports = {
    mongoURI: "mongodb://localhost/storybooks-dev",
  };
}
