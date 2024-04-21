import { fetchData } from './fetchData.js';
import { renderEpisode } from './renderEpisode.js';
const container = document.querySelector('.container')

export async function renderEpisodes() {
  const episodes = await fetchData('https://swapi.dev/api/films/');
  container.innerHTML = "";

  const episodePromises = episodes.results.map(async episode => {
    const episodeId = episode.episode_id;
    const link = document.createElement('a');

    link.textContent = `Episode ${episodeId}: ${episode.title}`;
    link.classList.add('episode');

    link.addEventListener('click', async (event) => {
      event.preventDefault();

      const episodeData = await fetchData(`https://swapi.dev/api/films/${episodeId}`);
      const episodeBlock = await renderEpisode(episodeData, container);

      container.append(episodeBlock);
    });

    container.append(link);
  });

  await Promise.all(episodePromises);
}
