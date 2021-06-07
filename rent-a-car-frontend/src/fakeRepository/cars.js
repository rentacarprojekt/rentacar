function getCars(){
    return [
        createCar("Golf 3", "VW", "Coupe", "5000"),
        createCar("Golf 2", "VW", "Coupe", "3000"),
        createCar("Astra", "Opel", "Caravan", "10000"),
        createCar("Vectra", "Opel", "Caravan", "9000"),
        createCar("F-450", "Ferrari", "Exotic", "500000"),
        createCar("Aventador", "Lambo", "Exotic", "700000"),
        createCar("H3", "Hummer", "Jeep", "155000"),
        createCar("Scorpion", "VW", "Coupe", "15000"),
        createCar("Roomster", "Skoda", "Coupe", "12000"),
        createCar("Fabia", "Skoda", "Coupe", "13000"),
    ];
};

function createCar(model, manufacturer, type, price){
    return {
        model: model,
        manufacturer: manufacturer,
        type: type,
        price : price
    };
}

export default getCars;