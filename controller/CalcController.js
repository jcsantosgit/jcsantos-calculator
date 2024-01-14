class CalcController {
    constructor(){
        this._display = document.querySelector("#display");
        this._date = document.querySelector("#date");
        this._time = document.querySelector("#time");
        this.initialize();
        this.initializeButtons();
    }

    addEventListenerAll(elements, events, func){
        events.split(" ").forEach((event, index)=>{
            elements.forEach((element, index)=>{
                element.addEventListener(event, e => { 
                    document.querySelector("#display").innerHTML = element.textContent;
                 });                
            });
        });
    }

    initialize(){
        
        this._display.innerHTML = "0";
        this._locale = "pt-BR"

        setInterval(()=>{
            this._time.innerHTML = this.time;
        }, 1000)
        this._date.innerHTML = new Date().toLocaleDateString(this._locale);
        
    }

    initializeButtons(){
        let buttons = document.querySelectorAll(".btn-calc");
        this.addEventListenerAll(buttons, "click mouseover", null);
        // buttons.forEach((btn,index)=>{
        //     btn.addEventListener('click', e => { 
        //         document.querySelector("#display").innerHTML = btn.textContent;
        //      });
        // });
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
}

