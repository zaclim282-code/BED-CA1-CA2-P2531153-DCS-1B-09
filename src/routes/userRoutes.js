// src/routes/todoRoutes.js  (REPLACE the whole file with this)
import express from 'express';
import { getAllUsers,getUserById,createUser,updateUser,deleteUser
 
} from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
// router.get('/users/:userId/todos',  getTodosByUser);
// router.post('/users/:userId/todos', addTodo);

// router.get('/todos/:id',    getTodoById);
// router.patch('/todos/:id',  markComplete);


export default router;