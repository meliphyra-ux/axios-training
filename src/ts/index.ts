import { debounce, getPostHandler, PostType } from './axiosFuncs';

const postsContainer = document.getElementById('posts');

const getPost = getPostHandler();

const button: HTMLElement | null = document.getElementById('loader');

const handleNewPost = debounce(async () => {
  const post = await getPost();
  postsContainer?.appendChild(createNewPost(post));
}, 1000);

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

window.addEventListener('load', () => {
  if (button !== null) {
    button.addEventListener('click', () => {
      button.innerHTML = 'Wait for 1 second...';
      button.setAttribute('disabled', 'true');
      setTimeout(() => {
        button.innerHTML = 'Load post';
        button.removeAttribute('disabled');
      }, 1000);
      handleNewPost();
    });
  }
});


window.addEventListener('beforeunload', () =>{
  button?.removeEventListener('click', () => {
    button.innerHTML = 'Wait for 1 second...';
    button.setAttribute('disabled', 'true');
    setTimeout(() => {
      button.innerHTML = 'Load post';
      button.removeAttribute('disabled');
    }, 1000);
    handleNewPost();
  })
})