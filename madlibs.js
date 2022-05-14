
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




const preview = document.getElementsByClassName("madLibsPreview");
const edit = document.getElementsByClassName("madLibsEdit");
const previewP = document.getElementById("previewP");
const editP = document.getElementById("editP")



function parseStory(rawStory) {


  A = rawStory.replaceAll(".", " .");
  raw = A.replaceAll(",", " ,")
  const arr = raw.split(" ");


  const mapped_arr = arr.map((el, i) => {
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





/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */
getRawStory().then(parseStory).then((processedStory) => {





  input_place_id = [];
  for (let [index, obj] of Object.entries(processedStory)) {

    if (obj.pos === "n" || obj.pos === "v" || obj.pos === "a") {

      input_place_id.push(index);

      editP.innerHTML += `<input id = "in${index}" type= "text" value = ${obj.word}[${obj.pos}] > `
      previewP.innerHTML += `<span id = span${index}>${obj.word}</span>` + " ";
    }
    else {
      editP.innerHTML += `${obj.word} ` + " ";
      previewP.innerHTML += `${obj.word}` + " ";
    }
  }

  const inputsEl = document.querySelectorAll("input")
  const spansEl = document.querySelectorAll("span")



  console.log(inputsEl);
  console.log(spansEl);

  function enterKeyPressed(event, I) {
    if (event.keyCode == 13) {
      console.log("Enter key is pressed");
      event.preventDefault();

      return true;
    } else {
      return false;
    }
  }


  // j is 0,1,2,3,4,5     
  //index is the id of input and span which is 0,2,4,9,12,14 positions
  // input_place_id is [0,2,4,9,12,14]

  for (let j in Object.entries(input_place_id)) {
    console.log(j)
    inputsEl[j]
      .addEventListener('input', () => {
        spansEl[j].innerText = inputsEl[j].value;
      })
    inputsEl[j].addEventListener('keydown', (event) => {
      if (event.keyCode == 13) {
        console.log("Enter key is pressed");
        event.preventDefault();

      } else {
        return false;
      }
    })
  }





});







