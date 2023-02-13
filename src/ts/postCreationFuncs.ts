import axios from 'axios';

export type PostType = {
  userId: number;
  id: number;
  title: string;
};
type ResponseType = PostType & {
  completed?: boolean;
};

export const debounce = (f: Function, ms: number) => {
  let isCooldown = false;

  return function () {
    if (isCooldown) return;

    f.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => (isCooldown = false), ms);
  };
};

export const getPostHandler = () => {
  let postToLoad = 1;
  return async () => {
    try {
      const response = await axios.get<ResponseType>(
        `https://jsonplaceholder.typicode.com/todos/${postToLoad}`,
        {
          transformResponse: [
            function (data) {
              const modifiedData: ResponseType = JSON.parse(data);
              delete modifiedData.completed;
              return modifiedData;
            },
          ],
        }
      );
      postToLoad++;
      console.table(response.data);
      return response.data as PostType;
    } catch (error) {
      console.error(error);
      return { id: -1, userId: -1, title: '', completed: false };
    }
  };
};

export const createPost = async (title: string) => {
  const userId = Math.floor(Math.random() * 4096);
  const id = Math.floor(Math.random() * 4096);
  const response = await axios({
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/posts',
    data: {
      userId,
      id,
      title,
    },
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  return response.data as PostType;
};

export const createNewPost = (post: PostType) => {
  const newPost = document.createElement('div');
  Object.values(post).forEach((value) => {
    const newPTag = document.createElement('p');
    const newTextNode = document.createTextNode(`${value}`);
    newPTag.append(newTextNode);
    newPost.appendChild(newPTag);
  });
  newPost.classList.add('post');

  return newPost;
};
