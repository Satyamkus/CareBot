// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";

// const Checkups = () => {
//   const [checkups, setCheckups] = useState([]);
//   const { token } = useContext(AuthContext);

//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const fetchCheckups = async () => {
//     const res = await axios.get(`${backendUrl}/api/checkups/list`);
//     setCheckups(res.data.checkups);
//   };

//   useEffect(() => {
//     fetchCheckups();
//   }, []);

//   const bookCheckup = async (checkupName) => {
//     if (!token) {
//       alert("Please login first");
//       return;
//     }

//     const res = await axios.post(
//       `${backendUrl}/api/checkups/book`,
//       { checkupName },
//       {
//         headers: { token },
//       }
//     );

//     if (res.data.success) {
//       alert(
//         `Booked. Queue no ${res.data.booking.queueNumber}, Slot ${res.data.booking.slotStart}`
//       );
//       fetchCheckups();
//     } else {
//       alert(res.data.message);
//     }
//   };

//   return (
//     <div className="my-12">
//       <h1 className="text-3xl font-semibold text-gray-800">
//         Diagnostic Checkups
//       </h1>

//       <p className="text-sm text-gray-500 mt-2">
//         Book your test slot instantly.
//       </p>

//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
//         {checkups.map((item) => (
//           <div
//             key={item.key}
//             className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition-all"
//           >
//             <p className="text-xl font-semibold capitalize">
//               {item.key.replace("_", " ")}
//             </p>

//             <p className="text-sm text-gray-500 mt-1">
//               {item.category}
//             </p>

//             <p className="mt-3 text-sm">
//               Duration: {item.duration} mins
//             </p>

//             <p className="text-sm">
//               Doctor: {item.doctorName}
//             </p>

//             <p className="font-medium mt-3">
//               ₹ {item.fees}
//             </p>

//             <button
//               onClick={() => bookCheckup(item.key)}
//               className="mt-5 bg-blue-700 text-white px-5 py-2 rounded-full hover:bg-blue-800"
//             >
//               Book Checkup
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Checkups;



import React, { useEffect, useState, useContext, useMemo } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Checkups = () => {
  const [checkups, setCheckups] = useState([]);
  const [previews, setPreviews] = useState({});
  const [category, setCategory] = useState("all");
  const [loadingKey, setLoadingKey] = useState("");

  const { token } = useContext(AuthContext);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchCheckups = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/checkups/list`);

      if (res.data.success) {
        setCheckups(res.data.checkups || []);

        const previewCalls = await Promise.all(
          res.data.checkups.map((item) =>
            axios.get(
              `${backendUrl}/api/checkups/preview/${item.key}`
            )
          )
        );

        const previewMap = {};

        res.data.checkups.forEach((item, index) => {
          previewMap[item.key] = previewCalls[index].data;
        });

        setPreviews(previewMap);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCheckups();
  }, []);

  const filteredCheckups = useMemo(() => {
    if (category === "all") return checkups;
    return checkups.filter((item) => item.category === category);
  }, [checkups, category]);

  const bookCheckup = async (checkupName) => {
    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      setLoadingKey(checkupName);

      const res = await axios.post(
        `${backendUrl}/api/checkups/book`,
        { checkupName },
        {
          headers: { token },
        }
      );

      if (res.data.success) {
        const booking = res.data.booking;

        alert(
          `Booking confirmed.\nQueue: ${booking.queueNumber}\nSlot: ${booking.slotStart} - ${booking.slotEnd}\nExpected report: ${new Date(
            booking.reportDateTime
          ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`
        );

        fetchCheckups();
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Booking failed");
    } finally {
      setLoadingKey("");
    }
  };

  return (
    <div className="my-12">
      {/* Hero */}
      <div className="bg-blue-700 rounded-3xl px-8 py-10 text-white">
        <p className="text-3xl font-semibold">
          Diagnostic Checkups
        </p>

        <p className="mt-2 text-sm text-blue-100 max-w-2xl">
          Book pathology and radiology tests with live queue
          visibility, next available slot timing, and expected
          report delivery — all in one place.
        </p>
      </div>

      {/* Filters */}
      <div className="mt-8 flex flex-wrap gap-3">
        {["all", "Radiology", "Pathology"].map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              category === item
                ? "bg-blue-700 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {item === "all" ? "All Tests" : item}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredCheckups.map((item) => {
          const preview = previews[item.key];

          return (
            <div
              key={item.key}
              className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xl font-semibold capitalize text-gray-800">
                    {item.key.replace("_", " ")}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {item.category}
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full text-xs bg-blue-50 text-blue-700">
                  {preview?.queueCount || 0} in queue
                </span>
              </div>

              <div className="mt-5 space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium text-gray-800">
                    Duration:
                  </span>{" "}
                  {item.duration} mins
                </p>

                <p>
                  <span className="font-medium text-gray-800">
                    Doctor:
                  </span>{" "}
                  {item.doctorName}
                </p>

                <p>
                  <span className="font-medium text-gray-800">
                    Fees:
                  </span>{" "}
                  ₹ {item.fees}
                </p>
              </div>

              {preview?.success && (
                <div className="mt-5 bg-gray-50 rounded-xl p-4 text-sm">
                  <p className="font-medium text-gray-800 mb-2">
                    Next Available Slot
                  </p>

                  <p className="text-gray-600">
                    {preview.nextSlotDate}
                  </p>

                  <p className="text-gray-600">
                    {preview.nextSlotStart} - {preview.nextSlotEnd}
                  </p>

                  <p className="mt-3 text-gray-600">
                    Expected report by{" "}
                    <span className="font-medium text-gray-800">
                      {preview.expectedReportTime}
                    </span>
                  </p>
                </div>
              )}

              <div className="mt-6">
                <button
                  onClick={() => bookCheckup(item.key)}
                  disabled={loadingKey === item.key}
                  className="w-full bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-800 transition-all"
                >
                  {loadingKey === item.key
                    ? "Booking..."
                    : "Reserve This Slot"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer text */}
      <div className="mt-12 text-sm text-gray-500 leading-6 max-w-3xl">
        Slot allocation is dynamic and based on real-time queue
        movement. Once a checkup is completed, the queue updates
        automatically. If the day is fully booked, the next
        available slot is assigned on the following working day.
      </div>
    </div>
  );
};

export default Checkups;