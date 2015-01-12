jingo.declare(
{
    require: 
    [
        "shared.view.mediator.BasePageMediator",
        "ages_3to6.view.component.A36ThemeTileDef",
        "shared.view.component.Sounds",
        "shared.model.ThemeProxy",
        "ages_3to6.view.component.A36ThemeSelectionPage",
        "shared.view.mediator.SimpleVideoPlayerMediator"
    ],
    name: 'ages_3to6.view.mediator.A36ThemeSelectionPageMediator',
    as: function() 
    {
    
        ages_3to6.view.mediator.A36ThemeSelectionPageMediator = function(viewComponent)
        {
            shared.view.mediator.BasePageMediator.apply(this, [ages_3to6.view.mediator.A36ThemeSelectionPageMediator.NAME, viewComponent]);
    
            this.initTileConfigurations();
    
            if (this.getView())
            {
                this.getView().addEventListener(ages_3to6.view.component.A36ThemeSelectionPage.THEME_TILE_SELECTED, Relegate.create(this, this.onThemeTileSelected, this));
                this.getView().addEventListener(ages_3to6.view.component.A36ThemeSelectionPage.CLEANUP_FINISHED, Relegate.create(this, this.onCleanupFinished, this));
                this.getView().addEventListener(ages_3to6.view.component.A36ThemeSelectionPage.BACK_CLICKED, Relegate.create(this, this.onBackClicked, this));
            }
        }

        ages_3to6.view.mediator.A36ThemeSelectionPageMediator.prototype = new shared.view.mediator.BasePageMediator;
        ages_3to6.view.mediator.A36ThemeSelectionPageMediator.prototype.parent = shared.view.mediator.BasePageMediator.prototype;
        ages_3to6.view.mediator.A36ThemeSelectionPageMediator.prototype.constructor = ages_3to6.view.mediator.A36ThemeSelectionPageMediator;
        
        ages_3to6.view.mediator.A36ThemeSelectionPageMediator.NAME = "ages_3to6.view.mediator.A36ThemeSelectionPageMediator";
        
        ages_3to6.view.mediator.A36ThemeSelectionPageMediator.DATA_SIZE = 4;

        ages_3to6.view.mediator.A36ThemeSelectionPageMediator.prototype.tileConfigSets = new Array();
        ages_3to6.view.mediator.A36ThemeSelectionPageMediator.prototype.themeData = new Array();
        
        ages_3to6.view.mediator.A36ThemeSelectionPageMediator.prototype.getName = function()
        {
            return ages_3to6.view.mediator.A36ThemeSelectionPageMediator.NAME;
        }

        ages_3to6.view.mediator.A36ThemeSelectionPageMediator.prototype.initTileConfigurations = function()
        {
            var tileConfigSet = new Array();
            tileConfigSet.push(new TileConfiguration(ages_3to6.view.component.A36ThemeSelectionPage.LEFT_X, ages_3to6.view.component.A36ThemeSelectionPage.TOP_Y));
            tileConfigSet.push(new TileConfiguration(ages_3to6.view.component.A36ThemeSelectionPage.RIGHT_X, ages_3to6.view.component.A36ThemeSelectionPage.TOP_Y));
            tileConfigSet.push(new TileConfiguration(ages_3to6.view.component.A36ThemeSelectionPage.LEFT_X, ages_3to6.view.component.A36ThemeSelectionPage.BOTTOM_Y));
            tileConfigSet.push(new TileConfiguration(ages_3to6.view.component.A36ThemeSelectionPage.RIGHT_X, ages_3to6.view.component.A36ThemeSelectionPage.BOTTOM_Y));
    
            this.tileConfigSets.push(tileConfigSet);
        }
              
        ages_3to6.view.mediator.A36ThemeSelectionPageMediator.prototype.onBackClicked = function()
        {
            this.sendNotification(AppConstants.DISPLAY_RECOMMENDATIONS, { user: this.facade.getCurrentUser(), refreshPage: true });
        }

        ages_3to6.view.mediator.A36ThemeSelectionPageMediator.prototype.onCleanupFinished = function()
        {
            console.log("ages_3to6.view.mediator.A36ThemeSelectionPageMediator.CLEANUP FINISHED");
            this.sendNotification(AppConstants.PAGE_CLEANUP_FINISHED, {});
        }
 
        ages_3to6.view.mediator.A36ThemeSelectionPageMediator.prototype.showPage = function(data)
        {
            this.contextData = data;
    
            this.getView().onPageEnter(this.contextData);
    
            if (data.refreshPage)
            {
                var themeProxy = this.facade.retrieveProxy(shared.model.ThemeProxy.NAME);
                if (themeProxy)
                {
                    themeProxy.getSelectableThemes(
                        Relegate.create(this, this.handleSelectableThemesReceived, this), 
                        function() {});
                }
            }
    
            this.getView().update(this.contextData);
        }

        ages_3to6.view.mediator.A36ThemeSelectionPageMediator.prototype.handleSelectableThemesReceived = function(themeData)
        {
            this.themeData = themeData;
            this._currentThemeIndex = 0;
    
            this.displayNextDataSet();
        }

        ages_3to6.view.mediator.A36ThemeSelectionPageMediator.prototype.onThemeTileSelected = function(event)
        {
            var selectedTile = event.args.selectedTile;
    
            if (selectedTile)
            {
                shared.view.component.Sounds.playTouch();
        
                console.log('user selected ' + selectedTile.themeId);
                
                var currentUser = this.facade.getCurrentUser();
                
                var themeProxy = this.facade.retrieveProxy(shared.model.ThemeProxy.NAME);
                themeProxy.setUserTheme(currentUser, selectedTile.themeId);
                
                this.sendNotification(AppConstants.LOG_APP_MESSAGE, { eventCode: AppLoggingEventCodes.THEME_SELECTED, eventData: 'selected:' + selectedTile.themeId });
                this.sendNotification(AppConstants.DISPLAY_RECOMMENDATIONS, { user: currentUser, refreshPage: true });
            }
        }

        ages_3to6.view.mediator.A36ThemeSelectionPageMediator.prototype.displayNextDataSet = function()
        {
            var tileConfigSet = this.tileConfigSets[0];
    
            var dataSet = new Array();
            
            for (var i = 0; (i < ages_3to6.view.mediator.A36ThemeSelectionPageMediator.DATA_SIZE) && (this._currentThemeIndex < this.themeData.length); i++, this._currentThemeIndex++)
            {
                var theme = this.themeData[this._currentThemeIndex];
                if (theme)
                {
                    var tileConfig = tileConfigSet[i];
            
                    var positionX = tileConfig.positionX;
                    var positionY = tileConfig.positionY;
            
                    console.log ('ages_3to6.view.mediator.A36ThemeSelectionPageMediator.displayNextDataSet[i = ' + i + ']: positionX = ' + positionX + '; positionY = ' + positionY);
            
                    var themeTileDef = new ages_3to6.view.component.A36ThemeTileDef(theme.id, theme.selectionIconImageSrc, positionX, positionY);
            
                    dataSet.push(themeTileDef);
                }
            }
    
            this.getView().refreshThemeTiles(dataSet);
        }


        /*  TileConfiguration class */

        function TileConfiguration(positionX, positionY)
        {
            this.positionX = positionX;
            this.positionY = positionY;
        }
        
    }
});

