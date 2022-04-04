/** src/controllers/users.ts */
import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';

interface User {
    createdAt: String;
    firstName: String;
    avatar: String;
    email: String;
    lastName: String;
    id: String
}

interface Address {
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
    number: Number,
    id: String,
    userId: String
}

interface  Contacts {
    name: String,
    phoneNumber: String,
    email: String,
    id: String,
    userId: String
}


const parameterHost = "62151ae9cdb9d09717adf48c"
const baseURL = `https://${parameterHost}.mockapi.io/api/v1`
const router = "/users"

/** Groups address and contact for a specific user*/
const getUserAllFields = async (req: Request, res: Response) => {
    let id: string = req.params.id;
    let resultUser: AxiosResponse = await axios.get(baseURL + router + `/${id}` );
    let user: User = resultUser.data;
    let resultAddress: AxiosResponse = await axios.get(baseURL + router + `/${id}` + '/address');
    let address: Address [] = resultAddress.data;
    let resultContact: AxiosResponse = await axios.get(baseURL + router + `/${id}` + '/contacts');
    let contacts: Contacts [] = resultContact.data
    let allContacts: Object = {}
    let allAddress: Object = {}
    let arrayAllAddress = []
    let arrayAllContacts = []

    for (let n:number=0; n < contacts.length; n++ ){       
        allContacts= {
            contactId: contacts[n].id,
            name: contacts[n].name,
            phoneNumber: contacts[n].phoneNumber,
            email: contacts[n].email
        }
        arrayAllContacts.push(allContacts)
    }

    for (let n:number=0; n < address.length; n++ ){       
        allAddress= {
            addressId: address[n].id,
            address: `${address[n].street} + ${address[n].number}`,
            country: address[n].country,
            countryCode: (address[n].country).substring(0, 2).toUpperCase(),
            city: address[n].city,
            state: address[n].state,
            zipcode: address[n].zipcode
        }

        arrayAllAddress.push(allAddress)
    }

    return res.status(200).json({
        "id": user.id,
        "fullName": `${user.firstName} ${user.lastName}`,
        "email": user.email,
        "Addresses":  arrayAllAddress,
        "Contacts": allContacts

    });
};

export default { getUserAllFields };