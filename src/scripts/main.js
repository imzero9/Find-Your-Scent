import quotes from "./quotes.js";
import questions from "./questions.js";
import perfumes from "./results.js";

const startBtn = document.querySelector(".start-btn");
const questionCont = document.querySelector(".question");
const questionType = questionCont.querySelector(".question #type");
const lightness = document.getElementById("lightness");
const sharpness = document.getElementById("sharpness");
const floral = document.getElementById("floral");
const title = questionCont.querySelector(".question-title");
const firstAnswer = document.getElementById("A");
const secondAnswer = document.getElementById("B");
const homeBtns = document.querySelectorAll(".home");

let lightnessVal = +lightness.value;
let sharpnessVal = +sharpness.value;
let floralVal = +floral.value;

// Show random quote on start page
function getQuote() {
    const quoteCont = document.querySelector(".quote-container");
    const [quote, quoteAuthor] = quoteCont.children;
    const index = Math.floor(Math.random() * quotes.length);

    quote.innerText = quotes[index]["quote"];
    quoteAuthor.innerText = `- ${quotes[index]["author"]}`;
}

getQuote();

// Start a test
startBtn.addEventListener("click", () => {
    const start = document.querySelector(".start");

    start.classList.add("hidden");
    questionCont.classList.remove("hidden");
    next();
});

// Store result count
firstAnswer.addEventListener("click", () => {
    let type = questionType.value;

    if (type === "lightness") {
        lightnessVal += 1;
    } else if (type === "sharpness") {
        sharpnessVal += 1;
    } else if (type === "floral") {
        floralVal += 1;
    }
    next();
});

secondAnswer.addEventListener("click", next);

// Set first order of questions
let num = 1;

// Move to a next question
function next() {
    const loading = document.querySelector(".result-loading");
    const result = document.querySelector(".result");
    const firstAnswerImg = firstAnswer.querySelector("img");
    const secondAnswerImg = secondAnswer.querySelector("img");

    if (num === 10) {
        questionCont.classList.add("hidden");
        loading.classList.remove("hidden");
        setTimeout(() => {
            loading.classList.add("hidden");
            result.classList.remove("hidden");
        }, 2500);
        // Define preference
        let preference = "";
        lightnessVal > 1 ? (preference += "L") : (preference += "D");
        sharpnessVal > 1 ? (preference += "sharp") : (preference += "smooth");
        floralVal > 1 ? (preference += "F") : (preference += "G");

        // Show result
        const resultImg = result.querySelector(".result-img");
        const resultBrand = result.querySelector(".result-brand");
        const resultProduct = result.querySelector(".result-product");
        const resultKeywords = result.querySelector(".result-keywords");
        const resultDesc = result.querySelector(".result-description");

        const korLink = result.querySelector(".kor-link");
        const engLink = result.querySelector(".eng-link");

        resultImg.src = perfumes[preference]["img"];
        resultBrand.innerText = perfumes[preference]["brand"];
        resultProduct.innerText = perfumes[preference]["product"];

        perfumes[preference]["keywords"].map((keyword) => {
            const keywordItem = document.createElement("li");
            keywordItem.innerText = `#${keyword}`;
            resultKeywords.appendChild(keywordItem);
        });
        resultDesc.innerText = perfumes[preference]["desc"];

        korLink.setAttribute("href", perfumes[preference]["korLink"]);
        engLink.setAttribute("href", perfumes[preference]["engLink"]);
    } else {
        const progress = questionCont.querySelector(".progress-bar");

        progress.style.width = `calc(100 / 9 * ${num}%)`;
        title.innerText = questions[num]["title"];
        questionType.value = questions[num]["type"];
        firstAnswerImg.src = questions[num]["A"];
        firstAnswerImg.setAttribute("alt", questions[num]["A_des"]);
        secondAnswerImg.src = questions[num]["B"];
        secondAnswerImg.setAttribute("alt", questions[num]["B_des"]);
        num++;
    }
}

// Go back to home
homeBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
        location.reload();
    })
);
