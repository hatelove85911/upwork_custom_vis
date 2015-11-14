// (function () {
//     var holeSize,
//         leaderTextSize;

//     function pieChart(selection) {
//         selection.each(function (d, i) {

//         });
//     }

//     pieChart.holeSize = function (value) {
//         if (!arguments.length) return holeSize;
//         holeSize = value;
//         return my;
//     };

//     pieChart.leaderTextSize = function (value) {
//         if (!arguments.length) return leaderTextSize;
//         leaderTextSize = value;
//         return my;
//     };
//     return pieChart;

// }());

function pieChart() {
    var holeSize = 50,
        leaderTextSize,
        width = 200,
        height = 200;

    function my(selection) {
        selection.each(function (d, i) {
            var g = d3.select(this).append('g').classed('pieChart', true);

            // layout
            var pie = d3.layout.pie()
                .value(function (d) {
                    return d.weight;
                });

            var pieData = pie(d);

            var newPieData = pieData.map(function (pied) {
                return pied.data.items.map(function (item, i, items) {
                    return {
                        startAngle: pied.startAngle,
                        endAngle: pied.endAngle,
                        padAngle: pied.padAngle,
                        value: item.amount,
                        index: i,
                        totalItems: items.length,
                        color: item.color
                    };
                });
            });

            var totalSliceWidth = height / 2 - holeSize;

            // arc generator
            var arc = d3.svg.arc()
                .innerRadius(function (d) {
                    return d.index * (totalSliceWidth * (1 / d.totalItems)) + holeSize;
                })
                .outerRadius(function (d) {
                    return (d.index + 1) * (totalSliceWidth * (1 / d.totalItems)) + holeSize;
                });

            // layout
            newPieData = [].concat.apply([], newPieData);
            var taskUpd = g.selectAll('.task').data(newPieData);

            taskUpd.enter()
                .append('path')
                .attr('d', arc)
                .style('fill', function (d) {
                    return d.color;
                })
                .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");

            taskUpd.exit().remove();

        });
    }

    my.holeSize = function (value) {
        if (!arguments.length) return holeSize;
        holeSize = value;
        return my;
    };

    my.leaderTextSize = function (value) {
        if (!arguments.length) return leaderTextSize;
        leaderTextSize = value;
        return my;
    };
    return my;

}