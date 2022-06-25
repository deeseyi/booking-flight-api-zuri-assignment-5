const { Flights } = require('../models/Flight');
const { v4: uuid } = require('uuid');

//get all flights
exports.getFlights = async (req, res) => {
    try {
        const flights = Flights
        res.status(200).json({
            message: 'All Flights',
            flights
        });
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

//get single flight
exports.getSingleFlight = async (req, res) => {
    try {
        const flight = Flights.find(flight => flight.id === req.params.id);
        res.status(200).json({
            message: 'Flight found',
            flight
        });
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

// create new flight
exports.createFlight = async (req, res) => {
    try {
        const createdAt = new Date().toLocaleDateString();
        const flight = await req.body;
        flight.id = uuid();
        flight.createdAt = createdAt;

        Flights.push(flight);

        res.status(201).json({
            message: 'Flight created',
            flight
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// update flight
exports.updateFlight = async (req, res) => {
    try {
        const updatedAt = new Date().toLocaleDateString();
        const flight = Flights.find(flight => flight.id === req.params.id);
        const { title, time, price, date } = await req.body;
        flight.title = title;
        flight.time = time;
        flight.price = price;
        flight.date = date;
        flight.updatedAt = updatedAt;


        res.status(200).json({
            message: 'flight updated',
            flight
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// delete flight
exports.deleteFlight = async (req, res) => {
    try {
        const flight = Flights.find(flight => flight.id === req.params.id); 
        Flights.splice(Flights.indexOf(flight), 1);

        res.status(200).json({
            message: 'flight deleted',
            flight
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}