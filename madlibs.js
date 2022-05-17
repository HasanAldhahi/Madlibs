
/**
 * Complete the implementation of parseStory.
 * 
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 * 
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 * 
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 * 
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 * 
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */
/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */



// getting Elements from html to use later
const preview = document.getElementsByClassName("madLibsPreview");
const edit = document.getElementsByClassName("madLibsEdit");
const previewP = document.getElementById("previewP");
const editP = document.getElementById("editP")



function parseStory(rawStory) {

  //adding space to all . , while it is string(text)
  A = rawStory.replaceAll(".", " .");
  raw = A.replaceAll(",", " ,")

  //converting the story to an array of strings 
  const arr = raw.split(" ");

  //converting  the array of strings to an arry of object
  const mapped_arr = arr.map((el) => {
    const obj = { word: '', pos: '' }

    const indx = el.indexOf("[")
    if (indx === -1) {
      return { word: el }
    }
    else {
      obj.word = el.slice(0, indx)
      obj.pos = el[indx + 1];
    }
    return obj;
  })

  return mapped_arr;

}

//we have already fetch the story in do not touch file.js
//we have already connected the js files in html
//we got the outputs required to start the process


getRawStory().then(parseStory).then((processedStory) => {
  console.log(processedStory)
  //our outputs looks like [0:{obj}, 1:{obj}, 2:{obj},..]

  //index is the id of input and span which is 0,2,4,9,12,14 positions

  for (let [index, obj] of Object.entries(processedStory)) {

    //creating an array to track the id of the  inputs relative to their position on the array of objects namely, processedStory.
    input_place_id = [];


    if (obj.pos === "n" || obj.pos === "v" || obj.pos === "a") {

      // input_place_id is [0,2,4,9,12,14] according to its positon
      input_place_id.push(index);
      //adding the inputs to the edting
      editP.innerHTML += `<input id = "in${index}" class=" lg-white rounded  border border-grey" type= "text" placeholder = ${obj.word}[${obj.pos}] maxlength = "20"  style="width:25% "> `

      // checking if the word that iam currently on in this loop has after it a comma or dot 
      // if it has comma no need to add spacing 
      // if don't we need to add a space 

      if (processedStory[parseInt(index) + 1].word === "," || processedStory[parseInt(index) + 1].word === ".") {
        previewP.innerHTML += `<span id = span${index} class ="mb-2">${obj.word}</span>`;
      }
      else {
        previewP.innerHTML += `<span id = span${index} class ="mb-2">${obj.word}</span>` + " ";
      }

    }
    // if it is not a word that is adj, noun, verb 
    //similarly to the previous logic implemented we do check commas and dots 
    else if (processedStory[parseInt(index) + 1]?.word === "," || processedStory[parseInt(index) + 1]?.word === ".") {

      editP.innerHTML += `${obj.word}`;
      previewP.innerHTML += `${obj.word}`;

    }
    else {
      editP.innerHTML += `${obj.word}` + " ";
      previewP.innerHTML += `${obj.word}` + " ";

    }
  }

  const inputsEl = document.querySelectorAll("input")
  const spansEl = document.querySelectorAll("span")


  // putting eventlisenters to all the inputs field 
  for (let j in Object.entries(input_place_id)) {
    // j is 0,1,2,3,4,5 
    inputsEl[j].addEventListener('input', () => {
      spansEl[j].innerText = inputsEl[j].value;
    })

    //to change the curse from input to another by prseeing enter
    inputsEl[j].addEventListener('keydown', (event) => {
      if (event.keyCode == 13) {
        if (parseInt(j) === input_place_id.length - 1) {
          const nextinput = inputsEl[0].focus()
        }
        else {
          event.preventDefault();
          const nextinput = inputsEl[parseInt(j) + 1].focus();

        }
      }
    })
    //to reset the style of the inputs and the value of the input or the span

    inputsEl[j].addEventListener('click', () => {
      inputsEl[j].value = '';
      inputsEl[j].style.backgroundColor = "";

      spansEl[j].innerText = ""

    })
    //to change style of input when it is empty or filled
    inputsEl[j].addEventListener('change', () => {

      if (inputsEl[j].value == "") {
        inputsEl[j].style.backgroundColor = "";
      }
      else {
        inputsEl[j].style.backgroundColor = "  rgb(255, 133, 255)";
      }
    })


  }


});







