jingo.declare(
{
    require: 
    [
        "shared.view.component.UIComponent"
    ],
    name: 'shared.view.component.AdvancedVideoPlayerPage',
    as: function() 
    {

        shared.view.component.AdvancedVideoPlayerPage = function(divElem)
        {
            shared.view.component.UIComponent.apply(this, arguments);
    
            if (this.divElem)
            {
                this.vidElem = document.getElementById('advancedVideoPlayer_video');
                this.backToRecsBtn = document.getElementById('advancedVideoPlayer_backBtn');
                this.playBtn = document.getElementById('advancedVideoPlayer_playBtn');
                this.scrubber = document.getElementById('advancedVideoPlayer_scrubber');
                this.progressMeter = document.getElementById('advancedVideoPlayer_progress');
                this.scrubberBtn = document.getElementById('advancedVideoPlayer_scrubberButton');
                this.episodeCloseBtn = document.getElementById('advancedVideoPlayer_episodesCloseButton');
                this.videoListHeaderBox = document.getElementById('advancedVideoPlayer_videoListHeaderBox');
                this.videoListTitleArea = document.getElementById('advancedVideoPlayer_videoListTitle');
                this.videoList = document.getElementById('advancedVideoPlayer_videoList');
                this.videoListWrapper = document.getElementById('advancedVideoPlayer_videoListWrapper');
                this.episodesBtn = document.getElementById('advancedVideoPlayer_episodesBtn');
                this.closeEpisodesBtn = document.getElementById('advancedVideoPlayer_videoListClose');
                this.timeRemaining = document.getElementById('advancedVideoPlayer_timeRemaining');
                this.headerBox = document.getElementById('advancedVideoPlayer_headerBox');
                this.controlBox = document.getElementById('advancedVideoPlayer_controlBox');
                this.programTitleArea = document.getElementById('advancedVideoPlayer_programTitle');
        
                this.timeUpdateHandler = Relegate.create(this, this.videoTimeUpdated);
                this.touchEventHandler = Relegate.create(this, this.onTouchStart);
                this.mouseEventHandler = Relegate.create(this, this.onMouseDown);
                this.beforeScrollMoveHandler = Relegate.create(this, this.onBeforeScrollMove);
        
                this.videoScrollList = new iScroll('advancedVideoPlayer_videoList', { hScroll: true, vScroll: false, onBeforeScrollMove: this.beforeScrollMoveHandler });
        
                this.backToRecsEventHandler = Relegate.create(this, this.onBackToRecsTouch);
                this.playTouchEventHandler = Relegate.create(this, this.onPlayTouch);
                this.episodesEventHandler = Relegate.create(this, this.onEpisodesTouch);
                this.closeEpisodesEventHandler = Relegate.create(this, this.onCloseEpisodesTouch);
                this.scrubberTouchStartHandler = Relegate.create(this, this.onScrubberTouchStart);
                this.scrubberMouseDownHandler = Relegate.create(this, this.onScrubberMouseDown);
                this.scrubberTouchMoveHandler = Relegate.create(this, this.onScrubberTouchMove);
                this.scrubberMouseMoveHandler = Relegate.create(this, this.onScrubberMouseMove);
                this.scrubberTouchEndHandler = Relegate.create(this, this.onScrubberTouchEnd);
                this.scrubberMouseUpHandler = Relegate.create(this, this.onScrubberMouseUp);
        
                this.vidElem.addEventListener("ended", Relegate.create(this, this.onVideoEnded));
        
                //this is a PhoneGap specific event that is triggered when the app goes to the background.
                //this logic will make sure to pause the video and show the play icon.
                document.addEventListener("pause", Relegate.create(this, this.onPause), false);
            }
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype = new shared.view.component.UIComponent;
        shared.view.component.AdvancedVideoPlayerPage.prototype.parent = shared.view.component.UIComponent.prototype;
        shared.view.component.AdvancedVideoPlayerPage.prototype.constructor = shared.view.component.AdvancedVideoPlayerPage;
        
        shared.view.component.AdvancedVideoPlayerPage.MAX_TEXT_LENGTH = 30;
        
        shared.view.component.AdvancedVideoPlayerPage.VIDEO_PLAYBACK_TIME_LIMIT = 180;
        shared.view.component.AdvancedVideoPlayerPage.VIDEO_IMG_PLACEHOLDER = 'images/pages/shared/advancedVideoPlayer/episodesTileBg.png';

        shared.view.component.AdvancedVideoPlayerPage.BACK_SELECTED = "backSelected";
        shared.view.component.AdvancedVideoPlayerPage.VIDEO_ENDED = "videoEnded";
        shared.view.component.AdvancedVideoPlayerPage.VIDEO_SELECTED = "videoSelected";

        shared.view.component.AdvancedVideoPlayerPage.prototype.isControlsVisible = false;

        shared.view.component.AdvancedVideoPlayerPage.prototype.videoTimer = null;
        //shared.view.component.AdvancedVideoPlayerPage.prototype._previousVideoTime = null;

        shared.view.component.AdvancedVideoPlayerPage.prototype.setThemeSettings = function(theme)
        {
              $(this.programTitleArea).css('color', theme.videoPlayerFontColor);
              $(this.progressMeter).css('background-color', theme.videoPlayerFontColor);
              $(this.scrubberBtn).html('<img id="advancedVideoPlayer_scrubberGraphic" src="' + theme.videoPlayerScrubberButton + '" />');
              $(this.episodeCloseBtn).html('<img src="' + theme.videoPlayerEpisodeCloseButton + '" />');
              $(this.videoListTitleArea).css('color', theme.videoPlayerFontColor);
              $(".advancedVideoPlayer_videoTileTitle").css('color', theme.videoPlayerFontColor);
        }
              
        shared.view.component.AdvancedVideoPlayerPage.prototype.onPause = function()
        {
            this.pause();
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.startVideoTimer = function()
        {
            console.log("shared.view.component.AdvancedVideoPlayerPage.prototype.startVideoTimer");
            $(this.vidElem).on("timeupdate", this.timeUpdateHandler);
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.stopVideoTimer = function()
        {
            console.log("shared.view.component.AdvancedVideoPlayerPage.prototype.stopVideoTimer");
            $(this.vidElem).off("timeupdate", this.timeUpdateHandler);
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.updateProgress = function(percent, remainingTime)
        {
              $(this.progressMeter).width((percent * 100) + "%");
              $(this.scrubberBtn).width((percent * 100) + "%");
              $(this.timeRemaining).html(this.formatTime(remainingTime));
        }
              
        shared.view.component.AdvancedVideoPlayerPage.prototype.formatTime = function(time)
        {
            var timeStr = remaining.getStringDigital(time);
            while (timeStr.lastIndexOf(':NaN') != -1) 
            {
                timeStr = timeStr.substring(0, timeStr.lastIndexOf(':NaN'));
            }
            
            if (timeStr == "NaN")
            {
                timeStr = "";
            }
            
            if (timeStr.substr(0, 2) == "00")
                timeStr = timeStr.substring(3);
            return timeStr;
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.updateVideoTime = function(percent)
        {
            this.pause();
            this.vidElem.currentTime = percent * this.vidElem.duration;
            this.play();
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.videoTimeUpdated = function()
        {
            var time = parseInt(this.vidElem.currentTime);
            var percent = time / this.vidElem.duration;
            var remainingTime = parseInt(this.vidElem.duration) - time;
            this.updateProgress(percent, remainingTime);
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.onVideoEnded = function(event)
        {
            this.dispatchEvent(shared.view.component.AdvancedVideoPlayerPage.VIDEO_ENDED);
            this.stopVideoTimer();
            this.stop();
    
            //prevent from causing touch event on parent div
            event.cancelBubble = true;
            if (event.stopPropagation)
                event.stopPropagation();
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.showEpisodesOverlay = function()
        {
            this.episodesVisible = true;
            $(this.videoListHeaderBox).show();
            this.closeEpisodesBtn.style.display = 'block';
            this.videoList.style.display = 'block';
            this.videoScrollList.refresh();
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.hideEpisodesOverlay = function()
        {
            this.episodesVisible = false;
            $(this.videoListHeaderBox).hide();
            this.closeEpisodesBtn.style.display = 'none';
            this.videoList.style.display = 'none';
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.onCloseEpisodesTouch = function(event)
        {
            this.hideEpisodesOverlay();
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.onEpisodesTouch = function(event)
        {
            this.hideControls();
            this.showEpisodesOverlay();
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.onScrubberTouchStart = function(event)
        {
            this._isScrubberMoving = true;
            this._handleScrubberMove(event.targetTouches[0].pageX);
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.onScrubberMouseDown = function(mouseEvent)
        {
            this._isScrubberMoving = true;
            this._handleScrubberMove(mouseEvent.x);
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.onScrubberTouchMove = function(event)
        {
            if (this._isScrubberMoving)
            {
                this._handleScrubberMove(event.targetTouches[0].pageX);
            }
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.onScrubberMouseMove = function(mouseEvent)
        {
            if (this._isScrubberMoving)
            {
                this._handleScrubberMove(mouseEvent.x);
            }
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.onScrubberTouchEnd = function(event)
        {
            this._isScrubberMoving = false;
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.onScrubberMouseUp = function(mouseEvent)
        {
            this._isScrubberMoving = false;
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype._handleScrubberMove = function(touch_left)
        {
            var scrubber_left = $(this.scrubber).offset().left;
            var percent;
            if (touch_left <= scrubber_left)
            {
                percent = 0;
            }
            else
            {
                percent = (touch_left - scrubber_left) / $(this.scrubber).width();
            }
            this.updateVideoTime(percent);
    
            //prevent from causing touch event on parent div
            event.cancelBubble = true;
            if (event.stopPropagation)
                event.stopPropagation();
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.onBackToRecsTouch = function(event)
        {
            this.pause();
    
            this.dispatchEvent(shared.view.component.AdvancedVideoPlayerPage.BACK_SELECTED);
    
            //prevent from causing touch event on parent div
            event.cancelBubble = true;
            if (event.stopPropagation)
                event.stopPropagation();
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.onPlayTouch = function(event)
        {
            if (this.isPaused())
            {
                this.play();
            }
            else {
                this.pause();
            }
    
            //prevent from causing touch event on parent div
            event.cancelBubble = true;
            if (event.stopPropagation)
                event.stopPropagation();
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.touchWithinSafeZone = function(touchX, touchY)
        {
            return (!this.episodesVisible) && (!this.touchWithinElement(touchX, touchY, this.controlBox)) &&
              (!this.touchWithinElement(touchX, touchY, this.headerBox));
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.touchWithinElement = function(touchX, touchY, element)
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

        shared.view.component.AdvancedVideoPlayerPage.prototype.onTouchStart = function(event)
        {
            if (event.touches.length == 1)
            {
                if (this.touchWithinSafeZone(event.touches[0].screenX, event.touches[0].screenY))
                {
                    this.toggleControls();
                }
            }
        }
        
        shared.view.component.AdvancedVideoPlayerPage.prototype.onMouseDown = function(mouseEvent)
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
        
        shared.view.component.AdvancedVideoPlayerPage.prototype.toggleControls = function()
        {
            if (!this.isControlsVisible)
            {
                this.showControls();
            }
            else
            {
                this.hideControls();
            }
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.startHideControlsTimer = function()
        {
            this.stopHideControlsTimer();
            this.hideTimer = window.setTimeout(Relegate.create(this, this.hideControls), 7000);
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.stopHideControlsTimer = function()
        {
            if (this.hideTimer)
            {
                window.clearInterval(this.hideTimer);
                this.hideTimer = null;
            }
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.hideControls = function()
        {
            this.isControlsVisible = false;
            this._isScrubberMoving = false;
            
              $(this.controlBox).hide();
              $(this.headerBox).hide();
              
            if (this.controlTimeout) {
                window.clearTimeout(this.controlTimeout);
                this.controlTimeout = null;
            }
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.showControls = function()
        {
            this.isControlsVisible = true;
            this._isScrubberMoving = false;
              $(this.controlBox).show();
              $(this.headerBox).show();
            this.controlTimeout = window.setTimeout(Relegate.create(this, this.hideControls), 7000);
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.hide = function()
        {
            //console.log("shared.view.component.AdvancedVideoPlayerPage.prototype.hide(): [START]");
            this.hideControls();
            this.pause();
            this.divElem.setAttribute("style", "display:none;");
            this.divElem.removeEventListener("touchstart", this.touchEventHandler);
            this.divElem.removeEventListener("mousedown", this.mouseEventHandler);
            this.playBtn.removeEventListener("touchend", this.playTouchEventHandler);
            this.playBtn.removeEventListener("mouseup", this.playTouchEventHandler);
            this.backToRecsBtn.removeEventListener("touchend", this.backToRecsEventHandler);
            this.backToRecsBtn.removeEventListener("mouseup", this.backToRecsEventHandler);
            this.scrubber.removeEventListener("touchstart", this.scrubberTouchStartHandler);
            this.scrubber.removeEventListener("mousedown", this.scrubberMouseDownHandler);
            this.scrubber.removeEventListener("touchmove", this.scrubberTouchMoveHandler);
            this.scrubber.removeEventListener("mousemove", this.scrubberMouseMoveHandler);
            this.scrubber.removeEventListener("touchend", this.scrubberTouchEndHandler);
            this.scrubber.removeEventListener("mouseup", this.scrubberMouseUpHandler);
            this.episodesBtn.removeEventListener("touchend", this.episodesEventHandler);
            this.episodesBtn.removeEventListener("mouseup", this.episodesEventHandler);
            this.closeEpisodesBtn.removeEventListener("touchend", this.closeEpisodesEventHandler);
            this.closeEpisodesBtn.removeEventListener("mouseup", this.closeEpisodesEventHandler);
            this.stopVideoTimer();
            //console.log("shared.view.component.AdvancedVideoPlayerPage.prototype.hide(): [END]");
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.show = function(currentUser)
        {
            if (currentUser && currentUser.theme)
            {
              this.setThemeSettings(currentUser.theme);
            }
              
            //console.log("shared.view.component.AdvancedVideoPlayerPage.prototype.show(): [START]");
            this.divElem.setAttribute("style", "display:block;");
            this.showControls();
            this.divElem.addEventListener("touchstart", this.touchEventHandler , false);
            this.divElem.addEventListener("mousedown", this.mouseEventHandler , false);
            this.playBtn.addEventListener("touchend", this.playTouchEventHandler, false);
            this.playBtn.addEventListener("mouseup", this.playTouchEventHandler, false);
            this.backToRecsBtn.addEventListener("touchend", this.backToRecsEventHandler, false);
            this.backToRecsBtn.addEventListener("mouseup", this.backToRecsEventHandler, false);
            this.scrubber.addEventListener("touchstart", this.scrubberTouchStartHandler, false);
            this.scrubber.addEventListener("mousedown", this.scrubberMouseDownHandler, false);
            this.scrubber.addEventListener("touchmove", this.scrubberTouchMoveHandler, false);
            this.scrubber.addEventListener("mousemove", this.scrubberMouseMoveHandler, false);
            this.scrubber.addEventListener("touchend", this.scrubberTouchEndHandler, false);
            this.scrubber.addEventListener("mouseup", this.scrubberMouseUpHandler, false);
            this.episodesBtn.addEventListener("touchend", this.episodesEventHandler, false);
            this.episodesBtn.addEventListener("mouseup", this.episodesEventHandler, false);
            this.closeEpisodesBtn.addEventListener("touchend", this.closeEpisodesEventHandler, false);
            this.closeEpisodesBtn.addEventListener("mouseup", this.closeEpisodesEventHandler, false);
            //console.log("shared.view.component.AdvancedVideoPlayerPage.prototype.show(): [END]");
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.onBeforeScrollMove = function()
        {
            //console.log("shared.view.component.AdvancedVideoPlayerPage.prototype.onBeforeScrollMove(): [START]");
            this._isScrolling = true;
            //console.log("shared.view.component.AdvancedVideoPlayerPage.prototype.onBeforeScrollMove(): [END]");
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.loadPlaylist = function(playlistTitle, playlist)
        {
            this.videoListWrapper.innerHTML = "";
            var videoCount = 0;
            for (var key in playlist)
            {
                var playlistItem = playlist[key];
                if (playlistItem)
                {
                    videoCount++;
                    this.addVideoToPlaylist(
                        playlistItem.programId, 
                        playlistItem.programTitle, 
                        playlistItem.__episodeNumber,
                        playlistItem.videoPlayerCtrlImageSrc);
                }
            }
            
            $(this.videoListWrapper).css('width', (videoCount * (436 + 10)) + "px");
            this.videoScrollList.scrollTo(0, 0, 0);
            
            if (this.videoListTitleArea)
            {
                var videoListTitle = playlistTitle + ": " + videoCount + " " + ((videoCount == 1) ? "Episode" : "Episodes");
                $(this.videoListTitleArea).html(videoListTitle);
            }
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.addVideoToPlaylist = function(programId, programTitle, episodeNumber, programImageSrc)
        {
            //TODO:  figure out what it means to be actionable vs. nonactionable?
            var commandDiv = document.createElement('div');
            commandDiv.id = programId;
            commandDiv.className = 'nonActionable';
    
            var content = '';
            if (programImageSrc)
            {
                content = '<img class="advancedVideoPlayer_videoListItemImage" style="position: absolute; left:18px; top: 16px; width:400px; height:240px; opacity:1.0;" src="' + programImageSrc + '" />';
            }
            if (programTitle)
            {
                content += '<div class="advancedVideoPlayer_videoTileTitle">' + this._formatVideoTileTitle(programTitle, episodeNumber) + '</div>';
            }
    
            commandDiv.innerHTML = '<div style="width:436px;height:312px; overflow: hidden; position: relative; display: inline; float: left; opacity:1.0; background:url(' + shared.view.component.AdvancedVideoPlayerPage.VIDEO_IMG_PLACEHOLDER + ') no-repeat;">' + content + '</div>';
    
            commandDiv.addEventListener("touchend", Relegate.create(this, this.onVideoListItemTouch, programId), false);
            commandDiv.addEventListener("mouseup", Relegate.create(this, this.onVideoListItemTouch, programId), false);
            this.videoListWrapper.appendChild(commandDiv);
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype._formatVideoTileTitle = function(programTitle, episodeNumber)
        {
            var maxTextLength = shared.view.component.AdvancedVideoPlayerPage.MAX_TEXT_LENGTH;
            var formattedTitle = "Ep " + episodeNumber + ": " + programTitle;
            
            if (formattedTitle.length > maxTextLength)
            {
                return formattedTitle.substring(0, maxTextLength) + "...";
            }
            else
            {
                return formattedTitle;
            }
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.onVideoListItemTouch = function(event, programId)
        {
            console.log("shared.view.component.AdvancedVideoPlayerPage.prototype.onVideoListItemTouch: VIDEO_SELECTED [START]  programId = " + programId);
    
            if (!this._isScrolling)
            {
                this.hideControls();
                this.hideEpisodesOverlay();
                this.dispatchEvent(shared.view.component.AdvancedVideoPlayerPage.VIDEO_SELECTED, { programId: programId });
            }
    
            this._isScrolling = false;
    
    
            //prevent from causing touch event on parent div
            /*event.cancelBubble = true;
            if (event.stopPropagation)
                event.stopPropagation();*/
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.loadVideo = function(videoURI, programTitle)
        {
            this.stopVideoTimer();
            var srcHtml = '<source src="' + videoURI + '">';
            if (this.programTitleArea)
              $(this.programTitleArea).html(programTitle);
            if (this.vidElem)
            {
                this.vidElem.innerHTML = srcHtml;
                this.videoStopped = false;
                this.startVideoTimer();
            }
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.isPaused = function()
        {
            return this.vidElem.paused;
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.play = function()
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
                $(this.playBtn).html('<img src="images/pages/shared/advancedVideoPlayer/pauseBtn.png" />');
            }
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.pause = function()
        {
            if (this.vidElem && !this.videoStopped)
            {
                this.vidElem.pause();
                $(this.playBtn).html('<img src="images/pages/shared/advancedVideoPlayer/playBtn.png" />');
            }
        }

        shared.view.component.AdvancedVideoPlayerPage.prototype.stop = function()
        {
            if (this.vidElem)
            {
                console.log("STOPPING VIDEO");
                this.videoStopped = true;
                this.vidElem.pause();
                this.showControls();
                this.vidElem.innerHTML = "<source src=''>";
                this.vidElem.currentTime = 0;
                this.dispatchEvent(shared.view.component.AdvancedVideoPlayerPage.VIDEO_ENDED);
                $(this.playBtn).html('<img src="images/pages/shared/advancedVideoPlayer/playBtn.png" />');
            }
        }
    
    }
});