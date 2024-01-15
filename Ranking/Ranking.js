// Define variables
var G9 = {
    name: "Grade 9",
    tail: 0,
    rubik: 0,
    ramen: 0,
    dance: 0,
    singer: 0,
    barbie: 0,
    ci: 0,
    class: 0
};

G9.score = G9.tail + G9.rubik + G9.ramen + G9.dance + G9.singer + G9.barbie + G9.ci + G9.class;

var G10 = {
    name: "Grade 10",
    tail: 0,
    rubik: 0,
    ramen: 0,
    dance: 0,
    singer: 0,
    barbie: 0,
    ci: 0,
    class: 0
};

G10.score = G10.tail + G10.rubik + G10.ramen + G10.dance + G10.singer + G10.barbie + G10.ci + G10.class

var G11 = {
    name: "Grade 11",
    tail: 50,
    rubik: 0,
    ramen: 0,
    dance: 0,
    singer: 0,
    barbie: 0,
    ci: 0,
    class: 0,
};

G11.score = G11.tail + G11.rubik + G11.ramen + G11.dance + G11.singer + G11.barbie + G11.ci + G11.class

var G12 = {
    name: "Grade 12",
    tail: 0,
    rubik: 0,
    ramen: 0,
    dance: 0,
    singer: 0,
    barbie: 0,
    ci: 0,
    class: 0,
};

G12.score = G12.tail + G12.rubik + G12.ramen + G12.dance + G12.singer + G12.barbie + G12.ci + G12.class

// Store variables in an array
var gradeRanked = [G9, G10, G11, G12];
gradeRanked.sort((a, b) => b.score - a.score);

var firPlace = gradeRanked[0];
var secPlace = gradeRanked[1];
var thiPlace = gradeRanked[2];
var fouPlace = gradeRanked[3];

// Print variables directly to the HTML
document.getElementById('First Place').innerText = "1st Place: " + firPlace.name;
document.getElementById('Second Place').innerText = "2nd Place: " + secPlace.name;
document.getElementById('Third Place').innerText = "3rd Place: " + thiPlace.name;
document.getElementById('Fourth Place').innerText = "4th Place: " + fouPlace.name;

document.getElementById('Score1').innerText = "Total Score: " + firPlace.score
document.getElementById('Score2').innerText = "Total Score: " + secPlace.score
document.getElementById('Score3').innerText = "Total Score: " + thiPlace.score
document.getElementById('Score4').innerText = "Total Score: " + fouPlace.score

document.getElementById('Tail1').innerText = "Tail Game: " + firPlace.tail
document.getElementById('Tail2').innerText = "Tail Game: " + secPlace.tail
document.getElementById('Tail3').innerText = "Tail Game: " + thiPlace.tail
document.getElementById('Tail4').innerText = "Tail Game: " + fouPlace.tail

document.getElementById('Rubik1').innerText = "Rubik's Contest: " + firPlace.rubik
document.getElementById('Rubik2').innerText = "Rubik's Contest: " + secPlace.rubik
document.getElementById('Rubik3').innerText = "Rubik's Contest: " + thiPlace.rubik
document.getElementById('Rubik4').innerText = "Rubik's Contest: " + fouPlace.rubik

document.getElementById('Ramen1').innerText = "Ramen-Eating Contest: " + firPlace.ramen
document.getElementById('Ramen2').innerText = "Ramen-Eating Contest: " + secPlace.ramen
document.getElementById('Ramen3').innerText = "Ramen-Eating Contest: " + thiPlace.ramen
document.getElementById('Ramen4').innerText = "Ramen-Eating Contest: " + fouPlace.ramen

document.getElementById('Dance1').innerText = "Dance Contest: " + firPlace.dance
document.getElementById('Dance2').innerText = "Dance Contest: " + secPlace.dance
document.getElementById('Dance3').innerText = "Dance Contest: " + thiPlace.dance
document.getElementById('Dance4').innerText = "Dance Contest: " + fouPlace.dance

document.getElementById('Singer1').innerText = "Masked Singer: " + firPlace.singer
document.getElementById('Singer2').innerText = "Masked Singer: " + secPlace.singer
document.getElementById('Singer3').innerText = "Masked Singer: " + thiPlace.singer
document.getElementById('Singer4').innerText = "Masked Singer: " + fouPlace.singer

document.getElementById('Barbie1').innerText = "Barbie-Themed Outfits: " + firPlace.barbie
document.getElementById('Barbie2').innerText = "Barbie-Themed Outfits: " + secPlace.barbie
document.getElementById('Barbie3').innerText = "Barbie-Themed Outfits: " + thiPlace.barbie
document.getElementById('Barbie4').innerText = "Barbie-Themed Outfits: " + fouPlace.barbie

document.getElementById('CI1').innerText = "CI Color Outfits: " + firPlace.ci
document.getElementById('CI2').innerText = "CI Color Outfits: " + secPlace.ci
document.getElementById('CI3').innerText = "CI Color Outfits: " + thiPlace.ci
document.getElementById('CI4').innerText = "CI Color Outfits: " + fouPlace.ci

document.getElementById('Class1').innerText = "Grade Color Outfits: " + firPlace.class
document.getElementById('Class2').innerText = "Grade Color Outfits: " + secPlace.class
document.getElementById('Class3').innerText = "Grade Color Outfits: " + thiPlace.class
document.getElementById('Class4').innerText = "Grade Color Outfits: " + fouPlace.class