//
//  Util.m
//  TGXDKids
//
//  Created by Jonathan Arme on 11/6/12.
//
//

#import "Util.h"

#import <Parse/Parse.h>

@implementation Util

+ (NSObject *)getCurrentUserId
{
    PFUser *currentUser = [PFUser currentUser];
    if (currentUser) {
        return currentUser.objectId;
    } else {
        return [NSNull null];
    }
}

+ (NSString *)getCurrentDateTime
{
    NSDateFormatter *formatter;
    NSString        *dateString;
    
    formatter = [[NSDateFormatter alloc] init];
    [formatter setDateFormat:@"EEE MMM dd yyyy HH:mm:ss ZZZZ (zzz)"];  //Mon Nov 05 2012 17:18:38 GMT-0600 (CST)
    
    dateString = [formatter stringFromDate:[NSDate date]];
    
    [formatter release];
    
    return dateString;
}

+ (void)logApplicationEventForUser:(NSObject *)userId applicationId:(NSString *)appId message:(NSString *)message
{
    
    PFObject *logObject = [PFObject objectWithClassName:@"ApplicationLog"];
   
    NSObject *familyId = [Util getStringFromSettingsForKey:@"family_id"];
    if (familyId == nil)
        familyId = [NSNull null];
    [logObject setValue:familyId forKey:@"familyId"];
    
    [logObject setValue:userId forKey:@"userId"];
    [logObject setValue:appId forKey:@"applicationId"];
    [logObject setValue:@"message" forKey:@"eventCode"];
    [logObject setValue:message forKey:@"message"];
    [logObject setValue:[Util getCurrentDateTime] forKey:@"localDeviceTime"];
    
    [logObject save];
}

+ (id)getSettingFromBundle:(NSString*)settingsName
{
	NSString *pathStr = [[NSBundle mainBundle] bundlePath];
	NSString *settingsBundlePath = [pathStr stringByAppendingPathComponent:@"Settings.bundle"];
	NSString *finalPath = [settingsBundlePath stringByAppendingPathComponent:@"Root.plist"];
    
	NSDictionary *settingsDict = [NSDictionary dictionaryWithContentsOfFile:finalPath];
	NSArray *prefSpecifierArray = [settingsDict objectForKey:@"PreferenceSpecifiers"];
	NSDictionary *prefItem;
	for (prefItem in prefSpecifierArray)
	{
		if ([[prefItem objectForKey:@"Key"] isEqualToString:settingsName])
			return [prefItem objectForKey:@"DefaultValue"];
	}
	return nil;
    
}


+ (NSString *) getStringFromSettingsForKey:(NSString *)key
{
    NSString *returnVar = [[NSUserDefaults standardUserDefaults] stringForKey:key];
    if(returnVar == nil)
    {
        returnVar = [Util getSettingFromBundle:key]; //Parsing Root.plist
        if ([returnVar isKindOfClass:[NSNumber class]])
            returnVar = [NSString stringWithFormat:@"%i", [(NSNumber *)returnVar intValue]];
    }
    
    return returnVar;
    
}

@end
