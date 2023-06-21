import { convertDate } from "./convertDate"

export const settingChartData = (setChartData, prices) => {
    setChartData(
        {
            labels: prices.map(price => convertDate(price[0])),
            datasets: [
                {
                    label: 'Dataset 1',
                    data: prices.map(price => (price[1])),
                    borderColor: "#3a80e9",
                    borderWidth: 2,
                    fill: true,    // fill the graph with below borderColor
                    tension: 0.23,  // to show curved edges of graph
                    backgroundColor: "rgba(58,128,233,0.1)",
                    pointRadius: 0,  // Point radius of every point of (x,y) on graph

                },
            ]
        }
    )
}