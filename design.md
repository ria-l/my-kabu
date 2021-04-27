# Chart

The chart displays the total value of a given portfolio in the given range.

When the page is loaded, the chart displays the past week by default.

The data for the chart is pulled in as follows (this needs an overhaul but anyway this is how it works at the moment...):

1. when PortfolioChart.js is loaded, `componentDidMount` or `componentDidUpdate` calls `this.getChartData()`
2. `getChartData` will see if the state has a `startDate` and an `endDate`.
3. if no, it will create both, and store them in state.
4. once the dates are stored in state, it calls `chartUtils.getChartLabels`.
5. this function pulls the portfolio from local storage, or if none exists, returns an empty portfolio, which is then set to `chartLabels`.
6. if the portfolio exists, it will fill an array with all the dates between `startDate` and `endDate`. it will then get the portfolio value for each of those dates, using `Promise.all` and `fetchPortfolioValuePromises`.
7. once the values are fetched, it creates an object containing the x axis labels (dates) and data points (values for each of those dates). this is assigned to `chartLabels`.
8. once `chartLabels` is filled, it then creates a `chartData` object, which is formatted according to the ChartJs API.
9. `chartData` is then set to state, which will refresh the graph.
10. when the chart is rendered, it grabs `chartData` from state to populate the graph.
