// Datos del Finnsailer 34 "BELA"
const windSpeeds = [6, 8, 10, 12, 14, 16, 20];

// Ángulos fijos de la tabla
const fixedAngles = [52, 60, 75, 90, 110, 120, 135, 150];

// Velocidades en los ángulos fijos (Filas de tu tabla traspuestas a columnas por viento)
const fixedSpeeds = [
    [4.12, 4.93, 5.49, 5.88, 6.09, 6.20, 6.28], // 52°
    [4.44, 5.24, 5.80, 6.16, 6.38, 6.50, 6.61], // 60°
    [4.65, 5.47, 6.05, 6.42, 6.65, 6.81, 6.99], // 75°
    [4.61, 5.47, 6.11, 6.51, 6.76, 6.96, 7.24], // 90°
    [4.28, 5.23, 5.99, 6.49, 6.81, 7.06, 7.47], // 110°
    [4.09, 5.05, 5.82, 6.38, 6.73, 7.00, 7.46], // 120°
    [3.66, 4.62, 5.40, 6.05, 6.51, 6.81, 7.28], // 135°
    [3.14, 3.99, 4.74, 5.38, 5.94, 6.36, 6.92]  // 150°
];

// Datos de Beat (Ceñida) y Gybe (Empopada) - Ángulo y VMG
const beatData = {
    angles: [47.1, 45.6, 45.4, 45.0, 45.3, 45.4, 46.0],
    vmg: [2.61, 3.16, 3.55, 3.81, 3.95, 4.03, 4.05]
};
const gybeData = {
    angles: [144.8, 169.4, 171.2, 172.1, 173.0, 174.8, 177.2],
    vmg: [2.72, 3.50, 4.27, 4.94, 5.55, 6.07, 6.76]
};

// --- LÓGICA DE CÁLCULO (Convierte VMG a Velocidad Real) ---
function getSpeedFromVMG(vmg, angle, isBeat) {
    const rad = angle * (Math.PI / 180);
    if (isBeat) return vmg / Math.cos(rad);
    // Para empopada: VMG = Speed * cos(180 - angle)
    return vmg / Math.cos((Math.PI) - rad);
}

// --- CONSTRUCCIÓN DEL GRÁFICO ---
function initPolarChart() {
    // Check if the container exists
    if (!document.getElementById('polarChart')) return;

    const traces = [];

    // Iteramos por cada velocidad de viento (columnas de tu tabla)
    for (let i = 0; i < windSpeeds.length; i++) {
        let r = [];     // Velocidades (Radio)
        let theta = []; // Ángulos

        // A. Punto Beat (Ceñida)
        let bAngle = beatData.angles[i];
        let bSpeed = getSpeedFromVMG(beatData.vmg[i], bAngle, true);
        theta.push(bAngle);
        r.push(bSpeed);

        // B. Puntos intermedios
        for (let j = 0; j < fixedAngles.length; j++) {
            theta.push(fixedAngles[j]);
            r.push(fixedSpeeds[j][i]);
        }

        // C. Punto Gybe (Empopada)
        let gAngle = gybeData.angles[i];
        let gSpeed = getSpeedFromVMG(gybeData.vmg[i], gAngle, false);
        theta.push(gAngle);
        r.push(gSpeed);

        // Ordenamos los puntos por ángulo
        let combined = theta.map((t, idx) => ({ t: t, r: r[idx] }));
        combined.sort((a, b) => a.t - b.t);

        // Añadir trazo al gráfico
        traces.push({
            type: 'scatterpolar',
            mode: 'lines+markers',
            r: combined.map(x => x.r),
            theta: combined.map(x => x.t),
            name: windSpeeds[i] + ' kn',
            line: { shape: 'spline', smoothing: 1.3 }
        });
    }

    // Configuración visual
    const layout = {
        title: {
            text: 'Rendimiento Finnsailer 34 "BELA"',
            font: { family: 'Poppins, sans-serif', size: 20, color: '#005c99' }
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        polar: {
            radialaxis: {
                visible: true,
                range: [0, 8], // Ajustado maximas para Finnsailer 34
                title: { text: 'Knots' }
            },
            angularaxis: {
                direction: "clockwise",
                rotation: 0
            }
        },
        showlegend: true,
        legend: { orientation: "h", y: -0.2 },
        margin: { t: 50, b: 50, l: 30, r: 30 },
        font: { family: 'Poppins, sans-serif' }
    };

    // Responsive config
    const config = { responsive: true, displayModeBar: false };

    Plotly.newPlot('polarChart', traces, layout, config);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initPolarChart);
