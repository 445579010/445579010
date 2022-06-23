window.addEventListener("load", () => {

    (function (){
        class MSlider extends HTMLElement
        {
            constructor()
            {
                super();
                this.render();
                this.addEvent();
            }

            render()
            {
                // attach shadow root
                this.attachShadow({mode:"open"});
                const {shadowRoot} = this;

                // create element
                this.outerBox = window.document.createElement("div");
                this.bar = window.document.createElement("div");
                this.slider = window.document.createElement("div");
                this.detail = window.document.createElement("span");
                this.styleNode = window.document.createElement("style");

                // set attribute
                this.outerBox.setAttribute("class", "outer");
                this.bar.setAttribute("class", "bar");
                this.slider.setAttribute("class", "slider");
                this.detail.setAttribute("class", "show");
                this.styleNode.innerHTML = this.setComponentStyle();

                // set child node
                this.outerBox.appendChild(this.bar);
                this.outerBox.appendChild(this.slider);
                if (this.hasAttribute("show"))
                {
                    this.outerBox.appendChild(this.detail);
                    this.detail.innerText = "0";
                }
                this.shadowRoot.appendChild(this.outerBox);
                this.shadowRoot.appendChild(this.styleNode);

                this.setAttribute("currentValue",'0');
                return;
            }

            setComponentStyle()
            {
                return `
                     .outer
               {
                   width: 450px;
                   height: 30px;
                   position: relative;
                   overflow:hidden;
               }
        
               .bar
               {
                   width: 400px;
                   height: 10px;
                   margin-top:10px;
                   background: greenyellow;
                   display:inline-block;
               }
        
               .slider
               {
                   width: 10px;
                   height: 30px;
                   position: absolute;
                   background: #ff6347;
                   left: 0;
                   top: 0;
                   cursor:pointer;
               }
               
               .show
                {
                    float:right;
                    width:30px;
                    height: 30px;
                    box-sizing: border-box;
                    border: 1px solid lightcoral;
                    margin-left:20px;
                    line-height:30px;
                    text-align:center;
                    
                }
       
            `;
            }

            addEvent()
            {
                this.moveSlider();
            }

            moveSlider()
            {
                let slider = this.slider, bar = this.bar, detail = this.detail, _this = this;
                let dragElement = null, Left = 0;
                window.document.addEventListener("mousedown", event => {
                    if (event.target.tagName.toLowerCase() === "m-hslider")
                    {
                        dragElement = slider;
                        Left = event.clientX - dragElement.offsetLeft;
                    }
                    return;
                });

                window.document.addEventListener("mousemove", event => {
                    event.preventDefault();
                    if (dragElement !== null) {
                        let leftPos = event.clientX - Left;
                        if (leftPos < 0) {
                            leftPos = 0;
                        }
                        if (leftPos > bar.offsetWidth - slider.offsetWidth) {
                            leftPos = bar.offsetWidth - slider.offsetWidth;
                        }
                        dragElement.style.left = leftPos.toString() + "px";
                        detail.innerText = Math.ceil(leftPos / 3.9).toString();
                        _this.setAttribute("currentValue", detail.innerText);
                    }
                    return;
                });

                window.document.addEventListener("mouseup", ev => {
                    ev.preventDefault();
                    dragElement = null;
                    return;
                });
            }

        }

        window.customElements.define("m-hslider", MSlider);
    }());
});
