const { MongoClient } = require('mongodb');
require('dotenv').config();

const db = new MongoClient(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

db.connect();

// fetch data from db
exports.queryFnc = async params => {
  try {
    return await db
      .db()
      .collection('records')
      .find(params)
      .project({ key: 1, createdAt: 1, counts: 1, _id: 0 })
      .toArray();
  } catch (err) {
    console.log(err);
    return;
  }
};
