jingo.declare(
{
    require: 
    [
        "shared.view.mediator.BasePageMediator",
        "shared.view.component.AdvancedVideoPlayerPage",
        "shared.view.component.Sounds",
        "shared.controller.SendProgramHistoryEventCommand"
    ],
    name: 'shared.view.mediator.AdvancedVideoPlayerMediator',
    as: function() 
    {

        shared.view.mediator.AdvancedVideoPlayerMediator = function(viewComponent)
        {
            shared.view.mediator.BasePageMediator.apply(this, [shared.view.mediator.AdvancedVideoPlayerMediator.NAME, viewComponent]);
    
            this.playlist = new Object();  //associative array for ease of lookup
            this.playlistOrder = new Array();  //ordered list based on recommendations
            this.currPlayingIdx = -1;
    
            if (this.getView())
            {
                this.getView().addEventListener(shared.view.component.AdvancedVideoPlayerPage.BACK_SELECTED, Relegate.create(this, this.onBackSelected, this));
                this.getView().addEventListener(shared.view.component.AdvancedVideoPlayerPage.VIDEO_ENDED, Relegate.create(this, this.onVideoEnded, this));
                this.getView().addEventListener(shared.view.component.AdvancedVideoPlayerPage.VIDEO_SELECTED, Relegate.create(this, this.onVideoSelected, this));
            }
        }

        shared.view.mediator.AdvancedVideoPlayerMediator.prototype = new shared.view.mediator.BasePageMediator;
        shared.view.mediator.AdvancedVideoPlayerMediator.prototype.parent = shared.view.mediator.BasePageMediator.prototype;
        shared.view.mediator.AdvancedVideoPlayerMediator.prototype.constructor = shared.view.mediator.AdvancedVideoPlayerMediator;

        shared.view.mediator.AdvancedVideoPlayerMediator.NAME = "AdvancedVideoPlayerMediator";

        shared.view.mediator.AdvancedVideoPlayerMediator.prototype.getView = function()
        {
            return this.viewComponent;
        }

        shared.view.mediator.AdvancedVideoPlayerMediator.prototype.getName = function()
        {
            return shared.view.mediator.AdvancedVideoPlayerMediator.NAME;
        }

        shared.view.mediator.AdvancedVideoPlayerMediator.prototype.onBackSelected = function()
        {
            
            this.sendNotification(AppConstants.DISPLAY_RECOMMENDATIONS, {user: this.facade.getCurrentUser(), refreshPage: false});
        }

        shared.view.mediator.AdvancedVideoPlayerMediator.prototype.onVideoEnded = function()
        {
            //this.sendNotification(AppConstants.DISPLAY_RECOMMENDATIONS, {user: this.facade.getCurrentUser()});
        }

        shared.view.mediator.AdvancedVideoPlayerMediator.prototype.hide = function()
        {
            this.getView().hide();
        }

        shared.view.mediator.AdvancedVideoPlayerMediator.prototype.show = function(currentUser)
        {
            this.getView().show(currentUser);
        }

        shared.view.mediator.AdvancedVideoPlayerMediator.prototype.loadVideo = function(programId)
        {
            var programDef = this.playlist[programId];
            var progIdx = this.playlistOrder.indexOf(programId);
            if (programDef && (progIdx != -1))
            {
                this.currPlayingIdx = progIdx;
                this.getView().loadPlaylist(this.playlistTitle, this.playlist);
                this.getView().loadVideo(programDef.videoURI, programDef.programTitle);
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

        shared.view.mediator.AdvancedVideoPlayerMediator.prototype.onVideoSelected = function(event)
        {
            var selectedVideoId = event.args.programId;
    
            if (selectedVideoId)
            {
                shared.view.component.Sounds.playTouch();
        
                console.log("shared.view.mediator.AdvancedVideoPlayerMediator.prototype.onVideoSelected:  selectedVideoId = " + selectedVideoId);
        
                this.pause();
                this.loadVideo(selectedVideoId);
            }
        }

        shared.view.mediator.AdvancedVideoPlayerMediator.prototype.play = function()
        {
            this.getView().play();
        }

        shared.view.mediator.AdvancedVideoPlayerMediator.prototype.pause = function()
        {
            this.getView().pause();
        }

        shared.view.mediator.AdvancedVideoPlayerMediator.prototype.loadPlaylist = function(playlistTitle, programArray /*ProgramTileDefs*/)
        {
            this.playlistTitle = playlistTitle;
            this.playlist = new Object();
            this.playlistOrder = new Array();
            this.currPlayingIdx = -1;
            for (var i = 0; i < programArray.length; i++) 
            {
                var progTileDef = programArray[i];
                progTileDef.__episodeNumber = i + 1;
                this.playlist[progTileDef.programId] = progTileDef;
                this.playlistOrder.push(progTileDef.programId);
            }
        }
        
    }
});

