/* jshint -W079, -W098, -W126 */
var mockData = (function() {
    'use strict';

    return {
        getMockTransactionsByCategory: getMockTransactionsByCategory
    };

    function getMockTransactionsByCategory() {
        return [
            {
                'cat_id': 1,
                'cat_name': 'Auto & Transport',
                'amount': 100
            }
        ];
    }
})();
