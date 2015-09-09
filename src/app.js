
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    MiniBox:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        // // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = new cc.MenuItemImage(
        	res.BTPlayNormal,
        	res.BTPlaySelected,
            this.onPlay, this);
        closeItem.attr({
            x: size.width / 2,
            y: size.height / 2,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        // /////////////////////////////
        // // 3. add your codes below...
        // // add a label shows "Hello World"
        // // create and initialize a label
        // var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // // position the label on the center of the screen
        // helloLabel.x = size.width / 2;
        // helloLabel.y = 0;
        // // add the label as a child to this layer
        // this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.FWBackground);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 0.5,
            rotation: 180
        });
        this.addChild(this.sprite, 0);

        this.sprite.runAction(
            cc.sequence(
                cc.rotateTo(0.5, 0),
                cc.scaleTo(0.5, 1, 1)
            )
        );

        test = new MinionBox(
            cc.p(200,200),
            res.Inventory1,
            1234,123,'ABC'
            );
        test.setScale(1,1);
        this.addChild(test);
        test.setHistory(30);
        test.setWinner('Advertiser 1');
    },

    onPlay:function(){
      cc.director.runScene(new MinionScene());
    }

});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});



