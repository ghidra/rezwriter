t={};
t.canvas = {};
t.context={};
t.console={};
t.yped="";
t.setting=[];//these are the letters that are animating

t.settings={
    'steps':50,
    'angle':90,
    'angle_variance':30,
    'font':{
        'size':10,
        'measure':'pt',
        'name':'Monaco'
    },
    'spacing':{
        'vertical':11,
        'horizontal':8,
        'vertical_count':1,
        'horizontal_count':0,
        'horizontal_max':1
    },
};

//this is a animating type setting object
//--------------------------------------
t.ype = function(alpha){
    this.init(alpha);
}
t.ype.prototype.init=function(alpha){
    this.a = alpha;
    this.p = new rad.vector2(t.settings.spacing.horizontal_count*t.settings.spacing.horizontal,t.settings.spacing.vertical_count*t.settings.spacing.vertical);
    this.step=0;

    //we need to determine the position based on spacing
    if(t.settings.spacing.horizontal_count>t.settings.spacing.horizontal_max){
        t.settings.spacing.horizontal_count=0;
        t.settings.spacing.vertical_count+=1;
    }else{
        t.settings.spacing.horizontal_count+=1;
    }

}
t.ype.prototype.tick=function(){
    t.context.save();
    if(this.step<t.settings.steps){
        t.context.translate(this.p.x,this.p.y);
        t.context.rotate((t.settings.steps-this.step)*(rad.degtorad(t.settings.angle)/t.settings.steps));
        t.context.fillText(this.a,0,0);
        t.context.restore();
        this.step+=1;
    }else{
        t.context.fillText(this.a,this.p.x,this.p.y);
    }
    t.context.restore();
}
//-------------------------------------
t.keycodes={"tab":9,"return":13,"delete":8};
t.yping=function(e){
    e.preventDefault();//keep keys from causing shortcuts to occur, like delete going back a page
    //if(e.keyCode === this.keycodes["tab"]){
    //console.log(e.keyCode);
    value = String.fromCharCode(e.keyCode);
    //lets add this to the t.setting object for animating
    t.setting.push(new t.ype(value))
    //t.yped+=value;
    //e.preventDefault();
    	//i might want to pass in different mouse position based on if it is going to overlap wrong
    //}
    //t.console.innerHTML=t.yped;
}

t.ick=function(args){
    t.context.clearRect(0,0,t.canvas.width,t.canvas.height);//clear the canvas
    for (type in t.setting){
	t.setting[type].tick();
    }
}

function init(){
    t.canvas = document.getElementById("canvas");
    t.context = t.canvas.getContext("2d");
    t.context.font = t.settings.font.size + t.settings.font.measure + ' ' + t.settings.font.name;
    t.console = document.getElementById("console");
    t.canvas.tabIndex = 1000;//this forces the canvas to get the keyboard events
    t.canvas.onkeydown = function(e){
        e.preventDefault();//this stops it from using delete as a back button
        t.yping(e);
    };
    t.settings.spacing.horizontal_max = Math.floor((t.canvas.width-(t.settings.spacing.horizontal*2))/t.settings.spacing.horizontal)

    rad.tick.init(t.ick);
}

window.onload=function(){
    init();    
}
