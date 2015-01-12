includeJS("js/ces/view/component/CESProgramTileDef.js");
includeJS("js/ces/view/component/CESProgramTile.js");
includeJS("js/ces/view/component/CESAvatar.js");

CESRecommendationsPage.prototype = new BasePage;
CESRecommendationsPage.prototype.parent = BasePage.prototype;

CESRecommendationsPage.prototype.constructor = CESRecommendationsPage

CESRecommendationsPage.REFRESH_RECS = "refreshRecs";
CESRecommendationsPage.AVATAR_SELECTED = "avatarSelected";
CESRecommendationsPage.PROGRAM_TILE_SELECTED = "programTileSelected";
CESRecommendationsPage.CLEANUP_FINISHED = "cleanupFinished";

CESRecommendationsPage.SHAKE_SENSITIVITY = 12;
CESRecommendationsPage.SWIPE_MOVE_THRESHOLD = 6.0;

function CESRecommendationsPage(canvas)
{
    console.log ('CESRecommendationsPage(): [START]');
    BasePage.apply(this, [canvas]);
    
    this.programTiles = new Object();
    this.myAvatar = null;
    this.numTiles = 0;
    
    this.filterFactor = 1.0;
    this.prevX = 0;
    this.prevY = 0;
    
    this.avatar = null;
    
    this.isShakeTriggered = false;
    this.isShakeHandled = false;
    this.isWaitingForTileClear = false;
    
    this.startAccelerometer();
    console.log ('CESRecommendationsPage(): [END]');
}

CESRecommendationsPage.prototype.startAccelerometer = function()
{
    console.log ('Start watching accelerometer');
    if (DEVICE_MODE_ENABLED)
    { 
        // Update acceleration every .3 seconds
        var options = { frequency: 300 };
        this.watchAccelerationID = navigator.accelerometer.watchAcceleration(
                                                                             Relegate.create(this, this.onWatchAccelerationSuccess, this),
                                                                             Relegate.create(this, this.onWatchAccelerationError, this),
                                                                             options);
    }
}

CESRecommendationsPage.prototype.stopWatchAcceleration = function()
{
    if (this.watchAccelerationID)
    {
        navigator.accelerometer.clearWatch(this.watchAccelerationID);
        this.watchAccelerationID = null;
    }
}

CESRecommendationsPage.prototype.onWatchAccelerationSuccess = function(acceleration)
{
    
    var accelX = acceleration.x * this.filterFactor + (1 - this.filterFactor) * this.prevX;
    var accelY = acceleration.y * this.filterFactor + (1 - this.filterFactor) * this.prevY;
    
    if (!this.isShakeTriggered)
    {
        this.isShakeTriggered = (Math.abs(accelX) + Math.abs(accelY)) > CESRecommendationsPage.SHAKE_SENSITIVITY;
        if (this.isShakeTriggered)
        {
            console.log('SHAKE TRIGGERED!!!!!!!');
        }
    }
    
    this.prevX = accelX;
    this.prevY = accelY;
    
    /*  NOTE: (WK) Uncomment to allow for gravity change in relation to accelerometer.
     // accelerometer values are in "Portrait" mode.  Change them to landscape
     // NOTE:  Intentionally reusing the "Y" gravity to ensure items don't hover around the screen.
     var newX = -accelY * 10;
     var newY = Canvas.GRAVITY_Y;
     var newGravity = new b2Vec2(newX, newY);
     this.world.SetGravity(newGravity);
     */
}

CESRecommendationsPage.prototype.onWatchAccelerationError = function()
{
    console.log('onWatchAccelerationError');
}

CESRecommendationsPage.prototype.onBodySelected = function(body)
{
    if (body.GetUserData() == "myCESAvatar")
    {
        this.dispatchEvent(CESRecommendationsPage.AVATAR_SELECTED);
    }
    else
    {
        var programTile = this.programTiles[body.GetUserData()];
        if (programTile)
        {
            this.dispatchEvent(CESRecommendationsPage.PROGRAM_TILE_SELECTED, { selectedTile : programTile });
        }
    }
}

CESRecommendationsPage.prototype.onTouchEnded = function() 
{
    //console.log("CESRecommendationsPage.onTouchEnded: getMouseStartX() = " + this.getMouseStartX() + "; getMouseStartY() = " + this.getMouseStartY() + "; getMouseX() = " + this.getMouseX() + "; getMouseY() = " + this.getMouseY());
    
    if (!this.isShakeTriggered)
    {
        var distanceY = this.getMouseY() - this.getMouseStartY();
        console.log("CESRecommendationsPage.onTouchEnded: distanceY = " + distanceY);
        
        this.isShakeTriggered = distanceY > CESRecommendationsPage.SWIPE_MOVE_THRESHOLD;
        if (this.isShakeTriggered)
        {
            console.log('SHAKE TRIGGERED!!!!!!!');
        }
    }
    
    this.parent.onTouchEnded.call(this);
}

CESRecommendationsPage.prototype._doUpdate = function()
{
    if (this.isShakeTriggered && !this.isShakeHandled)
    {
        // Handle SHAKE behavior
        this.isShakeHandled = true;
        this.isWaitingForTileClear = true;
        
        console.log("Handling Shake");
        
        if (this.ground)
        {
            console.log("Destroying ground");
            
            this.box2dWorld.DestroyBody(this.ground);
            this.ground = null;
        }
    }
    
    var isTilePresent = false;
    
    if (WEATHER_ENABLED)
    {
        this.context.save();
        
        this.context.translate(22.5 * Canvas.SCALE, -3.3 * Canvas.SCALE);
        this.context.drawImage(this.weatherBoxImage, 0, 0);
        
        this.context.restore();
    }
    
    // Update tile set
    for (var key in this.programTiles) 
    {
        var programTile = this.programTiles[key];
        if (programTile) 
        {
            var pos = programTile.getBodyPosition();
            if (pos.y > 50)
            {
                // Destroy off-screen program tile
                console.log("Destroying programTile: programId = " + programTile.programId);
                this.programTiles[key] = null;
                this.numTiles--;
                programTile.destroy();
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
    if (this.myAvatar)
    {
        this.myAvatar.update(this.context);
    }
    this.context.restore();
    
    // TODO: (WK) Determine if the avatar portion of this is valid.          
    if (this.myAvatar == null && (this.numTiles <= 0))
    {
        this.dispatchEvent(CESRecommendationsPage.CLEANUP_FINISHED);
    }
    
    if (this.isWaitingForTileClear && !isTilePresent)
    {
        this.isShakeTriggered = false;
        this.isShakeHandled = false;
        this.isWaitingForTileClear = false;
        
        console.log("Refreshing recommendations: this.numTiles = " + this.numTiles);
        this.ground = this.createGround();
        this.dispatchEvent(CESRecommendationsPage.REFRESH_RECS);
    }
}

CESRecommendationsPage.prototype._doPageEnter = function(data)
{
    console.log("CESRecommendationsPage._doPageEnter");
    
    if (data.refreshPage)
    {
        $('body').css({'background-image' : 'url(images/pages/ces/avatarBackground.png)'});
    
        if (WEATHER_ENABLED)
        {
            this.weatherBoxImage = new Image();
            this.weatherBoxImage.src = 'images/pages/ces/clouds.png';
        }
    
        this.ground = this.createGround();
        
        this.createBorders();
        
        var userData = data.userData;
        if (userData)
        {
            this.myAvatar = new CESAvatar(
                                    this.box2dWorld,
                                    userData.id,
                                    8,
                                    0,
                                    userData.displayName,
                                    userData.avatarFrameImageSrc,
                                    userData.avatarImageSrc,
                                    userData.avatarTextColor);
            this.myAvatar.create();
        }
    }
}

CESRecommendationsPage.prototype._doPageExit = function()
{
    console.log("CESRecommendationsPage._doPageExit");
    
    if (this.ground)
    {
        console.log("destroying ground");
        this.box2dWorld.DestroyBody(this.ground);
        this.ground = null;
    }
    
    if (this.myAvatar)
    {
        //TODO: should have some sort of animation?
        console.log("destroying avatar");
        this.myAvatar.destroy();
        this.myAvatar = null;
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


CESRecommendationsPage.prototype.createGround = function()
{
    console.log("Creating ground");
    var groundDef = new b2BodyDef;
    groundDef.type = b2Body.b2_staticBody;
    groundDef.position.Set(0, 26.2);
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

CESRecommendationsPage.prototype.createBorders = function()
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

CESRecommendationsPage.prototype.refreshProgramTiles = function(programTileDefList)
{
    console.log("CESRecommendationsPage.prototype.refreshProgramTiles: [START]");
    
    if (DEBUG_CHECK_BODY_COUNT_ENABLED)
    {
        var bodyCount = 0;
        for (var b = this.box2dWorld.GetBodyList(); b; b = b.GetNext())
        {
            bodyCount++;
            console.log("CESRecommendationsPage.prototype.refreshProgramTiles: [body userdata = " + b.GetUserData() + "]");
        }
        console.log("CESRecommendationsPage.prototype.refreshProgramTiles: [bodyCount = " + bodyCount + "]");
    }
    
    
    if (programTileDefList)
    {
        for (var i=0; i < programTileDefList.length; i++)
        {
            var programTileDef/*CESProgramTileDef*/ = programTileDefList[i];
            var tile = new CESProgramTile(this.box2dWorld, programTileDef);
            var body = tile.create();
            this.programTiles[body.GetUserData()] = tile;
            this.numTiles++;
        }
        
        //shared.view.component.Sounds.playFallingTiles01();
    }
    console.log("CESRecommendationsPage.prototype.refreshProgramTiles: [END]");
}