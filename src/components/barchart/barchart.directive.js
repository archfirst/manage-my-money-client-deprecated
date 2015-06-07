/*
    A directive to draw bar charts using D3. The directive itself takes
    care of the Angular side of the instrumentation, the D3 rendering
    is handled by the BarChart class provided by the barchart factory.

    Note: the prefix "mmm" in "mmm-barchart" stands for "Managing My Money".
    You should choose a unique and descriptive prefix for your directives.

    Usage:
        <mmm-barchart data-chartdata="vm.chartdata"></mmm-barchart>

    Chart data should be in the following format:

        [
            {
                'key': 'Salary',
                'value': 2000.00,
            },
            {
                'key': 'Auto & Transport',
                'value': -100.00,
            },
            {
                'key': 'Food & Dining',
                'value': -456.22,
            },
            ...
        ];

    Positive values will be drawn as green bars and negative values as orange bars.
*/

(function () {
    'use strict';

    angular
        .module('app.barchart')
        .directive('mmmBarchart', barchartDirective);


    // ----- barchartDirective -----
    barchartDirective.$inject = ['BarChart', '$window', '_'];

    /* @ngInject */
    function barchartDirective(BarChart, $window, _) {

        var directive = {
            link: link,
            restrict: 'E',
            scope: {
                chartdata: '='
            }
        };
        return directive;

        function link(scope, element) {
            var tableRowHeight = 20; // TODO: take out hard coding

            // Initialize the chart
            var svgElement = element.html('<svg>').children()[0];
            var barChart = new BarChart(svgElement);
            barChart.barHeight(tableRowHeight);

            // Redraw whenever chartdata changes
            scope.$watch('chartdata', drawChart);

            // Redraw whenever window resizes, adding some debounce
            var debouncedDrawChart = _.debounce(drawChart, 250);
            angular.element($window).on('resize', debouncedDrawChart);

            // Remove the redraw handler when the scope is destroyed
            // This prevents redrawing when the view containing the barchart is destroyed
            scope.$on('$destroy', function() {
                if (debouncedDrawChart) {
                    angular.element($window).off('resize', debouncedDrawChart);
                    debouncedDrawChart = undefined;
                }
            });

            function drawChart() {
                var chartdata = scope.chartdata;

                // This can happen when the server has not yet returned the chartdata
                if (!chartdata) { return; }

                barChart
                    .width(element[0].offsetWidth)
                    .draw(chartdata);
            }
        }
    }

})();
