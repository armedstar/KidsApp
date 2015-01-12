jingo.declare(
{
    require: 
    [
        "shared.model.User",
        "shared.model.ThemeProxy"
    ],
    name: 'shared.model.remote.RemoteAuthenticationProxy',
    as: function() 
    {

        shared.model.AuthenticationProxy = function()
        {
            puremvc.Proxy.apply(this, [shared.model.AuthenticationProxy.NAME, new Array()]);
        }

        shared.model.AuthenticationProxy.prototype = new puremvc.Proxy;
        shared.model.AuthenticationProxy.prototype.parent = puremvc.Proxy.prototype;
        shared.model.AuthenticationProxy.prototype.constructor = shared.model.AuthenticationProxy;
        
        shared.model.AuthenticationProxy.NAME = "AuthenticationProxy";

        shared.model.AuthenticationProxy.prototype.currentUser = null;

        shared.model.AuthenticationProxy.prototype.getRegisteredUsers = function(familyId, callback)
        {
            var onSuccess = Relegate.create(
                this,
                function(users) 
                {
                    var themeProxy = this.facade.retrieveProxy(shared.model.ThemeProxy.NAME);
                    
                    var regUsersArr = new Array();
                    for (var i = 0; i < users.length; i++) 
                    {
                        var id = users[i].id;
                        var username = users[i].get('username');
                        var displayName = users[i].get('displayName');
                        var age = users[i].get('age');
                        var gender = users[i].get('gender');
                        var u = new shared.model.User(id, username, displayName, age, gender);
                        themeProxy.configureUserTheme(u);
                        regUsersArr.push(u);
                    }
                    callback(regUsersArr);
                },
                this);
                
                var Family = Parse.Object.extend("Family");
                
                var famQuery = new Parse.Query(Family);
                famQuery.equalTo("familyId", familyId);
                
                var query = new Parse.Query(Parse.User);
                query.matchesQuery("family", famQuery);
                query.descending("orderIndex");
                
                query.find(
                {
                    success: onSuccess,
                    error: function(err) { alert(err.message); }
                });
        }
        
        shared.model.AuthenticationProxy.prototype.getCurrentUser = function()
        {
            if (this.currentUser == null)
            {
                var parseUser = Parse.User.current();
                if (parseUser)
                {
                    this.currentUser = 
                        new shared.model.User(
                            parseUser.id, 
                            parseUser.get("username"), 
                            parseUser.get("displayName"),
                            parseUser.get("age"),
                            parseUser.get("gender"));
                    var themeProxy = this.facade.retrieveProxy(shared.model.ThemeProxy.NAME);
                    themeProxy.configureUserTheme(this.currentUser);
                }
            }
    
            return this.currentUser;
        }

        shared.model.AuthenticationProxy.prototype.loginUser = function(username, password, onLoginSuccess, onLoginError)
        {
            if (username && password)
            {
                var onSuccess = Relegate.create(
                    this,
                    function(user)
                    {
                        this.currentUser = 
                            new shared.model.User(
                                user.id, 
                                user.get("username"),
                                user.get("displayName"), 
                                user.get("age"), 
                                user.get("gender"));
                        var themeProxy = this.facade.retrieveProxy(shared.model.ThemeProxy.NAME);
                        themeProxy.configureUserTheme(this.currentUser);
                        onLoginSuccess(this.currentUser);
                    },
                    onLoginSuccess);
                
                //Parse automatically caches a user session to localStorage.  We can use this as our login mechanism for now.
                Parse.User.logIn(
                    username, 
                    password, 
                    {
                        success: onSuccess,
                        error: onLoginError
                    });
            }
        }

        shared.model.AuthenticationProxy.prototype.logoutUser = function()
        {
            this.currentUser = null;
            Parse.User.logOut();
        }
        
    }
});

