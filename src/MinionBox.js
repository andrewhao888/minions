var MinionBox = cc.Sprite.extend({
    Logo:null,
    InputBox:null,
    discription:'',
    price:0,

    ctor:function(position, logoBgRes, text, price) {
      this._super()

      this.Logo = new cc.Sprite(logoBgRes);
      this.Logo.setPosition(position.x, position.y + 125);
      this.addChild(this.Logo);

      this.InputBox = cc.EditBox.create(
          new cc.size(50,25),
          new cc.Scale9Sprite(res.EditBoxBanana)
      );
      this.InputBox.setPosition(position);
      this.addChild(this.InputBox);

      this.discription = text;
      this.price       = price;

      this.init()
    },

    init:function(){
      this._super();
    },

    getCost:function(){
      var num = Number(this.InputBox.getString());
      if(isNaN(num)) return 0;
      else  return num;
    }
})
