**Author:**
 Based on the FHIRPath expression `birthDate.toString().matches('^((19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$')`

being evaluated on the `Patient` resource context.


**Author:**
 This invariant expression doesn't seem to work.

**FhirPath AI** *(gpt-4o-mini)* **:**
 The FHIRPath expression you provided is intended to validate the format of the `birthDate` field in a `Patient` resource. However, the `matches` function is used to check if a string conforms to a specific regular expression pattern. 

In your case, the expression checks if the `birthDate` is in the format `YYYY-MM-DD`. If it's not working as expected, consider the following:

1. **Ensure `birthDate` is not null**: If `birthDate` is null or empty, the expression will not return true.
2. **Check the format of `birthDate`**: Make sure that the `birthDate` is indeed in the expected format before applying the regex.

If you want to ensure that the `birthDate` is valid and in the correct format, you might want to first check if it exists and then apply the regex. Here’s a revised expression:

```fhirpath
birthDate.exists() and birthDate.toString().matches('^((19|20)\\d\\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$')
```

This expression first checks if `birthDate` exists and then validates its format. 

Would you like to explore more about validating other fields in a `Patient` resource?