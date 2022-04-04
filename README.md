
##  REST API GATEWAY (LinkApi by Semantix)

**_This API was built as a resolution of the [Technical Challenge LinkApi - Junior]_** 

*_Requested delivery date: 04/04/2022_*

*_Started: 02/04/2022_* 

*_Delivered to: 04/04/2022_*


### ***Prerequisites***

Make sure you have Node.js and a tool for interacting with web-based APIs installed on your machine (Postman or Insomnia).

This application was developed using node version 14.17.6

### ***Run the app in localhost***

After steps make sure port 3030 and 3000 are not in use, follow the steps below:

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


## Quick analysis of performance api gatway in users router

We analyzed 10 responses of the api gatway in the user route and it was concluded that on average the respot time is  ***217 seconds***. It was also noticed that in some requests the status code 429 was observed. In the table below it is possible to see the approximate time of each test

|Test|Response Time (s)|Status|
|-|-|-|
|1|209|200|
|2|279|200|
|3|211|200|
|4|208|200|
|5|210|304|
|6|208|304|
|7|208|200|
|8| - |429|
|9| - |429|
|10|208|200|

## Points of difficulty and improvement

1 - During the development of application process 429 it was found that the number of service errors was not very evident. This was the most difficult point,
it was difficult to get around it did not have the information on the limit of requests that can be sent in a certain period of time. This difficulty was overcome by a timeout in the subprocess responsible for building the response in the '/users' route.
Although it worked, the request was slower. 

```
(node:8188) UnhandledPromiseRejectionWarning: Error: Request failed with status code 429
    at createError (C:\Users\icoelho4\Desktop\desafio\LinkAPI-Desefio-Jr\mockApiConsume\node_modules\axios\lib\core\createError.js:16:15)
    at settle (C:\Users\icoelho4\Desktop\desafio\LinkAPI-Desefio-Jr\mockApiConsume\node_modules\axios\lib\core\settle.js:17:12)
    at IncomingMessage.handleStreamEnd (C:\Users\icoelho4\Desktop\desafio\LinkAPI-Desefio-Jr\mockApiConsume\node_modules\axios\lib\adapters\http.js:322:11)
    at IncomingMessage.emit (events.js:412:35)
    at IncomingMessage.emit (domain.js:470:12)
    at endReadableNT (internal/streams/readable.js:1317:12)
    at processTicksAndRejections (internal/process/task_queues.js:82:21)
(node:8188) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 4)
```

**Solution**

Please if you have error 429 try increasing the parameter of the sleep function this should solve until we find the best solution for this problem.
example: change sleep(600) for sleep(700)

in gateway/src/controllers/user.ts
```
const getUserAllFields = async (req: Request, res: Response) => {
...
 /**Create subprocess */
   ...
      await sleep(600);  
    ...
    }  
  ...
}
```

change for:

```
const getUserAllFields = async (req: Request, res: Response) => {
...
 /**Create subprocess */
   ...
      await sleep(700);  
    ...
    }  
  ...
}
```

2 - Another point that should be noted is that I did not find the countryCode field of the address listing when I return the data from the '/users/{idUser}/address' route

![image](https://user-images.githubusercontent.com/38250160/161597020-f31cfe9d-824a-4a75-b31f-20dbab56ea0c.png)

**Solution**

so this problem was solved by just joining the first two initials of the country field.

in mockApiConsume/src/controlles/users.ts

```
const getUserAllFields = async (req: Request, res: Response) => {
 ...
 for (let n:number=0; n < address.length; n++ ){       
        allAddress= {
            ...
            countryCode: (address[n].country).substring(0, 2).toUpperCase(),
            ...
        }

...
}
 countryCode: (address[n].country).substring(0, 2).toUpperCase(),
``` 
## Improvement points

1 - Implement automated tests on api routes. Example, usage Jest

2 - Implement  automate security into the API development pipeline. Example, usage 42cruch

3 - Acceleration open source adoption with scalable end license compliance and vulnerabilities. Example, FOSSA

4 - A Retry-After header  in API service mock indicating how long to wait before making a new request. 

5 - Use environment variables and dotenv module to hide sensitive API data. Example, module dotenv for typescript

