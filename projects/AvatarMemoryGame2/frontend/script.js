const backgroundList = ['bg_katara_1.jpg', 'bg_momo_2.jpg',
    'bg_sokka_3.jpg', 'bg_zuko_4.jpg',
    'bg_toph_5.jpg', 'bg_aang_6.jpg',]

const kaarten = ['kaart1.png', 'kaart2.png', 'kaart3.png',
    'kaart4.png', 'kaart5.png', 'kaart6.png']

const numberOfCards = 12;


let kaart1 = "";
let kaart2 = "";

let page = 1;
let max = 1;

const user = {
    name: "",
    score: 0
};
let gevondenKaarten = 0;

let currentIndex = 1;

const start = () => {

    backgroundInterval = setInterval(background, 3000);
    const play = document.getElementById('play')
    play.addEventListener('click', setup)
    const highscore =  document.getElementById('highscore')
    highscore.addEventListener('click', getHighscores)
    const mainpage =  document.getElementById('mainpage')
    mainpage.addEventListener('click', homepage)
}
const setup = () => {
    const check = namecheck();
    if (check) {
        menuLeegmaken();
        speelveldVullen();
    }
}
const homepage = ()=>{
    window.location.href = "https://www.dawaladeny.eu";
}

const getHighscores = async () => {
const data = await fetch();
menuLeegmaken()
leaderbordMaken(data);

max = data.numOfPages
}

 const leaderbordMaken = (data) =>{
     const display = document.getElementById('scoreboard')
     display.style.display = 'unset'
     backgroundOrange();
     const scores = document.getElementsByClassName('scores')[0]
     data.scores.forEach(element => {
         let p = document.createElement('p')
         let p2 = document.createElement('p')
         p.innerText = `${element.name} `
         p2.innerText= `${element.score}`
         scores.appendChild(p);
         scores.appendChild(p2);
     });
    
     const main = document.querySelector('main');
     main.style.overflow="scroll"
     const returnen =  document.getElementById('return')
     returnen.addEventListener('click', terugNaarMenu)

     const plus = document.getElementById('plus');
     plus.addEventListener('click', pluss)

     const min = document.getElementById('min');
     min.addEventListener('click', minn)
    
     paginaAanpassen()
     
 }
 const pluss = () =>{
    if(page < max){
        page ++
    }
    leegmakenHs();
    getHighscores()
 }
 const minn = () =>{
    if (page>1){
        page --
    }
    leegmakenHs();
    getHighscores()
    
 }
 const paginaAanpassen=()=>{
    const pagina = document.getElementById('pagina');
    pagina.innerText = `${page}`
 }

 const terugNaarMenu= () =>{
 leegmakenHs();
 menuTonen();
 start();
 }
 const backgroundOrange = () =>{
    clearInterval(backgroundInterval);
    const main = document.querySelector('main');
    main.style.backgroundImage="unset"
    main.style.backgroundColor = "orangered"
 }




const leegmakenHs = () =>{

    const scores = document.getElementsByClassName("scores")[0]
    while (scores.firstChild) {
        scores.removeChild(scores.firstChild);
      }
      const display = document.getElementById('scoreboard')
    display.style.display = 'none'
    
}
const menuTonen = () =>{
    const menu = document.getElementById('menu')
    menu.style.display = "unset"
    const main = document.querySelector('main');
   main.style.backgroundColor = "unset"
   main.style.backgroundImage = `url('images/${backgroundList[currentIndex]}')`
     main.style.overflow="hidden"

}
const postData = async () => {
    try {
        let score = user.score/1000
      const dataToSend = {
        name: user.name, 
        score: score,
      };
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const jsonData = JSON.stringify(dataToSend)
      const response = await axios.post('http://localhost:80/api/v1/scores', jsonData, config);
    
    } catch (error) {
      console.error('error: ', error);
    }
  };

const fetch = async () =>{
    try {

        const config = {
            params: {
              'page': page,
              'limit': 14,
            },
          };
        const response = await axios.get('http://localhost:80/api/v1/scores', config); 

        const data = response.data; 
        return data
      } catch (error) {
        console.error('error: ', error);
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
        img.alt = `./images/${shuffled[index]}`

        wrapper.appendChild(img)

    }
    scoreInterval = setInterval(timer, 100);
    const kaartenClicken = document.getElementsByTagName('img')
    for (let i = 0; i < kaartenClicken.length; i++) {
        kaartenClicken[i].addEventListener('click', spelen);
    }
}
const spelen = (e) => {
    if (!kaart1) {
        kaart1 = e.target;
        omdraaien(kaart1);
    } else if (!kaart2 && e.target !== kaart1) {
        kaart2 = e.target;
        omdraaien(kaart2);

        const zelfde = controleren(kaart1, kaart2);
        if (!zelfde) {
            setTimeout(() => {
                omdraaien(kaart1);
                omdraaien(kaart2);
                resetKaarten();
            }, 1000);
        } else {
            setTimeout(() => {
                vastzetten();
                resetKaarten();
            }, 300)
            gevondenKaarten += 2
            if (gevondenKaarten === 12) {
                clearInterval(scoreInterval);
                setTimeout(alerten, 1000)
                postData();
                setTimeout(background, 1000)
                setTimeout(resetAlles, 1000)
            }
        }
    }
}

const resetAlles = () => {
    kaart1 = "";
    kaart2 = "";
    user.score=0;
    user.name="";
    const spel = document.getElementById('spel')
    spel.style.display = 'none';
    const kaarten = document.getElementsByClassName("wrapper")[0]
    while (kaarten.firstChild) {
        kaarten.removeChild(kaarten.firstChild);
      }
    const menu = document.getElementById('menu')
    menu.style.display = 'unset';
    gevondenKaarten = 0;
    currentIndex = 1;
    start();
}

const omdraaien = (kaart) => {
    let src = kaart.src;
    let alt = kaart.alt;
    kaart.src = alt;
    kaart.alt = src;
}
const alerten = () => {
    alert(`${user.name}, you won with a time of ${user.score / 1000}`)
}

const vastzetten = () => {
    kaart1.style.opacity = "0.6"
    kaart2.style.opacity = "0.6"
    kaart1.style.pointerEvents = "none"
    kaart2.style.pointerEvents = "none"
    kaart1.style.zIndex = "-1"
    kaart2.style.zIndex = "-1"


}

const controleren = (kaart1, kaart2) => {
    if (kaart1.src === kaart2.src) {
        return true;
    }
    return false;
}
const resetKaarten = () => {
    kaart1 = "";
    kaart2 = "";
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