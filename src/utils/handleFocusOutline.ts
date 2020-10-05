export default () => {
    window.addEventListener('keydown', handleFirstTab);
};

function handleFirstTab(e: KeyboardEvent) {
    if (e.code === 'Tab') {
        document.body.classList.add('show-tab-focus');
        window.removeEventListener('keydown', handleFirstTab);
        window.addEventListener('mousedown', handleMouseDownOnce);
    }
}

function handleMouseDownOnce() {
    document.body.classList.remove('show-tab-focus');

    window.removeEventListener('mousedown', handleMouseDownOnce);
    window.addEventListener('keydown', handleFirstTab);
}
