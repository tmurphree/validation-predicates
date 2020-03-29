# 2.0.4  
Update dev dependencies to fix acorn vulnerability.  

# 2.0.3  
Set isObjectLike options without clobbering defaults  

# 2.0.2  
Add allowExtraProps option to isObjectLike  

# 2.0.1  
Streamline package  

# 2.0.0  
## Breaking changes   
* Change the default behavior of isObjectLike to use { checkType: false }  
* Replace isNotNullOrUndefined with isNullOrUndefined  
* Replace isNotZeroLength with isZeroLength  

## Other changes  
* Add strict mode  
* Add isFloat, isInteger, and isIsoDateTimeString


# 1.2.0  
* Add option to disable type checking on isObjectLike  
* Add isPopulatedObject  
* Add isDate, isDateGreaterThan, and isDateLessThan  

# 1.1.1  
* Add debug option to isObjectLike  

# 1.1  
* Add isObjectLike  
* Return false from isObject if test data is null or an array  