# Nodejs REST-API Using MongoDB Collection

## Description

This repository is to provide a single endpoint that fetches the data in the provided MongoDB collection and return the results in the requested format. You can do POST request by given JSON format of four main params ( startDate, endDate, minCount, maxCont ) in body. Searching and filtering method were used for backend operations.

## Getting started

Amazon AWS endpoint of API: http://ec2-54-82-249-137.compute-1.amazonaws.com:3000/getir/records

Send Post request as in the examples below:

### Success Response:

{
"startDate": "2020-01-26",
"endDate": "2018-02-02",
"minCount": 2700,
"maxCount": 3000
}

### Invalid Params:

{
"startDate": "test",
"endDate": "2018-02-02",
"minCount": 2700,
"maxCount": 3000
}

### No records

{
"startDate": "2016-01-26",
"endDate": "2018-02-02",
"minCount": 2700,
"maxCount": 3000
}

