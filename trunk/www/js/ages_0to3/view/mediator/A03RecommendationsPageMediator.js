jingo.declare(
{
    require: 
    [
        "shared.view.mediator.BasePageMediator",
        "ages_0to3.view.component.A03ProgramTileDef",
        "shared.view.component.Sounds",
        "shared.model.RecommendationsProxy",
        "ages_0to3.view.component.A03RecommendationsPage",
        "shared.view.mediator.SimpleVideoPlayerMediator"
    ],
    name: 'ages_0to3.view.mediator.A03RecommendationsPageMediator',
    as: function() 
    {
    
        ages_0to3.view.mediator.A03RecommendationsPageMediator = function(viewComponent)
        {
            shared.view.mediator.BasePageMediator.apply(this, [ages_0to3.view.mediator.A03RecommendationsPageMediator.NAME, viewComponent]);
    
            this.initTileConfigurations();
    
            if (this.getView())
            {
                this.getView().addEventListener(ages_0to3.view.component.A03RecommendationsPage.REFRESH_RECS, Relegate.create(this, this.onRefreshRecs, this));
                this.getView().addEventListener(ages_0to3.view.component.A03RecommendationsPage.PROGRAM_TILE_SELECTED, Relegate.create(this, this.onProgramTileSelected, this));
                this.getView().addEventListener(ages_0to3.view.component.A03RecommendationsPage.CLEANUP_FINISHED, Relegate.create(this, this.onCleanupFinished, this));
                this.getView().addEventListener(ages_0to3.view.component.A03RecommendationsPage.LOGOUT_CLICKED, Relegate.create(this, this.onLogoutClicked, this));
                this.getView().addEventListener(ages_0to3.view.component.A03RecommendationsPage.PROGRAM_TILE_SWIPED_OFF, Relegate.create(this, this.onProgramTileSwipedOff, this));
                this.getView().addEventListener(ages_0to3.view.component.A03RecommendationsPage.SWIPED_TILE_DESTROYED, Relegate.create(this, this.onSwipedTileDestroyed, this));
            }
        }

        ages_0to3.view.mediator.A03RecommendationsPageMediator.prototype = new shared.view.mediator.BasePageMediator;
        ages_0to3.view.mediator.A03RecommendationsPageMediator.prototype.parent = shared.view.mediator.BasePageMediator.prototype;
        ages_0to3.view.mediator.A03RecommendationsPageMediator.prototype.constructor = ages_0to3.view.mediator.A03RecommendationsPageMediator;
        
        ages_0to3.view.mediator.A03RecommendationsPageMediator.NAME = "ages_0to3.view.mediator.A03RecommendationsPageMediator";
        
        ages_0to3.view.mediator.A03RecommendationsPageMediator.RANDOMIZE_TILE_SETS = false;
        ages_0to3.view.mediator.A03RecommendationsPageMediator.DATA_SIZE = 4;
        ages_0to3.view.mediator.A03RecommendationsPageMediator.CONTEXT_ID = "randomApp";

        ages_0to3.view.mediator.A03RecommendationsPageMediator.prototype.tileConfigSets = new Array();
        ages_0to3.view.mediator.A03RecommendationsPageMediator.prototype.recData = new Array();
        ages_0to3.view.mediator.A03RecommendationsPageMediator.prototype.nextStartIndex = 0;
        ages_0to3.view.mediator.A03RecommendationsPageMediator.prototype.nextTileConfigSetIndex = 0;

        ages_0to3.view.mediator.A03RecommendationsPageMediator.prototype.getName = function()
        {
            return ages_0to3.view.mediator.A03RecommendationsPageMediator.NAME;
        }

        ages_0to3.view.mediator.A03RecommendationsPageMediator.prototype.initTileConfigurations = function()
        {
            var tileConfigSet1 = new Array();
              tileConfigSet1.push(new TileConfiguration(ages_0to3.view.component.A03RecommendationsPage.LEFT_X, ages_0to3.view.component.A03RecommendationsPage.TOP_Y));
              tileConfigSet1.push(new TileConfiguration(ages_0to3.view.component.A03RecommendationsPage.RIGHT_X, ages_0to3.view.component.A03RecommendationsPage.TOP_Y));
              tileConfigSet1.push(new TileConfiguration(ages_0to3.view.component.A03RecommendationsPage.LEFT_X, ages_0to3.view.component.A03RecommendationsPage.BOTTOM_Y));
              tileConfigSet1.push(new TileConfiguration(ages_0to3.view.component.A03RecommendationsPage.RIGHT_X, ages_0to3.view.component.A03RecommendationsPage.BOTTOM_Y));
    
            this.tileConfigSets.push(tileConfigSet1);
        }
              
        ages_0to3.view.mediator.A03RecommendationsPageMediator.prototype.onLogoutClicked = function()
        {
              this.sendNotification(AppConstants.LOGOUT_USER, {returnToLoginScreen: true});
        }

        ages_0to3.view.mediator.A03RecommendationsPageMediator.prototype.onCleanupFinished = function()
        {
            console.log("ages_0to3.view.mediator.A03RecommendationsPageMediator.CLEANUP FINISHED");
            this.sendNotification(AppConstants.PAGE_CLEANUP_FINISHED, {});
        }

 
        ages_0to3.view.mediator.A03RecommendationsPageMediator.prototype.showPage = function(data)
        {
            this.contextData = data;
    
            this.getView().onPageEnter(this.contextData);
    
            if (data.refreshPage)
            {
                var recommendationsProxy = this.facade.retrieveProxy( shared.model.RecommendationsProxy.NAME );
                var userData = this.contextData.userData;
                if (recommendationsProxy)
                {
                    var userId = (userData) ? userData.id : null;
                    recommendationsProxy.getRecommendations(
                        userId, 
                        ages_0to3.view.mediator.A03RecommendationsPageMediator.CONTEXT_ID,
                        Relegate.create(this, this.handleRecommendationsReceived, this), 
                        function() {});
                }
            }
    
            this.getView().update(this.contextData);
        }

        ages_0to3.view.mediator.A03RecommendationsPageMediator.prototype.handleRecommendationsReceived = function(recData)
        {
            this.recData = recData;
            this._currentRecIndex = 0;
    
            this.displayNextDataSet();
        }

        ages_0to3.view.mediator.A03RecommendationsPageMediator.prototype.onProgramTileSelected = function(event)
        {
            var selectedTile = event.args.selectedTile;
    
            if (selectedTile)
            {
                shared.view.component.Sounds.playTouch();
        
                console.log('user selected ' + selectedTile.videoURI);

                this.sendNotification(AppConstants.SHOW_SIMPLE_VIDEO_PLAYER, {id: selectedTile.programId, title: selectedTile.programTitle, videoURI: selectedTile.videoURI});
            }
        }
              
        ages_0to3.view.mediator.A03RecommendationsPageMediator.prototype.onProgramTileSwipedOff = function(event)
        {
              var swipedX = event.args.replaceX;
              var swipedY = event.args.replaceY;
              var rejectedId = event.args.rejectedProgram;
              
              if (swipedX && swipedY) {
                this._queuedRec = this.getNextRec(swipedX, swipedY);
                this.sendNotification(AppConstants.LOG_APP_MESSAGE, {eventCode: AppLoggingEventCodes.NEW_REC_GENERATED, eventData: 'rejected:' + rejectedId});
              }
              
        }
              
        ages_0to3.view.mediator.A03RecommendationsPageMediator.prototype.onSwipedTileDestroyed = function()
        {
              if (this._queuedRec)
              {
                var dataSet = new Array();
                dataSet.push(this._queuedRec);
                this.getView().refreshProgramTiles(dataSet);
                this._queuedRec = undefined;
              }
        }
              
        ages_0to3.view.mediator.A03RecommendationsPageMediator.prototype.getNextRec = function(positionX, positionY)
        {
            if (this._currentRecIndex >= this.recData.length)
            {
                this._currentRecIndex = 0;
            }
            
            var userData = this.contextData.userData;
            var tileFontColor = (userData && userData.theme) ? userData.theme.programTileFontColor : "#89BDBA";
              
            var nextRecBrief = this.recData[this._currentRecIndex++];
            if (nextRecBrief)
            {
                var progTileDef = 
                    new ages_0to3.view.component.A03ProgramTileDef(
                        nextRecBrief.id, 
                        nextRecBrief.type, 
                        nextRecBrief.title, 
                        nextRecBrief.imageSrc, 
                        tileFontColor,
                        nextRecBrief.videoPlayerCtrlImageSrc, 
                        nextRecBrief.videoURI, 
                        positionX, 
                        positionY);
                if (nextRecBrief.parentProgram)
                {
                    progTileDef.parentProgram = nextRecBrief.parentProgram;
                }
            }

            return progTileDef;
        }

        ages_0to3.view.mediator.A03RecommendationsPageMediator.prototype.displayNextDataSet = function()
        {
            var tileConfigSet = this.tileConfigSets[0];

            var dataSet = new Array();
            
            var userData = this.contextData.userData;
            var tileFontColor = (userData && userData.theme) ? userData.theme.programTileFontColor : "#89BDBA";

            for (var i = 0; (i < ages_0to3.view.mediator.A03RecommendationsPageMediator.DATA_SIZE) && (this._currentRecIndex < this.recData.length); i++, this._currentRecIndex++)
            {
                var programBrief = this.recData[this._currentRecIndex];
                if (programBrief)
                {
                    var tileConfig = tileConfigSet[i];

                    var positionX = tileConfig.positionX;
                    var positionY = tileConfig.positionY;

                    console.log ('ages_0to3.view.mediator.A03RecommendationsPageMediator.displayNextDataSet[i = ' + i + ']: positionX = ' + positionX + '; positionY = ' + positionY);

                    var programTileDef = 
                        new ages_0to3.view.component.A03ProgramTileDef(
                            programBrief.id, 
                            programBrief.type, 
                            programBrief.title, 
                            programBrief.imageSrc, 
                            tileFontColor,
                            programBrief.videoPlayerCtrlImageSrc, 
                            programBrief.videoURI, 
                            positionX, 
                            positionY);

                    if (programBrief.parentProgram) 
                    {
                        programTileDef.parentProgram = programBrief.parentProgram;
                    }

                    dataSet.push(programTileDef);
                }
            }
    
            this.getView().refreshProgramTiles(dataSet);
    
            // NOTE: (WK) This is a hack to allow the video page to be utilized as the main (and only) page
            // for research purposes, while still allowing the rest of the app to function.  This should be
            // removed when the need is no longer present.
    
            var videoDataSet = new Array();

            for (var j = 0; (j < this.recData.length); j++)
            {
                var videoProgramBrief = this.recData[j];
                if (videoProgramBrief)
                {
                    var videoProgramTileDef = 
                        new ages_0to3.view.component.A03ProgramTileDef(
                            videoProgramBrief.id, 
                            videoProgramBrief.type, 
                            videoProgramBrief.title, 
                            videoProgramBrief.imageSrc, 
                            tileFontColor,
                            videoProgramBrief.videoPlayerCtrlImageSrc, 
                            videoProgramBrief.videoURI, 
                            0, 
                            0, 
                            ages_0to3.view.component.A03ProgramTileDef.WEIGHTING_SIZE_SMALL);
            
                    videoDataSet.push(videoProgramTileDef);
                }
            }
    
            var vidPlayerMediator = this.facade.retrieveMediator(shared.view.mediator.SimpleVideoPlayerMediator.NAME);
            if (vidPlayerMediator)
            {
                vidPlayerMediator.loadPlaylist(videoDataSet);
            }
        }


        /*  TileConfiguration class */

        function TileConfiguration(positionX, positionY)
        {
            this.positionX = positionX;
            this.positionY = positionY;
        }
        
    }
});

