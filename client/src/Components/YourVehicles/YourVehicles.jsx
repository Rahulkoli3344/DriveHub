import Trip from "../../Pages/Trip/Trip";
import Emergency from "../../Pages/Emergency/Emergency";
import Construction from "../../Pages/Construction/Construction";
import Agriculture from "../../Pages/Agriculture/Agriculture";
import HeavyLoad from "../../Pages/HeavyLoad/HeavyLoad";
import LightLoad from "../../Pages/LightLoad/LightLoad";
import RentalCars from "../../Pages/RentalCars/RentalCars";

export default function YourVehicles() {
  return (
    <div className="container mx-auto px-6 py-8">

      <h1 className="text-4xl font-bold text-center mb-10">
        🚗 Your Vehicles
      </h1>

      <Trip
        onlyCurrentUser={true}
        showHeading={false}
        showSearch={false}
      />

      <Emergency
        onlyCurrentUser={true}
        showHeading={false}
        showSearch={false}
      />

      <Construction
        onlyCurrentUser={true}
        showHeading={false}
        showSearch={false}
      />

      <Agriculture
        onlyCurrentUser={true}
        showHeading={false}
        showSearch={false}
      />

      <HeavyLoad
        onlyCurrentUser={true}
        showHeading={false}
        showSearch={false}
      />

      <LightLoad
        onlyCurrentUser={true}
        showHeading={false}
        showSearch={false}
      />

      <RentalCars
        onlyCurrentUser={true}
        showHeading={false}
        showSearch={false}
      />

    </div>
  );
}