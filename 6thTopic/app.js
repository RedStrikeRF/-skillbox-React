import { showErrorInput, clearErrorInput } from './JS/ui.js';
import { loadClassOrModule } from './JS/loader.js';
import { getPrototypeChain } from './JS/prototypeChain.js';

const classNameInput = document.getElementById('classNameInput');
const showPrototypeChainBtn = document.getElementById('showPrototypeChainBtn');
const prototypeChainDiv = document.getElementById('prototypeChain');

showPrototypeChainBtn.addEventListener('click', async () => {
    const className = classNameInput.value.trim();
    prototypeChainDiv.innerHTML = '';

    if (!className) {
        showErrorInput(classNameInput);
        return;
    }

    clearErrorInput(classNameInput);

    try {
        const classOrModule = await loadClassOrModule(className);

        if (typeof classOrModule !== 'function') {
            showErrorInput(classNameInput);
            return;
        }

        const prototypeChain = getPrototypeChain(classOrModule);

        if (prototypeChain.length === 0) {
            prototypeChainDiv.innerText = 'Цепочка прототипов пуста.';
            return;
        }

        const ol = document.createElement('ol');
        prototypeChain.forEach((proto, index) => {
            const li = document.createElement('li');
            const constructorName = proto.constructor ? proto.constructor.name : '[Без названия]';
            li.textContent = `${constructorName} — прототип ${index + 1}`;
            const innerOl = document.createElement('ol');
            Object.entries(Object.getOwnPropertyDescriptors(proto)).forEach(([prop, descriptor]) => {
                if (prop !== 'constructor') {
                    const innerLi = document.createElement('li');
                    innerLi.textContent = `${prop}: ${typeof descriptor.value}`;
                    innerOl.appendChild(innerLi);
                }
            });
            li.appendChild(innerOl);
            ol.appendChild(li);
        });

        prototypeChainDiv.appendChild(ol);
    } catch (error) {
        console.error(error);
        showErrorInput(classNameInput);
    }
});
