// document.addEventListener('DOMContentLoaded', function () {
//
// });
function addSize() {
    let app = document.querySelector('#app');
    let header = document.querySelector('.header');
    let chat_send_area = document.querySelector('.chat__send-area');
    let page_wrapper = document.querySelector('.page-wrapper');
    let messages = document.querySelector('.chat .messages');


    function main() {
        if (header && chat_send_area && page_wrapper && messages) {
            let headerHeight = header.clientHeight;
            let chat_send_areaHeight = chat_send_area.clientHeight;

            page_wrapper.style.paddingTop = `${headerHeight}px`;
            messages.style.height = `calc(100% - ${chat_send_areaHeight}px)`;
        }
    }

    main();

    window.addEventListener('resize', () => {
        main();
    });
}

function scrollMessage() {
    let messages = document.querySelector('.chat .messages');
    if (messages) {
        messages.scrollTop = messages.scrollHeight;
    }
}


export default {
    addSize,
    scrollMessage,
}

