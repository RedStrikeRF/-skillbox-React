import { renderEpisodes } from './renderEpisodes.js';

const container = document.querySelector('.container');

document.addEventListener('DOMContentLoaded', () => {
  renderEpisodes(container);
});
