jingo.declare(
{
    require: 
    [
        "shared.view.mediator.BasePageMediator",
        "shared.view.component.SimpleVideoPlayerPage",
        "shared.controller.SendProgramHistoryEventCommand"
    ],
    name: 'shared.view.mediator.SimpleVideoPlayerMediator',
    as: function() 
    {

        shared.view.mediator.SimpleVideoPlayerMediator = function(viewComponent)
        {
            shared.view.mediator.BasePageMediator.apply(this, [shared.view.mediator.SimpleVideoPlayerMediator.NAME, viewComponent]);
    
            this.playlist = new Object();  //associative array for ease of lookup
            this.playlistOrder = new Array();  //ordered list based on recommendations
            this.currPlayingIdx = -1;
    
            if (this.getView())
            {
                this.getView().addEventListener(shared.view.component.SimpleVideoPlayerPage.BACK_SELECTED, Relegate.create(this, this.onBackSelected, this));
                this.getView().addEventListener(shared.view.component.SimpleVideoPlayerPage.VIDEO_ENDED, Relegate.create(this, this.onVideoEnded, this));
            }
        }

        shared.view.mediator.SimpleVideoPlayerMediator.prototype = new shared.view.mediator.BasePageMediator;
        shared.view.mediator.SimpleVideoPlayerMediator.prototype.parent = shared.view.mediator.BasePageMediator.prototype;
        shared.view.mediator.SimpleVideoPlayerMediator.prototype.constructor = shared.view.mediator.SimpleVideoPlayerMediator;
        
        shared.view.mediator.SimpleVideoPlayerMediator.NAME = "SimpleVideoPlayerMediator";

        shared.view.mediator.SimpleVideoPlayerMediator.prototype.getView = function()
        {
            return this.viewComponent;
        }

        shared.view.mediator.SimpleVideoPlayerMediator.prototype.getName = function()
        {
            return shared.view.mediator.SimpleVideoPlayerMediator.NAME;
        }

        shared.view.mediator.SimpleVideoPlayerMediator.prototype.onBackSelected = function()
        {
            this.sendNotification(AppConstants.DISPLAY_RECOMMENDATIONS, {user: this.facade.getCurrentUser(), refreshPage: false});
        }

        shared.view.mediator.SimpleVideoPlayerMediator.prototype.onVideoEnded = function()
        {
            //no-op  video pauses.
            //this.sendNotification(AppConstants.DISPLAY_RECOMMENDATIONS, {user: this.facade.getCurrentUser()});
        }

        shared.view.mediator.SimpleVideoPlayerMediator.prototype.hide = function()
        {
            this.getView().hide();
        }

        shared.view.mediator.SimpleVideoPlayerMediator.prototype.show = function()
        {
            this.getView().show();
        }

        shared.view.mediator.SimpleVideoPlayerMediator.prototype.loadVideo = function(programId)
        {
            var programDef = this.playlist[programId];
            var progIdx = this.playlistOrder.indexOf(programId);
            if (programDef && (progIdx != -1))
            {
                this.currPlayingIdx = progIdx;
                this.getView().loadVideo(programDef.videoURI);
                this.getView().play();
              
              
                if ((this.facade.notifyParentOfVideos == 1) && this.facade.notifySMS && (this.facade.notifySMS.length > 0))
                {
                    this.sendNotification(AppConstants.NOTIFY_PARENT, { message: 'Hey your kid is watching ' + programDef.programTitle, sms: this.facade.notifySMS });
                }
              
        
                this.sendNotification(AppConstants.LOG_APP_MESSAGE, {eventCode: AppLoggingEventCodes.LOADING_VIDEO, eventData: programId});
                this.sendNotification(AppConstants.SEND_PROGRAM_HISTORY_EVENT, {operation: shared.controller.SendProgramHistoryEventCommand.ADD_TO_HISTORY,userId: this.facade.getCurrentUser().id, programId: programId });
            }
            else
            {
                alert("Can't find video selected in current playlist: programId = " + programId);
            }
        }

        shared.view.mediator.SimpleVideoPlayerMediator.prototype.play = function()
        {
            this.getView().play();
        }

        shared.view.mediator.SimpleVideoPlayerMediator.prototype.pause = function()
        {
            this.getView().pause();
        }

        shared.view.mediator.SimpleVideoPlayerMediator.prototype.loadPlaylist = function(programArray /*ProgramTileDefs*/)
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
        
    }
});

