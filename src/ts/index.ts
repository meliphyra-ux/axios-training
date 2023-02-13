import { debounce, getPostHandler, createNewPost } from './postCreationFuncs';

const postsContainer = document.getElementById('posts');
const getPost = getPostHandler();
const button: HTMLElement | null = document.getElementById('loader');

const handleButtonClick = () => {
  if (button !== null) {
    button.innerHTML = 'Wait for 1 second...';
    button.setAttribute('disabled', 'true');
    setTimeout(() => {
      button.innerHTML = 'Load post';
      button.removeAttribute('disabled');
    }, 1000);
    handleNewPost();
  }
};

const handleNewPost = debounce(async () => {
  const post = await getPost();
  postsContainer?.appendChild(createNewPost(post));
}, 1000);

window.addEventListener('load', () => {
  if (button !== null) {
    button.addEventListener('click', handleButtonClick);
  }
});

window.addEventListener('beforeunload', () => {
  button?.removeEventListener('click', handleButtonClick);
});
