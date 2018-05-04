import React, { Component } from 'react';
import { Scatter } from 'react-chartjs-2';

export class ScatterChart extends Component {
  constructor(props) {
    super(props)
		this.state = {
    }
  }

  getChartData = () => {
    const x = this.props.depVar.code
    const y = this.props.indepVar.code 
    const data = this.props.data 
    return Object.values(data[x]).map(
      (datum, i) => {
        return {x: datum, y: data[y][i]}
      }
    )
  }

  tooltipLabel = (tooltipItems, data) =>  (' ' 
    + this.props.data.municipio[tooltipItems.index] 
    + ' (' + tooltipItems.xLabel.toFixed(1) + ', ' 
    + tooltipItems.yLabel.toFixed(1) + ')')

  chartData = () => {
    return {
      labels: ['scatter'],
      datasets: [{
        label: 'America Barometers Data',
        backgroundColor: '#FFF',
        pointBackgroundColor: '#057cfa',
        borderColor: '#FFF',
        data: this.getChartData()
      }],
		}
	}

	chartOptions = () => {
		return {
			maintainAspectRatio: true,
			scales: {
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: this.props.indepVar.label
					}
				}],
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: this.props.depVar.label
					}
				}],
			},
      tooltips: {
        callbacks: {
          label: this.toolTipLabel 
          }
        }
      }
		}

	render() {
		return(
			<div style={{backgroundColor:'white'}}>
        <h1> {this.props.depVar.label + ' vs ' + this.props.indepVar.label} </h1>
				<Scatter 
          data={ this.chartData()}
          options={this.chartOptions()}
          width={500}
          height={450}
          />
			</div>
		)
	}
}

