window.addEventListener('DOMContentLoaded', () => {
    const list = document.querySelector('.high-scores ul');
    let scores = [];

    if (localStorage.getItem('score')) {
        const listItem = document.createElement("li");
        scores = JSON.parse(localStorage.getItem('score'));
        listItem.innerHTML = scores[1] + " - " + scores[0];
        list.append(listItem);
    }

    const reset = document.getElementById('clear');
    reset.addEventListener('click', () => {
        localStorage.clear();
    });
});