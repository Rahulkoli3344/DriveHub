import React, { useState } from "react";
import { searchVehicle } from "../../Services/ChatService";

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [vehicleName, setVehicleName] = useState("");
    const [location, setLocation] = useState("");

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {

        if (!vehicleName && !location) {
            alert("Please enter Vehicle Name or Location");
            return;
        }

        try {
            setLoading(true);

            const data = await searchVehicle(vehicleName, location);

            setResults(data);
        }
        catch (error) {
            console.error(error);
            alert("Search Failed");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-5 right-5 w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 text-white text-3xl shadow-2xl transition-all duration-300 hover:scale-110 z-50"            >
                🤖
            </button>

            {/* Chat Window */}
            {isOpen && (

                <div className="fixed bottom-24 right-5 w-96 bg-white rounded-2xl shadow-2xl border border-red-200 z-50 overflow-hidden">

                    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-t-xl flex justify-between items-center">

                        <h2 className="font-bold">
                            🚗 DriveHub Assistant
                        </h2>

                        <button onClick={() => setIsOpen(false)}>
                            ✖
                        </button>

                    </div>

                    <div className="p-4">

                        <input
                            type="text"
                            placeholder="Vehicle Name"
                            className="input input-bordered w-full mb-3"
                            value={vehicleName}
                            onChange={(e) => setVehicleName(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Location"
                            className="input input-bordered w-full mb-3"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />

                        <button
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-all duration-300"
                            onClick={handleSearch}
                        >
                            Search
                        </button>

                        {loading && (
                            <p className="text-center mt-3">
                                Searching...
                            </p>
                        )}

                        {
                            results.length > 0 && (

                                <div className="mt-4 max-h-80 overflow-auto">

                                    {
                                        results.slice(0, 5).map((item, index) => (

                                            <div
                                                key={index}
                                                className="border border-red-100 rounded-xl p-3 mb-3 shadow hover:shadow-lg transition-all duration-300"
                                            >

                                                <img
                                                    src={
                                                        item.imagePath?.startsWith("http")
                                                            ? item.imagePath
                                                            : `https://localhost:7041${item.imagePath}`
                                                    }
                                                    alt={item.vehicleName}
                                                    className="w-full h-40 object-cover rounded"
                                                />

                                                <h3 className="font-bold text-lg mt-2">
                                                    {item.vehicleName}
                                                </h3>

                                                <p><b>Category :</b> {item.category}</p>
                                                <p><b>Vehicle No :</b> {item.vehicleNumber}</p>
                                                <p><b>Location :</b> {item.location}</p>
                                                <p><b>Owner :</b> {item.ownerName}</p>
                                                <p><b>Contact :</b> {item.ownerContact}</p>

                                            </div>

                                        ))
                                    }

                                    {/* 👇 Ye naya code add karna hai */}
                                    {results.length > 5 && (
                                        <div className="mt-4 text-center">
                                            <p className="text-sm text-gray-600 mb-2">
                                                Showing 5 of {results.length} results
                                            </p>

                                            <button
                                                className="btn btn-outline btn-error w-full"
                                            >
                                                View All Results
                                            </button>
                                        </div>
                                    )}

                                </div>

                            )
                        }

                        {
                            !loading &&
                            results.length === 0 &&
                            (vehicleName || location) &&

                            <p className="text-center mt-4 text-red-500">
                                No Vehicles Found
                            </p>
                        }

                    </div>

                </div>

            )}

        </>
    );
};

export default ChatBot;