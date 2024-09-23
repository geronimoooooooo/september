// const mongoose = require('mongoose');
import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://TestTest:TestTest@goldtrade.skpkklp.mongodb.net/');

const TaskSchema = new mongoose.Schema({
  description: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User2' },
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  
});

const UserSchema3 = new mongoose.Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  age: Number,
  email: String,
  posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post4'}],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task2' }],
  tasks:
},
  {timestamps: true}
);

const PostSchema = new mongoose.Schema({
  title: String,
  body: String,
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User3'}
},
  {timestamps: true}
);

const User = mongoose.model('User2', UserSchema);
const Task = mongoose.model('Task2', TaskSchema);
const User3 = mongoose.model('User3', UserSchema3);
const Post4 = mongoose.model('Post4', PostSchema);

async function createUserAndTask() {
  const user = await User.create({ name: 'John', email: 'john@example.com' });
  const task = await Task.create({ description: 'Finish homework', user: user._id });
  console.log(task);
}

async function createUser3AndPost() {
  const user3 = await User3.create({ username: 'U1', password: 'pw1', email: 'user3@example.com' });
  const post = await Post4.create({title: 'tit7', body: "someBody", author: user3._id});  
  user3.posts.push(post);
  await user3.save();
  console.log(post);
  const user4 = await User3.findOne({username: 'U1'}).populate('posts').exec();
  console.log(user4);
}

// createUser3AndPost();

async function getUser3AndPosts(){
  const user3 = await User3.findOne({username: 'U1'}).populate('posts').exec();
  console.log('user3: '+ await user3.populate('posts'));
}

async function addPostsToUser3(){
  const user3 = await User3.findOne({username: 'U1'})
  const post = await Post4.create({title: 'update1', body: "someBody", author: user3._id});  
  
  //post.author = user3._id;
  user3.posts.push(post._id);
  await user3.save();

  console.log('user3: '+ await user3.populate('posts'));
}

await getUser3AndPosts();
await addPostsToUser3();
// createUserAndTask();

async function getUserAndTasks() {
  const user = await User.findOne({ name: 'John' }).populate('tasks');
  console.log(user);
  console.log("xy: "+ user._id);
  return user._id;
}

// const userID = await getUserAndTasks();
async function createTasksForUser(userId) {
  let user;
  try {
    user = await User.findById(userId);
    console.log(user);
  } catch (err) {
    if (err.name === 'CastError') {
      console.error('Invalid ID');
    } else {
      console.error(err);
    }
  }
    const task1 = await Task.create({ description: 'Finish homework2', user: user._id });
    const task2 = await Task.create({ description: 'Buy groceries', user: user._id });
    user.tasks.push(task1, task2);
    await user.save();
    console.log(await user.populate('tasks'));
    // console.dir(user, { depth: null })
  }
  
// createTasksForUser(await getUserAndTasks());

