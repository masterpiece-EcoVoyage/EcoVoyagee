import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import CardSection from "./CardSection";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useBooking } from "../../Context/BookingContext";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const [success, setSuccess] = useState(false);
  const { bookData, onBooking } = useBooking();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const token = cookies["token"];
  const { headers } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          "http://localhost:3999/payment",
          {
            amount: bookData.cost * 100,
            id,
          },
          {
            headers: headers,
          }
        );

        if (response.data.success) {
          try {
            
            if (bookData.accommodation_id) {
              const booking = {
                room_id: bookData.rooms_ids[0],
                accommodation_id: bookData.accommodation_id,
                adults: bookData.adults,
                children: bookData.children,
                cost: bookData.cost,
                date_from: bookData.date_from,
                date_to: bookData.date_to,
              };
              console.log(booking);
              console.log("hbdjds");
              const response = await axios.post(
                `http://localhost:3999/BookRoom`,
                booking,
                {
                  headers: headers,
                }
              );
            } else if (bookData.packages_id) {
              const booking = {
                packages_id: bookData.packages_id,
                adults: bookData.adults,
                children: bookData.children,
                address: bookData.address,
                phone: bookData.phone,
                cost: bookData.cost,
                date_from: bookData.date_from,
                date_to: bookData.date_to,
              };
              // console.log(bookData.packages_id);
              const response = await axios.post(
                `http://localhost:3999/BookPackage/${bookData.packages_id}`,
                booking,
                {
                  headers: headers,
                }
              );
            }else if (bookData.activities_id) {
              const booking = {
                activities_id: bookData.activities_id,
                adults: bookData.adults,
                children: bookData.children,
                address: bookData.address,
                phone: bookData.phone,
                cost: bookData.cost,
                date_from: bookData.date_from,
                date_to: bookData.date_to,
              };
              // console.log(bookData.packages_id);
              const response = await axios.post(
                `http://localhost:3999/BookPackage/${bookData.activities_id}`,
                booking,
                {
                  headers: headers,
                }
              );
            } else if (bookData.flights_id) {
              let booking = {
                first_name: bookData.first_name,
                last_name: bookData.last_name,
                phone_number: bookData.phone_number,
                dateof_birth: bookData.dateof_birth,
                bag_details: bookData.bag_details,
                ticket_type: bookData.ticket_type,
                cost: bookData.cost,
                flights_id: bookData.flights_id,
              };
              console.log("hi");
              if (bookData.bag_details === "1 X 25KG") {
                booking.cost = bookData.cost + 40;
              } else if (bookData.bag_details === "1 X 30KG") {
                booking.cost = bookData.cost + 80;
              }

              setSuccess(true);
              const response = await axios.post(
                `http://localhost:3999/addTicket`,
                booking,
                {
                  headers: headers,
                }
              );
              console.log("whatever");
            }

            Swal.fire({
              title: "Payment Successful!",
              icon: "success",
              showCancelButton: false,
              confirmButtonText: "OK",
              customClass: {
                confirmButton:
                  "bg-sky-900 hover:bg-white text-white hover:text-sky-900 border border-sky-900 py-2 px-4 rounded",
              },
            });
            // onBooking([]);
            navigate(-1);
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.message,
              confirmButtonText: "OK",
              customClass: {
                confirmButton:
                  "bg-sky-900 hover:bg-white text-white hover:text-sky-900 border border-sky-900 py-2 px-4 rounded",
              },
            });
          }
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <div>
      <form
        className="flex flex-col gap-3 px-5"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="p-5">
          <CardSection />
        </div>
        <button
          type="submit"
          className="btn-pay py-2 px-4 w-full text-md text-second-color hover:text-fourth-color bg-fourth-color border-2 hover:bg-second-color border-fourth-color rounded-2xl"
        >
          Buy Now
        </button>
      </form>
    </div>
  );
}
