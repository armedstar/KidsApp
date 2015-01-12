includeJS("js/ces/view/component/CESProgramTileDef.js");
includeJS("js/ces/model/CESRecommendationsProxy.js");

includeJS("js/shared/view/mediator/BasePageMediator.js");

CESRecommendationsPageMediator.prototype = new BasePageMediator;
CESRecommendationsPageMediator.prototype.parent = BasePageMediator.prototype;

CESRecommendationsPageMediator.prototype.constructor = CESRecommendationsPageMediator;

CESRecommendationsPageMediator.prototype.tileConfigSets = new Array();
CESRecommendationsPageMediator.prototype.recData = new Array();
CESRecommendationsPageMediator.prototype.nextStartIndex = 0;
CESRecommendationsPageMediator.prototype.nextTileConfigSetIndex = 0;

CESRecommendationsPageMediator.NAME = "CESRecommendationsPageMediator";
CESRecommendationsPageMediator.RANDOMIZE_TILE_SETS = false;
CESRecommendationsPageMediator.DATA_SIZE = 10;
CESRecommendationsPageMediator.VIDEO_DATA_LIMIT = 30;
CESRecommendationsPageMediator.CONTEXT_ID = "randomApp";


function CESRecommendationsPageMediator(viewComponent)
{
    BasePageMediator.apply(this, [CESRecommendationsPageMediator.NAME, viewComponent]);
    
    this.initTileConfigurations();
    
    if (this.getView())
    {
        this.getView().addEventListener(CESRecommendationsPage.REFRESH_RECS, Relegate.create(this, this.onRefreshRecs, this));
        this.getView().addEventListener(CESRecommendationsPage.AVATAR_SELECTED, Relegate.create(this, this.onAvatarSelected, this));
        this.getView().addEventListener(CESRecommendationsPage.PROGRAM_TILE_SELECTED, Relegate.create(this, this.onProgramTileSelected, this));
        this.getView().addEventListener(CESRecommendationsPage.CLEANUP_FINISHED, Relegate.create(this, this.onCleanupFinished, this));
    }
}

CESRecommendationsPageMediator.prototype.getName = function()
{
    return CESRecommendationsPageMediator.NAME;
}

CESRecommendationsPageMediator.prototype.initTileConfigurations = function()
{
    var tileConfigSet1 = new Array();
    tileConfigSet1.push(new TileConfiguration(5, 0, CESProgramTileDef.WEIGHTING_SIZE_LARGE));
    tileConfigSet1.push(new TileConfiguration(18, -10, CESProgramTileDef.WEIGHTING_SIZE_LARGE));
    tileConfigSet1.push(new TileConfiguration(23, -10, CESProgramTileDef.WEIGHTING_SIZE_MEDIUM));
    tileConfigSet1.push(new TileConfiguration(30, -40, CESProgramTileDef.WEIGHTING_SIZE_MEDIUM));
    tileConfigSet1.push(new TileConfiguration(24, -45, CESProgramTileDef.WEIGHTING_SIZE_MEDIUM));
    tileConfigSet1.push(new TileConfiguration(16, -10, CESProgramTileDef.WEIGHTING_SIZE_SMALL));
    tileConfigSet1.push(new TileConfiguration(19, -20, CESProgramTileDef.WEIGHTING_SIZE_SMALL));
    tileConfigSet1.push(new TileConfiguration(25, -50, CESProgramTileDef.WEIGHTING_SIZE_SMALL));
    tileConfigSet1.push(new TileConfiguration(4, -60, CESProgramTileDef.WEIGHTING_SIZE_SMALL));
    tileConfigSet1.push(new TileConfiguration(15, -70, CESProgramTileDef.WEIGHTING_SIZE_SMALL));
    
    var tileConfigSet2 = new Array();
    tileConfigSet2.push(new TileConfiguration(5, -10, CESProgramTileDef.WEIGHTING_SIZE_LARGE));
    tileConfigSet2.push(new TileConfiguration(30, 0, CESProgramTileDef.WEIGHTING_SIZE_LARGE));
    tileConfigSet2.push(new TileConfiguration(11, -70, CESProgramTileDef.WEIGHTING_SIZE_MEDIUM));
    tileConfigSet2.push(new TileConfiguration(15, -30, CESProgramTileDef.WEIGHTING_SIZE_MEDIUM));
    tileConfigSet2.push(new TileConfiguration(3, -20, CESProgramTileDef.WEIGHTING_SIZE_MEDIUM));
    tileConfigSet2.push(new TileConfiguration(30, -40, CESProgramTileDef.WEIGHTING_SIZE_SMALL));
    tileConfigSet2.push(new TileConfiguration(5, -50, CESProgramTileDef.WEIGHTING_SIZE_SMALL));
    tileConfigSet2.push(new TileConfiguration(20, -60, CESProgramTileDef.WEIGHTING_SIZE_SMALL));
    tileConfigSet2.push(new TileConfiguration(30, -40, CESProgramTileDef.WEIGHTING_SIZE_SMALL));
    tileConfigSet2.push(new TileConfiguration(20, -50, CESProgramTileDef.WEIGHTING_SIZE_SMALL));
    
    var tileConfigSet3 = new Array();
    tileConfigSet3.push(new TileConfiguration(7, 0, CESProgramTileDef.WEIGHTING_SIZE_LARGE));
    tileConfigSet3.push(new TileConfiguration(30, -30, CESProgramTileDef.WEIGHTING_SIZE_LARGE));
    tileConfigSet3.push(new TileConfiguration(32, -60, CESProgramTileDef.WEIGHTING_SIZE_MEDIUM));
    tileConfigSet3.push(new TileConfiguration(18, -40, CESProgramTileDef.WEIGHTING_SIZE_MEDIUM));
    tileConfigSet3.push(new TileConfiguration(20, -50, CESProgramTileDef.WEIGHTING_SIZE_MEDIUM));
    tileConfigSet3.push(new TileConfiguration(25, -70, CESProgramTileDef.WEIGHTING_SIZE_SMALL));
    tileConfigSet3.push(new TileConfiguration(0, -30, CESProgramTileDef.WEIGHTING_SIZE_SMALL));
    tileConfigSet3.push(new TileConfiguration(30, -70, CESProgramTileDef.WEIGHTING_SIZE_SMALL));
    tileConfigSet3.push(new TileConfiguration(3, -40, CESProgramTileDef.WEIGHTING_SIZE_SMALL));
    tileConfigSet3.push(new TileConfiguration(25, -60, CESProgramTileDef.WEIGHTING_SIZE_SMALL));
    
    this.tileConfigSets.push(tileConfigSet1);
    this.tileConfigSets.push(tileConfigSet2);
    this.tileConfigSets.push(tileConfigSet3);
}

CESRecommendationsPageMediator.prototype.onCleanupFinished = function()
{
    console.log("CESRecommendationsPageMediator.CLEANUP FINISHED");
    this.sendNotification(AppConstants.PAGE_CLEANUP_FINISHED, {});
}

 
CESRecommendationsPageMediator.prototype.showPage = function(data)
{
    this.sendNotification(AppConstants.LOG_APP_MESSAGE, {message: "Showing page: " + this.getName()});
    this.contextData = data;
    
    this.getView().onPageEnter(this.contextData);
    
    if (data.refreshPage)
    {
        var recommendationsProxy = this.facade.retrieveProxy( CESRecommendationsProxy.NAME );
        var userData = this.contextData.userData;
        if (recommendationsProxy)
        {
            var userId = (userData) ? userData.id : null;
            recommendationsProxy.getRecommendations(
                userId, 
                CESRecommendationsPageMediator.CONTEXT_ID,
                Relegate.create(this, this.handleRecommendationsReceived, this), 
                function() {});
        }
    }
    
    this.getView().update(this.contextData);
}

CESRecommendationsPageMediator.prototype.handleRecommendationsReceived = function(recData)
{
    this.recData = recData;
    
    this.displayNextDataSet();
}

CESRecommendationsPageMediator.prototype.onRefreshRecs = function()
{
    this.sendNotification(AppConstants.LOG_APP_MESSAGE, {message: "Asked for new recommendations"});
    this.displayNextDataSet();
}

CESRecommendationsPageMediator.prototype.onAvatarSelected = function(event)
{
    shared.view.component.Sounds.playTouch();
    
    this.sendNotification(AppConstants.LOGOUT_USER, {returnToLoginScreen: true});
}

CESRecommendationsPageMediator.prototype.onProgramTileSelected = function(event)
{
    var selectedTile = event.args.selectedTile;
    
    if (selectedTile)
    {
        shared.view.component.Sounds.playTouch();
        
        console.log('user selected ' + selectedTile.videoURI);
        this.sendNotification(AppConstants.SHOW_VIDEO_PLAYER, {id: selectedTile.programId, videoURI: selectedTile.videoURI});
    }
}

CESRecommendationsPageMediator.prototype.displayNextDataSet = function()
{
    
    var tileConfigSet = this.tileConfigSets[this.nextTileConfigSetIndex++];
    
    
    if (this.nextTileConfigSetIndex >= this.tileConfigSets.length)
    {
        this.nextTileConfigSetIndex = 0;
    }
    
    if (this.nextTileConfigSetIndex == 1){
        TILE_SOUNDS[0]();
    }
    if (this.nextTileConfigSetIndex == 2){
        TILE_SOUNDS[1]();
    }
    if (this.nextTileConfigSetIndex == 0){
        TILE_SOUNDS[2]();
    }
    
    var dataSet = new Array();
    var currentIndex = this.nextStartIndex;

    for (var i = 0; (i < CESRecommendationsPageMediator.DATA_SIZE) && (currentIndex < this.recData.length); i++, currentIndex++)
    {
        var programBrief = this.recData[currentIndex];
        if (programBrief)
        {
            var tileConfig = tileConfigSet[i];
            
            var positionX = (CESRecommendationsPageMediator.RANDOMIZE_TILE_SETS) ? Math.floor((Math.random()*25)+1) : tileConfig.positionX;
            var positionY = (CESRecommendationsPageMediator.RANDOMIZE_TILE_SETS) ? 0 : tileConfig.positionY;
            var weightingSize = tileConfig.weightingSize;
            
            console.log ('CESRecommendationsPageMediator.displayNextDataSet[i = ' + i + ']: positionX = ' + positionX + '; positionY = ' + positionY);
            
            var programTileDef = new CESProgramTileDef(programBrief.id, programBrief.type, programBrief.title, programBrief.imageSrc, programBrief.videoPlayerCtrlImageSrc, programBrief.videoURI, positionX, positionY, weightingSize);
            
            dataSet.push(programTileDef);
            
        }
    }
    
    this.nextStartIndex = (currentIndex < this.recData.length) ? currentIndex : 0;
    
    this.getView().refreshProgramTiles(dataSet);
    
    /*
    //set randomized list of current set of titles as the playlist for the video player
    var vidPlayerMediator = this.facade.retrieveMediator(AppConstants.VIDEO_PAGE_MEDIATOR_NAME);
    if (vidPlayerMediator)
    {
        var randomizedDataSet = dataSet.slice(0);
        randomizedDataSet = randomizedDataSet.shuffle();
        
        vidPlayerMediator.loadPlaylist(randomizedDataSet);
    }
    */
    
    // NOTE: (WK) This is a hack to allow the video page to be utilized as the main (and only) page
    // for research purposes, while still allowing the rest of the app to function.  This should be
    // removed when the need is no longer present.
    
    var videoDataSet = new Array();

    for (var j = 0; (j < CESRecommendationsPageMediator.VIDEO_DATA_LIMIT) && (j < this.recData.length); j++)
    {
        var videoProgramBrief = this.recData[j];
        if (videoProgramBrief)
        {
            var videoProgramTileDef = new CESProgramTileDef(
                videoProgramBrief.id, 
                videoProgramBrief.type, 
                videoProgramBrief.title, 
                videoProgramBrief.imageSrc, 
                videoProgramBrief.videoPlayerCtrlImageSrc, 
                videoProgramBrief.videoURI, 
                0, 
                0, 
                CESProgramTileDef.WEIGHTING_SIZE_SMALL);
            
            videoDataSet.push(videoProgramTileDef);
        }
    }
    
    var vidPlayerMediator = this.facade.retrieveMediator(AppConstants.VIDEO_PAGE_MEDIATOR_NAME);
    if (vidPlayerMediator)
    {
        vidPlayerMediator.loadPlaylist(videoDataSet);
    }
}


/*  TileConfiguration class */

function TileConfiguration(positionX, positionY, weightingSize)
{
    this.positionX = positionX;
    this.positionY = positionY;
    this.weightingSize = weightingSize;
}

