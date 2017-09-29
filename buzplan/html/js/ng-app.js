var app = angular.module('myApp', ['chart.js']);

// chart-line
// chart-data: series data
// chart-labels: x axis labels
// chart-legend (default: false): show legend below the chart
// chart-options (default: {}): Chart.js options
// chart-series (default: []): series labels
// chart-click (optional): onclick event handler
// chart-hover (optional): onmousemove event handler
// chart-colours (default to global colours): colours for the chart
app.controller("LineCtrl", function ($scope) {
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B', 'Series C'];
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90],
      [-10, 20, 30, 40, 50, 40, 30]
    ];
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };
});

// chart-doughnut
// chart-data: series data
// chart-labels: series labels
// chart-legend (default: false): show legend below the chart
// chart-options (default: {}): Chart.js options
// chart-click (optional): onclick event handler
// chart-hover (optional): onmousemove event handler
// chart-colours (default to global colours): colours for the chart
app.controller("DoughnutCtrl", function ($scope) {
    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    $scope.data = [300, 500, 100];
});

// .chart-bar
// chart-data: series data
// chart-labels: x axis labels
// chart-legend (default: false): show legend below the chart
// chart-options (default: {}): Chart.js options
// chart-series (default: []): series labels
// chart-click (optional): onclick event handler
// chart-hover (optional): onmousemove event handler
// chart-colours (default to global colours): colours for the chart
app.controller("BarCtrl", function ($scope) {
    $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.series = ['Series A', 'Series B'];    

    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
});
app.controller("BarCtrl2", function ($scope) {
    $scope.labels = ['18-25', '26-30', '31-40', '41-50', '51-65', '65+'];
    $scope.series = ['Άνδρες', 'Γυναίκες', 'Something Else'];
    $scope.colors = [{ // default
            "fillColor": "#5CAEFF",
            //"strokeColor": "rgba(207,100,103,1)",
            //"pointColor": "rgba(220,220,220,1)",
            //"pointStrokeColor": "#fff",
            //"pointHighlightFill": "#fff",
            //"pointHighlightStroke": "rgba(151,187,205,0.8)"
    }, {
        "fillColor": "#FF3B56",
    }, {
        "fillColor": "#ccc",
    }]

    $scope.data = [
      [65, 59, 80, 85, 56, 200],
      [28, 48, 40, 30, 86, 27],
      [35, 52, 47, 15, 28, 90]
    ];
});

// chart-radar
// chart-data: series data
// chart-labels: series labels
// chart-legend (default: false): show legend below the chart
// chart-options (default: {}): Chart.js options
// chart-series (default: []): series labels
// chart-click (optional): onclick event handler
// chart-hover (optional): onmousemove event handler
// chart-colours (default to global colours): colours for the chart
app.controller("RadarCtrl", function ($scope) {
    $scope.labels = ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running", "SomethingElse"];
    $scope.series = ['Some Field'];
    $scope.data = [
      //[65, 59, 90, 81, 56, 55, 40],
      [28, 48, 40, 19, 96, 27, 100, 50]
    ];
});

// chart-pie
// chart-data: series data
// chart-labels: series labels
// chart-legend (default: false): show legend below the chart
// chart-options (default: {}): Chart.js options
// chart-click (optional): onclick event handler
// chart-hover (optional): onmousemove event handler
// chart-colours (default to global colours): colours for the chart
app.controller("PieCtrl", function ($scope) {
    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    $scope.data = [300, 500, 100];
});

// chart-polar-area
// chart-data: series data
// chart-labels: series labels
// chart-legend (default: false): show legend below the chart
// chart-options (default: {}): Chart.js options
// chart-click (optional): onclick event handler
// chart-hover (optional): onmousemove event handler
// chart-colours (default to global colours): colours for the chart
app.controller("PolarAreaCtrl", function ($scope) {
    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
    $scope.data = [300, 500, 100, 40, 120];
});

// chart-base
// chart-type: chart type e.g. Bar, PolarArea, etc. or other plugins
// other options according to chart type
app.controller("BaseCtrl", function ($scope) {  
    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
    $scope.data = [300, 500, 100, 40, 120];
    $scope.type = 'PolarArea';

    $scope.toggle = function () {
        $scope.type = $scope.type === 'PolarArea' ?
          'Pie' : 'PolarArea';
    };
});
