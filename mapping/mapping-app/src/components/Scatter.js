import React, { Component } from 'react';
import { Scatter } from 'react-chartjs-2';
import { getData } from '../data/data';
import { codes17 } from '../data/varcoding';


export class ScatterChart extends Component {
  constructor(props) {
    super(props)
		this.state = {
    }
  }

  getChartData = () => {
    const x = this.props.depVar 
    const y = this.props.indepVar 
    const data = getData('municipio')
    return Object.values(data[x]).map(
      (datum, i) => {
        return {x: datum, y: data[y][i]}
      }
    )
  }

  chartData = () => {
    return {
      datasets: [{
        label: 'America Barometers Data',
        backgroundColor: '#FFF',
        pointBackgroundColor: '#000',
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
						labelString: codes17[this.props.indepVar].label
					}
				}],
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: codes17[this.props.depVar].label
					}
				}],
			}
		}
	}



	render() {
		return(
			<div style={{backgroundColor:'white'}}>
        <h1> {codes17[this.props.depVar].label + ' vs ' + codes17[this.props.indepVar].label} </h1>
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

