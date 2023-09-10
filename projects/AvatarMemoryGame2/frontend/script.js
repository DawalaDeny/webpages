const backgroundList = ['bg_katara_1.jpg', 'bg_momo_2.jpg',
    'bg_sokka_3.jpg', 'bg_zuko_4.jpg',
    'bg_toph_5.jpg', 'bg_aang_6.jpg',]

const kaarten = ['kaart1.png', 'kaart2.png', 'kaart3.png',
    'kaart4.png', 'kaart5.png', 'kaart6.png']

const numberOfCards = 12;

const user = {
    name: "",
    score: 0
};


let currentIndex = 1;

const start = () => {
    backgroundInterval = setInterval(background, 3000);
    const play = document.getElementById('play')
    play.addEventListener('click', setup)
}
const setup = () => {
    const check = namecheck();
    if (check) {
        menuLeegmaken();
        speelveldVullen();
    }
}
const menuLeegmaken = () => {
    const menu = document.getElementById('menu')
    menu.style.display = "none"
}
const speelveldVullen = () => {
    const spel = document.getElementById('spel')
    spel.style.display = 'unset'


    const main = document.querySelector('main');
    clearInterval(backgroundInterval);
    main.style.backgroundImage = "unset";
    main.style.backgroundColor = "#87C1FF";

    const wrapper = document.getElementsByClassName('wrapper')[0];
    const shuffle = kaarten.concat(kaarten)
    const shuffled = randomize(shuffle);


    for (let index = 0; index < numberOfCards; index++) {
        const img = document.createElement("img");
        img.src = "./images/achterkant2.png"
        img.className = "kaart"
        img.alt =`./images/${shuffled[index]}`  
    
        wrapper.appendChild(img)

    }
    scoreInterval = setInterval(timer, 100);
    const kaartenClicken = document.getElementsByTagName('img')
    for (let i = 0; i < kaartenClicken.length; i++) {
        kaartenClicken[i].addEventListener('click', spelen);
    }
}
const spelen = (e) =>{
   console.log(e);
}

const timer = () => {
    let timer = document.getElementById('timer')
    user.score = user.score + 100
    let score = user.score / 1000
    timer.innerText = score
}

const randomize = (kaarten) => {
    let getal = 12;
    let shuffled = []

    for (let index = 0; index < 12; index++) {
        const random = Math.floor(Math.random() * getal);
        shuffled.push(kaarten[random])
        kaarten.splice(random, 1)
        getal -= 1;

    }
    return shuffled
}



const namecheck = () => {
    const name = document.getElementById('name').value.trim()
    if (!name) {
        popup("Invalid name", "to play, you must provide a name");
        return false;
    } else if (name.length < 3 || name.length > 31) {
        popup("Invalid name", "name must be between 3 and 30 characters long");
        return false;
    } else {
        user.name = name;
        return true;
    }
}


const popup = (title, content) => {
    const myPopup = new Popup({
        id: "my-popup",
        title: title,
        content: content,
        allowClose: false,
        titleColor: "#fff",
        css: `
        .popup {
            font-family: Herculanum, sans-serif !important;
            background-color: rgba(0,0,0,.8);
        }`,
        textColor: "#fff",
        backgroundColor: "orangered",
    });
    myPopup.show();
    setTimeout(() => {
        myPopup.hide();
    }, 3000);
}


const background = () => {

    const main = document.querySelector('main');
    main.style.transition = 'background-image 2s ease';
    main.style.backgroundImage = `url('images/${backgroundList[currentIndex]}')`;
    currentIndex = (currentIndex + 1) % backgroundList.length;
}


document.addEventListener('DOMContentLoaded', start);