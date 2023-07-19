let global = {
    AANTAL_HORIZONTAAL: 4,
    AANTAL_VERTICAAL: 3,
    AANTAL_KAARTEN: 6,
    kaarten: ["kaart1.png", "kaart2.png", "kaart3.png", "kaart4.png", "kaart5.png", "kaart6.png"],
    kaart1: null,
    kaart2: null,
};
let audio = new Audio('sound/Yip.mp3');
let audiointro = new Audio('sound/intro.mp3')

const setup = () => {
    resetten();
    let btn = document.getElementById("start");
    btn.addEventListener("click", speelveldVullen);
    let reset = document.getElementById("reset");
    reset.addEventListener("click", resetten);

}
const speelveldVullen = () => {
    document.getElementById("reset").style.visibility = "visible";
    document.querySelector("body").style.backgroundImage = "none";
    let checks = document.getElementsByClassName("wrapper")[0];
//controle of speelveld reeds aanwezig is of niet
    if (checks.childElementCount < 1) {
        audio.play();
        setTimeout(audiointro.play(), 500)
//random kaarten genereren
        let lijstkaarten = global.kaarten.concat(global.kaarten);
        let count = global.AANTAL_KAARTEN * 2 - 1;
        let randomlijst = [];
        let i = Math.ceil(Math.random() * count);
        while (i > -1 && lijstkaarten.length > 0) {
            randomlijst.push(lijstkaarten[i]);
            lijstkaarten.splice(i, 1);
            count--;
            i = Math.ceil(Math.random() * count)
        }
//speelveld genereren a.d.h.v. divs/grid
        for (let i = 0; i < global.AANTAL_KAARTEN * 2; i++) {
            let div = document.createElement("div");
            div.setAttribute("class", "grid");
            let wrapper = document.getElementsByClassName("wrapper")[0];
            wrapper.appendChild(div);
            let img = document.createElement("img");
            let foto = "img/" + randomlijst[i];
            img.setAttribute("src", "img/achterkant2.png")
            img.setAttribute("alt", foto)
            img.className = "kaart"
            div.appendChild(img);
        }


    } else {
        alert("Speel dit spel uit, of druk of reset");
    }
//knoppen bovenaan plaatsen, =plaats maken voor speelveld
    document.querySelector("aside").style.margin = "auto";
    spelen();

}
const spelen = () => {
    kaartenSelecteren();

}
const kaartenSelecteren = () => {
    let kaarten = document.getElementsByClassName("kaart")
    for (let i = 0; i < kaarten.length; i++) {
        kaarten[i].addEventListener("click", kaartendraaien)
    }
}

const resetten = () => {
//speelveld wissen & positie knoppen resetten
    audiointro.pause();
    audiointro.currentTime = 0;
    const elements = document.getElementsByClassName("grid");
    while (elements.length > 0) {
        elements[0].remove();
        document.querySelector(".wrapper").style.display = "hidden";
        document.querySelector("aside").style.margin = "300px auto";
        document.querySelector("body").style.backgroundImage = "url(\"../img/map.png\"";
    }
    document.getElementById("reset").style.visibility = "hidden";

}
const kaartendraaien = (event) => {
    if(event.target !== global.kaart1 && event.target !== global.kaart2){
    let kaart = event.target;
    if (global.kaart1 === null) {
        global.kaart1 = kaart;
        let source = global.kaart1.src;
        let altje = global.kaart1.alt;
        global.kaart1.src = altje;
        global.kaart1.alt = source;
    } else if (global.kaart2 === null) {
        global.kaart2 = kaart;
        let source = global.kaart2.src;
        let altje = global.kaart2.alt;
        global.kaart2.src = altje;
        global.kaart2.alt = source;

        if (global.kaart1.src === global.kaart2.src) {
            global.kaart1.style.border = "solid green 10px"
            global.kaart2.style.border = "solid green 10px"
            global.kaart1.style.pointerEvents = "none"
            global.kaart2.style.pointerEvents = "none"
            setTimeout(fout, 1000)
        } else{
            setTimeout(omdraaiennogmaals, 800)
           setTimeout(fout, 1000);
        }
    }
        }
}
const right = () => {
  global.kaart1.src="img/done.jpg"
    global.kaart2.src="img/done.jpg"
}
const omdraaiennogmaals = () => {
    let source = global.kaart1.src;
    let altje = global.kaart1.alt;
    global.kaart1.src = altje;
    global.kaart1.alt = source;

    let source1 = global.kaart2.src;
    let altje1 = global.kaart2.alt;
    global.kaart2.src = altje1;
    global.kaart2.alt = source1;
}
const fout = () => {
    global.kaart1 = null;
    global.kaart2 = null;
}


window.addEventListener("load", setup);