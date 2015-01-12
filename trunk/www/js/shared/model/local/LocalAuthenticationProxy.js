jingo.declare(
{
    require: 
    [
        "shared.model.User",
        "shared.model.ThemeProxy"
    ],
    name: 'shared.model.local.LocalAuthenticationProxy',
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

        shared.model.AuthenticationProxy.TEST_USER_1_ID = "1111111";
        shared.model.AuthenticationProxy.TEST_USER_1_USERNAME = "testUser_0to3";
        shared.model.AuthenticationProxy.TEST_USER_1_DISPLAY_NAME = "Test User 0-3";
        shared.model.AuthenticationProxy.TEST_USER_1_AGE = 1;
        shared.model.AuthenticationProxy.TEST_USER_1_GENDER = shared.model.User.GENDER_MALE;

        shared.model.AuthenticationProxy.TEST_USER_2_ID = "2222222";
        shared.model.AuthenticationProxy.TEST_USER_2_USERNAME = "testUser_4to6";
        shared.model.AuthenticationProxy.TEST_USER_2_DISPLAY_NAME = "Test User 4-6";
        shared.model.AuthenticationProxy.TEST_USER_2_AGE = 4;
        shared.model.AuthenticationProxy.TEST_USER_2_GENDER = shared.model.User.GENDER_FEMALE;

        shared.model.AuthenticationProxy.TEST_USER_3_ID = "33333333";
        shared.model.AuthenticationProxy.TEST_USER_3_USERNAME = "testUser_7to9_boy";
        shared.model.AuthenticationProxy.TEST_USER_3_DISPLAY_NAME = "Test User 7-9 - Boy";
        shared.model.AuthenticationProxy.TEST_USER_3_AGE = 4;
        shared.model.AuthenticationProxy.TEST_USER_3_GENDER = shared.model.User.GENDER_MALE;

        shared.model.AuthenticationProxy.TEST_USER_4_ID = "44444444";
        shared.model.AuthenticationProxy.TEST_USER_4_USERNAME = "testUser_7to9_girl";
        shared.model.AuthenticationProxy.TEST_USER_4_DISPLAY_NAME = "Test User 7-9 - Girl";
        shared.model.AuthenticationProxy.TEST_USER_4_AGE = 7;
        shared.model.AuthenticationProxy.TEST_USER_4_GENDER = shared.model.User.GENDER_FEMALE;

        shared.model.AuthenticationProxy.prototype.currentUser = null;
        shared.model.AuthenticationProxy.prototype._regUsersArray = null;

        shared.model.AuthenticationProxy.prototype.getRegisteredUsers = function(familyId, callback)
        {
            var themeProxy = this.facade.retrieveProxy(shared.model.ThemeProxy.NAME);
        
            this._regUsersArray = new Array();
    
            var testUser1 = new shared.model.User(shared.model.AuthenticationProxy.TEST_USER_1_ID, shared.model.AuthenticationProxy.TEST_USER_1_USERNAME, shared.model.AuthenticationProxy.TEST_USER_1_DISPLAY_NAME, shared.model.AuthenticationProxy.TEST_USER_1_AGE, TEST_USER_1_GENDER);
            var testUser2 = new shared.model.User(shared.model.AuthenticationProxy.TEST_USER_2_ID, shared.model.AuthenticationProxy.TEST_USER_2_USERNAME, shared.model.AuthenticationProxy.TEST_USER_2_DISPLAY_NAME, shared.model.AuthenticationProxy.TEST_USER_2_AGE, TEST_USER_2_GENDER);
            var testUser3 = new shared.model.User(shared.model.AuthenticationProxy.TEST_USER_3_ID, shared.model.AuthenticationProxy.TEST_USER_3_USERNAME, shared.model.AuthenticationProxy.TEST_USER_3_DISPLAY_NAME, shared.model.AuthenticationProxy.TEST_USER_3_AGE, TEST_USER_3_GENDER);
            var testUser3 = new shared.model.User(shared.model.AuthenticationProxy.TEST_USER_4_ID, shared.model.AuthenticationProxy.TEST_USER_4_USERNAME, shared.model.AuthenticationProxy.TEST_USER_4_DISPLAY_NAME, shared.model.AuthenticationProxy.TEST_USER_4_AGE, TEST_USER_4_GENDER);
            
            themeProxy.configureUserTheme(testUser1);
            themeProxy.configureUserTheme(testUser2);
            themeProxy.configureUserTheme(testUser3);
            themeProxy.configureUserTheme(testUser4);

            this._regUsersArray.push(testUser1);
            this._regUsersArray.push(testUser2);
            this._regUsersArray.push(testUser3);
            this._regUsersArray.push(testUser4);
    
            callback(this._regUsersArray);
        }

        shared.model.AuthenticationProxy.prototype.getCurrentUser = function()
        {
            return this.currentUser;
        }

        shared.model.AuthenticationProxy.prototype.loginUser = function(username, password, onLoginSuccess, onLoginError)
        {
            var user = null;
    
            if (username && password)
            {
                for (var i = 0; i < this._regUsersArray.length; i++)
                {
                    var tempUser = this._regUsersArray[i];
                    if (username == tempUser.username)
                    {
                        user = tempUser;
                    }
                }
            }
    
            if (user != undefined)
            {
                this.currentUser = user;
                onLoginSuccess(user);
            }
            else
            {
                onLoginError(username, "User not found.");
            }
        }

        shared.model.AuthenticationProxy.prototype.logoutUser = function()
        {
             this.currentUser = null;
        }
        
    }
});

