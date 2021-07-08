import { Router } from 'express';
//import { getAllUsers, addOneUser, updateOneUser, deleteOneUser } from './Users';
import { getAllUsers, addOneUser, getOneUser, addUserToFollow  } from './Users';
import { getAllAnime, addOneAnime } from './Anime';
import { addOneComment, getAllPageComments, getAllPostComments, getAllUserComments } from './Post';


// User-route
const userRouter = Router();
userRouter.get('/all', getAllUsers);
userRouter.get('/:user', getOneUser);
userRouter.post('/add', addOneUser);
userRouter.post('/update', addUserToFollow);
//userRouter.put('/update', updateOneUser);
//userRouter.delete('/delete/:id', deleteOneUser);
const animeRouter = Router();
animeRouter.get('/all', getAllAnime);
animeRouter.post('/add', addOneAnime);

// Post-comment
const postRouter = Router();
postRouter.get('/Anime/:subject', getAllPageComments);
postRouter.get('/User/:subject', getAllUserComments);
postRouter.get('/comments/:subject', getAllPostComments);
postRouter.post('/add', addOneComment);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/users', userRouter);
baseRouter.use('/anime', animeRouter);
baseRouter.use('/Post', postRouter);
export default baseRouter;
