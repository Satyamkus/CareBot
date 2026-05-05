// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const DoctorAppointments = () => {
//   const [appointments, setAppointments] = useState([]);

//   const fetchAppointments = async () => {
//     const token = localStorage.getItem("token");

//     const res = await axios.get(
//       "http://localhost:4000/api/doctor/appointments",
//       {
//         headers: { token },
//       }
//     );

//     if (res.data.success) {
//       setAppointments(res.data.appointments);
//     }
//   };

//   const acceptAppointment = async (id) => {
//     const token = localStorage.getItem("token");

//     await axios.patch(
//       `http://localhost:4000/api/doctor/appointments/accept/${id}`,
//       {},
//       {
//         headers: { token },
//       }
//     );

//     fetchAppointments();
//   };

//   const cancelAppointment = async (id) => {
//     const token = localStorage.getItem("token");

//     await axios.patch(
//       `http://localhost:4000/api/doctor/appointments/cancel/${id}`,
//       {},
//       {
//         headers: { token },
//       }
//     );

//     fetchAppointments();
//   };

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   return (
//     <div>
//       <p className="text-xl font-semibold mb-4">Appointments</p>

//       {appointments.map((item) => (
//         <div
//           key={item._id}
//           className="border rounded p-4 mb-4"
//         >
//           <p><b>User:</b> {item.userName}</p>
//           <p><b>Email:</b> {item.userEmail}</p>
//           <p><b>Phone:</b> {item.userPhone}</p>
//           <p><b>Address:</b> {item.userAddress}</p>
//           <p><b>Date:</b> {item.slotDate}</p>
//           <p><b>Time:</b> {item.slotTime}</p>
//           <p><b>Status:</b> {item.status}</p>

//           {item.status === "pending" && (
//             <div className="flex gap-3 mt-3">
//               <button
//                 onClick={() => acceptAppointment(item._id)}
//                 className="bg-green-600 text-white px-4 py-2 rounded"
//               >
//                 Accept
//               </button>

//               <button
//                 onClick={() => cancelAppointment(item._id)}
//                 className="bg-red-600 text-white px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DoctorAppointments;


import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const token = localStorage.getItem("token");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/doctor/appointments`, {
        headers: { token },
      });

      if (res.data.success) {
        setAppointments(res.data.appointments || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const acceptAppointment = async (id) => {
    try {
      await axios.patch(
        `${backendUrl}/api/doctor/appointments/accept/${id}`,
        {},
        { headers: { token } }
      );
      fetchAppointments();
    } catch (error) {
      console.log(error);
    }
  };

  const cancelAppointment = async (id) => {
    try {
      await axios.patch(
        `${backendUrl}/api/doctor/appointments/cancel/${id}`,
        {},
        { headers: { token } }
      );
      fetchAppointments();
    } catch (error) {
      console.log(error);
    }
  };

  const isToday = (date) => {
    if (!date) return false;
    const d = new Date(date);
    const today = new Date();

    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  };

  const isThisMonth = (date) => {
    if (!date) return false;
    const d = new Date(date);
    const today = new Date();

    return (
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  };

  const isThisYear = (date) => {
    if (!date) return false;
    const d = new Date(date);
    return d.getFullYear() === new Date().getFullYear();
  };

  const filteredAppointments = useMemo(() => {
    let data = [...appointments];

    // status filter
    if (statusFilter !== "all") {
      if (statusFilter === "rejected") {
        data = data.filter((a) => a.status?.includes("cancelled"));
      } else {
        data = data.filter((a) => a.status === statusFilter);
      }
    }

    // date filter
    if (dateFilter !== "all") {
      if (dateFilter === "today") {
        data = data.filter((a) => isToday(a.createdAt));
      }

      if (dateFilter === "month") {
        data = data.filter((a) => isThisMonth(a.createdAt));
      }

      if (dateFilter === "year") {
        data = data.filter((a) => isThisYear(a.createdAt));
      }
    }

    return data;
  }, [appointments, statusFilter, dateFilter]);

  const stats = useMemo(() => {
    return {
      total: appointments.length,
      today: appointments.filter((a) => isToday(a.createdAt)).length,
      pending: appointments.filter((a) => a.status === "pending").length,
      accepted: appointments.filter((a) => a.status === "accepted").length,
      rejected: appointments.filter((a) =>
        a.status?.includes("cancelled")
      ).length,
    };
  }, [appointments]);

  const statusBadge = (status) => {
    if (status === "accepted") {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          Accepted
        </span>
      );
    }

    if (status === "pending") {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
          Pending
        </span>
      );
    }

    return (
      <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
        Rejected
      </span>
    );
  };

  return (
    <div className="mt-8">
      {/* Heading */}
      <div className="mb-6">
        <p className="text-2xl font-semibold text-gray-800">
          Appointment Management
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Track appointments, approve requests, and manage patient schedules.
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard title="Total" value={stats.total} />
        <StatCard title="Today" value={stats.today} />
        <StatCard title="Pending" value={stats.pending} />
        <StatCard title="Accepted" value={stats.accepted} />
        <StatCard title="Rejected" value={stats.rejected} />
      </div>

      {/* Filters */}
      <div className="bg-white border rounded-2xl p-4 shadow-sm mb-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">
            Filter by Status
          </p>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">
            Filter by Time
          </p>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>

        <div className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-800">
            {filteredAppointments.length}
          </span>{" "}
          records
        </div>
      </div>

      {/* Empty State */}
      {!filteredAppointments.length && (
        <div className="bg-white rounded-2xl border p-8 text-center text-gray-500">
          No appointments found for selected filters.
        </div>
      )}

      {/* Appointment Cards */}
      <div className="space-y-5">
        {filteredAppointments.map((item) => (
          <div
            key={item._id}
            className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
              {/* Left */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-lg font-semibold text-blue-700">
                    {item.userName?.charAt(0)?.toUpperCase() || "P"}
                  </div>

                  <div>
                    <p className="font-semibold text-lg text-gray-800">
                      {item.userName}
                    </p>
                    <p className="text-sm text-gray-500">
                      Patient Appointment
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-y-3 text-sm text-gray-600">
                  <p>
                    <span className="font-medium text-gray-800">Email:</span>{" "}
                    {item.userEmail || "Not available"}
                  </p>

                  <p>
                    <span className="font-medium text-gray-800">Phone:</span>{" "}
                    {item.userPhone || "Not available"}
                  </p>

                  <p>
                    <span className="font-medium text-gray-800">Slot Date:</span>{" "}
                    {item.slotDate}
                  </p>

                  <p>
                    <span className="font-medium text-gray-800">Slot Time:</span>{" "}
                    {item.slotTime}
                  </p>

                  <p>
                    <span className="font-medium text-gray-800">
                      Booked On:
                    </span>{" "}
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>

                  <p>
                    <span className="font-medium text-gray-800">
                      Booking Time:
                    </span>{" "}
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleTimeString()
                      : "N/A"}
                  </p>

                  <p className="md:col-span-2">
                    <span className="font-medium text-gray-800">Address:</span>{" "}
                    {item.userAddress || "Not available"}
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="lg:min-w-[190px]">
                <div className="mb-4">{statusBadge(item.status)}</div>

                {item.status === "pending" && (
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => acceptAppointment(item._id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-green-700 transition-all"
                    >
                      Accept Appointment
                    </button>

                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-red-700 transition-all"
                    >
                      Reject Appointment
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white border rounded-2xl p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold mt-1 text-gray-800">{value}</p>
    </div>
  );
};

export default DoctorAppointments;