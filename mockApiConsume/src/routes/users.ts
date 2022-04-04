import express from 'express';
import controller from '../controlles/users';


const baseURL = `https://62151ae9cdb9d09717adf48c.mockapi.io/api/v1`
const router = express.Router();


router.get('/users/fields/:id', controller.getUserAllFields);

export = router;