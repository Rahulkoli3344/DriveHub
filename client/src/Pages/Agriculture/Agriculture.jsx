import React, { useEffect, useState } from "react";
import axios from "axios";
import AgricultureCard from "../../Components/Cards/AgricultureCard";

export default function Agriculture({
  onlyCurrentUser = false,
  showHeading = true,
  showSearch = true,
}) {


  const [agricultureVehicles, setAgricultureVehicles] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [editedAgriculture, setEditedAgriculture] = useState({});

  const [search, setSearch] = useState("");


  const userId = localStorage.getItem("userId");

  const isAdmin = localStorage.getItem("role") === "Admin";




  const filteredAgriculture = agricultureVehicles.filter((agriculture) => {

    const text = search.toLowerCase();


    return (

      agriculture.vehicleName.toLowerCase().includes(text) ||

      agriculture.location.toLowerCase().includes(text)

    );

  });




  useEffect(() => {

    fetchAgriculture();

  }, []);




  const fetchAgriculture = async () => {

    try {

      let response;


      if (onlyCurrentUser) {

        response = await axios.get(

          `https://localhost:7041/api/Agriculture/user/${userId}`

        );

      }

      else {

        response = await axios.get(

          "https://localhost:7041/api/Agriculture"

        );

      }



      setAgricultureVehicles(response.data);


    }

    catch (error) {

      console.error(error);

    }

  };






  const handleDelete = async (id) => {


    const confirmDelete = window.confirm(

      "Are you sure you want to delete this agriculture vehicle?"

    );


    if (!confirmDelete)
      return;




    try {


      await axios.delete(

        `https://localhost:7041/api/Agriculture/${id}`

      );



      setAgricultureVehicles((prev) =>

        prev.filter((item) => item.id !== id)

      );



      alert("Agriculture Vehicle Deleted Successfully");


    }

    catch (error) {

      console.error(error);

      alert("Delete Failed");

    }

  };







  const handleUpdate = (agriculture) => {


    setEditingId(agriculture.id);


    setEditedAgriculture({

      ...agriculture

    });


  };







  const handleChange = (e) => {


    const { name, value } = e.target;



    setEditedAgriculture((prev) => ({

      ...prev,

      [name]: value

    }));


  };








  const handleSave = async () => {


    try {


      const formData = new FormData();



      formData.append(

        "vehicleName",

        editedAgriculture.vehicleName

      );



      formData.append(

        "vehicleNumber",

        editedAgriculture.vehicleNumber

      );



      formData.append(

        "category",

        editedAgriculture.category

      );



      formData.append(

        "location",

        editedAgriculture.location

      );



      formData.append(

        "ownerName",

        editedAgriculture.ownerName

      );



      formData.append(

        "ownerContact",

        editedAgriculture.ownerContact

      );



      formData.append(

        "specifications",

        editedAgriculture.specifications

      );

      formData.append("userId", editedAgriculture.userId);
      formData.append("paymentMethod", editedAgriculture.paymentMethod);
      formData.append("paymentStatus", editedAgriculture.paymentStatus);
      formData.append("transactionId", editedAgriculture.transactionId);





      await axios.put(

        `https://localhost:7041/api/Agriculture/${editingId}`,

        formData,

        {

          headers: {

            "Content-Type": "multipart/form-data"

          }

        }

      );




      fetchAgriculture();



      setEditingId(null);



      alert("Agriculture Vehicle Updated Successfully");


    }

    catch (error) {


      console.error(error);


      alert("Update Failed");


    }


  };







  const handleCancel = () => {


    setEditingId(null);


    setEditedAgriculture({});


  };







  return (

    <div className="container mx-auto px-6 py-8">



      {
        showHeading && (

          <h1 className="text-4xl font-bold text-center mb-10">

            Agriculture Vehicles

          </h1>

        )
      }






      {
        showSearch && (

          <div className="flex justify-center mb-6">


            <input

              type="text"

              placeholder="🔍 Search by Vehicle Name or Location..."

              className="input input-bordered w-full max-w-lg"

              value={search}

              onChange={(e) => setSearch(e.target.value)}

            />


          </div>

        )
      }







      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">


        {
          filteredAgriculture.map((agriculture) => (


            <AgricultureCard


              key={agriculture.id}


              agriculture={agriculture}


              editingId={editingId}


              editedAgriculture={editedAgriculture}


              onChange={handleChange}


              onSave={handleSave}


              onCancel={handleCancel}


              onEdit={handleUpdate}


              onDelete={handleDelete}


              showActions={onlyCurrentUser || isAdmin}


            />


          ))
        }


      </div>



    </div>

  );

}