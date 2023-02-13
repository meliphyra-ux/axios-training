import { createPost, createNewPost } from './postCreationFuncs';

const button = document.querySelector<HTMLButtonElement>('#submit');
const input = document.querySelector<HTMLInputElement>('input');
const postsContainer = document.getElementById('posts');
const form = document.querySelector('form') 

form?.addEventListener('submit', (e) => {
  e.preventDefault();
});

window.addEventListener('load', () => {
  button?.addEventListener('click', (e) => {
    e.preventDefault();
    createPost(input?.value ?? 'There was no title').then((post) => {
      postsContainer?.appendChild(createNewPost(post));
    });
  });
});
