const response = require('../../network/response');

let drybox = {
    status: 1,
    fan_speed: 100,
    target_temp_in: 27,
    max_temp_heater: 50,
    temp_heater: 30,
    sensor_in: {
        temp: 20,
        humid: 40,
        status: 1
    },
    sensor_out: {
        temp: 20,
        humid: 40,
        status: 1
    }
};

function getRandomArbitrary(min, max) {
    const randNum = Math.random() * (max - min) + min
    return parseFloat(randNum.toFixed(2));
}

async function getStatus(req, res, next) {
    try {
        drybox['sensor_in']['temp'] = getRandomArbitrary(20, 30);
        drybox['sensor_in']['humid'] = getRandomArbitrary(34, 65);
        drybox['sensor_out']['temp'] = getRandomArbitrary(12, 27);
        drybox['sensor_out']['humid'] = getRandomArbitrary(27, 45);
        drybox['temp_heater'] = getRandomArbitrary(10, 45);
        const toSend = drybox;
        response.success(req, res, 200, toSend);
    } catch (error) {
        next(error);
    }
}

async function turnOff(req, res, next) {
    try {
        drybox['status'] = 0;
        drybox['fan_speed'] = 0;
        const toSend = drybox;
        response.success(req, res, 200, toSend);
    } catch (error) {
        next(error);
    }
}

async function setVariables(req, res, next) {
    try {
        console.log(req.body);
        const temperature = parseFloat(req.body.temperature);
        const heater = parseFloat(req.body.heater);
        const fan_speed = parseInt(req.body.fanspeed);
        if (temperature != undefined && heater != undefined && fan_speed != undefined) {
            console.log(heater, temperature, fan_speed);
            if ((temperature <= 70) && (heater <= 75)) {
                drybox['status'] = 1;
                drybox['fan_speed'] = fan_speed;
                drybox['target_temp_in'] = temperature;
                drybox['max_temp_heater'] = heater;
                const toSend = { status: 'OK' };
                response.success(req, res, 200, toSend);
            } else {
                response.error(req, res, 400, 'Missing parameters');
            }
        } else {
            response.error(req, res, 400, 'Invalid format');
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getStatus,
    turnOff,
    setVariables
}