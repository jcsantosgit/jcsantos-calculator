class CalcController {

    constructor(){
        this._audio = new Audio("click.mp3");
        this._audioOnOff = false;
        this._operation = [];
        this.CALC_DEFAULT_VALUE = 0;
        this.LOCALE = "pt-BR";
        this._display = document.querySelector("#display");
        this._date = document.querySelector("#date");
        this._time = document.querySelector("#time");
        this.initialize();
        this.initializeButtons();
        document.querySelector("#btnAc").addEventListener('dblclick', (e)=>{ this.toggleAudio(); });
    }

    toggleAudio(){
        console.log(this._audioOnOff);
        this._audioOnOff = !this._audioOnOff;
    }

    playAudio(){
        this._audio.currentTime = 0;    
        if(this._audioOnOff){
            this._audio.play();
        }
    }

    get display(){
        return this._display.innerHTML;
    }

    set display(value){
        this._display.innerHTML = value;
    }

    get currentDate(){
        return new Date();
    }

    set currentDate(value){
        this._date.innerHTML = value;
    }

    get time(){
        return this.currentDate.toLocaleTimeString(this.LOCALE);
    }

    set time(value){
        this._time.innerHTML = value;
    }

    initialize(){
        this._display.innerHTML = this.CALC_DEFAULT_VALUE;
        this._operation = [];

        setInterval(()=>{
            this._time.innerHTML = this.time;
        }, 1000)
        this._date.innerHTML = new Date().toLocaleDateString(this.LOCALE);
    }

    initializeButtons(){
        let buttons = document.querySelectorAll(".btn-calc");
        this.addEventListenerAll(buttons, "click", this.calcOperation);
    }

    clearEntry(){
        this._operation.pop();
        if(this._operation.length > 0){
            this._display.innerHTML = this._operation.join("");
        } else {
            this._display.innerHTML = this.CALC_DEFAULT_VALUE;
        }
    }

    clearAll(){
        this._operation = [];
        this._display.innerHTML = this.CALC_DEFAULT_VALUE;
    }

    isMathOperator(option){
        switch(option){
            case ".":
            case '÷':
            case '/':
            case '+':
            case '-':
            case '%':
            case 'x':
            case '*':
                return true;
            
            default:
                return false;
        }
    }

    calcOperation(option){
        
        if(this._operation.length > 24)

        this.playAudio();

        // Pega o ultimo item do array.
        const lastItem = this.lastOperation();

        // Se for o primeiro item do array e ele for um caracter: ., %, +, -, /, *, etc..
        // não adicionar ao array.
        if(this._operation.length == 0 && this.isMathOperator(option)) return;

        switch (option) {
            case 'AC':
                    this.clearAll();
                break;

            case 'CE':
                this.clearEntry();
                break;

            case '%':
                if(!this.isMathOperator(lastItem)) {
                    this.calculationExpression(option);
                }
                //this.addOperation(option);
                break; 

            case '÷':
                if(!this.isMathOperator(lastItem)){
                    this.calculationExpression("/");
                }
                    //this.addOperation(option);
                break;

            case 'x':
                if(!this.isMathOperator(lastItem)){
                    //this.addOperation("*");
                    this.calculationExpression("*");
                }
                break;

            case '-':
                if(!this.isMathOperator(lastItem)){
                    //this.addOperation(option);
                    this.calculationExpression(option);
                }
                break;

            case '+':
                if(!this.isMathOperator(lastItem)){
                    //this.addOperation(option);
                    this.calculationExpression(option);
                }
                break;

            case '=':
                if(this.isMathOperator(lastItem))
                    this._operation.pop();
                
                if(this._operation.length > 0)
                    this.calculationExpression();
                break;
            case ".":
                if(!(this._operation.toString().indexOf(".") > 0))
                    this.addOperation(option);
                break;

            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                this.addOperation(option);
                break;

            default:
                console.log("switch default")
                break;
        }

    }

    calculationExpression(operator){

        const result = eval(this._operation.join(""));

        this._operation = [];
        this._operation.push(result);
        
        if(operator != undefined && operator != null){
            this._operation.push(operator);
            this._display.innerHTML = this._operation.join("");
        }
        else
            this._display.innerHTML = result;
    }

    addEventListenerAll(elements, events){
        events.split(" ").forEach((event, index)=>{
            elements.forEach((element, index)=>{
                element.addEventListener(event, e => { 
                    this.calcOperation(element.textContent);
                 }, false);                
            });
        });
    }

    lastOperation (){
        if(this._operation.length > 0)
            return this._operation[this._operation.length - 1];
        else 
            return -1
    }

    addOperation(value) {
        this._operation.push(value);
        this._display.innerHTML = this._operation.join("");
    }

}

