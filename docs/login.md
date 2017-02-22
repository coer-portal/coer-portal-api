# Registration

## Endpoint

    /login/student

This Endpoint is used to Register a Student.

## Request Type 

    POST
   
## Headers 

    Content-Type: 'application/x-www-form-urlencoded'
    password: Password entered during Registration
    _apikey: A secret APIKEY that has to be provided for a successfull request
    _deviceid: Unique Device ID

1. `_apikey` will be set by the server admin and all the requests sent to server have to provide this APIKEY to do anything at all
2.  you already have a `_deviceid` stored on the device then send it and if you don't have a `_deviceid` then send it anyway, Because you'll get a new one

## Parameters Required

    _id: The 8 digit ID of Student
    
1. `location` can either be `hostel` or `dayscholar`. All other values are invalid.

## Responses

####  Any or all data provided is Invalid

```
{
    "error": "E101",
    "invalidKeys": [
        "_id"
        ]
}
```
```invalidKeys``` field contains an Array of all the invalid values

#### ID is not registered in Database
```
{
    "error": "E111",
    "_deviceid": "ad5fd714096e2746f94307d5cf04", 
    "message": "New User, Proceed to Registration",
    "data": {
        "_id": 15646579
        }
}
```

#### Entered Password is incorrect

```
{
   "error": "E107",
   "message": "Wrong Password",
   "_deviceid": "ad5fd714096e2746f94307d5cf04",
   data: {
      "_id": 98794654
      }
}
```

####  Everything goes Correctly. 

```
{
    "error": 0,
    "message": "Login Successful",
    "_deviceid": "ad5fd714096e2746f94307d5cf04",
    "data": {
        "_id": "97465234",
        "accesstoken": "4f3099c6da17512f0f462469db42f1d2398b0a22"
        }
}
```        
