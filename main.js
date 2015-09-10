cc.game.onStart = function(){
  if(!cc.sys.isNative && document.getElementById("cocosLoading"))
  document.body.removeChild(document.getElementById("cocosLoading"));

  cc.view.enableRetina(false);
  cc.view.adjustViewPort(true);
  cc.view.setDesignResolutionSize(640, 1136, cc.ResolutionPolicy.SHOW_ALL);
  cc.view.resizeWithBrowserSize(true);
  cc.LoaderScene.preload(g_resources, function () {
    cc.director.runScene(new StartScene());
  }, this);
};
cc.game.run();