"use client";

import apiURL from "@/app/_api/api-url";
import { fetchAllAdmins } from "@/app/_api/panel-user";
import { useEffect, useState } from "react";

interface Admin {
  panel_user_id: string;
  email: string;
  fullname: string;
  profile_picture: string;
  role: string;
  created_at: string;
}

const FetchAllAdmins = () => {
  const [adminData, setAdminData] = useState<Admin[]>([]);

  const getAllAdmins = async () => {
    try {
      const response = await fetchAllAdmins();
      console.log(response.data.data);
      setAdminData(response.data.data);
    } catch (error) {
      console.error("Error fetching admin", error);
    }
  };

  useEffect(() => {
    getAllAdmins();
  }, []);

  return (
    <div>
      {adminData.map((item) => (
        <div
          className="flex justify-center items-center flex-col mb-4"
          key={item.panel_user_id}
        >
          <h1>{item.fullname}</h1>
          <h1>{item.email}</h1>
          <h1>{item.profile_picture}</h1>
          <h1>{item.role}</h1>
        </div>
      ))}
    </div>
  );
};

export default FetchAllAdmins;
