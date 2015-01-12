jingo.declare(
{
    require: 
    [
        "shared.view.mediator.BasePageMediator",
        "ages_3to6.view.component.A36ProgramTileDef",
        "shared.view.component.Sounds",
        "shared.model.RecommendationsProxy",
        "shared.model.RCSProxy",
        "ages_3to6.view.component.A36RecommendationsPage",
        "shared.view.mediator.AdvancedVideoPlayerMediator"
    ],
    name: 'ages_3to6.view.mediator.A36RecommendationsPageMediator',
    as: function() 
    {
    
        ages_3to6.view.mediator.A36RecommendationsPageMediator = function(viewComponent)
        {
            shared.view.mediator.BasePageMediator.apply(this, [ages_3to6.view.mediator.A36RecommendationsPageMediator.NAME, viewComponent]);
    
            this.initTileConfigurations();
    
            if (this.getView())
            {
                this.getView().addEventListener(ages_3to6.view.component.A36RecommendationsPage.REFRESH_RECS, Relegate.create(this, this.onRefreshRecs, this));
                this.getView().addEventListener(ages_3to6.view.component.A36RecommendationsPage.THEME_ICON_SELECTED, Relegate.create(this, this.onThemeIconSelected, this));
                this.getView().addEventListener(ages_3to6.view.component.A36RecommendationsPage.PROGRAM_TILE_SELECTED, Relegate.create(this, this.onProgramTileSelected, this));
                this.getView().addEventListener(ages_3to6.view.component.A36RecommendationsPage.CLEANUP_FINISHED, Relegate.create(this, this.onCleanupFinished, this));
                this.getView().addEventListener(ages_3to6.view.component.A36RecommendationsPage.LOGOUT_CLICKED, Relegate.create(this, this.onLogoutClicked, this));
                this.getView().addEventListener(ages_3to6.view.component.A36RecommendationsPage.PROGRAM_TILE_SWIPED_OFF, Relegate.create(this, this.onProgramTileSwipedOff, this));
                this.getView().addEventListener(ages_3to6.view.component.A36RecommendationsPage.SWIPED_TILE_DESTROYED, Relegate.create(this, this.onSwipedTileDestroyed, this));
            }
        }

        ages_3to6.view.mediator.A36RecommendationsPageMediator.prototype = new shared.view.mediator.BasePageMediator;
        ages_3to6.view.mediator.A36RecommendationsPageMediator.prototype.parent = shared.view.mediator.BasePageMediator.prototype;
        ages_3to6.view.mediator.A36RecommendationsPageMediator.prototype.constructor = ages_3to6.view.mediator.A36RecommendationsPageMediator;
    
        ages_3to6.view.mediator.A36RecommendationsPageMediator.NAME = "ages_3to6.view.mediator.A36RecommendationsPageMediator";
        
        ages_3to6.view.mediator.A36RecommendationsPageMediator.RANDOMIZE_TILE_SETS = false;
        ages_3to6.view.mediator.A36RecommendationsPageMediator.DATA_SIZE = 9;
        ages_3to6.view.mediator.A36RecommendationsPageMediator.VIDEO_DATA_LIMIT = 30;
        ages_3to6.view.mediator.A36RecommendationsPageMediator.CONTEXT_ID = "randomApp";
        ages_3to6.view.mediator.A36RecommendationsPageMediator.LEFT_COL_X_SEED = 6;
        ages_3to6.view.mediator.A36RecommendationsPageMediator.MIDDLE_COL_X_SEED = 16;
        ages_3to6.view.mediator.A36RecommendationsPageMediator.RIGHT_COL_X_SEED = 28;
        ages_3to6.view.mediator.A36RecommendationsPageMediator.COLUMN_STD_DEVIATION = 1;
        ages_3to6.view.mediator.A36RecommendationsPageMediator.NEW_REC_Y_VAL = 1;

        ages_3to6.view.mediator.A36RecommendationsPageMediator.prototype.tileConfigSets = new Array();
        ages_3to6.view.mediator.A36RecommendationsPageMediator.prototype.recData = new Array();
        
        // JA: used for maintaing tile state when coming back from Theme Selection page
        ages_3to6.view.mediator.A36RecommendationsPageMediator.prototype.previousProgramTileDefs = new Array();
              
        ages_3to6.view.mediator.A36RecommendationsPageMediator.prototype.nextStartIndex = 0;
        ages_3to6.view.mediator.A36RecommendationsPageMediator.prototype.nextTileConfigSetIndex = 0;

        ages_3to6.view.mediator.A36RecommendationsPageMediator.prototype.getName = function()
        {
            return ages_3to6.view.mediator.A36RecommendationsPageMediator.NAME;
        }

        ages_3to6.view.mediator.A36RecommendationsPageMediator.prototype.initTileConfigurations = function()
        {
            var tileConfigSet = new Array();
            tileConfigSet.push(new TileConfiguration(6.5, -10, ages_3to6.view.component.A36ProgramTileDef.WEIGHTING_SIZE_SMALL));
            tileConfigSet.push(new TileConfiguration(16.5, -15, ages_3to6.view.component.A36ProgramTileDef.WEIGHTING_SIZE_MEDIUM));
            tileConfigSet.push(new TileConfiguration(28, -20, ages_3to6.view.component.A36ProgramTileDef.WEIGHTING_SIZE_MEDIUM));
            tileConfigSet.push(new TileConfiguration(5.6, -50, ages_3to6.view.component.A36ProgramTileDef.WEIGHTING_SIZE_MEDIUM));
            tileConfigSet.push(new TileConfiguration(17.5, -45, ages_3to6.view.component.A36ProgramTileDef.WEIGHTING_SIZE_MEDIUM));
            tileConfigSet.push(new TileConfiguration(28.4, -40, ages_3to6.view.component.A36ProgramTileDef.WEIGHTING_SIZE_SMALL));
            tileConfigSet.push(new TileConfiguration(6.3, -70, ages_3to6.view.component.A36ProgramTileDef.WEIGHTING_SIZE_MEDIUM));
            tileConfigSet.push(new TileConfiguration(15.2, -70, ages_3to6.view.component.A36ProgramTileDef.WEIGHTING_SIZE_SMALL));
            tileConfigSet.push(new TileConfiguration(28.8, -75, ages_3to6.view.component.A36ProgramTileDef.WEIGHTING_SIZE_MEDIUM));
            
            this.tileConfigSets.push(tileConfigSet);
        }
              
        ages_3to6.view.mediator.A36RecommendationsPageMediator.prototype.onLogoutClicked = function()
        {
              this.sendNotification(AppConstants.LOGOUT_USER, {returnToLoginScreen: true});
        }

        ages_3to6.view.mediator.A36RecommendationsPageMediator.prototype.onCleanupFinished = function()
        {
            console.log("ages_3to6.view.mediator.A36RecommendationsPageMediator.CLEANUP FINISHED");
            this.sendNotification(AppConstants.PAGE_CLEANUP_FINISHED, {});
        }

 
        ages_3to6.view.mediator.A36RecommendationsPageMediator.prototype.showPage = function(data)
        {
            this.contextData = data;
    
            this.getView().onPageEnter(this.contextData);
    
            if (data.refreshPage)
            {
                if (this.previousProgramTileDefs && (this.previousProgramTileDefs.length > 0))
              {
                this.restorePreviousDataSet(this.previousProgramTileDefs);
              }
              else
              {
                var recommendationsProxy = this.facade.retrieveProxy( shared.model.RecommendationsProxy.NAME );
                var userData = this.contextData.userData;
                if (recommendationsProxy)
                {
                    var userId = (userData) ? userData.id : null;
                    recommendationsProxy.getRecommendations(
                        userId, 
                        ages_3to6.view.mediator.A36RecommendationsPageMediator.CONTEXT_ID,
                        Relegate.create(this, this.handleRecommendationsReceived, this), 
                        function() {});
                }
              }
            }
    
            this.getView().update(this.contextData);
        }

        ages_3to6.view.mediator.A36RecommendationsPageMediator.prototype.handleRecommendationsReceived = function(recData)
        {
            this.recData = recData;
            this.displayNextDataSet();
        }

        ages_3to6.view.mediator.A36RecommendationsPageMediator.prototype.onRefreshRecs = function()
        {
            this.displayNextDataSet();
        }

        ages_3to6.view.mediator.A36RecommendationsPageMediator.prototype.onThemeIconSelected = function(event)
        {
            shared.view.component.Sounds.playTouch();
            this.previousProgramTileDefs = this.getView().getCurrentProgramTileDefs();
            
            this.sendNotification(AppConstants.DISPLAY_THEME_SELECTION, { user: this.facade.getCurrentUser() });
        }
              
        ages_3to6.view.mediator.A36RecommendationsPageMediator.prototype.getNextRec = function(positionX, positionY, weighting)
        {
              
             this.nextStartIndex = (this.nextStartIndex < this.recData.length) ? this.nextStartIndex : 0;
              
              var nextRecBrief = this.recData[this.nextStartIndex++];
              var programTileDef = null;
                            
              if (nextRecBrief)
              {
                var userData = this.contextData.userData;
                var tileFontColor = (userData && userData.theme) ? userData.theme.programTileFontColor : "#666666";
                programTileDef = 
                    new ages_3to6.view.component.A36ProgramTileDef(
                        nextRecBrief.id, 
                        nextRecBrief.type, 
                        (nextRecBrief.seriesTitle) ? nextRecBrief.seriesTitle : nextRecBrief.title, 
                        nextRecBrief.imageSrc, 
                        tileFontColor,
                        nextRecBrief.videoPlayerCtrlImageSrc, 
                        nextRecBrief.videoURI, 
                        positionX, 
                        positionY, 
                        weighting);
                if (nextRecBrief.parentProgram)
                    programTileDef.parentProgram = nextRecBrief.parentProgram;
              
              }
              
              return programTileDef;
        }
              
        ages_3to6.view.mediator.A36RecommendationsPageMediator.prototype.onSwipedTileDestroyed = function()
        {
              if (this._queuedRec)
              {
                var dataSet = new Array();
                dataSet.push(this._queuedRec);
                this.getView().refreshProgramTiles(dataSet);
                this._queuedRec = undefined;
              }
        }
              
        ages_3to6.view.mediator.A36RecommendationsPageMediator.prototype.onProgramTileSwipedOff = function(event)
        {
              var origX = event.args.originalX;
              var rejectedProgId = event.args.rejectedProgram;
              var weighting = event.args.tileWeighting;
              var rangeXLow, rangeXHigh;
              
              if (origX <= 10) {
              //left col
              rangeXLow = ages_3to6.view.mediator.A36RecommendationsPageMediator.LEFT_COL_X_SEED - ages_3to6.view.mediator.A36RecommendationsPageMediator.COLUMN_STD_DEVIATION;
              rangeXHigh = ages_3to6.view.mediator.A36RecommendationsPageMediator.LEFT_COL_X_SEED + ages_3to6.view.mediator.A36RecommendationsPageMediator.COLUMN_STD_DEVIATION;
              }
              else if ((origX > 10) && (origX <= 20)) {
              //middle col
              rangeXLow = ages_3to6.view.mediator.A36RecommendationsPageMediator.MIDDLE_COL_X_SEED - ages_3to6.view.mediator.A36RecommendationsPageMediator.COLUMN_STD_DEVIATION;
              rangeXHigh = ages_3to6.view.mediator.A36RecommendationsPageMediator.MIDDLE_COL_X_SEED + ages_3to6.view.mediator.A36RecommendationsPageMediator.COLUMN_STD_DEVIATION;
              }
              else {
              //right col
              rangeXLow = ages_3to6.view.mediator.A36RecommendationsPageMediator.RIGHT_COL_X_SEED - ages_3to6.view.mediator.A36RecommendationsPageMediator.COLUMN_STD_DEVIATION;
              rangeXHigh = ages_3to6.view.mediator.A36RecommendationsPageMediator.RIGHT_COL_X_SEED + ages_3to6.view.mediator.A36RecommendationsPageMediator.COLUMN_STD_DEVIATION;
              }
              
              var newX = randomFromInterval(rangeXLow, rangeXHigh);
              this._queuedRec = this.getNextRec(newX, ages_3to6.view.mediator.A36RecommendationsPageMediator.NEW_REC_Y_VAL, weighting);
              this.sendNotification(AppConstants.LOG_APP_MESSAGE, {eventCode: AppLoggingEventCodes.NEW_REC_GENERATED, eventData: 'rejected:' + rejectedProgId});
              
        }

        ages_3to6.view.mediator.A36RecommendationsPageMediator.prototype.onProgramTileSelected = function(event)
        {
            var selectedTile = event.args.selectedTile;
    
            //Load video playlist based on selected tile.
    
            if (selectedTile)
            {
                shared.view.component.Sounds.playTouch();
                var dataSet = new Array();
        
                console.log('user selected ' + selectedTile.videoURI);
                
                var userData = this.contextData.userData;
                var tileFontColor = (userData && userData.theme) ? userData.theme.programTileFontColor : "#666666";
        
                if (selectedTile.parentProgram) 
                {
                    //need to load other episodes of series into playlist.
                    var rcsProxy = this.facade.retrieveProxy(shared.model.RCSProxy.NAME);
                    rcsProxy.getEpisodesForSeries(
                        selectedTile.parentProgram,
                        function(episodeList) 
                        {
                            for (var i = 0; i < episodeList.length; i++)
                            {
                                var progBrief = episodeList[i];
                                var programTileDef = 
                                    new ages_3to6.view.component.A36ProgramTileDef(
                                        progBrief.id, 
                                        progBrief.type, 
                                        progBrief.title,
                                        progBrief.imageSrc, 
                                        tileFontColor,
                                        progBrief.videoPlayerCtrlImageSrc, 
                                        progBrief.videoURI, 
                                        0, 
                                        0, 
                                        ages_3to6.view.component.A36ProgramTileDef.WEIGHTING_SIZE_SMALL);
                                programTileDef.parentProgram = progBrief.parentProgram;
                                dataSet.push(programTileDef);
                            }

                            var vidPlayerMediator = ApplicationFacade.getInstance("PLAYSKOOL").retrieveMediator(shared.view.mediator.AdvancedVideoPlayerMediator.NAME);
                            if (vidPlayerMediator)
                            {
                                vidPlayerMediator.loadPlaylist(selectedTile.programTitle, dataSet);
                            }

                            ApplicationFacade.getInstance("PLAYSKOOL").sendNotification(AppConstants.SHOW_ADVANCED_VIDEO_PLAYER, {id: selectedTile.programId, title: selectedTile.programTitle, videoURI: selectedTile.videoURI});
                        },
                        function(error) 
                        {
                            console.log("couldn't get other episodes for parent series " + selectedTile.parentProgram + " error: " + error.message);

                            ApplicationFacade.getInstance("PLAYSKOOL").sendNotification(AppConstants.SHOW_ADVANCED_VIDEO_PLAYER, {id: selectedTile.programId, title: selectedTile.programTitle, videoURI: selectedTile.videoURI});
                        });
                }
                else 
                {
                    var selectedProgTileDef = 
                        new ages_3to6.view.component.A36ProgramTileDef(
                            selectedTile.programId, 
                            selectedTile.programType, 
                            selectedTile.programTitle, 
                            selectedTile.image.src, 
                            tileFontColor,
                            selectedTile.image.src, 
                            selectedTile.videoURI, 
                            0, 
                            0, 
                            ages_3to6.view.component.A36ProgramTileDef.WEIGHTING_SIZE_SMALL);
                    dataSet.push(selectedProgTileDef);

                    this.facade.retrieveMediator(shared.view.mediator.AdvancedVideoPlayerMediator.NAME).loadPlaylist(selectedTile.programTitle, dataSet);
                    this.sendNotification(AppConstants.SHOW_ADVANCED_VIDEO_PLAYER, {id: selectedTile.programId, title: selectedTile.programTitle, videoURI: selectedTile.videoURI});
                }
            }
        }
              
        ages_3to6.view.mediator.A36RecommendationsPageMediator.prototype.restorePreviousDataSet = function(previousProgramTileDefs)
        {
              var themeAlteredTileDefs = new Array();
              var userData = this.contextData.userData;
              var tileFontColor = (userData && userData.theme) ? userData.theme.programTileFontColor : "#666666";
              
              shared.view.component.Sounds.playThud();
              
              for (var i = 0; i < previousProgramTileDefs.length; i++)
              {
                previousProgramTileDefs[i].fontColor = tileFontColor;
              }
              this.getView().refreshProgramTiles(previousProgramTileDefs);
        }

        ages_3to6.view.mediator.A36RecommendationsPageMediator.prototype.displayNextDataSet = function()
        {
    
            var tileConfigSet = this.tileConfigSets[0];
    
            shared.view.component.Sounds.playThud();
    
            var dataSet = new Array();
            var currentIndex = this.nextStartIndex;
            
            var userData = this.contextData.userData;
            var tileFontColor = (userData && userData.theme) ? userData.theme.programTileFontColor : "#666666";

            for (var i = 0; (i < ages_3to6.view.mediator.A36RecommendationsPageMediator.DATA_SIZE) && (currentIndex < this.recData.length); i++, currentIndex++)
            {
                var programBrief = this.recData[currentIndex];
                if (programBrief)
                {
                    var tileConfig = tileConfigSet[i];
            
                    var positionX = (ages_3to6.view.mediator.A36RecommendationsPageMediator.RANDOMIZE_TILE_SETS) ? Math.floor((Math.random()*25)+1) : tileConfig.positionX;
                    var positionY = (ages_3to6.view.mediator.A36RecommendationsPageMediator.RANDOMIZE_TILE_SETS) ? 0 : tileConfig.positionY;
                    var weightingSize = tileConfig.weightingSize;
            
                    console.log ('ages_3to6.view.mediator.A36RecommendationsPageMediator.displayNextDataSet[i = ' + i + ']: positionX = ' + positionX + '; positionY = ' + positionY);
            
                    var programTileDef = 
                        new ages_3to6.view.component.A36ProgramTileDef(
                            programBrief.id, 
                            programBrief.type, 
                            (programBrief.seriesTitle) ? programBrief.seriesTitle : programBrief.title, 
                            programBrief.imageSrc,
                            tileFontColor, 
                            programBrief.videoPlayerCtrlImageSrc,
                            programBrief.videoURI, 
                            positionX, 
                            positionY, 
                            weightingSize);
                    if (programBrief.parentProgram) 
                    {
                        programTileDef.parentProgram = programBrief.parentProgram;
                    }
            
                    dataSet.push(programTileDef);
            
                }
            }
    
            this.nextStartIndex = (currentIndex < this.recData.length) ? currentIndex : 0;
    
            this.getView().refreshProgramTiles(dataSet);
    
        }


        /*  TileConfiguration class */

        function TileConfiguration(positionX, positionY, weightingSize)
        {
            this.positionX = positionX;
            this.positionY = positionY;
            this.weightingSize = weightingSize;
        }
        
    }
});

