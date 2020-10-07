const db = require('../server');

exports.modifyRecords = async (startDateString, endDateString, minCount, maxCount) => {
  // filter date between start and end dates
  const date = {
    createdAt: {
      $gte: new Date(startDateString),
      $lte: new Date(endDateString)
    }
  };

  const recordList = await db.queryFnc(date);

  // db connection fails
  if (!recordList) {
    return;
  }

  // filter totalCount between min and max
  const filteredRecordList = recordList.filter(record => {
    const totalCount = record.counts.reduce((x, y) => x + y, 0);
    return totalCount >= minCount && totalCount <= maxCount;
  });

  filteredRecordList.forEach(record => {
    const totalCount = record.counts.reduce((x, y) => x + y, 0);
    delete record.counts;
    record.totalCount = totalCount;
  });

  return filteredRecordList;
};
