

//> This Function Scrape The Text DATA And return it as a string
function getNewText(){
    var new_paragraph = ""
    var allWord_target = document.querySelectorAll(".word");
    var i = 0;
    for (i; i < allWord_target.length ; i++){
        var words_Target = document.querySelectorAll(`.word:nth-child(${i}) > letter`);
        var the_word = ""
        words_Target.forEach(function (ltr){
            the_word+= ltr.innerHTML
        })
        new_paragraph += the_word + " "
    }
    return new_paragraph
}



//> This Area We Declare a variable and we fill it with pargraph each second
var newList = []
setInterval(function(){
    var restartBtn = document.getElementById("restartTestButton")
    var new_text = getNewText();
    newList.push(new_text)
    restartBtn.click()
},1000)



//> Use This To print The Data and Copy The Object
console.log(newList)