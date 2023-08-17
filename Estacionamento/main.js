(function () {
    const $ = q => document.querySelector(q)

    function convertPeriod(mil){
        const min = Math.floor(mil / 60000);
        const sec = Math.floor((mil % 60000) / 1000);

        return `${min}m e ${sec}s `;
    }
    
    function renderGarage (){
        const garage = getGarage();
        $("#garage").innerHTML = "";

        garage.forEach(c => addCarToGarage(c))
    };
    
    function addCarToGarage(car) {
        const row = document.createElement("tr");

        row.innerHTML = `
        
            <td>${car.name}</td>
            <td>${car.licence}</td>
            <td data-time="${car.time}">${new Date(car.time)
                .toLocaleString("pt-BR", {hour: "numeric", minute: "numeric", second: "numeric"})}</td>     
            
            <td>
                <button class="delete">X</button>
            </td>      
        `;

        $("#garage").appendChild(row);
    };   

    function checkout(info){
        let period = new Date() - new Date(info[2].dataset.time);
        period = convertPeriod(period);
        
        const licence = info[1].textContent;
        const msg = `O veículo ${info[0].textContent} de placa ${licence}} permaneceu estacionado por ${period}. Deseja Encerrar? `;    
      
        if(!confirm(msg)) return;    

        const garage = getGarage().filter(c => c.licence !== licence);
        localStorage.garage = JSON.stringify(garage);

        renderGarage();
    }

    const getGarage = () => localStorage.garage ? JSON.parse(localStorage.garage) : [];

    renderGarage();
    
    $("#send").addEventListener("click", e => {
        const name = $("#name").value
        const licence = $("#licence").value;

        if(!name || !licence) {
            alert("Os campos são obrigatórios!");
            return;
        }

        const car = { name, licence, time: new Date() }

        const garage = getGarage();        
        garage.push(car);

        localStorage.garage = JSON.stringify(garage);       

        addCarToGarage(car); 

        $("#name").value = "";
        $("#licence").value = "";
    });

    $("#garage").addEventListener("click", e => {
        if(e.target.className == "delete")
            checkout(e.target.parentElement.parentElement.cells);
    })

})();

