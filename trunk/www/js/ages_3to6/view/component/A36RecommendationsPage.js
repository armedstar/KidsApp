jingo.declare(
{
    require: 
    [
        "ages_3to6.view.component.A36ProgramTileDef",
        "ages_3to6.view.component.A36ProgramTile",
        "shared.view.component.ThemePicker",
        "shared.view.component.Nameplate",
        "shared.view.component.Sounds",
        "shared.view.component.BasePage"
    ],
    name: 'ages_3to6.view.component.A36RecommendationsPage',
    as: function() 
    {

        ages_3to6.view.component.A36RecommendationsPage = function(canvas, nameplate, themePicker)
        {
            console.log ('ages_3to6.view.component.A36RecommendationsPage(): [START]');
            shared.view.component.BasePage.apply(this, [canvas]);
    
            this.nameplate = nameplate;
              this.themePicker = themePicker;
            this.onLogoutClickedHandler = Relegate.create(this, this.onLogoutClicked, this);
              this.onThemePickerClickedHandler = Relegate.create(this, this.onThemePickerClicked, this);
    
            this.programTiles = new Object();
            this.numTiles = 0;
    
            this.filterFactor = 1.0;
            this.prevX = 0;
            this.prevY = 0;
    
            this.isWaitingForTileClear = false;
    
            console.log ('ages_3to6.view.component.A36RecommendationsPage(): [END]');
        }

        ages_3to6.view.component.A36RecommendationsPage.prototype = new shared.view.component.BasePage;
        ages_3to6.view.component.A36RecommendationsPage.prototype.parent = shared.view.component.BasePage.prototype;
        ages_3to6.view.component.A36RecommendationsPage.prototype.constructor = ages_3to6.view.component.A36RecommendationsPage;

        ages_3to6.view.component.A36RecommendationsPage.REFRESH_RECS = "refreshRecs";
        ages_3to6.view.component.A36RecommendationsPage.THEME_ICON_SELECTED = "themeIconSelected";
        ages_3to6.view.component.A36RecommendationsPage.PROGRAM_TILE_SELECTED = "programTileSelected";
        ages_3to6.view.component.A36RecommendationsPage.CLEANUP_FINISHED = "cleanupFinished";
        ages_3to6.view.component.A36RecommendationsPage.LOGOUT_CLICKED = "logoutClicked";
        ages_3to6.view.component.A36RecommendationsPage.PROGRAM_TILE_SWIPED_OFF = "programTileSwipedOff";
        ages_3to6.view.component.A36RecommendationsPage.SWIPED_TILE_DESTROYED = "swipedTileDestroyed";
              
        ages_3to6.view.component.A36RecommendationsPage.SWIPE_VELOCITY_THRESHOLD = 20;
        
        ages_3to6.view.component.A36RecommendationsPage.prototype._themePickerClicked = false;

        ages_3to6.view.component.A36RecommendationsPage.prototype.onLogoutClicked = function()
        {
            this.dispatchEvent(ages_3to6.view.component.A36RecommendationsPage.LOGOUT_CLICKED);
        }
              
        ages_3to6.view.component.A36RecommendationsPage.prototype.onThemePickerClicked = function()
        {
            this._themePickerClicked = true;
            this.onTouchEnded();
            this.dispatchEvent(ages_3to6.view.component.A36RecommendationsPage.THEME_ICON_SELECTED);
        }

        ages_3to6.view.component.A36RecommendationsPage.prototype.onBodySelected = function(body)
        {
            if (!this._themePickerClicked)
            {
                var programTile = this.programTiles[body.GetUserData().id];
                if (programTile)
                {
                    this.themePicker.hide();
                    this.dispatchEvent(ages_3to6.view.component.A36RecommendationsPage.PROGRAM_TILE_SELECTED, { selectedTile : programTile });
                }
            }
        }
              
        ages_3to6.view.component.A36RecommendationsPage.prototype.getCurrentProgramTileDefs = function()
        {
              var tileDefs = new Array();
              for (var key in this.programTiles)
              {
                var programTile = this.programTiles[key];
                if (programTile)
                {
                    tileDefs.push(programTile.programTileDef);
                }
              
              }
              console.log(' Number of current TILE DEFS: ' + tileDefs.length);
              return tileDefs;
              
        }
              
        ages_3to6.view.component.A36RecommendationsPage.prototype.onTouchStarted = function(mouseX, mouseY)
        {
            this.parent.onTouchStarted.call(this, mouseX, mouseY);
              
            if (this._selectedBody)
            {
              this._selectedBodyOriginalX = this._selectedBody.GetPosition().x;
              this._selectedBodyOriginalY = this._selectedBody.GetPosition().y;
              
              var mJointDef = new b2MouseJointDef();
              mJointDef.bodyA = this.box2dWorld.GetGroundBody();
              mJointDef.bodyB = this._selectedBody;
              mJointDef.target.Set(mouseX, mouseY);
              mJointDef.collideConnected = true;
              mJointDef.maxForce = 300.0 * this._selectedBody.GetMass();
              this._curMouseJoint = this.box2dWorld.CreateJoint(mJointDef);
              this._selectedBody.SetAwake(true);
            }
        }
              
        ages_3to6.view.component.A36RecommendationsPage.prototype.onTouchMoved = function(mouseX, mouseY)
        {
            this.parent.onTouchMoved.call(this, mouseX, mouseY);
            if (this._curMouseJoint)
              this._curMouseJoint.SetTarget(new b2Vec2(mouseX, mouseY));
        }

        ages_3to6.view.component.A36RecommendationsPage.prototype.onTouchEnded = function() 
        {
            if (this._selectedBody)
            {
                var curVel = this._selectedBody.GetLinearVelocity();
                var userData = this._selectedBody.GetUserData();

                if ((Math.abs(curVel.x) >= ages_3to6.view.component.A36RecommendationsPage.SWIPE_VELOCITY_THRESHOLD) ||
                    (Math.abs(curVel.y) >= ages_3to6.view.component.A36RecommendationsPage.SWIPE_VELOCITY_THRESHOLD))
                {
                    userData.hasSwipeOffVelocity = true;
                    shared.view.component.Sounds.playSwipe();
                }
                else
                {
                    userData.hasSwipeOffVelocity = false;
                }
                this._selectedBody.SetUserData(userData);
            }

            if (this._curMouseJoint) 
            {
                this.box2dWorld.DestroyJoint(this._curMouseJoint);
                this._curMouseJoint = undefined;
            }
            
            this.parent.onTouchEnded.call(this);
        }

        ages_3to6.view.component.A36RecommendationsPage.prototype._doUpdate = function()
        {
            
            var isTilePresent = false;
    
            // Update tile set
            for (var key in this.programTiles) 
            {
                var programTile = this.programTiles[key];
                if (programTile) 
                {
                    var pos = programTile.getBodyPosition();
                    if ((pos.x < -10) || (pos.x > 40) || (pos.y > 40))
                    {
                        // Destroy off-screen program tile
                        if (this.ground)
              this.dispatchEvent(ages_3to6.view.component.A36RecommendationsPage.PROGRAM_TILE_SWIPED_OFF, { originalX: this._selectedBodyOriginalX, rejectedProgram: programTile.programId, tileWeighting: programTile.weightingSize });
              
                        console.log("Destroying programTile: programId = " + programTile.programId);
                        this.programTiles[key] = null;
                        this.numTiles--;
                        programTile.destroy();
              
                        if (this.ground)
                            this.dispatchEvent(ages_3to6.view.component.A36RecommendationsPage.SWIPED_TILE_DESTROYED);
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
              
    
            // TODO: (WK) Determine if the themeIcon portion of this is valid.          
            if (this.ground == null && (this.numTiles <= 0))
            {
                this.dispatchEvent(ages_3to6.view.component.A36RecommendationsPage.CLEANUP_FINISHED);
            }
    
            if (this.isWaitingForTileClear && !isTilePresent)
            {
                this.isWaitingForTileClear = false;
        
                console.log("Refreshing recommendations: this.numTiles = " + this.numTiles);
                this.ground = this.createGround();
                this.dispatchEvent(ages_3to6.view.component.A36RecommendationsPage.REFRESH_RECS);
            }
        }
              
        ages_3to6.view.component.A36RecommendationsPage.prototype.onPreSolve = function(contact, oldManifold)
        {
              // The Exiting body is one that was "thrown" by the user.  e.g. linear velocity above a threshold to escape the screen.
              if ((contact.GetFixtureA().GetBody() == this._selectedBody) || (contact.GetFixtureA().GetBody().GetUserData().hasSwipeOffVelocity)) {
                contact.SetEnabled(false);
              }
        }

        ages_3to6.view.component.A36RecommendationsPage.prototype._doPageEnter = function(data)
        {
            console.log("ages_3to6.view.component.A36RecommendationsPage._doPageEnter");
            
            this._themePickerClicked = false;
            
            this.themePicker.show();
            this.themePicker.addEventListener(shared.view.component.ThemePicker.CLICKED, this.onThemePickerClickedHandler);
            this.nameplate.showLogoutDrawer(true);
            this.nameplate.addEventListener(shared.view.component.Nameplate.LOGOUT_CLICKED, this.onLogoutClickedHandler);
            if (data.refreshPage)
            {
                this.ground = this.createGround();
        
                this.createBorders();
        
                var userData = data.userData;
                if (userData)
                {
                    var userDisplayName = (userData && userData.displayName) ? userData.displayName.toUpperCase() : "THERE";
                    this.nameplate.setTitle('HELLO ' + userDisplayName + '!', (userData.theme) ? userData.theme.nameplateFontColor : "#89BDBA");
                
                
                    if (userData.theme && userData.theme.backgroundImageSrc)
                    {
                        this.setBackgroundImage(userData.theme.backgroundImageSrc);
                    }
                    
                    this.nameplate.setIcon((userData.theme) ? userData.theme.nameplateIconImageSrc : 'images/themes/ages_3to6/default/nameplateIcon.png');
                    this.themePicker.setIcon((userData.theme) ? userData.theme.iconImageSrc : 'images/themes/ages_3to6/default/themeIcon.png');
                }
              
                if (this.collisionListener == undefined)
                {
                    this.collisionListener = new b2ContactListener();
                    this.collisionListener.PreSolve = Relegate.create(this, this.onPreSolve, this);
                    this.box2dWorld.SetContactListener(this.collisionListener);
                }
            }
            
            if (userData && userData.theme && userData.theme.backgroundImageSrc)
            {
                this.setBackgroundImage(userData.theme.backgroundImageSrc);
            }
        }

        ages_3to6.view.component.A36RecommendationsPage.prototype._doPageExit = function()
        {
            console.log("ages_3to6.view.component.A36RecommendationsPage._doPageExit");
            
            this.nameplate.removeEventListener(shared.view.component.Nameplate.LOGOUT_CLICKED, this.onLogoutClickedHandler);
            this.themePicker.removeEventListener(shared.view.component.ThemePicker.CLICKED, this.onThemePickerClickedHandler);
              this.themePicker.hide();
              
            if (this.ground)
            {
                console.log("destroying ground");
                this.box2dWorld.DestroyBody(this.ground);
                this.ground = null;
            }
    
            if (this.leftBorder)
            {
                console.log("destroying leftBorder");
                this.box2dWorld.DestroyBody(this.leftBorder);
                this.leftBorder = null;
            }
    
            if (this.rightBorder)
            {
                console.log("destroying rightBorder");
                this.box2dWorld.DestroyBody(this.rightBorder);
                this.rightBorder = null;
            }
        }


        ages_3to6.view.component.A36RecommendationsPage.prototype.createGround = function()
        {
            console.log("Creating ground");
            var groundDef = new b2BodyDef;
            groundDef.type = b2Body.b2_staticBody;
            groundDef.position.Set(0, 26.05);
            groundDef.userData = 'ground';
    
            var groundFixDef = new b2FixtureDef;
            groundFixDef.density = 1.0;
            groundFixDef.friction = 5;
            groundFixDef.restitution = 0;
                
            groundFixDef.shape = new b2PolygonShape;
            groundFixDef.shape.SetAsBox(35, .5);
    
            var ground = this.box2dWorld.CreateBody(groundDef);
            ground.CreateFixture(groundFixDef);
    
            return ground;
        }

        ages_3to6.view.component.A36RecommendationsPage.prototype.createBorders = function()
        {
            console.log("Creating borders");
    
            var leftDef = new b2BodyDef;
            leftDef.type = b2Body.b2_staticBody;
            leftDef.position.Set(0, 25);
            leftDef.userData = 'leftWall';
    
            var leftFixDef = new b2FixtureDef;
            leftFixDef.density = 1.0;
            leftFixDef.friction = 0.5;
            leftFixDef.restitution = 0.2;
    
            leftFixDef.shape = new b2PolygonShape;
            leftFixDef.shape.SetAsBox(.5, 1000);
    
            this.leftBorder = this.box2dWorld.CreateBody(leftDef);
            this.leftBorder.CreateFixture(leftFixDef);
    
            var rightDef = new b2BodyDef;
            rightDef.type = b2Body.b2_staticBody;
            rightDef.position.Set(34.5, 0);
            rightDef.userData = 'rightWall';
    
            var rightFixDef = new b2FixtureDef;
            rightFixDef.density = 1.0;
            rightFixDef.friction = 0.5;
            rightFixDef.restitution = 0.2;
                
            rightFixDef.shape = new b2PolygonShape;
            rightFixDef.shape.SetAsBox(.5, 1000);
    
            this.rightBorder = this.box2dWorld.CreateBody(rightDef);
            this.rightBorder.CreateFixture(rightFixDef);
    
        }

        ages_3to6.view.component.A36RecommendationsPage.prototype.refreshProgramTiles = function(programTileDefList)
        {
            console.log("ages_3to6.view.component.A36RecommendationsPage.prototype.refreshProgramTiles: [START]");
    
            if (DEBUG_CHECK_BODY_COUNT_ENABLED)
            {
                var bodyCount = 0;
                for (var b = this.box2dWorld.GetBodyList(); b; b = b.GetNext())
                {
                    bodyCount++;
                    console.log("ages_3to6.view.component.A36RecommendationsPage.prototype.refreshProgramTiles: [body userdata = " + b.GetUserData() + "]");
                }
                console.log("ages_3to6.view.component.A36RecommendationsPage.prototype.refreshProgramTiles: [bodyCount = " + bodyCount + "]");
            }
    
    
            if (programTileDefList)
            {
                for (var i=0; i < programTileDefList.length; i++)
                {
                    var programTileDef/*ages_3to6.view.component.A36ProgramTileDef*/ = programTileDefList[i];
                    var tile = new ages_3to6.view.component.A36ProgramTile(this.box2dWorld, programTileDef);
                    var body = tile.create();
                    this.programTiles[body.GetUserData().id] = tile;
                    this.numTiles++;
                }
        
                //shared.view.component.Sounds.playFallingTiles01();
            }
            console.log("ages_3to6.view.component.A36RecommendationsPage.prototype.refreshProgramTiles: [END]");
        }
        
    }
});