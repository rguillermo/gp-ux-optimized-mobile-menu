function insertAfter(e,i){
    if(e.nextSibling){
        e.parentNode.insertBefore(i,e.nextSibling);
    } else {
        e.parentNode.appendChild(i);
    }
}

function toogleElementClass(el, cls) {
    if ( el.classList.contains(cls) ){
        el.classList.remove(cls)
    }
    else {
        el.classList.add(cls)
    }
}

function rafAsync() {
    return new Promise(resolve => {
        requestAnimationFrame(resolve);
    });
}

async function checkElement(selector) {
    while (document.querySelector(selector) === null) {
        await rafAsync()
    }

    return document.querySelector(selector);
}

function txt_to_html_element(txt) {
    let temp_parent_div = document.createElement('div');
    temp_parent_div.innerHTML = txt;
    return temp_parent_div.firstChild
}

function removeElementClass(el_array, cls) {
    el_array.forEach(function (e) {
       e.classList.remove(cls)
    });
}

function initMenu() {
    checkElement('body').then( (body) => {
        let navbar = document.querySelector('nav');
        let navbar_prev_node = navbar.previousElementSibling;
        let trigger = txt_to_html_element('<div class="site-trigger"><a class="site-nav-trigger"><span></span></a></div>');
        let overlay = txt_to_html_element('<div class="site-overlay"></div>');
        let header = document.querySelector('header');
        navbar.querySelector('button').remove();

        header.appendChild(trigger);
        body.appendChild(overlay);
        navbar.classList.add('wp-mobile-nav');

        window.addEventListener('resize', function () {
            (!window.requestAnimationFrame) ? setTimeout(moveNavigation, 100) : window.requestAnimationFrame(moveNavigation);
        });

        let menu_elements = Array(navbar, trigger, overlay);

        Array(trigger, overlay).forEach(function (el) {
            el.addEventListener("click", function (ev) {
                ev.preventDefault();
                toogleElementClass(navbar, 'active');
                toogleElementClass(trigger, 'active');
                toogleElementClass(overlay, 'active');
                if ( !navbar.classList.contains('toggled') ) navbar.classList.add('toggled');
            });
        });

        function moveNavigation() {
            let screenSize = ( document.documentElement.clientWidth > 1040 );
            if (screenSize) {
                navbar.parentElement.removeChild(navbar);
                insertAfter(navbar_prev_node, navbar);
                removeElementClass(menu_elements, 'active');
            } else {
                navbar.parentElement.removeChild(navbar);
                insertAfter(document.querySelector('main'), navbar);
                removeElementClass(menu_elements, 'active');
            }
        }

        moveNavigation();
    });
}

initMenu();