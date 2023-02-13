import { createPost } from './axiosFuncs';
import { createNewPost } from '.';
const button = document.querySelector<HTMLButtonElement>('#submit');
const input = document.querySelector<HTMLInputElement>('input');

const postsContainer = document.getElementById('posts');

document.querySelector('form')?.addEventListener('submit', (e) => {
  e.preventDefault();
});

window.addEventListener('load', () => {
  button?.addEventListener('click', (e) => {
    e.preventDefault();
    createPost(input?.value ?? 'There was no title').then((post) => {
      console.log(post);
      postsContainer?.appendChild(createNewPost(post));
    });
  });
});
