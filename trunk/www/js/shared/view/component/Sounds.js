jingo.declare(
{
    require: [],
    name: 'shared.view.component.Sounds',
    as: function() 
    {

        shared.view.component.Sounds = {
            playFallingTiles01 : function() {
                if (DEVICE_MODE_ENABLED) new Media('res/audio/droppingBox1.wav').play();
            },
            playFallingTiles02 : function() {
                if (DEVICE_MODE_ENABLED) new Media('res/audio/droppingBox2.wav').play();
            },
            playFallingTiles03 : function() {
                if (DEVICE_MODE_ENABLED) new Media('res/audio/droppingBox3.wav').play();
            },
            playTouch : function() {
                if (DEVICE_MODE_ENABLED) new Media('res/audio/press.wav').play();
            },
            playSwipe : function() {
                if (DEVICE_MODE_ENABLED) new Media('res/audio/Swish.aifc').play();
            },
            playThud : function() {
                if (DEVICE_MODE_ENABLED) new Media('res/audio/ThudSwoosh3.aifc').play();
            }
        };

        TILE_SOUNDS = 
        [
            shared.view.component.Sounds.playFallingTiles01, 
            shared.view.component.Sounds.playFallingTiles02, 
            shared.view.component.Sounds.playFallingTiles03
        ];
    
    }
});