const paragraphs = [
    "Wake up to reality! Nothing ever goes as planned in this accursed world. The longer you live, the more you realize that the only things that truly exist in this reality are merely pain, suffering and futility.",
    "Brutal murders, petty thefts, and senseless violence pollute the human world. In contrast, the realm of death gods is a humdrum, unchanging gambling den.",
    "In the year 2022, virtual reality has progressed by leaps and bounds, and a massive online role-playing game called Sword Art Online (SAO) is launched.",
    "Asta and Yuno were abandoned together at the same church and have been inseparable since. As children, they promised that they would compete against each other to see who would become the next Emperor Magus.",
    "Ichigo Kurosaki is an ordinary high schooler—until his family is attacked by a Hollow, a corrupt spirit that seeks to devour human souls."
];

let time = 60, charIndex = 0, mistakes = 0, isTyping = false, interval;

function loadPara() {
    const randPara = Math.floor(Math.random() * paragraphs.length);
    document.querySelector(".paraArea").innerHTML = paragraphs[randPara].split("").map(char => `<span>${char}</span>`).join('');
}

function typing() {
    let spans = document.querySelectorAll(".paraArea span"),
        input = document.getElementById("input-feild"),
        typedChar = input.value[charIndex];

    if (!isTyping) {
        interval = setInterval(timer, 1000);
        isTyping = true;
    }

    if (typedChar == null) {
        charIndex--;
        spans[charIndex]?.classList.remove("correct", "incorrect");
    } else {
        if (typedChar === spans[charIndex].innerText) {
            spans[charIndex].classList.add("correct");
        } else {
            spans[charIndex].classList.add("incorrect");
            mistakes++;
        }
        document.getElementById("mistake").textContent = mistakes;
        charIndex++;
    }
    let wpm = Math.round(((charIndex - mistakes) / 5) / ((60 - time) / 60));
    document.getElementById("wpm").textContent = wpm > 0 ? wpm : 0;
    document.getElementById("cpm").textContent = charIndex - mistakes;
}

function timer() {
    if (time > 0) {
        time--;
        document.getElementById("timer").textContent = time;
    } else {
        clearInterval(interval);
        alert("Time is up! Restart to try again.");
    }
}

document.getElementById("input-feild").addEventListener("input", typing);
document.getElementById("btn").addEventListener("click", () => location.reload());
loadPara();