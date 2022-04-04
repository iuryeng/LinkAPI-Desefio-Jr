
##  REST API GATEWAY (LinkApi by Semantix)

This API was built as a resolution of the [Technical Challenge LinkApi - Junior] 

### ***Prerequisites***

Make sure you have Node.js and a tool for interacting with web-based APIs installed on your machine (Postman or Insomnia).

This application was developed using node version 14.17.6

### ***Run the app in localhost***

follow the steps below:

1. inside  directory of your choice and clone the application with: 

- ```$ git clone https://github.com/iuryeng/LinkAPI-Desefio-Jr ```

2. inside directory .../apiGateway/gateway and install the modules gateway:

-  ```$ npm install```

3. inside directory .../apiGateway/mockApiConsume and install the modules mockApiConsume:

-  ```$ npm install```

4. start mockApiConsume:

- ```$ npm run dev```

5. start mockApiConsume:

- ```npm run dev```

*After installing the modules and starting your application should look like the image below:*

![image](https://user-images.githubusercontent.com/38250160/161570811-b8ca4e45-ab65-4af0-aac2-a64e3e500c12.png)


### Test the application

1. After performing the previous steps, access:
- Routers API GATWAY


|HTTP method|Route|Description|
|-|-|-|
|GET|http://localhost:3030/users|get all users with groups address and contact for each user|
|GET|http://localhost:3030/users/{userId}|get users in service mockApi with http proxy |
|GET|http://localhost:3030/users/{userId}/address|get address from a specific user with http proxy|
|GET|http://localhost:3030/users/{userId}/contacts|get contact from a specific user with http proxy|


- Route of ApiMockConsume

|HTTP method|Route|Description|
|-|-|-|
|GET|http://localhost:3000/users/fields/{userId}| get user with groups address and contact for this specific user*/|


2. Validation of Requirements:

With the application running, enter the route http://localhost:3030/users , after the subprocess is finished, the request should look like the image below:

![image](https://user-images.githubusercontent.com/38250160/161574612-8e143efd-a307-49a2-a78a-54bffa4cb391.png)

## Points of difficulty and improvement

During the development of application process 4 or 29 it was found that the number of service errors was not very evident. This was the most difficult point,
it was difficult to get around it did not have the information on the limit of requests that can be sent in a certain period of time. This difficulty was overcome by a timeout in the subprocess responsible for building the response in the '/users' route.
Although it worked, the request was slower. Please if you have error 429 try increasing the parameter of the sleep function this should solve until we find the best solution for this problem.

Another point that should be noted is that I did not find the countryCode field of the address listing when I return the data from the '/users/{idUser}/address' route, so this problem was circumvented by just joining the first two initials of the country field
