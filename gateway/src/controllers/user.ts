import express from 'express';
import { Request, Response } from 'express';
import axios, { Axios, AxiosResponse } from 'axios';

const router = express.Router();

const parameterHost = "62151ae9cdb9d09717adf48c"
const baseURL = `https://${parameterHost}.mockapi.io/api/v1`
const serviceURL = 'http://localhost:3000/users/fields/'

interface User {
  createdAt: String;
  firstName: String;
  avatar: String;
  email: String;
  lastName: String;
  id: String
}

interface Addresses {
  addressId: String,
  address: String, 
  country: String,
  countryCode: String,
  city: String,
  state: String,
  zipcode: String
}

interface Contacts {
  contactId: String,
  name: String,
  phoneNumber: String,
  email: String
}

interface AllUserFild {
    id: String,
    fullName: String,
    email: String,
    Addresses: [Addresses],
    Contacts: [Contacts]   
}

const getUserAllFields = async (req: Request, res: Response) => {
    let id: number
    let array = []
    /** Get all users */
    let result: AxiosResponse = await axios.get(baseURL + '/users')
    let users: [User] = result.data;
    
    /**Log runnib process */
    console.log("   running subprocess")
    process.stdout.write('Please loading subprocess:')
    
    /**Create subprocess */
    for (id = 1; id < users.length + 1; id ++ ){       
      //search address and contact for each user
      let result : AxiosResponse = await axios.get( serviceURL + `${id}`)
      let arrayUsers: [AllUserFild] = result.data
      array.push(arrayUsers)        
      await sleep(700);  
      process.stdout.write(`==`);
    }  
    return res.status(200).send(array);      
}

/**Create sleep process timeout */
async function sleep(ms:number) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

export default {getUserAllFields}
