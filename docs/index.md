# College of Engineering, Roorkee Portal API

# Description

This API provides a very easy way to make the Backend of a Portal for a College or School. It considers the most basic data any
College/School has about a Student and provides you with Endpoints to perform various operations like Student Registration/Login/Outpass System/Notifications.
This Project is Licenses under AGPLv3 but feel free to Contact Us if you want to use this project in your College and we'll get you Up and Running in No Time.

###### Note that this project is not Complete yet.


# Installation

### Tools you'll need to run this Server on your Machine

#### Necessary

   [Redis](http://redis.io)
   
   [MongoDB](http://mongodb.org)
   
   [NodeJS](http://nodejs.org) Version 6.xx

#### Optionals

   [Yarn](https://yarnpkg.com)

1. Clone the Repository

    git clone https://github.com/coer-portal/coer-portal-api

2. Install Dependencies

##### If you have Yarn installed, Type

    cd coer-portal-api
    yarn

##### If you only have npm installed

    cd coer-portal-api
    npm install

# Usage

```
npm start

Server is Live on http://localhost:5000
```


# API Reference

## [Register](https://coer-portal.github.io/coer-portal-api/register)
> Endpoint used to register a Student

## [Login](https://coer-portal.github.io/coer-portal-api/login)
> Endpoint used to login user and get the accesstoken required to do any other business. 

## [Forgot Password](https://coer-portal.github.io/coer-portal-api/forgot-password)
> Endpoint used to get resettoken that can be used to change password of an user

## [Change Password](https://coer-portal.github.io/coer-portal-api/change-password)
> Endpoint used to get change password of an user. It is intended to be used only after receiving resettoken from [Forgot Password](https://coer-portal.github.io/coer-portal-api/forgot-password) Endpoint  

## [Validate Token](https://coer-portal.github.io/coer-portal-api/coer-portal/validate-token)
> Endpoint used to validate if the accesstoken is valid of invalid