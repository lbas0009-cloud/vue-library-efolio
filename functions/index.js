const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = await admin.firestore().collection("books").get();
      const count = booksCollection.size;
      res.status(200).json({ count });
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});

exports.addBookCapitalized = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { isbn, name } = req.body;
      const capitalizedName = name.toUpperCase();

      const docRef = await admin.firestore().collection("books").add({
        isbn: Number(isbn),
        name: capitalizedName
      });

      res.status(200).json({ id: docRef.id, isbn: Number(isbn), name: capitalizedName });
    } catch (error) {
      console.error("Error adding book:", error.message);
      res.status(500).send("Error adding book");
    }
  });
});