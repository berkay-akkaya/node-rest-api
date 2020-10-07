const express = require('express');
const records = require('../controllers/home');
const router = express.Router();

router.post('/', async (req, res) => {
  const { startDate, endDate, minCount, maxCount } = req.body;
  const datePattern = new RegExp(
    /^(19|20|21)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/
  );

  let response = {
    code: 1,
    msg: 'Given field/fields is not valid. Check your request'
  };

  // check if params appropriate type
  if (
    datePattern.test(startDate) &&
    datePattern.test(endDate) &&
    Number.isInteger(minCount) &&
    Number.isInteger(maxCount)
  ) {
    response.records = await records.modifyRecords(startDate, endDate, minCount, maxCount);

    if (response.records) {
      response =
        Array.isArray(response.records) && response.records.length > 0
          ? { ...response, code: 0, msg: 'Success', records: response.records }
          : { ...response, code: 2, msg: 'There is no record' };
    } else {
      response.code = 3;
      response.msg = 'Database Connection Failed';
    }
  }

  if (response.code == 1) {
    res.status(400);
  } else if (response.code == 2) {
    res.status(404);
  } else if (response.code == 3) {
    res.status(500);
  }
  res.send(response);
});

module.exports = router;
