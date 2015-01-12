includeJS("js/shared/model/ProgramBrief.js");

CESRecommendationsProxy.prototype = new puremvc.Proxy;
CESRecommendationsProxy.NAME = "CESRecommendationsProxy";

function CESRecommendationsProxy()
{
    puremvc.Proxy.apply(this, [CESRecommendationsProxy.NAME, new Array()]);
}

CESRecommendationsProxy.prototype.getRecommendations = function(userId, contextId, successCallback, failCallback)
{
    //TODO:  for now just a hacked hardcoded data representation for now of recommended shows.
    var testData = new Array();

    // NOTE:  The service is meant to return a set of 30 titles to allow rotation through 3 sets of 10.

    // First set of 10
    testData.push(new ProgramBrief(111,'All Dogs Go to Heaven', ProgramBrief.MOVIE, 'images/pages/ces/ShowImages/AllDogsGoToHeavenL.jpg', 'images/pages/ces/ShowImages/AllDogsGoToHeavenL.jpg', "res/video/all_dogs_go_to_heaven.mp4"));
    testData.push(new ProgramBrief(222,'Sesame Street', ProgramBrief.TVSERIES, 'images/pages/ces/ShowImages/seasameStreetL.jpg', 'images/pages/ces/ShowImages/seasameStreetL.jpg', "res/video/all_dogs_go_to_heaven.mp4"));
    testData.push(new ProgramBrief(333,'Mickey Mouse Clubhouse', ProgramBrief.TVSERIES, 'images/pages/ces/ShowImages/MickeyMouseClubhouseM.jpg', 'images/pages/ces/ShowImages/MickeyMouseClubhouseM.jpg', "res/video/all_dogs_go_to_heaven.mp4"));
    testData.push(new ProgramBrief(444,'Adventure Time', ProgramBrief.TVSERIES, 'images/pages/ces/ShowImages/adventureTime1M', 'images/pages/ces/ShowImages/adventureTime1M', "res/video/all_dogs_go_to_heaven.mp4"));
    testData.push(new ProgramBrief(555,'Bubble Guppies', ProgramBrief.TVSERIES, 'images/pages/ces/ShowImages/BubbleGuppiesM.jpg', 'images/pages/ces/ShowImages/BubbleGuppiesM.jpg', "res/video/all_dogs_go_to_heaven.mp4"));
    testData.push(new ProgramBrief(666,'Care Bears', ProgramBrief.TVSERIES, 'images/pages/ces/ShowImages/CareBearsS.jpg', 'images/pages/ces/ShowImages/CareBearsS.jpg', "res/video/all_dogs_go_to_heaven.mp4"));
    testData.push(new ProgramBrief(777,'Dora the Explorer', ProgramBrief.TVSERIES, 'images/pages/ces/ShowImages/DoraTheExplorerS.jpg', 'images/pages/ces/ShowImages/DoraTheExplorerS.jpg', "res/video/all_dogs_go_to_heaven.mp4"));
    testData.push(new ProgramBrief(888,'Fraggle Rock', ProgramBrief.TVSERIES, 'images/pages/ces/ShowImages/FraggleRockS.jpg', 'images/pages/ces/ShowImages/FraggleRockS.jpg', "res/video/all_dogs_go_to_heaven.mp4"));
    testData.push(new ProgramBrief(999,'Jem', ProgramBrief.TVSERIES, 'images/pages/ces/ShowImages/JemS.jpg', 'images/pages/ces/ShowImages/JemS.jpg', "res/video/all_dogs_go_to_heaven.mp4"));
    testData.push(new ProgramBrief(1010,'Olivia', ProgramBrief.TVSERIES, 'images/pages/ces/ShowImages/OliviaS.jpg', 'images/pages/ces/ShowImages/OliviaS.jpg', "res/video/all_dogs_go_to_heaven.mp4"));
    
    // Second set of 10
    testData.push(new ProgramBrief(1111,'Beauty and the Beast', ProgramBrief.MOVIE, 'images/pages/ces/ShowImages/BeautyAndTheBeastL.jpg', 'images/pages/ces/ShowImages/BeautyAndTheBeastL.jpg', "res/video/all_dogs_go_to_heaven.mp4"));
    testData.push(new ProgramBrief(1212,'Phineas and Ferb', ProgramBrief.TVSERIES, 'images/pages/ces/ShowImages/PhineasAndFerbL.jpg', 'images/pages/ces/ShowImages/PhineasAndFerbL.jpg', "res/video/all_dogs_go_to_heaven.mp4"));
    testData.push(new ProgramBrief(1313,'Power Puff Girls', ProgramBrief.TVSERIES, 'images/pages/ces/ShowImages/PowerPuffGirlsM.jpg', 'images/pages/ces/ShowImages/PowerPuffGirlsM.jpg', "res/video/all_dogs_go_to_heaven.mp4"));
    testData.push(new ProgramBrief(1414,'Super Why', ProgramBrief.TVSERIES, 'images/pages/ces/ShowImages/SuperWhyM.jpg', 'images/pages/ces/ShowImages/SuperWhyM.jpg', "res/video/all_dogs_go_to_heaven.mp4"));
    testData.push(new ProgramBrief(1515,'Wow Wow Wubsy', ProgramBrief.TVSERIES, 'images/pages/ces/ShowImages/WowWowWubsyM.jpg', 'images/pages/ces/ShowImages/WowWowWubsyM.jpg', "res/video/all_dogs_go_to_heaven.mp4"));
    testData.push(new ProgramBrief(1616,'Yo Gabba Gabba', ProgramBrief.TVSERIES, 'images/pages/ces/ShowImages/YoGabbaGabbaS.jpg', 'images/pages/ces/ShowImages/YoGabbaGabbaS.jpg', "res/video/all_dogs_go_to_heaven.mp4"));
    testData.push(new ProgramBrief(1717,'Mickey Mouse Clubhouse', ProgramBrief.TVSERIES, 'images/pages/ces/ShowImages/MickeyMouseClubhouseS.jpg', 'images/pages/ces/ShowImages/MickeyMouseClubhouseS.jpg', "res/video/all_dogs_go_to_heaven.mp4"));
    testData.push(new ProgramBrief(1818,'The Tigger Movie', ProgramBrief.MOVIE, 'images/pages/ces/ShowImages/theTiggerMovieS.jpg', 'images/pages/ces/ShowImages/theTiggerMovieS.jpg', "res/video/all_dogs_go_to_heaven.mp4"));
    testData.push(new ProgramBrief(1919,'Bubble Guppies', ProgramBrief.TVSERIES, 'images/pages/ces/ShowImages/BubbleGuppiesS.jpg', 'images/pages/ces/ShowImages/BubbleGuppiesS.jpg', "res/video/all_dogs_go_to_heaven.mp4"));
    testData.push(new ProgramBrief(2020,'Dora the Explorer', ProgramBrief.TVSERIES, 'images/pages/ces/ShowImages/DoraTheExplorerS.jpg', 'images/pages/ces/ShowImages/DoraTheExplorerS.jpg', "res/video/all_dogs_go_to_heaven.mp4"));
    
    // Third set of 10
    testData.push(new ProgramBrief(2121,'James and the Giant Peach', ProgramBrief.MOVIE, 'images/pages/ces/ShowImages/JamesAndTheGiantPeachL.jpg', 'images/pages/ces/ShowImages/JamesAndTheGiantPeachL.jpg', "res/video/all_dogs_go_to_heaven.mp4"));
    testData.push(new ProgramBrief(2222,'Wow Wow Wubsy', ProgramBrief.TVSERIES, 'images/pages/ces/ShowImages/WowWowWubsyL.jpg', 'images/pages/ces/ShowImages/WowWowWubsyL.jpg', "res/video/all_dogs_go_to_heaven.mp4"));
    testData.push(new ProgramBrief(2323,'Power Puff Girls', ProgramBrief.TVSERIES, 'images/pages/ces/ShowImages/PowerPuffGirlsM.jpg', 'images/pages/ces/ShowImages/PowerPuffGirlsM.jpg', "res/video/all_dogs_go_to_heaven.mp4"));
    testData.push(new ProgramBrief(2424,'Adventure Time', ProgramBrief.TVSERIES, 'images/pages/ces/ShowImages/adventureTime1M', 'images/pages/ces/ShowImages/adventureTime1M', "res/video/all_dogs_go_to_heaven.mp4"));
    testData.push(new ProgramBrief(2525,'The Tigger Movie', ProgramBrief.MOVIE, 'images/pages/ces/ShowImages/theTiggerMovieM.jpg', 'images/pages/ces/ShowImages/theTiggerMovieM.jpg', "res/video/all_dogs_go_to_heaven.mp4"));
    testData.push(new ProgramBrief(2626,'Phineas and Ferb', ProgramBrief.TVSERIES, 'images/pages/ces/ShowImages/PhineasAndFerbS.jpg', 'images/pages/ces/ShowImages/PhineasAndFerbS.jpg', "res/video/all_dogs_go_to_heaven.mp4"));
    testData.push(new ProgramBrief(2727,'Sesame Street', ProgramBrief.TVSERIES, 'images/pages/ces/ShowImages/seasameStreetS.jpg', 'images/pages/ces/ShowImages/seasameStreetS.jpg', "res/video/all_dogs_go_to_heaven.mp4"));
    testData.push(new ProgramBrief(2828,'Toy Story 2', ProgramBrief.MOVIE, 'images/pages/ces/ShowImages/ToyStory2S.jpg', 'images/pages/ces/ShowImages/ToyStory2S.jpg', "res/video/all_dogs_go_to_heaven.mp4"));
    testData.push(new ProgramBrief(2929,'Care Bears', ProgramBrief.TVSERIES, 'images/pages/ces/ShowImages/CareBearsS.jpg', 'images/pages/ces/ShowImages/CareBearsS.jpg', "res/video/all_dogs_go_to_heaven.mp4"));
    testData.push(new ProgramBrief(3030,'Jem', ProgramBrief.TVSERIES, 'images/pages/ces/ShowImages/JemS.jpg', 'images/pages/ces/ShowImages/JemS.jpg', "res/video/all_dogs_go_to_heaven.mp4"));

    successCallback(testData);
}
