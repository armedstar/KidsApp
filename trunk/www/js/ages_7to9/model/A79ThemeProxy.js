jingo.declare(
{
    require: 
    [
        "shared.model.Theme",
        "shared.model.ThemeProxy"
    ],
    name: 'ages_7to9.model.A79ThemeProxy',
    as: function() 
    {

        ages_7to9.model.A79ThemeProxy = function()
        {
            shared.model.ThemeProxy.apply(this);
        }
        
        ages_7to9.model.A79ThemeProxy.prototype = new shared.model.ThemeProxy;
        ages_7to9.model.A79ThemeProxy.prototype.parent = shared.model.ThemeProxy.prototype;
        ages_7to9.model.A79ThemeProxy.prototype.constructor = ages_7to9.model.A79ThemeProxy;
        
        ages_7to9.model.A79ThemeProxy.prototype.configureUserTheme = function(user)
        {
            if (user)
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
});
