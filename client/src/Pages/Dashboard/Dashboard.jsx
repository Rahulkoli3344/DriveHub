import TripForm from "../../Components/Forms/TripForm";
import EmergencyForm from "../../Components/Forms/EmergencyForm";
import ConstructionForm from "../../Components/Forms/ConstructionForm";
import AgricultureForm from "../../Components/Forms/AgricultureForm";
const Dashboard = () => {

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <h1 className="text-3xl font-bold text-center mb-8">
                Admin Dashboard
            </h1>

            <TripForm />
            <EmergencyForm />
            <ConstructionForm />
            <AgricultureForm />

        </div>
    );
};

export default Dashboard;