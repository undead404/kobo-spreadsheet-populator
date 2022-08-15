/**
 * Acquires, parses and returns data
 * 
 * @returns {unknown[]} Records
 */
function getApiData(url) {
    Logger.log('getApiData');
    const scriptProperties = PropertiesService.getScriptProperties();
    const response = UrlFetchApp.fetch(url, {
        headers: {
            Accept: 'application/json',
            Authorization: 'Token ' + scriptProperties.getProperty('Token')
        }
    })
    const results = JSON.parse(response.getContentText()).results;
    Logger.log('getApiData returned items: ' + _.size(results));
    return results;
}