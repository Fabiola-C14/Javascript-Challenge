//from data.js
var tableData = data;

console.log(tableData);

//Full table on landing page
var tbody=d3.select('tbody');

tableData.forEach(sightingData);

function sightingData(SightingReport) {
    var row=tbody.append('tr');

    Object.entries(SightingReport).forEach(([key, value]) => {
        row.append('td').text(value)
    });
}

var filterBtn=d3.select('#filter-btn');

var resetBtn=d3.select('.reset');

filterBtn.on('click', runEnter);

function runEnter() {
    d3.event.preventDefault();
    tbody.html('');
    var inputDatetime=d3.select('#datetime');
    var inputValue=inputDatetime.property('value');
    var filteredData=tableData.filter(tableData => tableData.datetime ===inputValue);
    filteredData.forEach(function(data) {
        var row=tbody.append('tr');
        Object.entries(data).forEach(([key, value]) => {
            row.append('td').text(value) 
        });
    });
};

resetBtn.on('click', function() {
    resetForm();
    updateTable(tableData);
});

//Dropdown Search

var filterOption = {};

var filterDropdown=d3.select('.dropdown');

var filteredData=tableData;

var keyAndFields=[{
         fieldName: 'Date',
         tableKey: 'datetime'
     },
     {   fieldName: 'City',
         tableKey: 'city'
     },
     {   fieldName:'State',
         tableKey: 'state'
     },
     {   fieldName: 'Country',
         tableKey: 'country'
     },
     {   fieldName: 'Shape',
         tableKey: 'shape'
     }
 ];

 Object.entries(keyAndFields).forEach(([key,value]) => selectAndPopulate(value.fieldName, value.tableKey));

 function selectAndPopulate(fieldName, tableKey) {
     var dropdown=d3.select('#select'+fieldName);
     var optionsArray=[...new Set(tableData.map(tableData => tableData[tableKey]))];
     optionsArray.unshift('No filter');
     optionsArray.forEach(option => dropdown.append('option').attr('value', option).text(option));
 };

 function updateFilteredData(queryField, queryValue) {
     filteredData=tableData;
     filterOption[queryField]=queryValue;
     Object.entries(filterOption).forEach(([key, value]) => {
             filteredData=filteredData.filter(function(element) {
                 if(value === 'No filter') {
                     return element[key];
                 } else {
                     return element[key] === value;
                 }
             });
     });
 }

 filterDropdown.on("click", function() {
     d3.event.preventDefault();
     updateTBody(filteredData);
 });

 function updateTBody(filteredData) {
     tbody.text ('');
     filteredData.forEach(dataselection => {
         var row=tbody.append('tr');
         Object.entries(dataselection).forEach( ([key,value]) => {
             row.append('td').text(value);

         });
     });
 }