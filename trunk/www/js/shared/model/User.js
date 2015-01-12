jingo.declare(
{
    require: 
    [
        "shared.model.Theme"
    ],
    name: 'shared.model.User',
    as: function() 
    {

        shared.model.User = function(id, username, displayName, age, gender)
        {
            this.id = id;
            this.username = username;
            this.displayName = displayName;
            this.age = (age && age >= 0) ? age : 0;
            this.gender = gender;
        }
        
        shared.model.User.prototype = {};
        shared.model.User.prototype.parent = Object.prototype;
        shared.model.User.prototype.constructor = shared.model.User;
        
        shared.model.User.GENDER_MALE = "M";
        shared.model.User.GENDER_FEMALE = "F";

        // TODO:  (WK) Remove these once theme is in place...
        shared.model.User.prototype.avatarImageSrc = null;
        shared.model.User.prototype.avatarFrameImageSrc = null;
        
        shared.model.User.prototype.theme = null;

        shared.model.User.prototype.toString = function()
        {
            return JSON.stringify(this);
        }
        
    }
});
