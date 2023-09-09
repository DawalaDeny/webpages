const backgroundList = ['bg_katara_1.jpg','bg_momo_2.jpg',
'bg_sokka_3.jpg','bg_zuko_4.jpg',
'bg_toph_5.jpg','bg_aang_6.jpg',]

let currentIndex = 0;

const start = () =>{
    setInterval(background, 3000); 
}

const background = () =>{
   
    const main = document.querySelector('main');
    main.style.transition = 'background-image 1s ease'; 
    main.style.backgroundImage = `url('images/${backgroundList[currentIndex]}')`;
    currentIndex = (currentIndex + 1) % backgroundList.length;
}


document.addEventListener('DOMContentLoaded', start);