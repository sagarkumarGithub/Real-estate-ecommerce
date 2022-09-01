const mongoose = require("mongoose");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");
const Campground = require("../model/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "61613ab1a70a71ab02647ca3",
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam optio ipsam, laudantium exercitationem officia accusamus!! ",
      price,
      images: [
        {
          url: "https://res.cloudinary.com/di7k6f3lr/image/upload/v1634344730/YelpCamp/vvzq6xo8hwbtnt829ozp.jpg",
          filename: "YelpCamp/vvzq6xo8hwbtnt829ozp",
        },
        {
          url: "https://res.cloudinary.com/di7k6f3lr/image/upload/v1634344729/YelpCamp/yzepoilmfpuybfi2pg80.jpg",
          filename: "YelpCamp/yzepoilmfpuybfi2pg80",
        },
      ],
    });
    await camp.save();
  }
};
seedDb().then(() => {
  mongoose.connection.close();
});
