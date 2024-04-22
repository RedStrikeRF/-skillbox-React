import { prototypesContainer } from "./main.js";

export const showPrototypes = (input) => {
  let prototype = input;

  // Проверка входных данных
  if (typeof input === 'string') {
    if (!input.endsWith('.js') && typeof window[input] !== 'function') {
      return;
    } else if (input.endsWith('.js')) {
      // Динамический импорт модуля
      import(input).then((module) => {
        prototype = module.default;
        displayPrototypes(prototype);
      }).catch(() => {
        console.error('Не удалось загрузить модуль.');
      });
    } else {
      prototype = window[input];
    }
  }

  // Вывод цепочки прототипов
  displayPrototypes(prototype);
};

const displayPrototypes = (prototype) => {
  // Очистка предыдущего результата
  prototypesContainer.innerHTML = '';

  let currentPrototype = prototype;

  // Перебор цепочки прототипов
  while (currentPrototype !== null) {
    // Создание элемента списка для текущего прототипа
    const prototypeItem = document.createElement('li');
    prototypeItem.classList.add('prototype');

    // Название прототипа (конструктора)
    const prototypeName = currentPrototype.constructor ? currentPrototype.constructor.name : '[Без названия]';
    const prototypeNameElement = document.createElement('h3');
    prototypeNameElement.textContent = prototypeName;
    prototypeItem.appendChild(prototypeNameElement);

    // Перебор перечислимых свойств прототипа
    const enumerableProperties = Object.getOwnPropertyNames(currentPrototype);
    if (enumerableProperties.length) {
      const propertiesList = document.createElement('ol');
      propertiesList.classList.add('properties');
      prototypeItem.appendChild(propertiesList);

      for (const property of enumerableProperties) {
        const propertyItem = document.createElement('li');
        propertyItem.classList.add('property');

        const propertyName = document.createElement('span');
        propertyName.textContent = property;
        propertyItem.appendChild(propertyName);

        const propertyType = document.createElement('span');
        propertyType.classList.add('type');
        propertyType.textContent = typeof currentPrototype[property];
        propertyItem.appendChild(propertyType);

        propertiesList.appendChild(propertyItem);
      }
    }

    // Добавление элемента списка в контейнер
    prototypesContainer.appendChild(prototypeItem);

    // Переход к следующему прототипу
    currentPrototype = Object.getPrototypeOf(currentPrototype);
  }
};
