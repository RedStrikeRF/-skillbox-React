import { fetchData } from "./fetchData.js";

export async function createPlanets(episodePlanetsLinks) {
  const allPlanetsBlock = document.createElement('div');
  allPlanetsBlock.classList.add('addons')

  const planetsPromises = episodePlanetsLinks.map(planet => fetchData(planet));

  const planetsData = await Promise.all(planetsPromises);

  planetsData.forEach(data => {
    const newPlanet = document.createElement('p');
    newPlanet.textContent = data.name;
    allPlanetsBlock.append(newPlanet);
  });

  return allPlanetsBlock;
}

export async function createSpecies(episodeSpeciesLinks) {
  const allSpeciesBlock = document.createElement('div');
  allSpeciesBlock.classList.add('addons');

  const speciesPromises = episodeSpeciesLinks.map(Species => fetchData(Species));

  const SpeciesData = await Promise.all(speciesPromises);

  SpeciesData.forEach(data => {
    const newSpecies = document.createElement('p');
    newSpecies.textContent = data.name;
    allSpeciesBlock.append(newSpecies);
  });

  return allSpeciesBlock;
}