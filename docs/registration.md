# Registration

## Endpoint

    /student/register

This Endpoint is used to Register a Student.

## Request Type 

    POST
   
## Headers 

    Content-Type: 'application/x-www-form-urlencoded'
    password: Password entered during Registration
    _apikey: A secret APIKEY that has to be provided for a successfull request
    _deviceid: Unique Device ID

1. `_apikey` will be set by the server admin and all the requests sent to server have to provide this APIKEY to do anything at all
2. If you already have a `_deviceid` stored on the device then send it and if you don't have a `_deviceid` then send it anyway, Because you'll get a new one

## Parameters Required

    _id: The 8 digit ID of Student
    phoneno: Student's Phone Number
    fatherno: Student's Fathers Number
    location: Place where student lives
    _dob: Date of Birth of Student
    
1. `location` can either be `hostel` or `dayscholar`. All other values are invalid.

## Responses

#### If Any or all data provided is Invalid

```
{
    "error": "E101", // Error Code
    "invalidKeys": [
        "_id"      // An Array of all the invalid keys
        ]
}
```

#### when the given ID is Invalid
```
{
    "error": "E102",
    "_deviceid": "ad5fd714096e2746f94307d5cf04", 
    "message": "Invalid ID"
}
```

#### When Student ID already exists in Database

```
{
   "error": "E103",
   "message":"Student ID already exists in Database",
}
```
   
#### When an Error occurs in saving Student Details to Database

```
{
   "error": "E104",
   "message": "Errored in Storing Record to Database"
}
```
#### Error Occurs in Fetching Data from College Database

```
{
_deviceid: "ad5fd714096e2746f94307d5cf04",
error: "E500",
errorDetail: "<Error Message in Detail>",
message: "Internal Server Error"
}
```

#### If Everything goes Correctly. 

```
{
    "error": 0,
    "message": "Successfully Created Record",
    "_deviceid": "ad5fd714096e2746f94307d5cf04",
    "data": {
        "_id": "97465234",
        "name": "Ishan Jain"
        }
}
```        
