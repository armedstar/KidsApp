includeJS("js/ces/model/CESUser.js");

CESAuthenticationProxy.prototype = new puremvc.Proxy;
CESAuthenticationProxy.NAME = "CESAuthenticationProxy";

CESAuthenticationProxy.prototype.currentUser = null;
CESAuthenticationProxy.prototype._regUsersArray = null;

CESAuthenticationProxy.TEST_USER_1_ID = "1111111";
CESAuthenticationProxy.TEST_USER_1_USERNAME = "Mason";
CESAuthenticationProxy.TEST_USER_1_DISPLAY_NAME = "Mason";
CESAuthenticationProxy.TEST_USER_1_AVATAR_LOGIN_IMAGE_SRC = "images/pages/ces/loginAvatar1.png";
CESAuthenticationProxy.TEST_USER_1_AVATAR_IMAGE_SRC = "images/pages/ces/avatar1.png";
//CESAuthenticationProxy.TEST_USER_1_AVATAR_TEXT_COLOR = "89CFFD"; // Baby Blue (per Wikipedia)
CESAuthenticationProxy.TEST_USER_1_AVATAR_TEXT_COLOR = "0892D0"; // Rich Electric Blue (per Wikipedia)

CESAuthenticationProxy.TEST_USER_2_ID = "2222222";
CESAuthenticationProxy.TEST_USER_2_USERNAME = "Emma";
CESAuthenticationProxy.TEST_USER_2_DISPLAY_NAME = "Emma";
CESAuthenticationProxy.TEST_USER_2_AVATAR_LOGIN_IMAGE_SRC = "images/pages/ces/loginAvatar2.png";
CESAuthenticationProxy.TEST_USER_2_AVATAR_IMAGE_SRC = "images/pages/ces/avatar2.png";
//CESAuthenticationProxy.TEST_USER_2_AVATAR_TEXT_COLOR = "FFB7D5"; // Cotton Candy Pink (per Wikipedia)
CESAuthenticationProxy.TEST_USER_2_AVATAR_TEXT_COLOR = "F19CBB"; // Amaranth Pink (per Wikipedia)

function CESAuthenticationProxy()
{
    puremvc.Proxy.apply(this, [CESAuthenticationProxy.NAME, new Array()]);
}

CESAuthenticationProxy.prototype.getRegisteredUsers = function(familyId, callback)
{
    this._regUsersArray = new Array();
    
    var testUser1 = new CESUser(CESAuthenticationProxy.TEST_USER_1_ID, CESAuthenticationProxy.TEST_USER_1_USERNAME, CESAuthenticationProxy.TEST_USER_1_DISPLAY_NAME);
    testUser1.avatarLoginImageSrc = CESAuthenticationProxy.TEST_USER_1_AVATAR_LOGIN_IMAGE_SRC;
    testUser1.avatarFrameImageSrc = CESAuthenticationProxy.TEST_USER_1_AVATAR_IMAGE_SRC;
    testUser1.avatarTextColor = CESAuthenticationProxy.TEST_USER_1_AVATAR_TEXT_COLOR;
    
    var testUser2 = new CESUser(CESAuthenticationProxy.TEST_USER_2_ID, CESAuthenticationProxy.TEST_USER_2_USERNAME, CESAuthenticationProxy.TEST_USER_2_DISPLAY_NAME);
    testUser2.avatarLoginImageSrc = CESAuthenticationProxy.TEST_USER_2_AVATAR_LOGIN_IMAGE_SRC;
    testUser2.avatarFrameImageSrc = CESAuthenticationProxy.TEST_USER_2_AVATAR_IMAGE_SRC;
    testUser2.avatarTextColor = CESAuthenticationProxy.TEST_USER_2_AVATAR_TEXT_COLOR;

    this._regUsersArray.push(testUser1);
    this._regUsersArray.push(testUser2);
    
    callback(this._regUsersArray);
}

CESAuthenticationProxy.prototype.getUserById = function(userId, callback)
{
    callback(this._regUsersArray[userId]);
}

CESAuthenticationProxy.prototype.getCurrentUser = function()
{
    return this.currentUser;
}

CESAuthenticationProxy.prototype.loginUser = function(username, password, onLoginSuccess, onLoginError)
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

CESAuthenticationProxy.prototype.logoutUser = function()
{
     this.currentUser = null;
}

