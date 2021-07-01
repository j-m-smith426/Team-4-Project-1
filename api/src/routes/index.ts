import { Router } from 'express';
//import { getAllUsers, addOneUser, updateOneUser, deleteOneUser } from './Users';
import { getAllUsers, addOneUser } from './Users';
import { getAllAnime, addOneAnime } from './Anime';


// User-route
const userRouter = Router();
userRouter.get('/all', getAllUsers);
userRouter.post('/add', addOneUser);
//userRouter.put('/update', updateOneUser);
//userRouter.delete('/delete/:id', deleteOneUser);
const animeRouter = Router();
animeRouter.get('/all', getAllAnime);
animeRouter.post('/add', addOneAnime);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/users', userRouter);
baseRouter.use('/anime', animeRouter);
export default baseRouter;
