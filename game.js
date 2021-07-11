let prizes_config = {
    count:12,
    prize_names : ["3000 Credits","35% Off","Hard Luck","70% OFF","Swagpack","100% OFF","Netflix","50% Off","Amazon Voucher","2 Extra Spin", "CB Tshirt","CB Book"]
}


let config={
    type:Phaser.CANVAS,
    width:800,
    height:600,
    backgroundColor:0xffcc00,
    
    
   //scene object
    scene:{
        preload:preload,
        create:create,
        update:update,
    }
};



//Creating a game object of Game class in Phaser
let game=new Phaser.Game(config); 

function preload(){
    console.log("Preload");
    
   
    this.load.image('background','back.jpg');
    
    //load the wheel image
    this.load.image('wheel','wheel.png');
    this.load.image('pin','pin.png');
    this.load.image('stand','stand.png');
    
}


function create(){
    console.log("Create");
    
    //create the background image
    let W=game.config.width;
    let H=game.config.height;
    let background=this.add.sprite(0,0,'background');
    background.setPosition(W/2,H/2);
   
   background.setScale(0.25); 
    
    
    let stand=this.add.sprite(W/2,H/2+150,'stand');
    stand.setScale(0.15);
    
     //create a pin
    let pin=this.add.sprite(W/2,H/2-150,'pin');
    pin.setScale(0.15);
    pin.depth=1;
    
    //wheel
    this.wheel=this.add.sprite(W/2,H/2,'wheel');
    this.wheel.setScale(0.15);
    
    
    //event listener for mouse click
    this.input.on("pointerdown",spinwheel,this);
   
    
    //create text object
    font_style={
        font:"bold 20px Arial",
        align: "center",
        color:"red",
        
    }
    this.game_text=this.add.text(10,10,"Welcome to Wheels of Fortune",font_style);
    
    
    
    
               
}
    

function update(){
    console.log("In update");
    
}


function spinwheel(){
    
    
    let rounds=Phaser.Math.Between(2,5); //random no. of rounds
    let degrees=Phaser.Math.Between(0,11)*30;
    let total_angle=rounds*360+degrees;
    console.log(total_angle);
    
    //Spinning Logic
    let idx=prizes_config.count-1-Math.floor(degrees/(360/prizes_config.count));
    
    
    tween=this.tweens.add({
        targets:this.wheel,
        angle:total_angle,
       
        ease: "cubic.easeOut",
        duration:6000,
        callbackScope:this, 
        onComplete:function(){
        this.game_text.setText("You won "+prizes_config.prize_names[idx]);
    }
    });
    
}


