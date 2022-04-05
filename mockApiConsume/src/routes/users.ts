import express from 'express';
import controller from '../controlles/users';

const router = express.Router();

router.get('/users/:id/fields', controller.getUserAllFields);

export = router;