// Change color on scroll
window.onscroll = () => {
    // Nav color on scroll
    const nav = document.querySelector('.nav');
    const className = "nav--transparent";
    const scrollPx = 200; // Color change after scroll over {scrollPx} pixel

    window.scrollY > scrollPx ? nav.classList.remove(className) : nav.classList.add(className);

    // ToC color on scroll
    ToCActiveOnScroll();
};

const ToC = document.querySelectorAll('.toc__link');
const headings = document.querySelectorAll('h2');

let ToCScrollActive = true;

ToC.forEach(function (el) {
    el.addEventListener("click", moveToTab)
});

function moveToTab(el) {

    
    const btn = el.currentTarget;

    ToC.forEach(function (el) {
        el.classList.remove("active");
    });

    btn.classList.add("active");
    ToCScrollActive = false;

}

function ToCActiveOnScroll() {
    const currentPosition = document.documentElement.scrollTop;
    const currentActivedTOChref = document.querySelector('.toc__link.active') ? document.querySelector('.toc__link.active').attributes.href.value.slice(1) : "";
    const currentHeadingPosition = currentActivedTOChref ? document.querySelector('#' + currentActivedTOChref).offsetTop : 0

    // Round up because 0.1+0.2 does not equal to 0.3
    if (Math.round(currentHeadingPosition) == Math.round(currentPosition)+100) {
        ToCScrollActive = true;
    }

    if (ToCScrollActive) {
        headings.forEach((e, i) => {
            // add 20px in too fix error jumping between overview and keyterms
            if (e.offsetTop <= currentPosition+130) {
                if (document.querySelector('.toc__link.active')) {
                    document.querySelector('.toc__link.active').classList.remove('active');
                }
                return ToC[i].classList.add('active');
            }
        });
    }
}

// add ID Href to 
const addIDandHref = function () {
    let list = [];
    ToC.forEach(e => list.push(e.innerText.toLowerCase().split(' ').join('-')));

    ToC.forEach((e, i) => {
        e.href = `#${list[i]}`;
    });

    headings.forEach((e, i) => {
        e.id = list[i];
    });
}


// Was too lazy to code it in HTML
const addActive = function () {
    const firstTabLink = document.querySelector('.tab__nav__link');
    const firstTabContent = document.querySelector('.tab__pane');

    firstTabLink.classList.add("active");
    firstTabContent.classList.add("show");
}

// Switch tab | I google-ed this. Thank you!
const tabLink = document.querySelectorAll('.tab__nav__link');
const tabContent = document.querySelectorAll('.tab__pane');

tabLink.forEach(function (el) {
    el.addEventListener("click", openTab);
});

function openTab(el) {
    el.preventDefault();
    const btn = el.currentTarget;
    const attr = btn.getAttribute("href");

    tabLink.forEach(function (el) {
        el.classList.remove("active");
    });

    tabContent.forEach(function (el) {
        el.classList.remove("show");
    });

    document.querySelector(attr).classList.add("show");

    btn.classList.add("active");
};

window.onload = function () {
    addIDandHref();
    addActive();
};