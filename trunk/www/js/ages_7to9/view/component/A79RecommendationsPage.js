jingo.declare(
{
    require: 
    [
        "ages_7to9.view.component.A79ProgramTileDef",
        "ages_7to9.view.component.A79ProgramTile",
        "shared.view.component.Nameplate",
        "shared.view.component.BasePage",
        "shared.view.component.Canvas"
    ],
    name: 'ages_7to9.view.component.A79RecommendationsPage',
    as: function() 
    {

        ages_7to9.view.component.A79RecommendationsPage = function(canvas, nameplate)
        {
            shared.view.component.BasePage.apply(this, [canvas]);
    
            this.nameplate = nameplate;
            this.onLogoutClickedHandler = Relegate.create(this, this.onLogoutClicked, this);
    
            this.programTiles = new Object();
        }

        ages_7to9.view.component.A79RecommendationsPage.prototype = new shared.view.component.BasePage;
        ages_7to9.view.component.A79RecommendationsPage.prototype.parent = shared.view.component.BasePage.prototype;
        ages_7to9.view.component.A79RecommendationsPage.prototype.constructor = ages_7to9.view.component.A79RecommendationsPage;
        
        ages_7to9.view.component.A79RecommendationsPage.PROGRAM_TILE_SELECTED = "programTileSelected";
        ages_7to9.view.component.A79RecommendationsPage.CLEANUP_FINISHED = "cleanupFinished";
        ages_7to9.view.component.A79RecommendationsPage.LOGOUT_CLICKED = "logoutClicked";

        ages_7to9.view.component.A79RecommendationsPage.LEFT_X_LIMIT = -23.0;
        ages_7to9.view.component.A79RecommendationsPage.RIGHT_X_LIMIT = 57.4;
        ages_7to9.view.component.A79RecommendationsPage.MOVE_REDUCTION_PERCENTAGE = .10;
        ages_7to9.view.component.A79RecommendationsPage.MOVE_MINIMUM_THRESHOLD = .001;

        ages_7to9.view.component.A79RecommendationsPage.prototype._previousMouseX = null;
        ages_7to9.view.component.A79RecommendationsPage.prototype._previousMoveDistance = null;

        ages_7to9.view.component.A79RecommendationsPage.prototype._leftXLimit = 0;
        ages_7to9.view.component.A79RecommendationsPage.prototype._rightXLimit = 0;

        ages_7to9.view.component.A79RecommendationsPage.prototype.onLogoutClicked = function()
        {
            this._isPullingBody = false;
            this._pulledBodies = null;
            this.programTiles = new Object();
            this.dispatchEvent(ages_7to9.view.component.A79RecommendationsPage.LOGOUT_CLICKED);
        }

        ages_7to9.view.component.A79RecommendationsPage.prototype.onBodySelected = function(body)
        {
            var programTile = this._getProgramTileForBody(body);
            if (programTile)
            {
                this.dispatchEvent(ages_7to9.view.component.A79RecommendationsPage.PROGRAM_TILE_SELECTED, { selectedTile : programTile });
            }
        }

        ages_7to9.view.component.A79RecommendationsPage.prototype._isProgramTileBody = function(body)
        {
            return (this._getProgramTileForBody(body) != null);
        }

        ages_7to9.view.component.A79RecommendationsPage.prototype._getProgramTileForBody = function(body)
        {
            return (body) ? this.programTiles[body.GetUserData()] : null;
        }

        ages_7to9.view.component.A79RecommendationsPage.prototype.onTouchStarted = function(mouseX, mouseY)
        {
            this.parent.onTouchStarted.call(this, mouseX, mouseY);
            //console.log("ages_7to9.view.component.A79RecommendationsPage.onTouchStarted: mouseX = " + mouseX + "; mouseY = " + mouseY);
    
            this._isPullingBody = false;
            this._pulledBodies = null;
            this._previousMouseX = mouseX;
            this._previousMoveDistance = 0;
        }

        ages_7to9.view.component.A79RecommendationsPage.prototype.onTouchMoved = function(mouseX, mouseY)
        {
            this.parent.onTouchMoved.call(this, mouseX, mouseY);
            //console.log("ages_7to9.view.component.A79RecommendationsPage.onTouchMoved: mouseX = " + mouseX + "; mouseY = " + mouseY);
    
            if (!this._isPullingBody)
            {
                var currentSelectedBody = this.determinePullBody(mouseX, mouseY);
                this._isPullingBody = false;
                this._pulledBodies = new Array();
                if (this._isProgramTileBody(currentSelectedBody))
                {
                    var programTile = this._getProgramTileForBody(currentSelectedBody);
                    if (programTile)
                    {
                        this._isPullingBody = true;
                
                        var rowPosition = programTile.getPullBody().GetPosition().y;
                        for (var key in this.programTiles)
                        {
                            var testProgramTile = this.programTiles[key];
                            if (testProgramTile.getPullBody().GetPosition().y == rowPosition)
                            {
                                this._pulledBodies.push(testProgramTile.getPullBody());
                            }
                        }
                    }
                }
            }
            
            if (this._isPullingBody && this._pulledBodies) 
            {
                var moveDistance = mouseX - this._previousMouseX;
                var newPositions = new Array();
                var allowMove = true;
                for (var i = 0; allowMove && i < this._pulledBodies.length; i++)
                {
                    var pulledBody = this._pulledBodies[i];
                    var position = pulledBody.GetPosition();
                    var newX = position.x + moveDistance;
                    var newY = position.y;
                    newPositions.push(new b2Vec2(newX, newY));
            
                    if (moveDistance >= 0)
                    {
                        allowMove = newX <= this._rightXLimit;
                    }
                    else
                    {
                        allowMove = newX >= this._leftXLimit;
                    }
                }
        
                if (allowMove)
                {
                    for (var j = 0; j < this._pulledBodies.length; j++)
                    {
                        var pulledBody = this._pulledBodies[j];
                        pulledBody.SetPosition(newPositions[j]);
                    }
            
                    this._previousMoveDistance = moveDistance;
                }
                else
                {
                    this._previousMoveDistance = 0;
                }
            }
    
            this._previousMouseX = mouseX;
        }

        ages_7to9.view.component.A79RecommendationsPage.prototype.onTouchEnded = function() 
        {
            //console.log("ages_7to9.view.component.A79RecommendationsPage.onTouchEnded: getMouseStartX() = " + this.getMouseStartX() + "; getMouseStartY() = " + this.getMouseStartY() + "; getMouseX() = " + this.getMouseX() + "; getMouseY() = " + this.getMouseY());
    
            //this._isPullingBody = false;
            //this._pulledBodies = null;
    
            this.parent.onTouchEnded.call(this);
        }

        ages_7to9.view.component.A79RecommendationsPage.prototype.determinePullBody = function(mouseX, mouseY)
        {
            var pullBody = null;
            for (var key in this.programTiles)
            {
                var testProgramTile = this.programTiles[key];
                var adjustedMouseY = shared.view.component.Canvas.SCALE * mouseY;
                var positionY = (testProgramTile.getPullBody().GetPosition().y) * shared.view.component.Canvas.SCALE;
                var tileTopY = positionY - (ages_7to9.view.component.A79ProgramTile.TILE_HEIGHT / 2);
                var tileBottomY = positionY + (ages_7to9.view.component.A79ProgramTile.TILE_HEIGHT / 2);
                if (adjustedMouseY >= tileTopY && adjustedMouseY <= tileBottomY)
                {
                    pullBody = testProgramTile.getPullBody();
                    break;
                }
            }
            return pullBody;
        }

        ages_7to9.view.component.A79RecommendationsPage.prototype._doUpdate = function()
        {
            //console.log("ages_7to9.view.component.A79RecommendationsPage.prototype._doUpdate: [START]");
            if (!this._isMouseDown && this._isPullingBody && this._pulledBodies) 
            {
                var moveDistance = this._previousMoveDistance * (1 - ages_7to9.view.component.A79RecommendationsPage.MOVE_REDUCTION_PERCENTAGE);
                //console.log("moveDistance = " + moveDistance);
        
                var newPositions = new Array();
                var allowMove = (Math.abs(moveDistance) >= ages_7to9.view.component.A79RecommendationsPage.MOVE_MINIMUM_THRESHOLD);
                for (var i = 0; allowMove && i < this._pulledBodies.length; i++)
                {
                    var pulledBody = this._pulledBodies[i];
                    var position = pulledBody.GetPosition();
                    var newX = position.x + moveDistance;
                    var newY = position.y;
                    newPositions.push(new b2Vec2(newX, newY));
            
                    if (moveDistance >= 0)
                    {
                        allowMove = newX <= this._rightXLimit;
                    }
                    else
                    {
                        allowMove = newX >= this._leftXLimit;
                    }
                }
        
                if (allowMove)
                {
                    for (var j = 0; j < this._pulledBodies.length; j++)
                    {
                        var pulledBody = this._pulledBodies[j];
                        pulledBody.SetPosition(newPositions[j]);
                    }
            
                    this._previousMoveDistance = moveDistance;
                }
                else
                {
                    this._isPullingBody = false;
                    this._pulledBodies = null;
                    this._previousMouseX = null;
                    this._previousMoveDistance = 0;
                }
            }

            // TODO: (WK) Revise this process to remove the need to loop through the entire list.
            for (var b = this.box2dWorld.GetBodyList(); b; b = b.GetNext())
            {
                this.context.save();
        
                var tile = this.programTiles[b.GetUserData()];
                if (tile) 
                {
                    tile.update(this.context);
                }
        
                this.context.restore();
            }
    
            //console.log("ages_7to9.view.component.A79RecommendationsPage.prototype._doUpdate: [END]");
        }

        ages_7to9.view.component.A79RecommendationsPage.prototype._doPageEnter = function(data)
        {
            console.log("ages_7to9.view.component.A79RecommendationsPage._doPageEnter");
            
            this.nameplate.showLogoutDrawer(false);
            this.nameplate.showCloseButton(true);
            this.nameplate.addEventListener(shared.view.component.Nameplate.LOGOUT_CLICKED, this.onLogoutClickedHandler);
    
            if (data.refreshPage)
            {
                var userData = data.userData;
                if (userData)
                {
                    var userDisplayName = (userData && userData.displayName) ? userData.displayName.toUpperCase() : "THERE";
                    this.nameplate.setTitle('HELLO ' + userDisplayName + '!', (userData.theme) ? userData.theme.nameplateFontColor : "#89BDBA");
                
                    if (userData.theme && userData.theme.backgroundImageSrc)
                    {
                        this.setBackgroundImage(userData.theme.backgroundImageSrc);
                    }
                    
                    this.nameplate.setIcon((userData.theme) ? userData.theme.nameplateIconImageSrc : 'images/themes/ages_7to9/default/nameplateIcon.png');
                    this.nameplate.setCloseIcon((userData.theme) ? userData.theme.nameplateCloseButtonImageSrc : 'images/themes/ages_7to9/default/closeBtn.png');
                    this.nameplate.showBackground(false);
                }
        
                this.ground = this.createGround();
                this.createBorders();
            }
        }

        ages_7to9.view.component.A79RecommendationsPage.prototype._doPageExit = function()
        {
            console.log("ages_7to9.view.component.A79RecommendationsPage._doPageExit");
            
            this.nameplate.showCloseButton(false);
            this.nameplate.showBackground(true);
            this.nameplate.removeEventListener(shared.view.component.Nameplate.LOGOUT_CLICKED, this.onLogoutClickedHandler);
    
            if (this._tempMouseJoint) 
            {
                this.box2dWorld.DestroyJoint(this._tempMouseJoint);
                this._tempMouseJoint = null;
            }
    
            this._isPullingBody = false;
            this._pulledBodies = null;
    
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
    
            this.dispatchEvent(ages_7to9.view.component.A79RecommendationsPage.CLEANUP_FINISHED);
        }

        ages_7to9.view.component.A79RecommendationsPage.prototype.createGround = function()
        {
            console.log("Creating ground");
            var groundDef = new b2BodyDef;
            groundDef.type = b2Body.b2_staticBody;
            groundDef.position.Set(0, 26.2);
            groundDef.userData = 'ground';
    
            var groundFixDef = new b2FixtureDef;
            groundFixDef.density = 1.0;
            groundFixDef.friction = 0;
            groundFixDef.restitution = 0.2;
    
            groundFixDef.shape = new b2PolygonShape;
            groundFixDef.shape.SetAsBox(35, .5);
    
            var ground = this.box2dWorld.CreateBody(groundDef);
            ground.CreateFixture(groundFixDef);
    
            return ground;
        }

        ages_7to9.view.component.A79RecommendationsPage.prototype.createBorders = function()
        {
            var leftDef = new b2BodyDef;
            leftDef.type = b2Body.b2_staticBody;
            leftDef.position.Set(-70, 0);
    
            var leftFixDef = new b2FixtureDef;
            leftFixDef.density = 1.0;
            leftFixDef.friction = 0.5;
            leftFixDef.restitution = 0.2;
    
            leftFixDef.shape = new b2PolygonShape;
            leftFixDef.shape.SetAsBox(.8, 35);
    
            var leftBorder = this.box2dWorld.CreateBody(leftDef);
            leftBorder.CreateFixture(leftFixDef);
    
            //right border
    
            var rightDef = new b2BodyDef;
            rightDef.type = b2Body.b2_staticBody;
            rightDef.position.Set(100, 0);
    
            var rightFixDef = new b2FixtureDef;
            rightFixDef.density = 1.0;
            rightFixDef.friction = 0.5;
            rightFixDef.restitution = 0.2;
    
            rightFixDef.shape = new b2PolygonShape;
            rightFixDef.shape.SetAsBox(1.2, shared.view.component.Canvas.SCALE);
    
            var rightBorder = this.box2dWorld.CreateBody(rightDef);
            rightBorder.CreateFixture(rightFixDef);
        }

        ages_7to9.view.component.A79RecommendationsPage.prototype.refreshProgramTiles = function(programTileDefList)
        {
            console.log("ages_7to9.view.component.A79RecommendationsPage.prototype.refreshProgramTiles: [START]");
    
            if (DEBUG_CHECK_BODY_COUNT_ENABLED)
            {
                var bodyCount = 0;
                for (var b = this.box2dWorld.GetBodyList(); b; b = b.GetNext())
                {
                    bodyCount++;
                    console.log("ages_7to9.view.component.A79RecommendationsPage.prototype.refreshProgramTiles: [body userdata = " + b.GetUserData() + "]");
                }
                console.log("ages_7to9.view.component.A79RecommendationsPage.prototype.refreshProgramTiles: [bodyCount = " + bodyCount + "]");
        
                var jointCount = 0;
                for (var joint = this.box2dWorld.GetJointList(); joint; joint = joint.GetNext())
                {
                    jointCount++;
                    //console.log("ages_7to9.view.component.A79RecommendationsPage.prototype.refreshProgramTiles: [joint userdata = " + b.GetUserData() + "]");
                }
                console.log("ages_7to9.view.component.A79RecommendationsPage.prototype.refreshProgramTiles: [jointCount = " + jointCount + "]");
            }
    
            if (programTileDefList)
            {
                this._leftXLimit = ages_7to9.view.component.A79RecommendationsPage.LEFT_X_LIMIT;
                this._rightXLimit = ages_7to9.view.component.A79RecommendationsPage.RIGHT_X_LIMIT;
                
                for (var i=0; i < programTileDefList.length; i++)
                {
                    var programTileDef/*ages_7to9.view.component.A79ProgramTileDef*/ = programTileDefList[i];
                    var tile = new ages_7to9.view.component.A79ProgramTile(this.box2dWorld, programTileDef);
                    var body = tile.create();
                    this.programTiles[body.GetUserData()] = tile;
                    previousTile = tile;
                }
        
                // TODO: (WK) Replace if sound is required upon page entry.
                //shared.view.component.Sounds.playFallingTiles();
            }
    
            console.log("ages_7to9.view.component.A79RecommendationsPage.prototype.refreshProgramTiles: [END]");
        }
        
    }
});