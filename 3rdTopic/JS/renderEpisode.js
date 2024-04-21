import { createPlanets , createSpecies } from './createAdditionalElement.js';
import { renderEpisodes } from './renderEpisodes.js';

export async function renderEpisode(episodeData, container) {
  container.innerHTML = "";
  const episodeHeader = document.createElement('h1');
  const episodeDescription = document.createElement('p');
  const episodePlanets = document.createElement('div');
  const planetsTitle = document.createElement('h2');
  const episodeSpecies = document.createElement('div');
  const speciesTitle = document.createElement('h2');

  episodeHeader.textContent = `Episode ${episodeData.episode_id}: ${episodeData.title}`;
  episodeDescription.textContent = episodeData.opening_crawl;

  planetsTitle.textContent = 'Planets';
  const planetsPromise = createPlanets(episodeData.planets);
  
  speciesTitle.textContent = "Species";
  const speciesPromise = createSpecies(episodeData.species);

  const [planetsContent, speciesContent] = await Promise.all([planetsPromise, speciesPromise]);
  
  episodePlanets.append(planetsTitle, planetsContent);
  episodePlanets.classList.add('addons1')
  episodeSpecies.append(speciesTitle, speciesContent);
  episodeSpecies.classList.add('addons1')
  
  const button = document.createElement('button');
  button.classList.add('button');
  button.textContent = 'Back to episodes';
  button.addEventListener('click', renderEpisodes);

  const episodeBlock = document.createElement('div');
  episodeBlock.classList.add('episodeBlock');
  episodeBlock.append(episodeHeader, episodeDescription, episodePlanets, episodeSpecies, button);

  return episodeBlock;
}
