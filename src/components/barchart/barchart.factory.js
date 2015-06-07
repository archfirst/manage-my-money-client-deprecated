/*
    The barchart factory simply returns a class called BarChart
    that is responsible for rendering the chart using D3. It knows
    nothing about AngularJS.
*/

(function () {
    'use strict';

    angular
        .module('app.barchart')
        .factory('BarChart', barchartFactory);

    barchartFactory.$inject = ['d3'];

    /* @ngInject */
    function barchartFactory(d3) {

        function BarChart(svgElement) {
            // Create the base element for the chart
            this.base = d3.select(svgElement);

            this.margin = {top: 0, right: 25, bottom: 30, left: 120};
            this.axisMargin = 5;

            this.x = d3.scale.linear();

            this.y = d3.scale.ordinal();

            this.xAxis = d3.svg.axis()
                .scale(this.x)
                .orient('bottom');

            this.yAxis = d3.svg.axis()
                .scale(this.y)
                .orient('left')
                .tickSize(0);

            // chart base (base element for the chart)
            this.base
                .attr('class', 'chart');

            // x-axis base (base element for the x-axis)
            this.xAxisBase = this.base.append('g')
                .attr('class', 'x axis');

            // y-axis base (base element for the y-axis)
            this.yAxisBase = this.base.append('g')
                .attr('class', 'y axis')
                .attr('transform', 'translate(' + (this.margin.left - this.axisMargin) + ', 0)');

            // plot base (base element for the plot)
            this.plotBase = this.base.append('g')
                .attr('class', 'plot')
                .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
        }

        BarChart.prototype.width = function(newWidth) {
            this.w = newWidth;
            this.plotWidth = this.w - this.margin.left - this.margin.right;
            this.base.attr('width', this.w);
            this.x.range([0, this.plotWidth]);
            return this;
        };

        BarChart.prototype.barHeight = function(newBarHeight) {
            this.bh = newBarHeight;
            return this;
        };

        BarChart.prototype.draw = function(data) {
            // Compute y-dimensions based on bar height
            this.plotHeight = this.bh * data.length;
            this.h = this.plotHeight + this.margin.top + this.margin.bottom;
            this.base.attr('height', this.h);
            this.y.rangeBands([0, this.plotHeight], 0.05, 0);
            this.xAxis.tickSize(-this.plotHeight);
            this.xAxisBase.attr(
                'transform',
                'translate(' + this.margin.left + ',' + (this.margin.top + this.plotHeight + this.axisMargin) + ')'
            );

            // Set the domains for the scales from the supplied data
            this.x.domain([0, d3.max(data.map(function(d) { return Math.abs(d.value); }))]);
            this.y.domain(data.map(function(d) { return d.key; }));

            // For smaller widths, limit the number of ticks to avoid overlaps
            if (this.plotWidth < 300) {
                this.xAxis.ticks(2);
            }
            else if (this.plotWidth < 600) {
                this.xAxis.ticks(4);
            }
            else {
                this.xAxis.ticks(10);  // this is D3's default number
            }

            // Draw the axes
            this.xAxisBase.call(this.xAxis);
            this.yAxisBase.call(this.yAxis);

            // Create the 'update selection' by selecting the bars and joining with data.
            // Update selection contains the DOM elements that were successfully bound to data
            // plus references to enter and exit selections.
            var updateSelection = this.plotBase.selectAll('.bar')
                .data(data, function(d) { return d.key; });

            // Remove the exiting bars (this is the 'exit selection')
            updateSelection.exit()
                .remove();

            // Get the 'enter selection'
            // Contains placeholder DOM nodes for each data element that was not bound
            var enterSelection = updateSelection.enter();

            // Add a group for each entering element - these are the entering bars
            var barsEnter = enterSelection
                .append('g')
                .attr('class', 'bar');

            // Add the rectangle for the bar
            barsEnter
                .append('rect')
                .attr('x', 0)
                .attr('width', 0)
                .attr('height', this.y.rangeBand());

            // Draw the bars
            var self = this;
            updateSelection.select('rect')
                .attr('x', 0)
                .attr('y', function(d) { return self.y(d.key); })
                .attr('height', this.y.rangeBand())
                .transition()
                .duration(1000)
                .attr('width', function(d) { return self.x(Math.abs(d.value)); })
                .attr('class', function(d) { return (d.value >= 0) ? 'pos' : 'neg'; });
        };

        return BarChart;
    }
})();
