
let chart;

function filterChart(e) {
    // Get input value
    const value = e.srcElement.value;

    // Get chart nodes
    const data = chart.data();

    // Clear previous highlighting
    chart.clearHighlighting();

    // Mark all previously expanded nodes for collapse
    data.forEach((d) => (d._expanded = false));

    // Loop over data and check if input value matches any name or position
    data.forEach((d) => {
        const nameMatches = value !== '' && d.name.toLowerCase().includes(value.toLowerCase());
        const positionMatches = value !== '' && d.position.toLowerCase().includes(value.toLowerCase());

        // If matches either name or position, mark node as highlighted
        if (nameMatches || positionMatches) {
            d._highlighted = true;
            d._expanded = true;
        }
    })

    // Update data and rerender graph
    chart.data(data).render().fit();
    console.log('filtering chart', e.srcElement.value);
}

function showEmployeeDetails() {

}

// This is the data used - https://raw.githubusercontent.com/Potapozavr/Site/main/data-oracle.csv
d3.csv('https://raw.githubusercontent.com/pevlik/site_petr/main/new_data.csv').then((data) => {
    chart = new d3.OrgChart()
        .nodeContent(function (d, i, arr, state) {
            const color = '#FFFFFF';
            const imageDiffVert = 25 + 2;

            return `
            <div class="employee-card ${d.data.id}" style="display: block">
            <img src="${d.data.image}" alt="photo">
            <div class="employee-details">
                <h2>${d.data.position}</h2>
                <p>${d.data.name}</p>
                <p>Email: ${d.data.email}</p>
                <p>Телефон: ${d.data.phone}</p>
            </div>
            <!-- <a href="3333.html" class="back-button" style="text-align: center;">Назад к структурной схеме бюро</a> -->
        </div>

                <div style='width:${d.width}px;
                  height:110px;
                  padding-top:${imageDiffVert - 2}px;
                  padding-left:1px;
                  padding-right:1px'>

                  <div style="font-family: 'Inter', sans-serif;
                      background-color:${color};
                      margin-left:-1px;
                      width:${d.width - 2}px;
                      height:${d.height - imageDiffVert}px;
                      border-radius:10px;
                      border: 3px solid #E4E2E9">
                      
                    <div class="card_id" style="display:flex;
                        justify-content:flex-end;
                        margin-top:5px;
                        margin-right:8px">#${d.data.id}
                    </div>
                    
                    <div style="background-color:${color};
                        margin-top:${-imageDiffVert - 25}px;
                        margin-left:${15}px;
                        border-radius:100px;
                        width:45px;
                        height:45px;" >
                    </div>
                    
                    <div style="margin-top:${-imageDiffVert - 25}px; 
                        width: 75px;">
                        <img src=" ${d.data.image}" style="
                            margin-left:${5}px;
                            border-radius:100px;
                            width:60px;
                            height:60px;" />
                    </div>
                    
                    <div style="font-size:15px;
                        color:#08011E;
                        text-align: center">${d.data.name} 
                    </div>
                    
                    <div style="color:#716E7B;
                        margin-top:3px;
                        text-align: center;
                        font-size:15px;"> ${d.data.position} 
                    </div>
                                        
                  </div>
                  <div style="text-align:center; margin-top:-15px; margin-left: 294px">
                    <button 
                    style="background-color: rgb(41, 151, 255); 
                    border-radius: 5px; border: solid 2px #808080; 
                    color: white; 
                    cursor: pointer;
                    margin-top: 20px" 
                    onclick="(event.target.innerText === 'Подробно') ? showEmployeeDetails(${JSON.stringify(d.data).split('"').join("&quot;")}) : hideEmployeeDetails()")">Подробно</button>
                  </div>
                </div>
              `;
        })
        .container('.chart-container')
        .data(data)
        .render();
});