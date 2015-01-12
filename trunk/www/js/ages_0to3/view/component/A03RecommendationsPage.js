jingo.declare(
{
    require: 
    [
        "ages_0to3.view.component.A03ProgramTileDef",
        "ages_0to3.view.component.A03ProgramTile",
        "shared.view.component.BasePage",
        "shared.view.component.Nameplate",
        "shared.view.component.Sounds"
    ],
    name: 'ages_0to3.view.component.A03RecommendationsPage',
    as: function()
    {

        ages_0to3.view.component.A03RecommendationsPage = function(canvas, nameplate)
        {
            console.log ('ages_0to3.view.component.A03RecommendationsPage(): [START]');
            shared.view.component.BasePage.apply(this, [canvas]);
              
            this.nameplate = nameplate;
            this.onLogoutClickedHandler = Relegate.create(this, this.onLogoutClicked, this);
    
            this.programTiles = new Object();
            this.numTiles = 0;
    
            this.filterFactor = 1.0;
            this.prevX = 0;
            this.prevY = 0;
    
            this.isWaitingForTileClear = false;
    
            console.log ('ages_0to3.view.component.A03RecommendationsPage(): [END]');
        }

        ages_0to3.view.component.A03RecommendationsPage.prototype = new shared.view.component.BasePage;
        ages_0to3.view.component.A03RecommendationsPage.prototype.parent = shared.view.component.BasePage.prototype;
        ages_0to3.view.component.A03RecommendationsPage.prototype.constructor = ages_0to3.view.component.A03RecommendationsPage;

        ages_0to3.view.component.A03RecommendationsPage.PROGRAM_TILE_SELECTED = "programTileSelected";
        ages_0to3.view.component.A03RecommendationsPage.PROGRAM_TILE_SWIPED_OFF = "programTileSwipedOff";
        ages_0to3.view.component.A03RecommendationsPage.SWIPED_TILE_DESTROYED = "swipedTileDestroyed";
        ages_0to3.view.component.A03RecommendationsPage.CLEANUP_FINISHED = "cleanupFinished";
        ages_0to3.view.component.A03RecommendationsPage.LOGOUT_CLICKED = "logoutClicked";
              
        ages_0to3.view.component.A03RecommendationsPage.LEFT_X = 9.5;
        ages_0to3.view.component.A03RecommendationsPage.RIGHT_X = 25;
        ages_0to3.view.component.A03RecommendationsPage.TOP_Y = 8.75;
        ages_0to3.view.component.A03RecommendationsPage.BOTTOM_Y = 19.75;
              
        ages_0to3.view.component.A03RecommendationsPage.SWIPE_SENSITIVITY = 4;
        ages_0to3.view.component.A03RecommendationsPage.SWIPE_EXIT_VELOCITY = 40;

        ages_0to3.view.component.A03RecommendationsPage.prototype.onLogoutClicked = function()
        {
            this.dispatchEvent(ages_0to3.view.component.A03RecommendationsPage.LOGOUT_CLICKED);
        }
              
        ages_0to3.view.component.A03RecommendationsPage.prototype.onBodySelected = function(body)
        {
            var programTile = this.programTiles[body.GetUserData()];
            if (programTile)
            {
                this.dispatchEvent(ages_0to3.view.component.A03RecommendationsPage.PROGRAM_TILE_SELECTED, { selectedTile : programTile });
            }
        }
              
        ages_0to3.view.component.A03RecommendationsPage.prototype.onTouchStarted = function(mouseX, mouseY)
        {
              this.parent.onTouchStarted.call(this, mouseX, mouseY);
              this._isPullingBody = false;
              this._previousMouseX = mouseX;
              this._previousMouseY = mouseY;
              
              if (this._selectedBody)
              {
                this._selectedBodyOrigPos = this._selectedBody.GetPosition();
              }
        }
              
        ages_0to3.view.component.A03RecommendationsPage.prototype._isProgramTileBody = function(body)
        {
              return (this._getProgramTileForBody(body) != null);
        }
              
        ages_0to3.view.component.A03RecommendationsPage.prototype._getProgramTileForBody = function(body)
        {
              return this.programTiles[body.GetUserData()];
        }
              
        ages_0to3.view.component.A03RecommendationsPage.prototype.onTouchMoved = function(mouseX, mouseY)
        {
              this.parent.onTouchMoved.call(this, mouseX, mouseY);
              
              if (!this._isPullingBody)
              {
                if (this._isProgramTileBody(this._selectedBody))
                {
                    var programTile = this._getProgramTileForBody(this._selectedBody);
                    if (programTile)
                    {
                        this._isPullingBody = true;
                    }
                }
              }
              
              if (this._isPullingBody)
              {
                var deltaX = mouseX - this._previousMouseX;
                var deltaY = mouseY - this._previousMouseY;
        
                this._slideOffRight = ((deltaX > 0) && (Math.abs(deltaX) >= ages_0to3.view.component.A03RecommendationsPage.SWIPE_SENSITIVITY));
                this._slideOffLeft = ((deltaX < 0) && (Math.abs(deltaX) >= ages_0to3.view.component.A03RecommendationsPage.SWIPE_SENSITIVITY));
                this._slideOffUp = ((deltaY < 0) && (Math.abs(deltaY) >= ages_0to3.view.component.A03RecommendationsPage.SWIPE_SENSITIVITY));
                this._slideOffDown = ((deltaY > 0) && (Math.abs(deltaY) >= ages_0to3.view.component.A03RecommendationsPage.SWIPE_SENSITIVITY));
              
              }
              
        }

        ages_0to3.view.component.A03RecommendationsPage.prototype.onTouchEnded = function() 
        {
              if (this._slideOffLeft)
              {
                shared.view.component.Sounds.playSwipe();
                this._selectedBody.SetAwake(true);
                this._selectedBody.SetLinearVelocity(new b2Vec2(-ages_0to3.view.component.A03RecommendationsPage.SWIPE_EXIT_VELOCITY, 0));
                this.dispatchEvent(ages_0to3.view.component.A03RecommendationsPage.PROGRAM_TILE_SWIPED_OFF, { replaceX: this._selectedBodyOrigPos.x, replaceY: this._selectedBodyOrigPos.y, rejectedProgram: this._selectedBody.GetUserData() });
              
              }
              else if (this._slideOffRight)
              {
                shared.view.component.Sounds.playSwipe();
                this._selectedBody.SetAwake(true);
                this._selectedBody.SetLinearVelocity(new b2Vec2(ages_0to3.view.component.A03RecommendationsPage.SWIPE_EXIT_VELOCITY, 0));
                this.dispatchEvent(ages_0to3.view.component.A03RecommendationsPage.PROGRAM_TILE_SWIPED_OFF, { replaceX: this._selectedBodyOrigPos.x, replaceY: this._selectedBodyOrigPos.y, rejectedProgram: this._selectedBody.GetUserData() });
              
              }
              else if (this._slideOffUp)
              {
                shared.view.component.Sounds.playSwipe();
                this._selectedBody.SetAwake(true);
                this._selectedBody.SetLinearVelocity(new b2Vec2(0, -ages_0to3.view.component.A03RecommendationsPage.SWIPE_EXIT_VELOCITY));
                this.dispatchEvent(ages_0to3.view.component.A03RecommendationsPage.PROGRAM_TILE_SWIPED_OFF, { replaceX: this._selectedBodyOrigPos.x, replaceY: this._selectedBodyOrigPos.y, rejectedProgram: this._selectedBody.GetUserData() });
              
              }
              else if (this._slideOffDown)
              {
                shared.view.component.Sounds.playSwipe();
                this._selectedBody.SetAwake(true);
                this._selectedBody.SetLinearVelocity(new b2Vec2(0, ages_0to3.view.component.A03RecommendationsPage.SWIPE_EXIT_VELOCITY));
                this.dispatchEvent(ages_0to3.view.component.A03RecommendationsPage.PROGRAM_TILE_SWIPED_OFF, { replaceX: this._selectedBodyOrigPos.x, replaceY: this._selectedBodyOrigPos.y, rejectedProgram: this._selectedBody.GetUserData() });
              }
              
              this._previousMouseX = 0;
              this._previousMouseY = 0;
              this._slideOffLeft = undefined;
              this._slideOffRight = undefined;
              this._selectedBodyOrigPos = undefined;
              
              this.parent.onTouchEnded.call(this);
        }

        ages_0to3.view.component.A03RecommendationsPage.prototype._doUpdate = function()
        {
            var isTilePresent = false;
    
            // Update tile set
            for (var key in this.programTiles) 
            {
                var programTile = this.programTiles[key];
                if (programTile) 
                {
                    var pos = programTile.getBodyPosition();
                    if ((pos == null) || pos.x < -10 || pos.x > 40 || pos.y < -10 || pos.y > 40)
                    {
                        // Destroy off-screen program tile
                        console.log("Destroying programTile: programId = " + programTile.programId);
                        this.programTiles[key] = null;
                        this.numTiles--;
                        programTile.destroy();
                        this.dispatchEvent(ages_0to3.view.component.A03RecommendationsPage.SWIPED_TILE_DESTROYED);
                    }
                    else
                    {
                        this.context.save();
                        isTilePresent = true;
                        programTile.update(this.context);
                        this.context.restore();
                    }
                }
            }
    
            this.context.save();
            this.context.restore();
        }

        ages_0to3.view.component.A03RecommendationsPage.prototype._doPageEnter = function(data)
        {
            console.log("ages_0to3.view.component.A03RecommendationsPage._doPageEnter");
            this.nameplate.showLogoutDrawer(true);
            this.nameplate.addEventListener(shared.view.component.Nameplate.LOGOUT_CLICKED, this.onLogoutClickedHandler);
    
            if (data.refreshPage)
            {
                var userData = data.userData;
                var userDisplayName = (userData && userData.displayName) ? userData.displayName.toUpperCase() : "THERE";
                this.nameplate.setTitle('HELLO ' + userDisplayName + '!', (userData.theme) ? userData.theme.nameplateFontColor : "#89BDBA");
                this.nameplate.setIcon((userData.theme) ? userData.theme.nameplateIconImageSrc : 'images/themes/ages_0to3/default/nameplateIcon.png');
                
                if (userData.theme && userData.theme.backgroundImageSrc)
                {
                    this.setBackgroundImage(userData.theme.backgroundImageSrc);
                }
            }
        }

        ages_0to3.view.component.A03RecommendationsPage.prototype._doPageExit = function()
        {
            console.log("ages_0to3.view.component.A03RecommendationsPage._doPageExit");
            
            this.nameplate.removeEventListener(shared.view.component.Nameplate.LOGOUT_CLICKED, this.onLogoutClickedHandler);
                            
            // Destroy tiles
            //  TODO:  (WK) Make this process more efficient.
            for (var b = this.box2dWorld.GetBodyList(); b; b = b.GetNext())
            {
                var tile = this.programTiles[b.GetUserData()];
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

            this.dispatchEvent(ages_0to3.view.component.A03RecommendationsPage.CLEANUP_FINISHED);
        }
              
        ages_0to3.view.component.A03RecommendationsPage.prototype.refreshProgramTiles = function(programTileDefList)
        {
            console.log("ages_0to3.view.component.A03RecommendationsPage.prototype.refreshProgramTiles: [START]");
    
            if (DEBUG_CHECK_BODY_COUNT_ENABLED)
            {
                var bodyCount = 0;
                for (var b = this.box2dWorld.GetBodyList(); b; b = b.GetNext())
                {
                    bodyCount++;
                    console.log("ages_0to3.view.component.A03RecommendationsPage.prototype.refreshProgramTiles: [body userdata = " + b.GetUserData() + "]");
                }
                console.log("ages_0to3.view.component.A03RecommendationsPage.prototype.refreshProgramTiles: [bodyCount = " + bodyCount + "]");
            }
    
            if (programTileDefList)
            {
                for (var i=0; i < programTileDefList.length; i++)
                {
                    var programTileDef/*ages_0to3.view.component.A03ProgramTileDef*/ = programTileDefList[i];
                    var tile = new ages_0to3.view.component.A03ProgramTile(this.box2dWorld, programTileDef);
                    var body = tile.create();
                    this.programTiles[body.GetUserData()] = tile;
                    this.numTiles++;
                }
              
            }
            console.log("ages_0to3.view.component.A03RecommendationsPage.prototype.refreshProgramTiles: [END]");
        }
        
    }
});