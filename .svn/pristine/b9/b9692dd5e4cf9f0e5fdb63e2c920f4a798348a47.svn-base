jingo.declare(
{
    require: 
    [
        "shared.model.Theme"
    ],
    name: 'shared.model.ThemeProxy',
    as: function() 
    {

        shared.model.ThemeProxy = function()
        {
            puremvc.Proxy.apply(this, [shared.model.ThemeProxy.NAME, new Array()]);
        
            this._createThemes();
        }
        
        shared.model.ThemeProxy.prototype = new puremvc.Proxy;
        shared.model.ThemeProxy.prototype.parent = puremvc.Proxy.prototype;
        shared.model.ThemeProxy.prototype.constructor = shared.model.ThemeProxy;
        
        shared.model.ThemeProxy.NAME = "ThemeProxy";
        
        shared.model.ThemeProxy.THEME_KEY_A03_DEFAULT = "theme_defaultA03";
        
        shared.model.ThemeProxy.THEME_KEY_A36_DEFAULT = "theme_defaultA36";
        shared.model.ThemeProxy.THEME_KEY_A36_PLANETARY = "theme_A36_planetary";
        shared.model.ThemeProxy.THEME_KEY_A36_SWEETIE_PIE = "theme_A36_sweetiePie";
        shared.model.ThemeProxy.THEME_KEY_A36_CHATTY_GIRAFFY = "theme_A36_chattyGiraffy";
        shared.model.ThemeProxy.THEME_KEY_A36_FARMIN_AROUND = "theme_A36_farminAround";
        
        shared.model.ThemeProxy.THEME_KEY_A79_BOYS = "theme_A79_boys";
        shared.model.ThemeProxy.THEME_KEY_A79_GIRLS = "theme_A79_girls";
        
        shared.model.ThemeProxy._THEME_A03_DEFAULT_DISPLAY_NAME = "";
        shared.model.ThemeProxy._THEME_A03_DEFAULT_BACKGROUND = "images/themes/ages_0to3/default/background.png";
        shared.model.ThemeProxy._THEME_A03_DEFAULT_SELECTION_ICON = "";
        shared.model.ThemeProxy._THEME_A03_DEFAULT_ICON = "";
        shared.model.ThemeProxy._THEME_A03_DEFAULT_NAMEPLATE_ICON = "images/themes/ages_0to3/default/nameplateIcon.png";
        shared.model.ThemeProxy._THEME_A03_DEFAULT_NAMEPLATE_FONT_COLOR = "#89BDBA";
        shared.model.ThemeProxy._THEME_A03_DEFAULT_NAMEPLATE_CLOSE_ICON = "images/themes/ages_0to3/default/closeBtn.png";
        shared.model.ThemeProxy._THEME_A03_DEFAULT_PROGRAM_TILE_FONT_COLOR = "#89BDBA";
        shared.model.ThemeProxy._THEME_A03_DEFAULT_VIDEO_PLAYER_FONT_COLOR = "#89BDBA";
        shared.model.ThemeProxy._THEME_A03_DEFAULT_VIDEO_SCRUBBER_BUTTON_ICON = "images/pages/shared/advancedVideoPlayer/scrubberHandleBoys.png";
        shared.model.ThemeProxy._THEME_A03_DEFAULT_VIDEO_EPISODES_CLOSE_ICON = "images/themes/ages_0to3/default/closeBtn.png";
        
        shared.model.ThemeProxy._THEME_A36_DEFAULT_DISPLAY_NAME = "";
        shared.model.ThemeProxy._THEME_A36_DEFAULT_BACKGROUND = "images/themes/ages_3to6/default/background.png";
        shared.model.ThemeProxy._THEME_A36_DEFAULT_SELECTION_ICON = "";
        shared.model.ThemeProxy._THEME_A36_DEFAULT_ICON = "images/themes/ages_3to6/default/themeIcon.png";
        shared.model.ThemeProxy._THEME_A36_DEFAULT_NAMEPLATE_ICON = "images/themes/ages_3to6/default/nameplateIcon.png";
        shared.model.ThemeProxy._THEME_A36_DEFAULT_NAMEPLATE_FONT_COLOR = "#666666";
        shared.model.ThemeProxy._THEME_A36_DEFAULT_NAMEPLATE_CLOSE_ICON = "images/themes/ages_3to6/default/closeBtn.png";
        shared.model.ThemeProxy._THEME_A36_DEFAULT_PROGRAM_TILE_FONT_COLOR = "#666666";
        shared.model.ThemeProxy._THEME_A36_DEFAULT_VIDEO_PLAYER_FONT_COLOR = "#666666";
        shared.model.ThemeProxy._THEME_A36_DEFAULT_VIDEO_SCRUBBER_BUTTON_ICON = "images/pages/shared/advancedVideoPlayer/scrubberHandleBoys.png";
        shared.model.ThemeProxy._THEME_A36_DEFAULT_VIDEO_EPISODES_CLOSE_ICON = "images/themes/ages_3to6/default/closeBtn.png";
        
        shared.model.ThemeProxy._THEME_A36_PLANETARY_DISPLAY_NAME = "Intergalactic, Planetary";
        shared.model.ThemeProxy._THEME_A36_PLANETARY_BACKGROUND = "images/themes/ages_3to6/planetary/background.png";
        shared.model.ThemeProxy._THEME_A36_PLANETARY_SELECTION_ICON = "images/themes/ages_3to6/planetary/themeSelectionIcon.png";
        shared.model.ThemeProxy._THEME_A36_PLANETARY_ICON = "images/themes/ages_3to6/planetary/themeIcon.png";
        shared.model.ThemeProxy._THEME_A36_PLANETARY_NAMEPLATE_ICON = "images/themes/ages_3to6/planetary/nameplateIcon.png";
        shared.model.ThemeProxy._THEME_A36_PLANETARY_NAMEPLATE_FONT_COLOR = "#4E9F9D";
        shared.model.ThemeProxy._THEME_A36_PLANETARY_NAMEPLATE_CLOSE_ICON = "images/themes/ages_3to6/planetary/closeBtn.png";
        shared.model.ThemeProxy._THEME_A36_PLANETARY_PROGRAM_TILE_FONT_COLOR = "#2E424B";
        shared.model.ThemeProxy._THEME_A36_PLANETARY_VIDEO_PLAYER_FONT_COLOR = "#4E9F9D";
        shared.model.ThemeProxy._THEME_A36_PLANETARY_VIDEO_SCRUBBER_BUTTON_ICON = "images/pages/shared/advancedVideoPlayer/scrubberHandleBoys.png";
        shared.model.ThemeProxy._THEME_A36_PLANETARY_VIDEO_EPISODES_CLOSE_ICON = "images/themes/ages_3to6/planetary/closeBtn.png";
        
        shared.model.ThemeProxy._THEME_A36_SWEETIE_PIE_DISPLAY_NAME = "Sweetie Pie";
        shared.model.ThemeProxy._THEME_A36_SWEETIE_PIE_BACKGROUND = "images/themes/ages_3to6/sweetiePie/background.png";
        shared.model.ThemeProxy._THEME_A36_SWEETIE_PIE_SELECTION_ICON = "images/themes/ages_3to6/sweetiePie/themeSelectionIcon.png";
        shared.model.ThemeProxy._THEME_A36_SWEETIE_PIE_ICON = "images/themes/ages_3to6/sweetiePie/themeIcon.png";
        shared.model.ThemeProxy._THEME_A36_SWEETIE_PIE_NAMEPLATE_ICON = "images/themes/ages_3to6/sweetiePie/nameplateIcon.png";
        shared.model.ThemeProxy._THEME_A36_SWEETIE_PIE_NAMEPLATE_FONT_COLOR = "#F1668B";
        shared.model.ThemeProxy._THEME_A36_SWEETIE_PIE_NAMEPLATE_CLOSE_ICON = "images/themes/ages_3to6/sweetiePie/closeBtn.png";
        shared.model.ThemeProxy._THEME_A36_SWEETIE_PIE_PROGRAM_TILE_FONT_COLOR = "#DF325D";
        shared.model.ThemeProxy._THEME_A36_SWEETIE_PIE_VIDEO_PLAYER_FONT_COLOR = "#F1668B";
        shared.model.ThemeProxy._THEME_A36_SWEETIE_PIE_VIDEO_SCRUBBER_BUTTON_ICON = "images/pages/shared/advancedVideoPlayer/scrubberHandleGirls.png";
        shared.model.ThemeProxy._THEME_A36_SWEETIE_PIE_VIDEO_EPISODES_CLOSE_ICON = "images/themes/ages_3to6/sweetiePie/closeBtn.png";
        
        shared.model.ThemeProxy._THEME_A36_CHATTY_GIRAFFY_DISPLAY_NAME = "Chatty Giraffy";
        shared.model.ThemeProxy._THEME_A36_CHATTY_GIRAFFY_BACKGROUND = "images/themes/ages_3to6/chattyGiraffy/background.png";
        shared.model.ThemeProxy._THEME_A36_CHATTY_GIRAFFY_SELECTION_ICON = "images/themes/ages_3to6/chattyGiraffy/themeSelectionIcon.png";
        shared.model.ThemeProxy._THEME_A36_CHATTY_GIRAFFY_ICON = "images/themes/ages_3to6/chattyGiraffy/themeIcon.png";
        shared.model.ThemeProxy._THEME_A36_CHATTY_GIRAFFY_NAMEPLATE_ICON = "images/themes/ages_3to6/chattyGiraffy/nameplateIcon.png";
        shared.model.ThemeProxy._THEME_A36_CHATTY_GIRAFFY_NAMEPLATE_FONT_COLOR = "#F1668B";
        shared.model.ThemeProxy._THEME_A36_CHATTY_GIRAFFY_NAMEPLATE_CLOSE_ICON = "images/themes/ages_3to6/chattyGiraffy/closeBtn.png";
        shared.model.ThemeProxy._THEME_A36_CHATTY_GIRAFFY_PROGRAM_TILE_FONT_COLOR = "#DF325D";
        shared.model.ThemeProxy._THEME_A36_CHATTY_GIRAFFY_VIDEO_PLAYER_FONT_COLOR = "#F1668B";
        shared.model.ThemeProxy._THEME_A36_CHATTY_GIRAFFY_VIDEO_SCRUBBER_BUTTON_ICON = "images/pages/shared/advancedVideoPlayer/scrubberHandleGirls.png";
        shared.model.ThemeProxy._THEME_A36_CHATTY_GIRAFFY_VIDEO_EPISODES_CLOSE_ICON = "images/themes/ages_3to6/chattyGiraffy/closeBtn.png";
        
        shared.model.ThemeProxy._THEME_A36_FARMIN_AROUND_DISPLAY_NAME = "Farmin' Around";
        shared.model.ThemeProxy._THEME_A36_FARMIN_AROUND_BACKGROUND = "images/themes/ages_3to6/farminAround/background.png";
        shared.model.ThemeProxy._THEME_A36_FARMIN_AROUND_SELECTION_ICON = "images/themes/ages_3to6/farminAround/themeSelectionIcon.png";
        shared.model.ThemeProxy._THEME_A36_FARMIN_AROUND_ICON = "images/themes/ages_3to6/farminAround/themeIcon.png";
        shared.model.ThemeProxy._THEME_A36_FARMIN_AROUND_NAMEPLATE_ICON = "images/themes/ages_3to6/farminAround/nameplateIcon.png";
        shared.model.ThemeProxy._THEME_A36_FARMIN_AROUND_NAMEPLATE_FONT_COLOR = "#4E9F9D";
        shared.model.ThemeProxy._THEME_A36_FARMIN_AROUND_NAMEPLATE_CLOSE_ICON = "images/themes/ages_3to6/farminAround/closeBtn.png";
        shared.model.ThemeProxy._THEME_A36_FARMIN_AROUND_PROGRAM_TILE_FONT_COLOR = "#2E424B";
        shared.model.ThemeProxy._THEME_A36_FARMIN_AROUND_VIDEO_PLAYER_FONT_COLOR = "#4E9F9D";
        shared.model.ThemeProxy._THEME_A36_FARMIN_AROUND_VIDEO_SCRUBBER_BUTTON_ICON = "images/pages/shared/advancedVideoPlayer/scrubberHandleBoys.png";
        shared.model.ThemeProxy._THEME_A36_FARMIN_AROUND_VIDEO_EPISODES_CLOSE_ICON = "images/themes/ages_3to6/farminAround/closeBtn.png";
        
        shared.model.ThemeProxy._THEME_A79_BOYS_DISPLAY_NAME = "";
        shared.model.ThemeProxy._THEME_A79_BOYS_BACKGROUND = "images/themes/ages_7to9/default_boys/background.png";
        shared.model.ThemeProxy._THEME_A79_BOYS_SELECTION_ICON = "";
        shared.model.ThemeProxy._THEME_A79_BOYS_ICON = "";
        shared.model.ThemeProxy._THEME_A79_BOYS_NAMEPLATE_ICON = "images/themes/ages_7to9/default_boys/nameplateIcon.png";
        shared.model.ThemeProxy._THEME_A79_BOYS_NAMEPLATE_FONT_COLOR = "#FFFFFF";
        shared.model.ThemeProxy._THEME_A79_BOYS_NAMEPLATE_CLOSE_ICON = "images/themes/ages_7to9/default_boys/closeBtn.png";
        shared.model.ThemeProxy._THEME_A79_BOYS_PROGRAM_TILE_FONT_COLOR = "#37A9CF";
        shared.model.ThemeProxy._THEME_A79_BOYS_VIDEO_PLAYER_FONT_COLOR = "#37A9CF";
        shared.model.ThemeProxy._THEME_A79_BOYS_VIDEO_SCRUBBER_BUTTON_ICON = "images/pages/shared/advancedVideoPlayer/scrubberHandleBoys.png";
        shared.model.ThemeProxy._THEME_A79_BOYS_VIDEO_EPISODES_CLOSE_ICON = "images/themes/ages_7to9/default_boys/closeBtn.png";
        
        shared.model.ThemeProxy._THEME_A79_GIRLS_DISPLAY_NAME = "";
        shared.model.ThemeProxy._THEME_A79_GIRLS_BACKGROUND = "images/themes/ages_7to9/default_girls/background.png";
        shared.model.ThemeProxy._THEME_A79_GIRLS_SELECTION_ICON = "";
        shared.model.ThemeProxy._THEME_A79_GIRLS_ICON = "";
        shared.model.ThemeProxy._THEME_A79_GIRLS_NAMEPLATE_ICON = "images/themes/ages_7to9/default_girls/nameplateIcon.png";
        shared.model.ThemeProxy._THEME_A79_GIRLS_NAMEPLATE_FONT_COLOR = "#FFFFFF";
        shared.model.ThemeProxy._THEME_A79_GIRLS_NAMEPLATE_CLOSE_ICON = "images/themes/ages_7to9/default_girls/closeBtn.png";
        shared.model.ThemeProxy._THEME_A79_GIRLS_PROGRAM_TILE_FONT_COLOR = "#E86AA5";
        shared.model.ThemeProxy._THEME_A79_GIRLS_VIDEO_PLAYER_FONT_COLOR = "#E86AA5";
        shared.model.ThemeProxy._THEME_A79_GIRLS_VIDEO_SCRUBBER_BUTTON_ICON = "images/pages/shared/advancedVideoPlayer/scrubberHandleGirls.png";
        shared.model.ThemeProxy._THEME_A79_GIRLS_VIDEO_EPISODES_CLOSE_ICON = "images/themes/ages_7to9/default_girls/closeBtn.png";

        shared.model.ThemeProxy.prototype._themes = {};
        
        shared.model.ThemeProxy.prototype._userThemes = {};
        
        shared.model.ThemeProxy.prototype._createThemes = function()
        {
            this._themes[shared.model.ThemeProxy.THEME_KEY_A03_DEFAULT] = 
                new shared.model.Theme(
                    shared.model.ThemeProxy.THEME_KEY_A03_DEFAULT, 
                    shared.model.ThemeProxy._THEME_A03_DEFAULT_DISPLAY_NAME,
                    shared.model.ThemeProxy._THEME_A03_DEFAULT_SELECTION_ICON,
                    shared.model.ThemeProxy._THEME_A03_DEFAULT_ICON,
                    shared.model.ThemeProxy._THEME_A03_DEFAULT_BACKGROUND,
                    shared.model.ThemeProxy._THEME_A03_DEFAULT_NAMEPLATE_ICON,
                    shared.model.ThemeProxy._THEME_A03_DEFAULT_NAMEPLATE_FONT_COLOR,
                    shared.model.ThemeProxy._THEME_A03_DEFAULT_NAMEPLATE_CLOSE_ICON,
                    shared.model.ThemeProxy._THEME_A03_DEFAULT_PROGRAM_TILE_FONT_COLOR,
                    shared.model.ThemeProxy._THEME_A03_DEFAULT_VIDEO_PLAYER_FONT_COLOR,
                    shared.model.ThemeProxy._THEME_A03_DEFAULT_VIDEO_SCRUBBER_BUTTON_ICON,
                    shared.model.ThemeProxy._THEME_A03_DEFAULT_VIDEO_EPISODES_CLOSE_ICON);
                    
            this._themes[shared.model.ThemeProxy.THEME_KEY_A36_DEFAULT] = 
                new shared.model.Theme(
                    shared.model.ThemeProxy.THEME_KEY_A36_DEFAULT, 
                    shared.model.ThemeProxy._THEME_A36_DEFAULT_DISPLAY_NAME,
                    shared.model.ThemeProxy._THEME_A36_DEFAULT_SELECTION_ICON,
                    shared.model.ThemeProxy._THEME_A36_DEFAULT_ICON,
                    shared.model.ThemeProxy._THEME_A36_DEFAULT_BACKGROUND,
                    shared.model.ThemeProxy._THEME_A36_DEFAULT_NAMEPLATE_ICON,
                    shared.model.ThemeProxy._THEME_A36_DEFAULT_NAMEPLATE_FONT_COLOR,
                    shared.model.ThemeProxy._THEME_A36_DEFAULT_NAMEPLATE_CLOSE_ICON,
                    shared.model.ThemeProxy._THEME_A36_DEFAULT_PROGRAM_TILE_FONT_COLOR,
                    shared.model.ThemeProxy._THEME_A36_DEFAULT_VIDEO_PLAYER_FONT_COLOR,
                    shared.model.ThemeProxy._THEME_A36_DEFAULT_VIDEO_SCRUBBER_BUTTON_ICON,
                    shared.model.ThemeProxy._THEME_A36_DEFAULT_VIDEO_EPISODES_CLOSE_ICON);
                    
            this._themes[shared.model.ThemeProxy.THEME_KEY_A36_PLANETARY] = 
                new shared.model.Theme(
                    shared.model.ThemeProxy.THEME_KEY_A36_PLANETARY, 
                    shared.model.ThemeProxy._THEME_A36_PLANETARY_DISPLAY_NAME,
                    shared.model.ThemeProxy._THEME_A36_PLANETARY_SELECTION_ICON,
                    shared.model.ThemeProxy._THEME_A36_PLANETARY_ICON,
                    shared.model.ThemeProxy._THEME_A36_PLANETARY_BACKGROUND,
                    shared.model.ThemeProxy._THEME_A36_PLANETARY_NAMEPLATE_ICON,
                    shared.model.ThemeProxy._THEME_A36_PLANETARY_NAMEPLATE_FONT_COLOR,
                    shared.model.ThemeProxy._THEME_A36_PLANETARY_NAMEPLATE_CLOSE_ICON,
                    shared.model.ThemeProxy._THEME_A36_PLANETARY_PROGRAM_TILE_FONT_COLOR,
                    shared.model.ThemeProxy._THEME_A36_PLANETARY_VIDEO_PLAYER_FONT_COLOR,
                    shared.model.ThemeProxy._THEME_A36_PLANETARY_VIDEO_SCRUBBER_BUTTON_ICON,
                    shared.model.ThemeProxy._THEME_A36_PLANETARY_VIDEO_EPISODES_CLOSE_ICON);
                    
            this._themes[shared.model.ThemeProxy.THEME_KEY_A36_SWEETIE_PIE] = 
                new shared.model.Theme(
                    shared.model.ThemeProxy.THEME_KEY_A36_SWEETIE_PIE, 
                    shared.model.ThemeProxy._THEME_A36_SWEETIE_PIE_DISPLAY_NAME,
                    shared.model.ThemeProxy._THEME_A36_SWEETIE_PIE_SELECTION_ICON,
                    shared.model.ThemeProxy._THEME_A36_SWEETIE_PIE_ICON,
                    shared.model.ThemeProxy._THEME_A36_SWEETIE_PIE_BACKGROUND,
                    shared.model.ThemeProxy._THEME_A36_SWEETIE_PIE_NAMEPLATE_ICON,
                    shared.model.ThemeProxy._THEME_A36_SWEETIE_PIE_NAMEPLATE_FONT_COLOR,
                    shared.model.ThemeProxy._THEME_A36_SWEETIE_PIE_NAMEPLATE_CLOSE_ICON,
                    shared.model.ThemeProxy._THEME_A36_SWEETIE_PIE_PROGRAM_TILE_FONT_COLOR,
                    shared.model.ThemeProxy._THEME_A36_SWEETIE_PIE_VIDEO_PLAYER_FONT_COLOR,
                    shared.model.ThemeProxy._THEME_A36_SWEETIE_PIE_VIDEO_SCRUBBER_BUTTON_ICON,
                    shared.model.ThemeProxy._THEME_A36_SWEETIE_PIE_VIDEO_EPISODES_CLOSE_ICON);
                    
            this._themes[shared.model.ThemeProxy.THEME_KEY_A36_CHATTY_GIRAFFY] = 
                new shared.model.Theme(
                    shared.model.ThemeProxy.THEME_KEY_A36_CHATTY_GIRAFFY, 
                    shared.model.ThemeProxy._THEME_A36_CHATTY_GIRAFFY_DISPLAY_NAME,
                    shared.model.ThemeProxy._THEME_A36_CHATTY_GIRAFFY_SELECTION_ICON,
                    shared.model.ThemeProxy._THEME_A36_CHATTY_GIRAFFY_ICON,
                    shared.model.ThemeProxy._THEME_A36_CHATTY_GIRAFFY_BACKGROUND,
                    shared.model.ThemeProxy._THEME_A36_CHATTY_GIRAFFY_NAMEPLATE_ICON,
                    shared.model.ThemeProxy._THEME_A36_CHATTY_GIRAFFY_NAMEPLATE_FONT_COLOR,
                    shared.model.ThemeProxy._THEME_A36_CHATTY_GIRAFFY_NAMEPLATE_CLOSE_ICON,
                    shared.model.ThemeProxy._THEME_A36_CHATTY_GIRAFFY_PROGRAM_TILE_FONT_COLOR,
                    shared.model.ThemeProxy._THEME_A36_CHATTY_GIRAFFY_VIDEO_PLAYER_FONT_COLOR,
                    shared.model.ThemeProxy._THEME_A36_CHATTY_GIRAFFY_VIDEO_SCRUBBER_BUTTON_ICON,
                    shared.model.ThemeProxy._THEME_A36_CHATTY_GIRAFFY_VIDEO_EPISODES_CLOSE_ICON);
                    
            this._themes[shared.model.ThemeProxy.THEME_KEY_A36_FARMIN_AROUND] = 
                new shared.model.Theme(
                    shared.model.ThemeProxy.THEME_KEY_A36_FARMIN_AROUND, 
                    shared.model.ThemeProxy._THEME_A36_FARMIN_AROUND_DISPLAY_NAME,
                    shared.model.ThemeProxy._THEME_A36_FARMIN_AROUND_SELECTION_ICON,
                    shared.model.ThemeProxy._THEME_A36_FARMIN_AROUND_ICON,
                    shared.model.ThemeProxy._THEME_A36_FARMIN_AROUND_BACKGROUND,
                    shared.model.ThemeProxy._THEME_A36_FARMIN_AROUND_NAMEPLATE_ICON,
                    shared.model.ThemeProxy._THEME_A36_FARMIN_AROUND_NAMEPLATE_FONT_COLOR,
                    shared.model.ThemeProxy._THEME_A36_FARMIN_AROUND_NAMEPLATE_CLOSE_ICON,
                    shared.model.ThemeProxy._THEME_A36_FARMIN_AROUND_PROGRAM_TILE_FONT_COLOR,
                    shared.model.ThemeProxy._THEME_A36_FARMIN_AROUND_VIDEO_PLAYER_FONT_COLOR,
                    shared.model.ThemeProxy._THEME_A36_FARMIN_AROUND_VIDEO_SCRUBBER_BUTTON_ICON,
                    shared.model.ThemeProxy._THEME_A36_FARMIN_AROUND_VIDEO_EPISODES_CLOSE_ICON);
                    
            this._themes[shared.model.ThemeProxy.THEME_KEY_A79_BOYS] = 
                new shared.model.Theme(
                    shared.model.ThemeProxy.THEME_KEY_A79_BOYS, 
                    shared.model.ThemeProxy._THEME_A79_BOYS_DISPLAY_NAME,
                    shared.model.ThemeProxy._THEME_A79_BOYS_SELECTION_ICON,
                    shared.model.ThemeProxy._THEME_A79_BOYS_ICON,
                    shared.model.ThemeProxy._THEME_A79_BOYS_BACKGROUND,
                    shared.model.ThemeProxy._THEME_A79_BOYS_NAMEPLATE_ICON,
                    shared.model.ThemeProxy._THEME_A79_BOYS_NAMEPLATE_FONT_COLOR,
                    shared.model.ThemeProxy._THEME_A79_BOYS_NAMEPLATE_CLOSE_ICON,
                    shared.model.ThemeProxy._THEME_A79_BOYS_PROGRAM_TILE_FONT_COLOR,
                    shared.model.ThemeProxy._THEME_A79_BOYS_VIDEO_PLAYER_FONT_COLOR,
                    shared.model.ThemeProxy._THEME_A79_BOYS_VIDEO_SCRUBBER_BUTTON_ICON,
                    shared.model.ThemeProxy._THEME_A79_BOYS_VIDEO_EPISODES_CLOSE_ICON);
                    
            this._themes[shared.model.ThemeProxy.THEME_KEY_A79_GIRLS] = 
                new shared.model.Theme(
                    shared.model.ThemeProxy.THEME_KEY_A79_GIRLS, 
                    shared.model.ThemeProxy._THEME_A79_GIRLS_DISPLAY_NAME,
                    shared.model.ThemeProxy._THEME_A79_GIRLS_SELECTION_ICON,
                    shared.model.ThemeProxy._THEME_A79_GIRLS_ICON,
                    shared.model.ThemeProxy._THEME_A79_GIRLS_BACKGROUND,
                    shared.model.ThemeProxy._THEME_A79_GIRLS_NAMEPLATE_ICON,
                    shared.model.ThemeProxy._THEME_A79_GIRLS_NAMEPLATE_FONT_COLOR,
                    shared.model.ThemeProxy._THEME_A79_GIRLS_NAMEPLATE_CLOSE_ICON,
                    shared.model.ThemeProxy._THEME_A79_GIRLS_PROGRAM_TILE_FONT_COLOR,
                    shared.model.ThemeProxy._THEME_A79_GIRLS_VIDEO_PLAYER_FONT_COLOR,
                    shared.model.ThemeProxy._THEME_A79_GIRLS_VIDEO_SCRUBBER_BUTTON_ICON,
                    shared.model.ThemeProxy._THEME_A79_GIRLS_VIDEO_EPISODES_CLOSE_ICON);
        }
        
        shared.model.ThemeProxy.prototype.obtainTheme = function(id)
        {
            return this._themes[id];
        }
        
        shared.model.ThemeProxy.prototype.getSelectableThemes = function(successCallback, failCallback)
        {
            var themeSet = new Array();
            
            themeSet.push(this.obtainTheme(shared.model.ThemeProxy.THEME_KEY_A36_PLANETARY));
            themeSet.push(this.obtainTheme(shared.model.ThemeProxy.THEME_KEY_A36_SWEETIE_PIE));
            themeSet.push(this.obtainTheme(shared.model.ThemeProxy.THEME_KEY_A36_CHATTY_GIRAFFY));
            themeSet.push(this.obtainTheme(shared.model.ThemeProxy.THEME_KEY_A36_FARMIN_AROUND));
            
            successCallback(themeSet);
        }
        
        shared.model.ThemeProxy.prototype.setUserTheme = function(user, themeId)
        {
            if (user)
            {
                var theme = this.obtainTheme(themeId);
                if (theme)
                {
                    this._userThemes[user.id] = theme;
                    user.theme = theme;
                }
                else
                {
                    console.log ('shared.model.ThemeProxy.setUserTheme(): theme not found; themeId = ' + themeId);
                }
            }
        }
        
        shared.model.ThemeProxy.prototype.configureUserTheme = function(user)
        {
            if (user)
            {
                if (user.age <= 3)
                {
                    user.theme = this.obtainTheme(shared.model.ThemeProxy.THEME_KEY_A03_DEFAULT);
                }
                else if (user.age <= 6)
                {
                    var theme = null;
                    
                    if (user.id in this._userThemes)
                    {
                        theme = this._userThemes[user.id];
                    }
                    
                    if (theme == null)
                    {
                        theme = this.obtainTheme(shared.model.ThemeProxy.THEME_KEY_A36_DEFAULT);
                    }
                    
                    user.theme = theme;
                }
                else
                {
                    if (user.gender == shared.model.User.GENDER_MALE)
                    {
                        user.theme = this.obtainTheme(shared.model.ThemeProxy.THEME_KEY_A79_BOYS);
                    }
                    else
                    {
                        user.theme = this.obtainTheme(shared.model.ThemeProxy.THEME_KEY_A79_GIRLS);
                    }
                }
            }
        }

        shared.model.ThemeProxy.prototype.toString = function()
        {
            return JSON.stringify(this);
        }
        
    }
});
