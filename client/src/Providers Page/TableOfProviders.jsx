import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { useEffect, useState, useReducer } from "react";
import DismissableModal from "../components/Modal";
import axios from "axios";
export const TableOfProviders = () => {
  const [events, setEvents] = useState([]);
  const [reducer, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    axios
      .get("http://localhost:5500/getactiveprobelm")
      .then((response) => {
        setEvents(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [reducer]);

  const handleDelete = (email) => {
    Swal.fire({
      title: ` do you want to remove ${email}?  `,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: "warning",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire(` ${email} has been removed `, "", "success");

        axios
          .delete("http://localhost:5500/deleteproblem/" + email)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => console.log(error.message));
        forceUpdate();
      } else Swal.fire(" Cancelled", "", "error");
    });
  };

  const tableRows = events.map((event) => {
    return (
      <tr key={Math.random()} className="border-b dark:border-gray-700">
        <th
          scope="row"
          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {event.fullname}
        </th>
        <td className="px-4 py-3">{event.email}</td>
        <td className="px-4 py-3">{event.phoneNumber}</td>
        <td className="px-4 py-3">{event.dateOfBirth}</td>
        <td className="px-4 py-3">{event.gpa}</td>
        <td className="px-4 py-3">{event.city}</td>

        {/* <img src={event.image} className="h-12 w-12 object-cover" /> */}
        <td className="px-4 py-3">{event.amount}</td>
        <td className="px-4 py-3">{event.raised}</td>
        <DismissableModal image={event.images[0]} classes="h-12 w-12" />
        <td className="px-4 py-3 items-center justify-end">
          <div
            id=""
            className="bg-white  rounded divide-y divide-gray-100 shadow "
          >
            <div className="tooltip tooltip-error text-white" data-tip="Delete">
              <button
                onClick={() => handleDelete(event.email)}
                className="btn bg-white hover:bg-red-200 shadow-lg hover:shadow-xl border-none "
              >
                <AiOutlineDelete className="text-red-500 text-[15px]" />
              </button>
            </div>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <section className="w-full  mt-5 ">
      <div className="">
        {/* Start coding here */}
        <h1 className="text-[30px] font-bold py-3">Students Problems</h1>
        <div className="bg-white  relative shadow-md sm:rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full  text-sm text-left text-gray-500 table-zebra ">
              <thead className="text-xs text-white uppercase bg-[#222] dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Student Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Email{" "}
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Phone Number
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Date of Birth
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Student GPA
                  </th>
                  <th scope="col" className="px-4 py-3">
                    City
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Raised
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Images
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.length === 0 ? (
                  <div className="p-3 text-lg">There Are No Events</div>
                ) : (
                  tableRows
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
