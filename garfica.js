w = new Chart(grafica1, {
    type: 'line',// Tipo de gráfico
    data: {
      labels: fecha1,
      datasets: [
        datosambienteAir,  
        datostempSupply,
        datosreturnAir,
        datosSetPoint,
        datorelativeHumidity,
        datosEvaporationCoil,
        // Aquí más datos...
      ]
    },
    options: {
      backgroundColor : "#fff",
      animation: {
        onComplete: function () {
                //console.log(w.toBase64Image());
                //if(descargarImagen==1){
                var today = moment().format("DD-MM-YYYY_HH-mm-ss");
                var dispositivoGrafica = info.reefer.nombre_contenedor;        
                bajarGrafica.href= w.toBase64Image();
                bajarGrafica.download =''+dispositivoGrafica+'_'+today;
                  //bajarGrafica.click();
                //}
        },
      },
      //animation: false,

      responsive : true,
      interaction :{
        mode : 'index',
        intersect :false,
      },
      stacked :false,
      scales: {
        y: {
          position: 'left',
          display: true,
          title: {
            display: true,
            text: 'Temperature (C°)',
            color: '#1a2c4e',
            font: {

              size: 20,
              style: 'normal',
              lineHeight: 1.2
            },
            padding: {top: 30, left: 0, right: 0, bottom: 0}
          },
          suggestedMin: -0,
          suggestedMax: 60
        },
        y1: {
          display: true,
          position: 'right',
          beginAtZero: true,
          title: {
            display: true,
            text: 'Percentage (%)',
            color: '#1a2c4e',
            font: {
              size: 20,
              style: 'normal',
              lineHeight: 1.2
            },
            padding: {top: 30, left: 0, right: 0, bottom: 0}
          },
          suggestedMin: 0,
          suggestedMax: 100,                
          // grid line settings
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
      },
      plugins: {
        datalabels: {
          backgroundColor: function(context) {
            return context.dataset.backgroundColor;
          },
          borderRadius: 4,
          color: 'white',
          font: {
            weight: 'bold'
          },
          formatter: Math.round,
          padding: 6
        },

        title: {
          display: true,                
          text: 'Reefer Monitoring Data : '+info.reefer.nombre_contenedor +'('+info.reefer.descripcionC+')',
          color: '#1a2c4e',
          font: {
            size: 30,
            style: 'normal',
            lineHeight: 1.2
          },
          padding: {top: 20, bottom: 20}
        },
        zoom: {
          pan :{
            enabled :true,
            mode: 'x',
          },
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true
            },
            mode: 'x',
            drag :{
              enabled: false,
            },
            scaleMode :'x',
          }
        },
        customCanvasBackgroundColor : {
          color :'#fff',
        },
        legend : {
          position :'right',
          align : 'center',
          labels : {
            boxWidth :20 ,
            boxHeight : 20,
            color :'#1a2c4e',
            padding :15 ,
            textAlign : 'left',
            font: {
              size: 12,
              style: 'normal',
              lineHeight: 1.2
            },
            title : {
              text :'Datos Graficados:',
            }
          }
        },
    },
    spanGaps : true,
    showLine :true,           
  },
  plugins : [plugin],
});