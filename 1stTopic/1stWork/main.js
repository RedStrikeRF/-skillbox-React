document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("dropdownButton");
    const dropdownContent = document.getElementById("dropdownContent");

    document.addEventListener('click', outsideBlock);

    function outsideBlock(event) {
        if ((event.target == dropdownContent || dropdownContent.contains(event.target)) || (event.target == button || button.contains(event.target))) {
            dropdownContent.style.display = 'block';
        } else {
            dropdownContent.style.display = 'none'
        }
    }
});
