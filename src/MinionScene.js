var MinionScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		this.addChild(new BackgroundLayer());
    this.addChild(new BoxLayer());
	}
});