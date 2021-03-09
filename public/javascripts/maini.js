window.addEventListener("scroll", function(){
    let menuArea = document.getElementById('menu-area');

    if(window.pageYOffset > 0){
        menuArea.classList.add("sticky");
    }else{
        menuArea.classList.remove("sticky")
    }
});

$('.nave ul li').click(function() {

    $(this).addClass("active").siblings().removeClass('active');
})

const tableBtn = document.querySelectorAll('.nave ul li');
const tab = document.querySelectorAll('.tabs');

function tabs(panelIndex)  {
    tab.forEach(function(node) {
        node.style.display = 'none';
    });
    tab[panelIndex].style.display = 'block';
}
tabs(0);

let bio = document.querySelector('.bio');

function bioText() {
    bio.oldText = bio.innerHTML;
    bio.innerHTML = bio.innerHTML.substring(0, 100) + "...";
    bio.innerHTML += "&nbsp;" + `<span onclick='bioText()' id='see-more-bio'> See More</span>`;
}
bioText();

function addLength() {
    bio.innerHTML = bio.oldText;
    bio.innerHTML += "&nbsp;" + `<span onclick='bioText()' id='see-less-bio'> See Less</span>`;

}


const countdown = document.querySelector(".countdown");

const interval = setInterval(() => {
const deadline = new Date(2021,2,22,11,27,53);

const current = new Date();

const diff = deadline - current;

const days = Math.floor( diff / (1000*60*60*24)) + "";
const hours = Math.floor((diff / (1000*60*60)) % 24) + "";
const minutes = Math.floor((diff / (1000 * 60)) % 60) + "";
const seconds = Math.floor((diff / 1000) %60) + "";

countdown.innerHTML = `
<div data-content="Days">${days.length === 1 ? `0${days}` : days}</div>
<div data-content="Hours">${hours.length === 1 ? `0${hours}` : hours}</div>
<div data-content="Minutes">${minutes.length === 1 ? `0${minutes}` : minutes}</div>
<div data-content="Seconds">${seconds.length === 1 ? `0${seconds}` : seconds}</div>
`;

if(diff < 0){
    clearInterval(interval);
    countdown.innerHTML = "<h1>Here we Go</h1>";
}
}, 1000);



