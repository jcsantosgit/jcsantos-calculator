class CalcController {

    constructor(){
        this._operation = [];
        this._display = document.querySelector("#display");
        this._date = document.querySelector("#date");
        this._time = document.querySelector("#time");
        this.initialize();
        this.initializeButtons();
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
        return this.currentDate.toLocaleTimeString(this._locale);
    }

    set time(value){
        this._time.innerHTML = value;
    }

    initialize(){
        this._display.innerHTML = "0";
        this._locale = "pt-BR";
        this._operation = [];

        setInterval(()=>{
            this._time.innerHTML = this.time;
        }, 1000)
        this._date.innerHTML = new Date().toLocaleDateString(this._locale);
    }

    initializeButtons(){
        let buttons = document.querySelectorAll(".btn-calc");
        this.addEventListenerAll(buttons, "click", this.calcOperation);
    }

    clearEntry(){
        this._operation.pop();
        this._display.innerHTML = this._operation.join("");
    }

    clearAll(){
        this._operation = [];
        this._display.innerHTML = "";
    }

    lastItemIsOperator(option){
        switch(option){
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
        
        const lastItem = this.lastOperation();

        switch (option) {
            case 'AC':
                    this.clearAll();
                break;

            case 'CE':
                this.clearEntry();
                break;

            case '+':
                if(!this.lastItemIsOperator(lastItem))
                    this.addOperation(option);
                break;

            case '-':
                if(!this.lastItemIsOperator(lastItem))
                    this.addOperation(option);
                break;

            case 'x':
                if(!this.lastItemIsOperator(lastItem))
                    this.addOperation("*");
                break;

            case '%':
                if(!this.lastItemIsOperator(lastItem))
                    this.addOperation(option);
                    break;                    
            case '=':
                if(this.lastItemIsOperator(lastItem))
                    this._operation.pop();

                const result = eval(this._operation.join(""));
                this._display.innerHTML = result;

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

