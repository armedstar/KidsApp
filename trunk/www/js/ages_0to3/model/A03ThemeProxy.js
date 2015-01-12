jingo.declare(
{
    require: 
    [
        "shared.model.Theme",
        "shared.model.ThemeProxy"
    ],
    name: 'ages_0to3.model.A03ThemeProxy',
    as: function() 
    {

        ages_0to3.model.A03ThemeProxy = function()
        {
            shared.model.ThemeProxy.apply(this);
        }
        
        ages_0to3.model.A03ThemeProxy.prototype = new shared.model.ThemeProxy;
        ages_0to3.model.A03ThemeProxy.prototype.parent = shared.model.ThemeProxy.prototype;
        ages_0to3.model.A03ThemeProxy.prototype.constructor = ages_0to3.model.A03ThemeProxy;
        
        ages_0to3.model.A03ThemeProxy.prototype.configureUserTheme = function(user)
        {
            if (user)
            {
                user.theme = this.obtainTheme(shared.model.ThemeProxy.THEME_KEY_A03_DEFAULT);
            }
        }
        
    }
});
