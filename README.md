# College of Engineering, Roorkee - API
This API will help in storing and routing of data on our servers. Currently, This API will be used in our Android App and we plan on creating a web app for this as well. It's like a hobby project that can teach us a lot of things about web that we don't know. 

# Usage

An API is provided to do interact with the database. There are two different users of this API. 
```Student``` and ```Warden```. 


# Routing

```
Student
   `->GET
       `->attendance
       `->full
   `->POST
        `->register
        `->update
Warden
```

## Student
----
A Student can ```GET``` or ```POST``` information about himself/herself.

### GET
----
### Student->attendance

---- 

#### URL Example: 
    https://coer-backend.herokuapp.com/student/attendance/:id

#### Authentication: 
> No Authentication is required to access this.

#### Output:
 JSON(parsed), ```{"attendance":"71.03","attenLastUpdated":"14 Oct 2016"}```

---- 

### Student->full

---- 

#### URL Example: 
    https://coer-backend.herokuapp.com/student/full/:id

#### Authentication: 
> Authentication is required. A key has to supplied in header with the key name 'authkey'

#### Output:

> Success: JSON(stringified), ``` Example not available```

> Fail: JSON(stringified), ```Example not available```

---- 

### POST 

----
### Student->Register
----

#### URL Example: 
    https://coer-backend.herokuapp.com/student/register

#### Authentication: 
> Authentication is required. A key has to supplied in header with the key name 'authkey'

#### Input

The input can be urlencoded or JSON. I am using urlencoded for now but that can change. 

    "ID=13467981&phoneno=7984561320&fatherno=3216549871&DOB=21112016&currentStatus=hostel"

ID = Given by college

phoneno = Student Phone number

fatherno = Student's Father's number

DOB = Date of Birth

currentStatus = Can be ```hostel``` or ```dayscholar```

#### Output

> Success: JSON(stringified), Entered data with some additional information like status of this operation(If it was successfully inserted or not)

> Fail: JSON(stringified), Just status and some information about why there was an error in doing this operation.

----
### Student->Update
----

#### URL Example:
    https://coer-backend.herokuapp.com/student/update

#### Authentication: 
> Authentication is required. Same as everything else that requires authentication.

#### Input: 

What ever fields you want to update in Database. In ```JSON``` or ```urlencoded``` form

#### Output

JSON object with status of update.


## Notes

I used Node as the base, Express.js for Routing and MongoDB to store data. Also, Thanks to guys at Mashape.com for creating unirest.io. 

Not licensed but if you are using our project or a part of our project, Please let us know. It'll such a good news!
