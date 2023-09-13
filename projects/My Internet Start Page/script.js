let split;
let begin;
let link = " ";
let type1 = " ";
let volledigelink = " ";
let save = {
    title: "",
    text: "",
    url: ""
};
let list = []

const setup = () => {
    let input = document.getElementById("commando").value;
    let button = document.getElementById("click")
    button.addEventListener("click", commando);
    dataophalen();


}
const commando = () => {
    splitsen();
    if (split.length > 1) {
        let juist = controleSyntax();
        if (juist === true) {
            link = samenstellen();
            switch (begin) {
                case "/y":
                    window.open(`https://www.youtube.com/results?search_query=${link}`);
                    volledigelink = `https://www.youtube.com/results?search_query=${link}`;
                    type1 = "youtube";
                    maakelement();
                    maakinputleeg();
                    opslaan();
                    break;
                case "/t":
                    window.open(`https://twitter.com/hashtag/${link}`);
                    volledigelink = `https://twitter.com/hashtag/${link}`;
                    type1 = "twitter";
                    console.log(type1);
                    maakelement();
                    maakinputleeg();
                    opslaan();
                    break;
                case "/g":
                    window.open(`https://www.google.com/search?q=${link}`);
                    volledigelink = `https://www.google.com/search?q=${link}`;
                    type1 = "google";
                    maakelement();
                    maakinputleeg();
                    opslaan();
                    break;
                case "/i":
                    window.open(`https://www.instagram.com/explore/tags/${link}`);
                    volledigelink = `https://www.instagram.com/explore/tags/${link}`;
                    type1 = "instagram";
                    maakelement();
                    maakinputleeg();
                    opslaan();
                    break;
            }
        }
    } else {
        alert("invalid command, twee argumenten ingeven!");
    }
}
const splitsen = () => {
    let input = document.getElementById("commando").value;
    split = input.split(" ");
}
const controleSyntax = () => {
    let syntax = split[0].toLowerCase();
    if (!syntax.startsWith("/")) {
        alert("Commando moet starten met /");
    } else if (syntax === "/g" || syntax === "/y" || syntax === "/t" | syntax === "/i") {
        begin = syntax;
        return true;
    } else {
        alert("Unknown command prefix, probeer /g /y /t of /i");
    }
}
const samenstellen = () => {
    let output = split[1];
    if (split.length === 2) {
        return split[1];
    } else {
        for (let i = 2; i < split.length; i++) {
            output += " " + split[i];
        }
        return output;
    }
}
const maakelement = () => {
    let element = document.getElementsByClassName("row")[0];
    let row = document.createElement("div");
    row.setAttribute("class", "col-lg-3 col-md-4 col-sm-6");
    element.appendChild(row);

    let div = document.createElement("div");
    div.setAttribute("class", type1);
    row.appendChild(div);


    let typesub = document.createElement("h3");
    typesub.innerText = type1;
    let linksub = document.createElement("p");
    linksub.innerText = link;
    let buttonsub = document.createElement("button");
    buttonsub.innerText = "go!";
    buttonsub.setAttribute("onclick", `window.open('${volledigelink}','_blank')`);

    div.appendChild(typesub);
    div.appendChild(linksub);
    div.appendChild(buttonsub);

}
const maakinputleeg = () => {
    let input = document.getElementById("commando");
    input.value = "";

}
const opslaan = () => {
    //stap 1 - localstorage opslaan
    save.text = link
    save.url = volledigelink
    save.title = type1
    list.push(save);
    console.log(list)
    let x = JSON.stringify(list);
    localStorage.setItem("savefile", x);
}
const dataophalen = () => {
    //stap 2 - localstorage ophalen
    let y = localStorage.getItem("savefile");
    if (y != null) {
        list = JSON.parse(y);
        elementenmaken();
    }

}
const elementenmaken = () => {
    //stap 3 - localstorage maken
    for (let i = 0; i < list.length; i++) {
        type1 = list[i].title;
        volledigelink = list[i].url;
        link = list[i].text;
        maakelement();
    }

}
window.addEventListener("load", setup);