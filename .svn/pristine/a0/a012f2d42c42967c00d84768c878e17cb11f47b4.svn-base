includeJS("js/shared/view/mediator/BasePageMediator.js");

CESVideoPlayerMediator.prototype = new BasePageMediator;

CESVideoPlayerMediator.prototype.parent = BasePageMediator.prototype;
CESVideoPlayerMediator.prototype.constructor = CESVideoPlayerMediator;

CESVideoPlayerMediator.NAME = AppConstants.VIDEO_PAGE_MEDIATOR_NAME;

function CESVideoPlayerMediator(viewComponent)
{
    BasePageMediator.apply(this, [CESVideoPlayerMediator.NAME, viewComponent]);
    
    this.playlist = new Object();  //associative array for ease of lookup
    this.playlistOrder = new Array();  //ordered list based on recommendations
    this.currPlayingIdx = -1;
    
    if (this.getView())
    {
        this.getView().addEventListener(CESVideoPlayerPage.BACK_SELECTED, Relegate.create(this, this.onBackSelected, this));
        this.getView().addEventListener(CESVideoPlayerPage.VIDEO_ENDED, Relegate.create(this, this.onVideoEnded, this));
    }
}

CESVideoPlayerMediator.prototype.getView = function()
{
    return this.viewComponent;
}

CESVideoPlayerMediator.prototype.getName = function()
{
    return CESVideoPlayerMediator.NAME;
}

CESVideoPlayerMediator.prototype.onBackSelected = function()
{
    this.sendNotification(AppConstants.DISPLAY_RECOMMENDATIONS, {user: this.facade.getCurrentUser(), refreshPage: false});
}

CESVideoPlayerMediator.prototype.onVideoEnded = function()
{
    //no-op  video pauses.
    //this.sendNotification(AppConstants.DISPLAY_RECOMMENDATIONS, {user: this.facade.getCurrentUser()});
}

CESVideoPlayerMediator.prototype.hide = function()
{
    this.sendNotification(AppConstants.LOG_APP_MESSAGE, {message: "Hiding page: " + this.getName()});
    this.getView().hide();
}

CESVideoPlayerMediator.prototype.show = function()
{
    this.sendNotification(AppConstants.LOG_APP_MESSAGE, {message: "Showing page: " + this.getName()});
    this.getView().show();
}

CESVideoPlayerMediator.prototype.loadVideo = function(programId)
{
    var programDef = this.playlist[programId];
    var progIdx = this.playlistOrder.indexOf(programId);
    if (programDef && (progIdx != -1))
    {
        this.currPlayingIdx = progIdx;
        this.getView().loadVideo(programDef.videoURI);
        this.getView().play();
        
        this.sendNotification(AppConstants.LOG_APP_MESSAGE, {message: "Loading video: " + programId});
        this.sendNotification(AppConstants.SEND_PROGRAM_HISTORY_EVENT, {operation: SendProgramHistoryEventCommand.ADD_TO_HISTORY,userId: this.facade.getCurrentUser().id, programId: programId });
    }
    else
    {
        alert("Can't find video selected in current playlist: programId = " + programId);
    }
}

CESVideoPlayerMediator.prototype.play = function()
{
    this.getView().play();
}

CESVideoPlayerMediator.prototype.pause = function()
{
    this.sendNotification(AppConstants.LOG_APP_MESSAGE, {message: "Pausing page: " + this.getName()});
    this.getView().pause();
}

CESVideoPlayerMediator.prototype.loadPlaylist = function(programArray /*ProgramTileDefs*/)
{
    this.playlist = new Object();
    this.playlistOrder = new Array();
    this.currPlayingIdx = -1;
    for (var i = 0; i < programArray.length; i++) 
    {
        var progTileDef = programArray[i];
        this.playlist[progTileDef.programId] = progTileDef;
        this.playlistOrder.push(progTileDef.programId);
    }
}

