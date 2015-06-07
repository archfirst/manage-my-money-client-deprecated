/* jshint -W117 */
describe('Dashboard', function() {
    'use strict';

    var controller;

    beforeEach(function() {
        bard.appModule('app.dashboard');
        bard.inject('$rootScope', '$controller', '$q',  'transactionService');
    });

    beforeEach(function() {
        sinon.stub(transactionService, 'getTransactionsByCategory')
            .returns($q.when(mockData.getMockTransactionsByCategory()));

        controller = $controller('DashboardController');
        $rootScope.$apply();
    });

    describe('Dashboard controller', function() {
        it('dummy test', function() {
        });
    });
});
