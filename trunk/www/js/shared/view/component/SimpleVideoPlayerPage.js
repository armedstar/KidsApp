jingo.declare(
{
    require: 
    [
        "shared.view.component.UIComponent"
    ],
    name: 'shared.view.component.SimpleVideoPlayerPage',
    as: function() 
    {

        shared.view.component.SimpleVideoPlayerPage = function(divElem)
        {
            shared.view.component.UIComponent.apply(this, arguments);
    
            if (this.divElem)
            {
                this.vidElem = document.getElementById('simpleVideoPlayer_video');
                this.backToRecsBtn = document.getElementById('simpleVideoPlayer_backBtn');
                this.playBtn = document.getElementById('simpleVideoPlayer_playBtn');
        
                this.timeUpdateHandler = Relegate.create(this, this.videoTimeUpdated);
                this.touchEventHandler = Relegate.create(this, this.onTouchStart);
                this.mouseEventHandler = Relegate.create(this, this.onMouseDown);
        
                this.backToRecsEventHandler = Relegate.create(this, this.onBackToRecsTouch);
                this.playTouchEventHandler = Relegate.create(this, this.onPlayTouch);
        
                this.vidElem.addEventListener("ended", Relegate.create(this, this.onVideoEnded));
        
                //this is a PhoneGap specific event that is triggered when the app goes to the background.
                //this logic will make sure to pause the video and show the play icon.
                document.addEventListener("pause", Relegate.create(this, this.onPause), false);
            }
        }

        shared.view.component.SimpleVideoPlayerPage.prototype = new shared.view.component.UIComponent;
        shared.view.component.SimpleVideoPlayerPage.prototype.parent = shared.view.component.UIComponent.prototype;
        shared.view.component.SimpleVideoPlayerPage.prototype.constructor = shared.view.component.SimpleVideoPlayerPage;
        
        shared.view.component.SimpleVideoPlayerPage.VIDEO_PLAYBACK_TIME_LIMIT_ENABLED = false;
        shared.view.component.SimpleVideoPlayerPage.VIDEO_PLAYBACK_TIME_LIMIT = 180;

        shared.view.component.SimpleVideoPlayerPage.BACK_SELECTED = "backSelected";
        shared.view.component.SimpleVideoPlayerPage.VIDEO_ENDED = "videoEnded";

        shared.view.component.SimpleVideoPlayerPage.prototype.isControlsVisible = false;

        shared.view.component.SimpleVideoPlayerPage.prototype.videoTimer = null;

        shared.view.component.SimpleVideoPlayerPage.prototype.onPause = function()
        {
            this.pause();
        }

        shared.view.component.SimpleVideoPlayerPage.prototype.startVideoTimer = function()
        {
            if (shared.view.component.SimpleVideoPlayerPage.VIDEO_PLAYBACK_TIME_LIMIT_ENABLED)
            {
                console.log("shared.view.component.SimpleVideoPlayerPage.prototype.startVideoTimer");
                this.stopVideoTimer();
                $(this.vidElem).on("timeupdate", this.timeUpdateHandler);
            }
        }

        shared.view.component.SimpleVideoPlayerPage.prototype.stopVideoTimer = function()
        {
            if (shared.view.component.SimpleVideoPlayerPage.VIDEO_PLAYBACK_TIME_LIMIT_ENABLED)
            {
                console.log("shared.view.component.SimpleVideoPlayerPage.prototype.stopVideoTimer");
                $(this.vidElem).off("timeupdate", this.timeUpdateHandler);
            }
        }

        shared.view.component.SimpleVideoPlayerPage.prototype.videoTimeUpdated = function()
        {
            var time = parseInt(this.vidElem.currentTime);
            if (time > shared.view.component.SimpleVideoPlayerPage.VIDEO_PLAYBACK_TIME_LIMIT)
            {
                console.log("TRIGGERING EARLY VIDEO END: time limit = " + shared.view.component.SimpleVideoPlayerPage.VIDEO_PLAYBACK_TIME_LIMIT);
                this.stopVideoTimer();
                this.stop();
            }
        }

        shared.view.component.SimpleVideoPlayerPage.prototype.onVideoEnded = function(event)
        {
            this.dispatchEvent(shared.view.component.SimpleVideoPlayerPage.VIDEO_ENDED);
    
            //prevent from causing touch event on parent div
            event.cancelBubble = true;
            if (event.stopPropagation)
                event.stopPropagation();
        }

        shared.view.component.SimpleVideoPlayerPage.prototype.onBackToRecsTouch = function(event)
        {
            this.pause();
    
            this.dispatchEvent(shared.view.component.SimpleVideoPlayerPage.BACK_SELECTED);
    
            //prevent from causing touch event on parent div
            event.cancelBubble = true;
            if (event.stopPropagation)
                event.stopPropagation();
        }

        shared.view.component.SimpleVideoPlayerPage.prototype.onPlayTouch = function(event)
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

        shared.view.component.SimpleVideoPlayerPage.prototype.touchWithinSafeZone = function(touchX, touchY)
        {
            return !this.touchWithinElement(touchX, touchY, this.backToRecsBtn);
        }

        shared.view.component.SimpleVideoPlayerPage.prototype.touchWithinElement = function(touchX, touchY, element)
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

        shared.view.component.SimpleVideoPlayerPage.prototype.onTouchStart = function(event)
        {
            if (event.touches.length == 1)
            {
                if (this.touchWithinSafeZone(event.touches[0].screenX, event.touches[0].screenY))
                {
                    this.toggleControls();
                }
            }
        }
        
        shared.view.component.SimpleVideoPlayerPage.prototype.onMouseDown = function(mouseEvent)
        {
            if (mouseEvent)
            {
                //var mouseX = this._convertTouchRelativeToCanvas(x, this.divElem.x);
                //var mouseY = this._convertTouchRelativeToCanvas(y, this.divElem.y);
            
                if (this.touchWithinSafeZone(mouseEvent.x, mouseEvent.y))
                {
                    this.toggleControls();
                }
            }
        }
        
        shared.view.component.SimpleVideoPlayerPage.prototype.toggleControls = function()
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

        shared.view.component.SimpleVideoPlayerPage.prototype.hideControls = function()
        {
            if (this.backToRecsBtn && this.playBtn)
            {
                this.isControlsVisible = false;
                $(this.playBtn).hide();
                $(this.backToRecsBtn).hide();
            }
        }

        shared.view.component.SimpleVideoPlayerPage.prototype.showControls = function()
        {
            if (this.backToRecsBtn && this.playBtn)
            {
                this.isControlsVisible = true;
                $(this.playBtn).show();
                $(this.backToRecsBtn).show();
            }
        }

        shared.view.component.SimpleVideoPlayerPage.prototype.hide = function()
        {
            console.log("shared.view.component.SimpleVideoPlayerPage.prototype.hide(): [START]");
            this.hideControls();
            this.pause();
            this.divElem.setAttribute("style", "display:none;");
            this.divElem.removeEventListener("touchstart", this.touchEventHandler);
            this.divElem.removeEventListener("mousedown", this.mouseEventHandler);
            this.backToRecsBtn.removeEventListener("touchend", this.backToRecsEventHandler);
            this.backToRecsBtn.removeEventListener("mouseup", this.backToRecsEventHandler);
            this.stopVideoTimer();
            console.log("shared.view.component.SimpleVideoPlayerPage.prototype.hide(): [END]");
        }

        shared.view.component.SimpleVideoPlayerPage.prototype.show = function()
        {
            console.log("shared.view.component.SimpleVideoPlayerPage.prototype.show(): [START]");
            this.divElem.setAttribute("style", "display:block;");
            this.divElem.addEventListener("touchstart", this.touchEventHandler , false);
            this.divElem.addEventListener("mousedown", this.mouseEventHandler , false);
            this.backToRecsBtn.addEventListener("touchend", this.backToRecsEventHandler, false);
            this.backToRecsBtn.addEventListener("mouseup", this.backToRecsEventHandler, false);
            console.log("shared.view.component.SimpleVideoPlayerPage.prototype.show(): [END]");
        }

        shared.view.component.SimpleVideoPlayerPage.prototype.loadVideo = function(videoURI)
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

        shared.view.component.SimpleVideoPlayerPage.prototype.isPaused = function()
        {
            return this.vidElem.paused;
        }

        shared.view.component.SimpleVideoPlayerPage.prototype.play = function()
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

        shared.view.component.SimpleVideoPlayerPage.prototype.pause = function()
        {
            if (this.vidElem && !this.videoStopped)
            {
                this.vidElem.pause();
            }
        }

        shared.view.component.SimpleVideoPlayerPage.prototype.stop = function()
        {
            if (this.vidElem)
            {
                console.log("STOPPING VIDEO");
                this.videoStopped = true;
                this.vidElem.pause();
                this.showControls();
                this.vidElem.innerHTML = "<source src=''>";
                this.dispatchEvent(shared.view.component.SimpleVideoPlayerPage.VIDEO_ENDED);
            }
        }
        
    }
});