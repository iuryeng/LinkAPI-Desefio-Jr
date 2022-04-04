import express from 'express';
import controlles from '../controllers/user'
import httpProxy from 'express-http-proxy';

const router = express.Router();

const parameterHost = "62151ae9cdb9d09717adf48c";
const baseURL = `https://${parameterHost}.mockapi.io/api/v1`;


/** Get users in service mockApi with http proxy */
router.get('/users/:id', httpProxy(baseURL, {timeout: 3000}));

// get address from a specific user
router.get('/users/:id/address',httpProxy(baseURL, {timeout: 3000}));

// get contact from a specific user
router.get('/users/:id/contacts',httpProxy(baseURL, {timeout: 3000})); 

/** Groups address and contact for a specific user in subprocess*/
router.get('/users', controlles.getUserAllFields);

export default router