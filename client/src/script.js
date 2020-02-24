// document.addEventListener('DOMContentLoaded', function () {
//
// });
function addSize() {
    let app = document.querySelector('#app');
    let header = document.querySelector('.header');
    let chat_send_area = document.querySelector('.chat__send-area');
    let page_wrapper = document.querySelector('.page-wrapper');
    let messages = document.querySelector('.chat .messages');
    let chat_header = document.querySelector('.chat .chat__header');


    function main() {
        if (header && chat_send_area && page_wrapper && messages && chat_header) {
            let headerHeight = header.clientHeight;
            let chat_send_areaHeight = chat_send_area.clientHeight;
            let chat_headerHeight = chat_header.clientHeight;

            page_wrapper.style.paddingTop = `${headerHeight}px`;
            messages.style.height = `calc(100% - ${chat_send_areaHeight + chat_headerHeight}px)`;
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

