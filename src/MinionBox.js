var MinionBox = cc.Sprite.extend({
    Logo:null,
    InputBox:null,
    discription:'',
    price:0,

    ctor:function(position, logoBgRes, text, price) {
      this._super()

      this.Logo = new cc.Sprite(logoBgRes);
      this.Logo.setPosition(position.x, position.y + 200);
      this.addChild(this.Logo);

      inputBoxBg = new cc.Sprite(res.EditBoxBg);
      inputBoxBg.setPosition(position);
      this.addChild(inputBoxBg);

      this.InputBox = cc.EditBox.create(
          new cc.size(200,60),
          new cc.Scale9Sprite(res.EditBoxFront)
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
