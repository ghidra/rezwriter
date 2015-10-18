t={};
t.canvas = {};
t.context={};
t.console={};
t.yped=[];//the array to holdentire lines for optimization
t.setting=[];//these are the letters that are animating

t.settings={
    'steps':30,
    'angle':360,
    'angle_variance':180,
    'font':{
        'size':10,
        'measure':'pt',
        'name':'Monaco'
    },
    'spacing':{
        'vertical':14,
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
    this.start_p = new rad.vector2( (Math.random()*100)-50, Math.random()*100 );
    this.line = t.settings.spacing.vertical_count;

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
    var gap = t.settings.steps-this.step;
    if(gap>0){
        var dgap = gap/t.settings.steps;
        var vgap = new rad.vector2().clone(this.start_p);
        var off = vgap.multscalar(dgap);
        t.context.translate(this.p.x+off.x,this.p.y+off.y);
        t.context.rotate(gap*(rad.degtorad(t.settings.angle)/t.settings.steps));

        t.context.font = (t.settings.font.size+(dgap*5)) + t.settings.font.measure + ' ' + t.settings.font.name;
        t.context.fillStyle = "rgba(0,0,0,"+(1.0-dgap)+")"; 
        t.context.fillText(this.a,0,0);
        t.context.restore();
        this.step+=1;
    }else{
        //add it to the t.yped array
        if( rad.totype(t.yped[this.line]) == 'undefined' ){
            t.yped[this.line]="";
        } 
        t.yped[this.line]+=this.a;
        //now remove it from the t.setting array
        var i = t.setting.indexOf(this);
        t.setting.splice(i,1);
        //t.context.font = t.settings.font.size + t.settings.font.measure + ' ' + t.settings.font.name;
        //t.context.fillStyle = "rgba(0,0,0,1.0)";
        //t.context.fillText(this.a,this.p.x,this.p.y);
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
    for (i=0; i<t.yped.length; i++){
        t.context.save();
        t.context.translate(0,t.settings.spacing.vertical*i);
        t.context.font = t.settings.font.size + t.settings.font.measure + ' ' + t.settings.font.name;
        t.context.fillStyle = "rgba(0,0,0,1.0";
        t.context.fillText(t.yped[i],0,0);
        t.context.restore();
    }
}

function init(){
    //I want to get the width of the body to make this fucker full screen
    var size = rad.bodysize();

    t.canvas = document.getElementById("canvas");
    t.canvas.tabIndex = 1000;//this forces the canvas to get the keyboard events
    t.canvas.width=size.x;
    t.canvas.height=size.y*0.9;

    t.console = document.getElementById("console");
    t.console.width=size.x;
    t.console.height=size.y*0.1;
    //i need a window resize event that will update these values
    //as well i need to account for the autmatic padding that ccurs

    t.context = t.canvas.getContext("2d");
    t.context.font = t.settings.font.size + t.settings.font.measure + ' ' + t.settings.font.name;
    
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
