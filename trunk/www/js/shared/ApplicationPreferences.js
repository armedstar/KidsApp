function ApplicationPreferences() {
    
}

ApplicationPreferences.prototype.get = function(key,success,fail)
{
    var args = {};
    args.key = key;
    cordova.exec(success,fail,"ApplicationPreferences","getSetting",[args]);
};

ApplicationPreferences.prototype.getAsBoolean = function(key, success, fail)
{
    var args = {};
    args.key = key;
    
    var unwrapBooleanSuccessReturn = function(preferenceValue)
        {
            success((preferenceValue == "1"));
        };
    
    cordova.exec(unwrapBooleanSuccessReturn, fail, "ApplicationPreferences", "getSetting", [args]);
};

cordova.addConstructor(function() {
                        if (!window.plugins) {
                        window.plugins = {};
                        }
                        window.plugins.ApplicationPreferences = new ApplicationPreferences();
                        });