const backgroundList = ['bg_katara_1.jpg','bg_momo_2.jpg',
'bg_sokka_3.jpg','bg_zuko_4.jpg',
'bg_toph_5.jpg','bg_aang_6.jpg',]

const user = {
    name: "",
    score: 0
};


let currentIndex = 1;

const start = () =>{
    setInterval(background, 3000); 
    const play = document.getElementById('play')
    play.addEventListener('click', setup)
}
const setup = () =>{
    const check = namecheck();
    if (check){
        menuLeegmaken();
        //speelveldVullen();
    }
}
const menuLeegmaken= () =>{
    const menu = document.getElementById('menu')
    menu.style.display ="none"
}



const namecheck = () =>{
    const name = document.getElementById('name').value.trim()
    if(!name){
        popup("Invalid name", "to play, you must provide a name");
        return false;
    } else if (name.length < 3 || name.length > 31){
    popup("Invalid name", "name must be between 3 and 30 characters long");
    return false;
   } else{
    user.name = name;
    return true;
   }
}


const popup =(title, content) =>{
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


const background = () =>{
   
    const main = document.querySelector('main');
    main.style.transition = 'background-image 1s ease'; 
    main.style.backgroundImage = `url('images/${backgroundList[currentIndex]}')`;
    currentIndex = (currentIndex + 1) % backgroundList.length;
}


document.addEventListener('DOMContentLoaded', start);