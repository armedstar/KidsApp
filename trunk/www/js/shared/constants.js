jingo.declare(
{
    require: 
    [
        
    ],
    name: 'shared.constants',
    as: function() 
    {

        b2Vec2 = Box2D.Common.Math.b2Vec2
        ,      b2BodyDef = Box2D.Dynamics.b2BodyDef
        ,      b2Body = Box2D.Dynamics.b2Body
        ,      b2FixtureDef = Box2D.Dynamics.b2FixtureDef
        ,      b2World = Box2D.Dynamics.b2World
        ,      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
        ,      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
        ,      b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef
        ,      b2Joint = Box2D.Dynamics.Joints.b2Joint
        ,      b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef
        ,      b2RopeJointDef = Box2D.Dynamics.Joints.b2RopeJointDef
        ,      b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef
        ,      b2DebugDraw = Box2D.Dynamics.b2DebugDraw
        ,      b2Fixture = Box2D.Dynamics.b2Fixture
        ,      b2AABB = Box2D.Collision.b2AABB
        ,      b2ContactListener = Box2D.Dynamics.b2ContactListener
        ,      b2Color = Box2D.Common.b2Color;
              
        BodyCategories = {
              PROGRAM_TILE : 0x0001,
              WALL : 0x0002,
              GROUND : 0x0004
        };

        AppConstants = {
    
            //Notifications
            STARTUP : "startup",
            DISPLAY_RECOMMENDATIONS : "displayRecs",
            DISPLAY_PROGRAM_DETAILS : "displayDetails",
            DISPLAY_THEME_SELECTION : "displayThemeSelection",
            DISPLAY_LOGIN : "displayLogin",
            LOGIN_USER : "loginUser",
            LOGOUT_USER : "logoutUser",
            SHOW_PAGE : "showPage",
            REFRESH_RECS : "refreshRecs",
            TILE_SELECTED : "tileSelected",
            LOG_APP_MESSAGE : "logAppMessage",
            SEND_PROGRAM_HISTORY_EVENT : "programHistoryEvent",
            PAGE_CLEANUP_FINISHED : "pageCleanupFinished",
            SHOW_ADVANCED_VIDEO_PLAYER : "showAdvancedVideoPlayer",
            SHOW_SIMPLE_VIDEO_PLAYER : "showSimpleVideoPlayer",
              NOTIFY_PARENT : "notifyParent"
        };
        
        AppLoggingEventCodes = {
              GENERIC_MESSAGE : "message",
              APP_ACTIVATED : "appActive",
              USER_LOGIN : "userLogin",
              USER_LOGOUT : "userLogout",
              LOADING_VIDEO : "loadingVideo",
              THEME_SELECTED : "themeSelected",
              NEW_REC_GENERATED : "newRecGenerated"
        };

        Box2DConstants = {
    
            PROGRAM_TILE_DENSITY : 10.0,
            PROGRAM_TILE_FRICTION : 0.2,
            PROGRAM_TILE_RESTITUTION : 0.2
    
        };

        DEBUG_DRAW_ENABLED = false;
        DEBUG_CHECK_BODY_COUNT_ENABLED = false;
        DEBUG_USE_OFFLINE_PROXY_MODE = false;
        
        //  NOTE:  (WK) This is a temporary family id representing a family in the data.  Change if that id is changed/removed.
        NON_DEVICE_FAMILY_ID = "family_test";
        //NON_DEVICE_FAMILY_ID = "family_devries";
        //NON_DEVICE_FAMILY_ID = "family_fischer";
        //NON_DEVICE_FAMILY_ID = "family_lehartel";
        //NON_DEVICE_FAMILY_ID = "family_blum";
        //NON_DEVICE_FAMILY_ID = "family_lonergan";
        
        //NON_DEVICE_FAMILY_ID = "family_newell";
        //NON_DEVICE_FAMILY_ID = "family_boelens";
        //NON_DEVICE_FAMILY_ID = "family_spina";
        //NON_DEVICE_FAMILY_ID = "family_jasinski";
        //NON_DEVICE_FAMILY_ID = "family_lopez";
        //NON_DEVICE_FAMILY_ID = "family_payne";
        
        NON_DEVICE_RESOURCE_DIR = "/Users/billkorbecki/Desktop/DATA/research_mixed_05092013";
        
        OVERRIDE_CONTENT_VIDEO = false;
        OVERRIDE_CONTENT_VIDEO_URL = "res/video/EU.mp4";
              
        APPLICATION_LOGGING_ENABLED = true;
    }
});