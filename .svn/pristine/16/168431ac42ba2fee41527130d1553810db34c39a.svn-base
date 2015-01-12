includeJS("js/shared/view/mediator/BasePageMediator.js");

CESLoginPageMediator.prototype = new BasePageMediator;
CESLoginPageMediator.prototype.parent = BasePageMediator.prototype;
CESLoginPageMediator.prototype.constructor = CESLoginPageMediator;

CESLoginPageMediator.NAME = "CESLoginPageMediator";

function CESLoginPageMediator(viewComponent)
{
    BasePageMediator.apply(this, [CESLoginPageMediator.NAME, viewComponent]);
    
    if (this.getView())
    {
        this.getView().addEventListener(CESLoginPage.LOGIN_TILE_SELECTED, Relegate.create(this, this.onLoginTileSelected, this));
        this.getView().addEventListener(CESLoginPage.CLEANUP_FINISHED, Relegate.create(this, this.onCleanupFinished, this));
    }
}

CESLoginPageMediator.prototype.getName = function()
{
    return CESLoginPageMediator.NAME;
}

CESLoginPageMediator.prototype.onLoginTileSelected = function()
{
    shared.view.component.Sounds.playTouch();
    var selTile = this.getView().selectedTile;
    console.log('User selected for login: ' + selTile.username);
    //JA - we are just hardcoding 'test' as the password for everyuser, otherwise they will have to enter it.
    this.sendNotification(AppConstants.LOGIN_USER, {username: selTile.username, password: 'test'});
}

CESLoginPageMediator.prototype.onCleanupFinished = function()
{
    this.sendNotification(AppConstants.PAGE_CLEANUP_FINISHED, {});
}

