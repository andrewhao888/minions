var MinionBox = cc.Sprite.extend({
    logoBG:null,
    editBox:null,
    discription:'',
    price:0,
    editBox:null,
    ctor:function(logoBgPath, textBgPath, text, price) {
      this._super()
      this.logoBgPath  = logoBgPath;
      this.editBgPath  = textBgPath;
      this.discription = text;
      this.price       = price;

      this.init()
    },

    init:function(){
      this._super();

      var logoBG = new cc.Sprite(this.editBgPath);
      logoBG.setPosition(0, 25);
      this.addChild(logoBG);

      this.editBox = cc.EditBox.create(
          new cc.Size(50,25),
          new cc.Scale9Sprite(this.editBgPath)  //disabled state image
      );
      this.editBox.setPosition(0, 0);
      this.addChild(this.editBox);
    },

    setPosition:function(position) {
        this._position.x = position.x;
        this._position.y = position.y;
    },

    getCost:function(){
      return this.editBox.getString();
    }
})
