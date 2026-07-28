import TripForm from "../../Components/Forms/TripForm";
import EmergencyForm from "../../Components/Forms/EmergencyForm";
import ConstructionForm from "../../Components/Forms/ConstructionForm";
import AgricultureForm from "../../Components/Forms/AgricultureForm";
const Dashboard = () => {

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <h1 className="text-3xl font-bold text-center mb-8">
                Vehicle Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                <TripForm />

                <EmergencyForm />

                <AgricultureForm />

                <ConstructionForm />


            </div>

        </div>
    );
};

export default Dashboard;