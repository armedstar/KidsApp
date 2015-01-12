jingo.declare(
{
    require: 
    [
        "shared.view.mediator.BasePageMediator",
        "ages_7to9.view.component.A79ProgramTile",
        "ages_7to9.view.component.A79ProgramTileDef",
        "shared.view.component.Sounds",
        "shared.model.RecommendationsProxy",
        "shared.model.RCSProxy",
        "ages_7to9.view.component.A79RecommendationsPage",
        "shared.view.mediator.AdvancedVideoPlayerMediator",
        "shared.view.component.Canvas"
    ],
    name: 'ages_7to9.view.mediator.A79RecommendationsPageMediator',
    as: function() 
    {
        ages_7to9.view.mediator.A79RecommendationsPageMediator = function(viewComponent)
        {
            shared.view.mediator.BasePageMediator.apply(this, [ages_7to9.view.mediator.A79RecommendationsPageMediator.NAME, viewComponent]);
    
            this.initTileConfigurations();
    
            if (viewComponent)
            {
                this.getView().addEventListener(ages_7to9.view.component.A79RecommendationsPage.PROGRAM_TILE_SELECTED, Relegate.create(this, this.onProgramTileSelected, this));
                this.getView().addEventListener(ages_7to9.view.component.A79RecommendationsPage.CLEANUP_FINISHED, Relegate.create(this, this.onCleanupFinished, this));
                this.getView().addEventListener(ages_7to9.view.component.A79RecommendationsPage.LOGOUT_CLICKED, Relegate.create(this, this.onLogoutClicked, this));
            }    
        }

        ages_7to9.view.mediator.A79RecommendationsPageMediator.prototype = new shared.view.mediator.BasePageMediator;
        ages_7to9.view.mediator.A79RecommendationsPageMediator.prototype.parent = shared.view.mediator.BasePageMediator.prototype;
        ages_7to9.view.mediator.A79RecommendationsPageMediator.prototype.constructor = ages_7to9.view.mediator.A79RecommendationsPageMediator;

        ages_7to9.view.mediator.A79RecommendationsPageMediator.NAME = "A79RecommendationsPageMediator";
        
        ages_7to9.view.mediator.A79RecommendationsPageMediator.RANDOMIZE_TILE_SETS = false;
        ages_7to9.view.mediator.A79RecommendationsPageMediator.DATA_SIZE = 30;
        ages_7to9.view.mediator.A79RecommendationsPageMediator.CONTEXT_ID = "orderedApp";
        
        ages_7to9.view.mediator.A79RecommendationsPageMediator.TILE_LEFT_MARGIN = ((ages_7to9.view.component.A79ProgramTile.BACKGROUND_IMAGE_WIDTH / 2.0) + 20.0) / shared.view.component.Canvas.SCALE;
        ages_7to9.view.mediator.A79RecommendationsPageMediator.TILE_TOP_MARGIN = ((ages_7to9.view.component.A79ProgramTile.BACKGROUND_IMAGE_HEIGHT / 2.0) + 90.0) / shared.view.component.Canvas.SCALE;
        ages_7to9.view.mediator.A79RecommendationsPageMediator.TILE_HORIZONTAL_SPACING = 10;
        ages_7to9.view.mediator.A79RecommendationsPageMediator.TILE_HORIZONTAL_OFFSET = (ages_7to9.view.component.A79ProgramTile.BACKGROUND_IMAGE_WIDTH + ages_7to9.view.mediator.A79RecommendationsPageMediator.TILE_HORIZONTAL_SPACING) / shared.view.component.Canvas.SCALE;
        ages_7to9.view.mediator.A79RecommendationsPageMediator.TILE_VERTICAL_SPACING = 10;
        ages_7to9.view.mediator.A79RecommendationsPageMediator.TILE_VERTICAL_OFFSET = (ages_7to9.view.component.A79ProgramTile.BACKGROUND_IMAGE_HEIGHT + ages_7to9.view.mediator.A79RecommendationsPageMediator.TILE_VERTICAL_SPACING) / shared.view.component.Canvas.SCALE;

        ages_7to9.view.mediator.A79RecommendationsPageMediator.prototype.tileConfigSets = new Array();
        ages_7to9.view.mediator.A79RecommendationsPageMediator.prototype.recData = new Array();

        ages_7to9.view.mediator.A79RecommendationsPageMediator.prototype.getName = function()
        {
            return ages_7to9.view.mediator.A79RecommendationsPageMediator.NAME;
        }

        ages_7to9.view.mediator.A79RecommendationsPageMediator.prototype.initTileConfigurations = function()
        {
            var tileConfigSet = new Array();
    
            // row 1
            tileConfigSet.push(this._generateTileConfiguration(0, 0));
            tileConfigSet.push(this._generateTileConfiguration(0, 1));
            tileConfigSet.push(this._generateTileConfiguration(0, 2));
            tileConfigSet.push(this._generateTileConfiguration(0, 3));
            tileConfigSet.push(this._generateTileConfiguration(0, 4));
            tileConfigSet.push(this._generateTileConfiguration(0, 5));
            //tileConfigSet.push(this._generateTileConfiguration(0, 6));
            //tileConfigSet.push(this._generateTileConfiguration(0, 7));
            //tileConfigSet.push(this._generateTileConfiguration(0, 8));
            //tileConfigSet.push(this._generateTileConfiguration(0, 9));
    
            // row 2
            tileConfigSet.push(this._generateTileConfiguration(1, 0));
            tileConfigSet.push(this._generateTileConfiguration(1, 1));
            tileConfigSet.push(this._generateTileConfiguration(1, 2));
            tileConfigSet.push(this._generateTileConfiguration(1, 3));
            tileConfigSet.push(this._generateTileConfiguration(1, 4));
            tileConfigSet.push(this._generateTileConfiguration(1, 5));
            //tileConfigSet.push(this._generateTileConfiguration(1, 6));
            //tileConfigSet.push(this._generateTileConfiguration(1, 7));
            //tileConfigSet.push(this._generateTileConfiguration(1, 8));
            //tileConfigSet.push(this._generateTileConfiguration(1, 9));
            
            // row 3
            tileConfigSet.push(this._generateTileConfiguration(2, 0));
            tileConfigSet.push(this._generateTileConfiguration(2, 1));
            tileConfigSet.push(this._generateTileConfiguration(2, 2));
            tileConfigSet.push(this._generateTileConfiguration(2, 3));
            tileConfigSet.push(this._generateTileConfiguration(2, 4));
            tileConfigSet.push(this._generateTileConfiguration(2, 5));
            //tileConfigSet.push(this._generateTileConfiguration(2, 6));
            //tileConfigSet.push(this._generateTileConfiguration(2, 7));
            //tileConfigSet.push(this._generateTileConfiguration(2, 8));
            //tileConfigSet.push(this._generateTileConfiguration(2, 9));
    
            this.tileConfigSets.push(tileConfigSet);
        }
        
        ages_7to9.view.mediator.A79RecommendationsPageMediator.prototype._generateTileConfiguration = function(rowNum, columnNum)
        {
            var tileX = 
                ages_7to9.view.mediator.A79RecommendationsPageMediator.TILE_LEFT_MARGIN + 
                (columnNum * ages_7to9.view.mediator.A79RecommendationsPageMediator.TILE_HORIZONTAL_OFFSET);
            var tileY = 
                ages_7to9.view.mediator.A79RecommendationsPageMediator.TILE_TOP_MARGIN + 
                (rowNum * ages_7to9.view.mediator.A79RecommendationsPageMediator.TILE_VERTICAL_OFFSET);
            return new TileConfiguration(tileX, tileY);
        }
              
        ages_7to9.view.mediator.A79RecommendationsPageMediator.prototype.onLogoutClicked = function()
        {
              this.sendNotification(AppConstants.LOGOUT_USER, {returnToLoginScreen: true});
        }

        ages_7to9.view.mediator.A79RecommendationsPageMediator.prototype.onCleanupFinished = function()
        {
            console.log("ages_7to9.view.mediator.A79RecommendationsPageMediator.CLEANUP FINISHED");
            this.sendNotification(AppConstants.PAGE_CLEANUP_FINISHED, {});
        }

 
        ages_7to9.view.mediator.A79RecommendationsPageMediator.prototype.showPage = function(data)
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
                        ages_7to9.view.mediator.A79RecommendationsPageMediator.CONTEXT_ID,
                        Relegate.create(this, this.handleRecommendationsReceived, this), 
                        function() {});
                }
            }
    
            this.getView().update(this.contextData);
        }

        ages_7to9.view.mediator.A79RecommendationsPageMediator.prototype.handleRecommendationsReceived = function(recData)
        {
            this.recData = recData;
    
            var tileConfigSet = this.tileConfigSets[0];
            
            var userData = this.contextData.userData;
            var tileFontColor = (userData && userData.theme) ? userData.theme.programTileFontColor : "#37A9CF";
    
            var dataSet = new Array();
            var currentIndex = 0;
            for (var i = 0; 
                (i < ages_7to9.view.mediator.A79RecommendationsPageMediator.DATA_SIZE) && (currentIndex < this.recData.length) && (i < tileConfigSet.length); 
                i++, currentIndex++)
            {
                var programBrief = this.recData[currentIndex];
                if (programBrief)
                {
                    var tileConfig = tileConfigSet[i];
            
                    var positionX = tileConfig.positionX;
                    var positionY = tileConfig.positionY;
            
                    console.log ('ages_7to9.view.mediator.A79RecommendationsPageMediator.displayNextDataSet[i = ' + i + ']: positionX = ' + positionX + '; positionY = ' + positionY);
            
                    var programTileDef = 
                        new ages_7to9.view.component.A79ProgramTileDef(
                            programBrief.id, 
                            programBrief.type, 
                            (programBrief.seriesTitle) ? programBrief.seriesTitle : programBrief.title, 
                            programBrief.imageSrc, 
                            tileFontColor,
                            programBrief.videoPlayerCtrlImageSrc, 
                            programBrief.videoURI, 
                            positionX, 
                            positionY);
                    if (programBrief.parentProgram) {
                        programTileDef.parentProgram = programBrief.parentProgram;
                    }
            
                    dataSet.push(programTileDef);
                }
            }
    
            this.getView().refreshProgramTiles(dataSet);
        }

        ages_7to9.view.mediator.A79RecommendationsPageMediator.prototype.onProgramTileSelected = function(event)
        {
            var selectedTile = event.args.selectedTile;
    
            //Load video playlist based on selected tile.
    
            if (selectedTile)
            {
                shared.view.component.Sounds.playTouch();
                var dataSet = new Array();
        
                console.log('user selected ' + selectedTile.videoURI);
                
                var userData = this.contextData.userData;
                var tileFontColor = (userData && userData.theme) ? userData.theme.programTileFontColor : "#37A9CF";
        
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
                                    new ages_7to9.view.component.A79ProgramTileDef(
                                        progBrief.id, 
                                        progBrief.type, 
                                        progBrief.title,
                                        progBrief.imageSrc, 
                                        tileFontColor,
                                        progBrief.videoPlayerCtrlImageSrc, 
                                        progBrief.videoURI);
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
                        new ages_7to9.view.component.A79ProgramTileDef(
                            selectedTile.programId, 
                            selectedTile.programType, 
                            selectedTile.programTitle, 
                            selectedTile.image.src, 
                            tileFontColor,
                            selectedTile.image.src, 
                            selectedTile.videoURI);
                    dataSet.push(selectedProgTileDef);

                    this.facade.retrieveMediator(shared.view.mediator.AdvancedVideoPlayerMediator.NAME).loadPlaylist(selectedTile.programTitle, dataSet);
                    this.sendNotification(AppConstants.SHOW_ADVANCED_VIDEO_PLAYER, {id: selectedTile.programId, title: selectedTile.programTitle, videoURI: selectedTile.videoURI});
                }
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

