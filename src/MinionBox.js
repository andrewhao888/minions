var MinionBox = cc.Sprite.extend({
    Logo:null,
    InputBox:null,
    _position:null,
    _fontType:"Arial",
    _fontSize:20,

    // Params:
    //   position:  cc.p(100,100)
    //   logoBgRes: res.logo_png
    //   cost:      123.45
    //   name:      '3-body'
    ctor:function(position, logoBgRes, cost, name) {
      this._super();
      this.init(position, logoBgRes, cost, name);
    },

    renderInventory:function(path){
      var position = this._position;
      this.Logo = new cc.Sprite(path);
      this.Logo.setPosition(position.x, position.y + 56);
      this.addChild(this.Logo);
    },

    renderEditBox:function(){
      var position = this._position;
      var inputBoxBg = new cc.Sprite(res.EditBoxBg);
      inputBoxBg.setPosition(position.x+31,position.y-85);
      this.addChild(inputBoxBg);
      this.InputBox = cc.EditBox.create(
          new cc.size(74,20),
          new cc.Scale9Sprite(res.EditBoxFront)
      );
      this.InputBox.setFontSize(14)
      this.InputBox.setPosition(position.x+20,position.y-85);
      this.addChild(this.InputBox);
    },

    renderLabels:function(cost, name){
      var position = this._position;

      var labelName = new cc.LabelTTF(name, this._fontType, this._fontSize-3);
      labelName.setPosition(position.x,position.y-10);
      this.addChild(labelName);

      var labelCost = new cc.LabelTTF("Cost: ", this._fontType, this._fontSize);
      labelCost.setPosition(position.x-60,position.y-40);
      this.addChild(labelCost);

      var labelCost = new cc.LabelTTF(cost.toFixed(2), this._fontType, this._fontSize);
      labelCost.setPosition(position.x+10,position.y-40);
      this.addChild(labelCost);

      var costIcon = new cc.Sprite(res.IconBanana);
      costIcon.setPosition(position.x+75,position.y-40);
      this.addChild(costIcon);

      var labelPrice = new cc.LabelTTF("Price:", this._fontType, this._fontSize);
      labelPrice.setPosition(position.x-60,position.y-85);
      this.addChild(labelPrice);
    },

    init:function(position, logoBgRes, cost, name) {
      this._super();
      this._position = position;
      this.renderInventory(logoBgRes);
      this.renderEditBox();
      this.renderLabels(cost, name);
    },

    getAsk:function(){
      var num = Number(this.InputBox.getString());
      if(isNaN(num)) return 0;
      else  return num;
    },

    clearAsk:function(){
      this.InputBox.setString('');
    }
})
