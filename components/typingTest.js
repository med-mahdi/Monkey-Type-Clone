app.component('typing-test-component', {
    template: `
        <div class="typing-test-section">
            <div id="capLockNotify" :class="{ showit: activeLock, 'dontShow': !activeLock }">
                <span class="material-symbols-outlined">lock</span>
                Caps Lock
            </div>


            <h1 id="score">{{time_count}}</h1>
            <p id="paragraph-area"></p>
            <input type="text" id="hhh" :maxLength="maxLengthInpt" v-model="input_value" @input="processInput($event)" @keyup.space="processInputSpaceBack($event)" @keyup.delete="processInputSpaceBack($event)" @keyup="onChangeInput" class="input-field" @paste.prevent  @keyup.ctrl.prevent >
        </div>
    `,
    data() {
        return {
            start_test : false,
            end_game : false,
            time_count : 30,
            // 
            testRecordChart : [],
            activeLock : false,
            // 
            correctWords: 0,
            acc : 0,
            inputedCorrectLetters: 0,
            inputedLetters: 0,
            // 
            paragraph: "A computer is a widely used device. Almost every family has a computer. It can perform various functions and make our lives easier. It has four main parts: Monitor, Keyboard, CPU, and Mouse. A Computer can be used to send and receive messages and emails and sms.",
            text_list: [],
            index: 0,
            input_value: "",
            maxLengthInpt: 10,
            correct_key_num : 0
        }
    },
    methods: {
        giveRemoveClass(tag, class_name, not_remove) {
            if (!not_remove) {
                return tag.className = ""
            }
            return tag.classList.add(class_name)
        }
        ,
        //> This Activate the word we are Currently in and Activate the Line letter
        activateWords() {
            var that = this
            var allWords = document.querySelectorAll(`word`)
            allWords.forEach(function (wrd) {
                wrd.className = ""
            })
            var active_word = document.querySelector(`word:nth-child(${this.index + 1}`)
            active_word.className = "active"
            // -------------
            var wordLetters = document.querySelectorAll(`word.active span`)
            wordLetters.forEach(function (ltr) {
                ltr.id = ""
                ltr.classList.remove("lineLtr")
            })
            try{
                var activeLetter = document.querySelector(`word.active > span:nth-child(${this.input_value.length})`)
                activeLetter.id = "activeLetter"
                
                var lineLetter = document.querySelector(`word.active > span:nth-child(${this.input_value.length+1})`)
                lineLetter.classList.add("lineLtr")
            }
            catch{
                var activeLetter = document.querySelector(`word.active > span:nth-child(1)`)
                activeLetter.id = "activeLetter"
            }
        }
        ,
        //> This Function -> Processing The Text Giving And Display It on the paragraph
        displayText() {
            var text_place = document.getElementById("paragraph-area");
            var textArray = this.text_list;
            let i = 0;
            this.text_list.forEach(function (word) {
                //> Add a class to the last word in the text.
                let lastWord = (textArray[textArray.length-1])
                let lastWordIndex = textArray.length-1
                if (word === lastWord && lastWordIndex === i) {
                    var res_word = ""
                    var letters = word.split("")
                    letters.forEach(function (ltr) {
                        res_word += `<span>${ltr}</span>`;
                    })
                    text_place.innerHTML += `<word id="lastWord">${res_word}</word> `
                    i++;
                }
                else {
                    var res_word = ""
                    var letters = word.split("")
                    letters.forEach(function (ltr) {
                        res_word += `<span>${ltr}</span>`
                    })
                    text_place.innerHTML += `<word>${res_word}</word> `
                    i++
                }
            })
        }
        ,
        //> This Function -> Focus the input Field 
        activeInput() {
            var inpField = document.querySelector(".input-field")
            document.addEventListener("keydown", () => inpField.focus());
        }
        ,
        //> This Function -> Give a className Depend on The Word State(Correct,False) and Increment The Value of The Score
        checkCorrectWord(index,word){
            var i = 0
            var tagWord = document.querySelectorAll(`word:nth-child(${index}) span`)

            for (i; i < tagWord.length ; i++){
                var ltr = tagWord[i]
                var ltr_classname = ltr.className
                if (ltr_classname == "correct" || ltr_classname == "correct lastLetter"){
                    console.log("correct letter Skip")
                }
                else{
                    ltr.className = "error"
                }
            }
            var correctLetters = document.querySelectorAll("word.active span.correct").length
            var the_word = document.querySelectorAll("word.active span").length
            if (correctLetters == the_word){
                this.correctWords++
            }
        }
        ,
        //*** Not Yet
        onChangeInput(){
            var tagWord = document.querySelectorAll(`word:nth-child(${this.index+1}) span`)
            if (this.input_value.length == 0){
                tagWord.forEach(function (ltr){
                    ltr.classList.remove("error")
                    ltr.classList.remove("correct")
                    ltr.classList.remove("lastLetter")
                })
            }
        }
        ,
        //> This Function -> Check Input While User Typing and Entring Input
        processInput(event) {
            if (this.end_game == true) {
                console.log("you finished the typing test")
            }
            else {
                var that = this
                var word = this.text_list[this.index]; var word_length = word.length
                this.maxLengthInpt = word_length
                that.activateWords()
                this.start_test = true
                that.activeInput()
                var j = 0;
                for (j; j < this.input_value.length; j++) {
                    var letter = document.querySelector(`word:nth-child(${this.index + 1}) span:nth-child(${j + 1})`)
                    if (this.input_value[j] == word[j]) {
                            letter.className = "correct"
                            this.correct_key_num++
                            this.inputedCorrectLetters++
                    }
                    else if (this.input_value[j] != word[j]) {
                            letter.className = "error"
                    }
                    this.inputedLetters++
                }
                if (this.input_value.length == word_length){
                    var the_last_letter = document.querySelector("word.active > span:last-child")
                    the_last_letter.classList.add("lastLetter")
                }
            }
        }
        ,
        //> This Function -> Process Input When user Hit Enter or Space Back -> To Check if word is correct or incorrect to Increment the Score Value
        processInputSpaceBack(event) {
            var scoreCorrectWord = this.correctWord
            if (this.end_game == true) {
                alert("you finished the typing test")
            }
            else {
                var that = this
                var word = this.text_list[this.index];
                var word_length = word.length
                this.maxLengthInpt = word_length
                var key = event.key
                that.activateWords()
                that.activeInput()
                if (key == " ") {
                    var activeLetter = document.querySelector(`word.active > span:nth-child(${this.input_value.length})`)
                    activeLetter.classList.remove("activeLetter")
                    that.checkCorrectWord(this.index+1,this.input_value)
                    //> This is to remove the lastLetter line in previous word
                    var the_last_letter = document.querySelector("word.active > span:last-child")
                    the_last_letter.classList.remove("lastLetter")
                    //---
                    var wordLetters = document.querySelectorAll(`word.active span`)
                    wordLetters.forEach(function (ltr) {
                        ltr.id = ""
                    })
                    try{
                        var activeLetter = document.querySelector(`word:nth-child(${this.index+2}) > span:first-child`)
                        activeLetter.id = "activeLetter"
                        this.input_value = ""
                        this.index++
                        this.correct_key_num = 0
                        var lineLetter = document.querySelector(`word:nth-child(${this.index +1 }) > span:nth-child(1)`)
                        lineLetter.classList.add("lineLtr")
                    }
                    catch(e){
                        this.end_game = true

                        // this.$emit("show-result","test")

                        console.log("you finished")
                    }
                }
                else if (key == "Backspace") {
                    // var firstLetter_inWord_check = (document.querySelector("span#activeLetter").innerHTML == document.querySelector(`word:nth-child(${this.index+1}) > span:first-child`).innerHTML) && (this.input_value.length == 0);
                    this.inputedLetters--
                    if (this.input_value.length == 0){
                        var lineLetter = document.querySelector(`word.active > span:nth-child(1)`)
                        lineLetter.className = ""
                        lineLetter.classList.add("lineLtr")
                    }
                    else{
                        if (this.maxLengthInpt == 1){
                            var lineLetter = document.querySelector(`word.active > span:nth-child(1)`)
                            var letter = document.querySelector(`word.active > span:nth-child(1)`)
                            letter.className = ""
                            lineLetter.classList.add("lineLtr")
                        }
                        else{
                            var lineLetter = document.querySelector(`word.active > span:nth-child(${this.input_value.length+1})`)
                            var letter = document.querySelector(`word.active > span:nth-child(${this.input_value.length+1})`)
                            letter.className = ""

                            lineLetter.classList.add("lineLtr")
                        }
                    }
                }
                if (this.input_value.length == word_length){
                    var the_last_letter = document.querySelector("word.active > span:last-child")
                    the_last_letter.classList.add("lastLetter")
                }
            }

        }
        ,
        // This Function resposnibe of the time display
        updateTime(val){
            return this.time_count = val
        }
        ,
        // This Function reposible for checking if the Typing test Finished
        endTypingTest(){    
            var lastWordIndex = this.text_list.length
        },
        randomNumberFunction(maxNumber){
            var that = this
            var randomNumber = parseInt(Math.random() * 100)
            while (randomNumber > maxNumber){
                randomNumber = parseInt(Math.random() * 100)
            }
            return (randomNumber)
        }
        ,
        stopTheGame(){
            this.start_test = false
            return this.end_game = true
        },
        getCorrectWord(){
            return this.correctWords
        },
        addValueToList(value){
            this.testRecordChart.push(value)
            // console.log(this.testRecordChart)
        },
        capLockCheck(event){
            if (event.getModifierState('CapsLock')) {
                this.activeLock = true
            } else {
                this.activeLock = false
            }
        }
    }
    ,
    mounted() {
        var that = this
        // calling back the capLockCheck functin to check if cap lock is active or not.
        document.addEventListener('keyup', (e) => {
            that.capLockCheck(e)
        });
        var randomValue = that.randomNumberFunction()
        this.paragraph = (paragraphs[randomValue])
        this.paragraph = this.paragraph.toLowerCase().trim();
        this.text_list = this.paragraph.split(" ").slice(0,32);
        that.displayText()
        that.activeInput()
        var allWords = document.querySelectorAll(`word`)[0]
        allWords.className = "active"
        var activeLetter = document.querySelector(`word > span:nth-child(1)`)
        activeLetter.id = "activeLetter"


        //> This Check if the user typed the last letter in the text => to end the game.
        var lastWordLength = that.text_list[that.text_list.length - 1].length;
        setInterval(function() {
            var lastWord = document.getElementById("lastWord");
            var activeWord = document.querySelector(".active");
            if (lastWord === activeWord){
                if (lastWordLength === that.input_value.length){
                    console.log("Here finish The Game");
                    that.end_game = true;
                }
            }

        },200)
    }
    ,
    watch : {
        start_test : {
            handler(){
                var that = this
                var game_time = this.time_count
                if (this.start_test == true && this.end_game == false) {
                    setInterval(function(){
                        if (game_time >= 0 && game_time <= 30){
                            if (game_time > 0){
                                game_time--
                                that.updateTime(game_time)
                                // update this one if u changed 5 second to 30 second
                                that.addValueToList({"correctWord":that.correctWords, "second": 30 - game_time})
                            }
                            else {
                                that.addValueToList({"correctWord":that.correctWords, "second": 30 - game_time})
                            }
                        }
                        else{
                            return that.stopTheGame()
                        }
                    },1000)
                }
            }
        }
        ,
        time_count : {
            handler(){
                if (this.time_count == 0){
                    this.end_game = true;
                }
            }
        }
        ,
        index : {
            handler(){
                var that = this
                that.endTypingTest()
            }
        },
        end_game : {
            handler(){
                if (this.end_game == true){
                    // Showing all Values for the test
                    console.log("Inputed letter :" + this.inputedLetters)
                    console.log("Inputed Correct Letters :" + this.inputedCorrectLetters)
                    console.log("Inputed Correct Words :" + this.correctWords)
        
                    this.$emit("show-result",this.correctWords,this.testRecordChart)
                }
            }
        },
    }
  });
  