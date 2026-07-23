import TripForm from "../../Components/Forms/TripForm";

const Dashboard = () => {

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <h1 className="text-3xl font-bold text-center mb-8">
                Admin Dashboard
            </h1>

            <TripForm />

        </div>
    );
};

export default Dashboard;