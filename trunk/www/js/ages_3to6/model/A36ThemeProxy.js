jingo.declare(
{
    require: 
    [
        "shared.model.Theme",
        "shared.model.ThemeProxy"
    ],
    name: 'ages_3to6.model.A36ThemeProxy',
    as: function() 
    {

        ages_3to6.model.A36ThemeProxy = function()
        {
            shared.model.ThemeProxy.apply(this);
        }
        
        ages_3to6.model.A36ThemeProxy.prototype = new shared.model.ThemeProxy;
        ages_3to6.model.A36ThemeProxy.prototype.parent = shared.model.ThemeProxy.prototype;
        ages_3to6.model.A36ThemeProxy.prototype.constructor = ages_3to6.model.A36ThemeProxy;
        
        ages_3to6.model.A36ThemeProxy.prototype.configureUserTheme = function(user)
        {
            if (user)
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
        }
        
    }
});
