CESVideoPlayerPage.prototype = new UIComponent;
CESVideoPlayerPage.prototype.parent = UIComponent.prototype;

CESVideoPlayerPage.prototype.constructor = CESVideoPlayerPage;

CESVideoPlayerPage.BACK_SELECTED = "backSelected";
CESVideoPlayerPage.VIDEO_ENDED = "videoEnded";

CESVideoPlayerPage.prototype.isControlsVisible = false;

CESVideoPlayerPage.prototype.videoTimer = null;
CESVideoPlayerPage.VIDEO_PLAYBACK_TIME_LIMIT = 180;

function CESVideoPlayerPage(divElem)
{
    UIComponent.apply(this, arguments);
    
    if (this.divElem)
    {
        this.vidElem = document.getElementById('video');
        this.backToRecsBtn = document.getElementById('backBtn');
        this.playBtn = document.getElementById('playBtn');
        
        this.timeUpdateHandler = Relegate.create(this, this.videoTimeUpdated);
        this.touchEventHandler = Relegate.create(this, this.onTouchStart);
        
        this.backToRecsEventHandler = Relegate.create(this, this.onBackToRecsTouch);
        this.playTouchEventHandler = Relegate.create(this, this.onPlayTouch);
        
        this.vidElem.addEventListener("ended", Relegate.create(this, this.onVideoEnded));
        
        //this is a PhoneGap specific event that is triggered when the app goes to the background.
        //this logic will make sure to pause the video and show the play icon.
        document.addEventListener("pause", Relegate.create(this, this.onPause), false);
    }
}

CESVideoPlayerPage.prototype.onPause = function()
{
    this.pause();
}

CESVideoPlayerPage.prototype.startVideoTimer = function()
{
    console.log("CESVideoPlayerPage.prototype.startVideoTimer");
    this.stopVideoTimer();
    $(this.vidElem).on("timeupdate", this.timeUpdateHandler);
}

CESVideoPlayerPage.prototype.stopVideoTimer = function()
{
    console.log("CESVideoPlayerPage.prototype.stopVideoTimer");
    $(this.vidElem).off("timeupdate", this.timeUpdateHandler);
}

CESVideoPlayerPage.prototype.videoTimeUpdated = function()
{
    var time = parseInt(this.vidElem.currentTime);
    if (time > CESVideoPlayerPage.VIDEO_PLAYBACK_TIME_LIMIT)
    {
        console.log("TRIGGERING EARLY VIDEO END: time limit = " + CESVideoPlayerPage.VIDEO_PLAYBACK_TIME_LIMIT);
        this.stopVideoTimer();
        this.stop();
    }
}

CESVideoPlayerPage.prototype.onVideoEnded = function(event)
{
    this.dispatchEvent(CESVideoPlayerPage.VIDEO_ENDED);
    
    //prevent from causing touch event on parent div
    event.cancelBubble = true;
    if (event.stopPropagation)
        event.stopPropagation();
}

CESVideoPlayerPage.prototype.onBackToRecsTouch = function(event)
{
    this.pause();
    
    this.dispatchEvent(CESVideoPlayerPage.BACK_SELECTED);
    
    //prevent from causing touch event on parent div
    event.cancelBubble = true;
    if (event.stopPropagation)
        event.stopPropagation();
}

CESVideoPlayerPage.prototype.onPlayTouch = function(event)
{
    if (this.isPaused())
    {
        this.play();
    }
    
    //prevent from causing touch event on parent div
    event.cancelBubble = true;
    if (event.stopPropagation)
        event.stopPropagation();
}

CESVideoPlayerPage.prototype.touchWithinSafeZone = function(touchX, touchY)
{
    return !this.touchWithinElement(touchX, touchY, this.backToRecsBtn);
}

CESVideoPlayerPage.prototype.touchWithinElement = function(touchX, touchY, element)
{
    var isWithinElement = false;
    if (element)
    {
        var jqueryElement = $(element).first();
        var position = jqueryElement.position();
        var topBoundary = position.top;
        var bottomBoundary = topBoundary + jqueryElement.height();
        var leftBoundary = position.left
        var rightBoundary = leftBoundary + jqueryElement.width();
        
        isWithinElement = 
            ((touchX >= leftBoundary) && (touchX <= rightBoundary) && 
            (touchY >= topBoundary) && (touchY <= bottomBoundary));
    }
    return isWithinElement;
}

CESVideoPlayerPage.prototype.onTouchStart = function(event)
{
    if (event.touches.length == 1)
    {
        if (this.touchWithinSafeZone(event.touches[0].screenX, event.touches[0].screenY))
        {
            if (!this.isControlsVisible)
            {
                this.pause();
                this.showControls();
            }
            else
            {
                this.play();
                this.hideControls();
            }
        }
    }
}

CESVideoPlayerPage.prototype.hideControls = function()
{
    if (this.playBtn)
    {
        this.isControlsVisible = false;
        
        this.playBtn.style.display = 'none';
    }
}

CESVideoPlayerPage.prototype.showControls = function()
{
    if (this.backToRecsBtn)
    {
        this.isControlsVisible = true;
        
        this.playBtn.style.display = 'block';
    }
}

CESVideoPlayerPage.prototype.hide = function()
{
    console.log("CESVideoPlayerPage.prototype.hide(): [START]");
    this.hideControls();
    this.pause();
    this.divElem.setAttribute("style", "display:none;");
    this.divElem.removeEventListener("touchstart", this.touchEventHandler);
    this.backToRecsBtn.removeEventListener("touchend", this.backToRecsEventHandler);
    this.stopVideoTimer();
    console.log("CESVideoPlayerPage.prototype.hide(): [END]");
}

CESVideoPlayerPage.prototype.show = function()
{
    console.log("CESVideoPlayerPage.prototype.show(): [START]");
    this.divElem.setAttribute("style", "display:block;");
    this.divElem.addEventListener("touchstart", this.touchEventHandler , false);
    this.backToRecsBtn.addEventListener("touchend", this.backToRecsEventHandler, false);
    console.log("CESVideoPlayerPage.prototype.show(): [END]");
}

CESVideoPlayerPage.prototype.loadVideo = function(videoURI)
{
    this.stopVideoTimer();
    var srcHtml = '<source src="' + videoURI + '">';
    if (this.vidElem)
    {
        this.vidElem.innerHTML = srcHtml;
        this.videoStopped = false;
        this.startVideoTimer();
    }
}

CESVideoPlayerPage.prototype.isPaused = function()
{
    return this.vidElem.paused;
}

CESVideoPlayerPage.prototype.play = function()
{
    if (this.vidElem)
    {
        if (!this.videoStopped)
        {
            this.vidElem.play();
        }
        else
        {
            this.vidElem.currentTime = 0;
            this.vidElem.play();
            this.startVideoTimer();
            this.videoStopped = false;
        }
    }
}

CESVideoPlayerPage.prototype.pause = function()
{
    if (this.vidElem && !this.videoStopped)
    {
        this.vidElem.pause();
    }
}

CESVideoPlayerPage.prototype.stop = function()
{
    if (this.vidElem)
    {
        console.log("STOPPING VIDEO");
        this.videoStopped = true;
        this.vidElem.pause();
        this.showControls();
        this.vidElem.innerHTML = "<source src=''>";
        this.dispatchEvent(CESVideoPlayerPage.VIDEO_ENDED);
    }
}