/**
 * Processes a form
 * @param {{
 *  dataUrl: string,
 *  name: string
 * }} Form data
 * @param {SpreadSheet} Spreadsheet to save data
 * @param {number} index Index to add spreadsheet if missing
 */
function processForm(form, spreadSheet, index) {
    Logger.log('processForm');
    const { dataUrl, name } = form;
    Logger.log('Form ' + name);
    if (!dataUrl) {
        console.error('dataUrl of the form not provided');
        return;
    }
    if (!name) {
        console.error('name of the form not provided');
        return;
    }
    const items = getApiData(dataUrl);
    Logger.log('items size: ' + _.size(items));
    if (items.length === 0) {
        return;
    }
    const flatItems = _.map(items, item => flattenObject(item));
    Logger.log('flatItems size: ' + _.size(flatItems));
    let fields = _.uniq(_.flatMap(flatItems, _.keys));
    let sheet = spreadSheet.getSheetByName(name);
    let heading = [];
    let oldDataRows = [];
    if (sheet) {
        const oldDataRange = sheet.getDataRange();
        Logger.log(_.head(oldDataRange.getValues()));
        [heading, ...oldDataRows] = oldDataRange.getValues();
        fields = _.uniq([...heading, ...fields])
    } else {
        sheet = spreadSheet.insertSheet(name, index);
    }
    const missingFields = _.difference(fields, heading);
    if (!_.isEmpty(missingFields)) {
        const missingHeadCellsRange = sheet.getRange(1, 1 + heading.length, 1, missingFields.length);
        missingHeadCellsRange.setValues([missingFields]);
    }
    const idColumnIndex = _.indexOf(heading, '_id');
    let presentIds = [];
    if (idColumnIndex !== -1) {
        presentIds = _.map(oldDataRows, idColumnIndex);
    }
    Logger.log(`Already have items: ${_.size(presentIds)}`)
    const newFlatItems = _.reject(flatItems, item => _.includes(presentIds, item._id));
    Logger.log('newFlatItems size: ' + _.size(newFlatItems));
    if (_.isEmpty(newFlatItems)) {
        return;
    }
    const dataRange = sheet.getRange(2 + presentIds.length, 1, newFlatItems.length, fields.length);
    Logger.log(`dataRange: ${dataRange.getRow()}:${dataRange.getColumn()} ${dataRange.getNumRows()}x${dataRange.getNumColumns()}`);
    Logger.log('Setting values...');
    dataRange.setValues(_.map(newFlatItems, flatItem => _.map(fields, fieldName => flatItem[fieldName])));
    Logger.log('Values set.')
    Logger.log('Success with form ' + name + ' and ' + items.length + ' items');
}