import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { Typography } from "@material-tailwind/react";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const { headers } = useAuth();
  useEffect(() => {
    axios
      .get("http://localhost:3999/getBookingOfUser", { headers: headers })
      .then((response) => {
        setBookings(response.data);
      });
  }, [headers]);

  const tableHeader = ["id", "Type", "Guests", "Cost"];
  return (
    <div>
      <table>
        <thead className="w-full min-w-max table-auto text-left">
          <tr className="bg-sky-700">
            {tableHeader.map((label, index) => (
              <th key={index} className="border-y border-blue-gray-100 p-4">
                <Typography
                  variant="small"
                  color="white"
                  className="font-normal leading-none"
                >
                  {label}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => {
            const isLast = bookings.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            return (
              <tr key={index} className={index % 2 !== 0 ? "bg-white" : "bg-gray-200"}>
                <td className={classes}><div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {booking.book_id}
                      </Typography>
                    </div>
                  </div></td>
                <td>{booking.phone}</td>
                <td>
                  {booking.adults}Adults {booking.children}Children
                </td>
                <td>{booking.cost}</td>
              </tr>
            );
          })}
          {/* {currentActivities.map((activity, index) => {
            const isLast =
              (index === filteredActivities.length) === 0
                ? activities.length - 1
                : filteredActivities.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr
                key={index}
                className={index % 2 !== 0 ? "bg-white" : "bg-gray-200"}
              >
                <td className={classes}>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {activity.title}
                      </Typography>
                    </div>
                  </div>
                </td>
                <td className={classes}>
                  <div className="flex flex-col">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {activity.type}
                    </Typography>
                  </div>
                </td>
                <td className={classes}>
                  <div className="w-max">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {activity.availability}
                    </Typography>
                  </div>
                </td>
                <td className={classes}>
                  <Tooltip content="Edit Activity">
                    <IconButton
                      onClick={() => {
                        handleEdit(activity.activities_id);
                      }}
                      variant="text"
                    >
                      <PencilIcon className="h-4 w-4 text-sky-900" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip content="Delete Activity">
                    <IconButton
                      onClick={() => {
                        handleDelete(activity.activities_id);
                      }}
                      variant="text"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="text-sky-900 w-4 h-4 font-bold"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            );
          })} */}
        </tbody>
      </table>
    </div>
  );
};

export default BookingHistory;