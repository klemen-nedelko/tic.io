"use client"
import{
    Chart as Chartjs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
}from 'chart.js';
Chartjs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Filler,
    Title,
    Tooltip,
    Legend
)
import {Bar, Line, Scatter, Bubble} from "react-chartjs-2";

const AdminDashboard = () => {

    const data = {
        labels:["January", "February", "March", "April","May","June","July","August","September","October"],
        datasets:[
            {
                data: [0.1, 0.4, 0.2, 0.3, 0.7, 0.4, 0.6, 0.3, 0.96, 1],
            },
        ]
    }
    const options = {
        plugins:{
            legend:{
                display: false,
            },
        },
        elements:{
            line:{
                tension:0,
                borderWidth:2,
                borderColor:"rgba(47,97,68,1)",
                fill:"start",
                backgroundColor:"rgba(47,97,68,0.3)"
            },
            point:{
                radius:0,
                hitRadius:0,
            }
        },
        scales:{
            xAxis:{
                display:false,
            },
            yAxis:{
                display:false,
            }
        }

    }
    const dataBar ={
        labels:[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
        ],
        datasets:[
            {
                label: "Brutto",
                bordreRadius: 30,
                data:[0.1, 0.4, 0.36, 0.23, 0.86, 0.5, 0.7, 0.4, 0.6, 0.9,],
                backgroundColor: "rgba(32,214,155,1)",
                barThickness:10,
            },
            {
                label: "Netto",
                bordreRadius: 20,
                data:[0.07, 0.3, 0.25, 0.12, 0.43, 0.25, 0.35, 0.2, 0.3, 0.45,],
                backgroundColor: "rgba(1,98,255,1)",
                barThickness:10,
            },
        ]
    }
    const optionsBar = {
        plugins:{
            legend:{
                position:"top",
                align:"start",
                labels:{
                    boxWidth:7,
                    usePointStyle:true,
                    pointStyle:"circle"
                },
                title:{
                    text:"Sales Report",
                    display:true,
                    color:"#000",
                    font:{
                        size:18,
                    }
                }
            },
            scales:{
                xAxis:{
                    display:false,
                },
                yAxis:{
                    max:1,
                },
            },
            elements:{
                bar:{
                    barPercentage:0.3,
                    categoryPercantage:1,
                },
            },
        }
    }

  return (
    <div className='flex flex-coloumn'>
    <Line data={data} width={100} height={40} options={options} className='max-h-fit'/>
    <Bar data={dataBar} width={300} options={optionsBar} className='max-h-fit'/>
    </div>
  )
}

export default AdminDashboard