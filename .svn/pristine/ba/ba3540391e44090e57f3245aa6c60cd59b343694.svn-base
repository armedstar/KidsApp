jingo.declare(
{
    require: 
    [
        "ages_3to6.view.component.A36ThemeTileDef",
        "ages_3to6.view.component.A36ThemeTile",
        "shared.view.component.BasePage",
        "shared.view.component.Nameplate"
    ],
    name: 'ages_3to6.view.component.A36ThemeSelectionPage',
    as: function()
    {

        ages_3to6.view.component.A36ThemeSelectionPage = function(canvas, nameplate)
        {
            console.log ('ages_3to6.view.component.A36ThemeSelectionPage(): [START]');
            shared.view.component.BasePage.apply(this, [canvas]);
              
            this.nameplate = nameplate;
            
            this.onBackClickedHandler = Relegate.create(this, this.onBackClicked, this);
    
            this.themeTiles = new Object();
            this.numTiles = 0;
    
            this.filterFactor = 1.0;
            this.prevX = 0;
            this.prevY = 0;
    
            this.isWaitingForTileClear = false;
    
            console.log ('ages_3to6.view.component.A36ThemeSelectionPage(): [END]');
        }

        ages_3to6.view.component.A36ThemeSelectionPage.prototype = new shared.view.component.BasePage;
        ages_3to6.view.component.A36ThemeSelectionPage.prototype.parent = shared.view.component.BasePage.prototype;
        ages_3to6.view.component.A36ThemeSelectionPage.prototype.constructor = ages_3to6.view.component.A36ThemeSelectionPage;

        ages_3to6.view.component.A36ThemeSelectionPage.THEME_TILE_SELECTED = "themeTileSelected";
        ages_3to6.view.component.A36ThemeSelectionPage.CLEANUP_FINISHED = "cleanupFinished";
        ages_3to6.view.component.A36ThemeSelectionPage.BACK_CLICKED = "backClicked";
              
        ages_3to6.view.component.A36ThemeSelectionPage.LEFT_X = 9.5;
        ages_3to6.view.component.A36ThemeSelectionPage.RIGHT_X = 25;
        ages_3to6.view.component.A36ThemeSelectionPage.TOP_Y = 8.75;
        ages_3to6.view.component.A36ThemeSelectionPage.BOTTOM_Y = 19.75;

        ages_3to6.view.component.A36ThemeSelectionPage.prototype.onBackClicked = function()
        {
            this.dispatchEvent(ages_3to6.view.component.A36ThemeSelectionPage.BACK_CLICKED);
        }
              
        ages_3to6.view.component.A36ThemeSelectionPage.prototype.onBodySelected = function(body)
        {
            var themeTile = this.themeTiles[body.GetUserData()];
            if (themeTile)
            {
                this.dispatchEvent(ages_3to6.view.component.A36ThemeSelectionPage.THEME_TILE_SELECTED, { selectedTile : themeTile });
            }
        }

        ages_3to6.view.component.A36ThemeSelectionPage.prototype._doUpdate = function()
        {
            var isTilePresent = false;
    
            // Update tile set
            for (var key in this.themeTiles) 
            {
                var themeTile = this.themeTiles[key];
                if (themeTile) 
                {
                    this.context.save();
                    isTilePresent = true;
                    themeTile.update(this.context);
                    this.context.restore();
                }
            }
    
            this.context.save();
            this.context.restore();
        }

        ages_3to6.view.component.A36ThemeSelectionPage.prototype._doPageEnter = function(data)
        {
            console.log("ages_3to6.view.component.A36ThemeSelectionPage._doPageEnter");
            
            this.nameplate.showLogoutDrawer(true);
            this.nameplate.addEventListener(shared.view.component.Nameplate.LOGOUT_CLICKED, this.onBackClickedHandler);
    
            if (data.refreshPage)
            {
                var userData = data.userData;
                var userDisplayName = (userData && userData.displayName) ? userData.displayName.toUpperCase() : "THERE";
                this.nameplate.setTitle('PICK A THEME!', '#666666');
                this.nameplate.setIcon('images/pages/ages_3to6/themeSelection/nameplateIcon.png');
                
                this.setBackgroundImage("images/pages/shared/background.png");
            }
        }

        ages_3to6.view.component.A36ThemeSelectionPage.prototype._doPageExit = function()
        {
            console.log("ages_3to6.view.component.A36ThemeSelectionPage._doPageExit");
            
            this.nameplate.removeEventListener(shared.view.component.Nameplate.LOGOUT_CLICKED, this.onBackClickedHandler);
                            
            // Destroy tiles
            //  TODO:  (WK) Make this process more efficient.
            for (var b = this.box2dWorld.GetBodyList(); b; b = b.GetNext())
            {
                var tile = this.themeTiles[b.GetUserData()];
                if (tile)
                {
                    tile.destroy();
                }
            }
              
            // Destroy remaining bodies
            //  TODO:  (WK) Make this process more efficient to remove need for secondary loop.
            for (var b = this.box2dWorld.GetBodyList(); b; b = b.GetNext())
            {
                this.box2dWorld.DestroyBody(b);
            }
              
            this.dispatchEvent(ages_3to6.view.component.A36ThemeSelectionPage.CLEANUP_FINISHED);
        }
              
        ages_3to6.view.component.A36ThemeSelectionPage.prototype.refreshThemeTiles = function(themeTileDefList)
        {
            console.log("ages_3to6.view.component.A36ThemeSelectionPage.prototype.refreshThemeTiles: [START]");
    
            if (DEBUG_CHECK_BODY_COUNT_ENABLED)
            {
                var bodyCount = 0;
                for (var b = this.box2dWorld.GetBodyList(); b; b = b.GetNext())
                {
                    bodyCount++;
                    console.log("ages_3to6.view.component.A36ThemeSelectionPage.prototype.refreshThemeTiles: [body userdata = " + b.GetUserData() + "]");
                }
                console.log("ages_3to6.view.component.A36ThemeSelectionPage.prototype.refreshThemeTiles: [bodyCount = " + bodyCount + "]");
            }
    
    
            if (themeTileDefList)
            {
                for (var i=0; i < themeTileDefList.length; i++)
                {
                    var themeTileDef/*ages_3to6.view.component.A36ThemeTileDef*/ = themeTileDefList[i];
                    var tile = new ages_3to6.view.component.A36ThemeTile(this.box2dWorld, themeTileDef);
                    var body = tile.create();
                    this.themeTiles[body.GetUserData()] = tile;
                    this.numTiles++;
                }
              
            }
            console.log("ages_3to6.view.component.A36ThemeSelectionPage.prototype.refreshThemeTiles: [END]");
        }
        
    }
});