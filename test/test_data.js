    var $result = $('#result1');
//    var url = 'http://10.77.34.122/webstorm/Grid-gitlab/test/php/';
    var url = 'http://fetech.nhnent.com/svnrun/fetech/prototype/trunk/grid/test/php/';

    var grid = new ne.Grid({
        el: $('#wrapper1'),
        columnModelList: dummy_data.columnModel_1,
        selectType: 'checkbox',
        columnFixIndex: 5,
        rowHeight: 30,
        displayRowCount: 10,
        headerHeight: 50,
        minimumColumnWidth: 20
    }).on('onResponse', function(data) {
        console.log('onResponse');
    }).on('onSuccessResponse', function(data) {
            console.log('onSuccessResponse');
    }).use('Net', {
        el: $('#form'),
        perPage: 100,
        api: {
            'readData': url + 'dummy_request.php',
            'updateData': url + 'backbone_test.php',
            'deleteData': url + 'backbone_test.php',
            'modifyData': url + 'backbone_test.php',
            'downloadData': url + 'backbone_test.php',
            'downloadAllData': url + 'backbone_test.php'
        }
    });

    var net = grid.getAddOn('Net');

    $('#append').on('click', function(e) {
        grid.appendRow();
    });
    $('#prepend').on('click', function(e) {
        grid.prependRow();
    });
    $('#createData').on('click', function(e) {
        net.createData();
    });
    $('#updateData').on('click', function(e) {
        net.updateData();

    });
    $('#deleteData').on('click', function(e) {
        net.deleteData();
    });
    $('#modifyData').on('click', function(e) {
        net.modifyData();
    });
    $('#downloadData').on('click', function(e) {
        net.downloadData();
    });
    $('#downloadAllData').on('click', function(e) {
        net.downloadAllData();
    });