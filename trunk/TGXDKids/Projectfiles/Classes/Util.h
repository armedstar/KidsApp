//
//  Util.h
//  TGXDKids
//
//  Created by Jonathan Arme on 11/6/12.
//
//

#import <Foundation/Foundation.h>

@interface Util : NSObject

+ (NSString *) getCurrentDateTime;
+ (void) logApplicationEventForUser:(NSObject *)userId applicationId:(NSString *)appId message:(NSString *)message;
+ (id)getSettingFromBundle:(NSString*)settingsName;
+ (NSString *) getStringFromSettingsForKey:(NSString *)key;
+ (NSObject *) getCurrentUserId;
@end
