t={};
t.canvas = {};
t.context={};
t.console={};
t.yped="";
t.setting=[];//these are the letters that are animating

t.settings={
    'step':10,
    'steps':50,
    'delay':20
};

//this is a animating type setting object
t.ype = function(alpha){
    this.init(alpha);
}
t.ype.prototype.init=function(alpha){
    this.a = alpha;
    this.p= rad.vector2();
}
t.ype.prototype.tick=function(){
    
}

/*var can, ctx, step = 10, steps = 50;
delay = 20;
                 
            function init() {
                can = document.getElementById("MyCanvas");
                ctx = can.getContext("2d");
                ctx.fillStyle = "blue";
                ctx.font = "10pt Helvetica";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                TextSmallToBig();
            }
            function TextSmallToBig() {
                step++;
                ctx.clearRect(0, 0, can.width, can.height);
                ctx.save();
                ctx.rotate(step*0.2);
                ctx.translate(can.width / 2, can.height / 2);
                ctx.font = step + "pt Helvetica";
                ctx.fillText("Welcome", 0, 0);
                ctx.restore();
                if (step < steps)
                    var t = setTimeout('TextSmallToBig()', 20);
            }
*/
t.keycodes={"tab":9};
t.yping=function(e){
    //if(e.keyCode === this.keycodes["tab"]){
    value = String.fromCharCode(e.keyCode);
    //lets add this to the t.setting object for animating
    t.setting.push(new t.ype)
    t.yped+=value;
    //e.preventDefault();
    	//i might want to pass in different mouse position based on if it is going to overlap wrong
    //}
    t.console.innerHTML=t.yped;
}

t.ick=function(args){
    console.log("ticking");
    //requestAnimFrame(t.ick);
    //callback(args);
}

function init(){
	//draft.init();

    t.canvas = document.getElementById("canvas");
    t.context = t.canvas.getContext("2d");
    t.console = document.getElementById("console");
    t.canvas.tabIndex = 1000;//this forces the canvas to get the keyboard events
    t.canvas.onkeydown = function(e){t.yping(e);};

    //console.log(t.ick);
    rad.tick.init(t.ick);
    //t.ick();
}




window.onload=function(){
    init();    
}
