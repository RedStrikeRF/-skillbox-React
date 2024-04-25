document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('nameForm');
    const output = document.getElementById('output');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const lastName = document.getElementById('inputLastName').value.trim();
        const firstName = document.getElementById('inputFirstName').value.trim();
        const patronymic = document.getElementById('inputPatronymic').value.trim();

        const formattedName = formatName(lastName, firstName, patronymic);

        const paragraph = document.createElement('p');
        paragraph.textContent = formattedName;
        output.appendChild(paragraph);

        form.reset();
    });

    const inputs = document.querySelectorAll('input');

    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateInput(this);
        });
        input.addEventListener('blur', function() {
            formatInput(this);
        });
    });
});

function validateInput(input) {
    const allowedCharacters = /[А-я\s-]/i;

    if (!allowedCharacters.test(input.value) && input.value !== '') {
        input.value = input.value.replace(/[^А-я\s-]/ig, '');
    }
}

function formatInput(input) {
    let value = input.value.replace(/[^А-я\s-]/ig, '');
    value = value.trim().replace(/\s{2,}/g, ' ').replace(/(-){2,}/g, '-');
    value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    input.value = value;
}

function formatName(lastName, firstName, patronymic) {
    return [lastName, firstName, patronymic]
        .map(namePart => namePart.replace(/[^А-я\s-]/ig, ''))
        .map(namePart => namePart.trim().replace(/\s{2,}/g, ' ').replace(/(-){2,}/g, '-'))
        .map(namePart => namePart.charAt(0).toUpperCase() + namePart.slice(1).toLowerCase())
        .filter(namePart => namePart !== '')
        .join(' ');
}
