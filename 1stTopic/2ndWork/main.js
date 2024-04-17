const form = document.getElementById('nameForm');
const output = document.getElementById('output');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const lastName = document.getElementById('inputLastName').value.trim();
    const firstName = document.getElementById('inputFirstName').value.trim();
    const patronymic = document.getElementById('inputPatronymic').value.trim();

    const formattedName = `${lastName} ${firstName} ${patronymic}`;

    const paragraph = document.createElement('p');
    paragraph.textContent = formattedName;
    output.appendChild(paragraph);

    form.reset();
});

function isValidInput(event) {
    const allowedCharacters = /[а-яА-Я\s-]/;

    if (!allowedCharacters.test(event.key) && event.key !== 'Backspace' && event.key !== 'Enter') {
        event.preventDefault();
        return false;
    }
}

function formatInput(input) {
    const value = input.value.toLowerCase();
    let filteredValue = '';

    for (const element of value) {
        const char = element;
        if (char.match(/[а-яА-Я\s-]/)) {
            filteredValue += char;
        }
    }

    input.value = filteredValue.trim().replace(/\s{2,}/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
}