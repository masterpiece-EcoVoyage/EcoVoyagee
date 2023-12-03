import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ElementsConsumer } from "@stripe/react-stripe-js";
import { useBooking } from "../../Context/BookingContext";
import { useLocation } from "react-router-dom";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const STRIPE_PUBLISHABLE_KEY =
  "pk_test_51OF0wGLz8T2xmaTmlGyyYlzySbUQ8dh3nJbAQGxBYgRlfYResBCMAb7siQdaJ9jWO2OmXXrHFEaQ5uZW6at3zWP100OuLbiZEu";
const clientSecret =
  "sk_test_51OF0wGLz8T2xmaTmWCAba6QFU2beCyjnk9NJoy8sVRcmEy8XdQcSiOArBOredFlXHAay9162zzHSa9BMvO3EK2gs00KuCAJ0yH";
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

function Payment() {
  const [date, setDate] = useState("");
  const history = useLocation();
  const { bookData, onBooking } = useBooking();
  const { booking, setBooking } = useState();

  const handleChange = () => {};
  const handleSubmit = () => {};
  if (bookData && bookData.flights_id) {
    return (
      <div className="flex flex-wrap justify-center items-center my-5">
        <div className="rounded-xl w-full md:w-3/5 bg-gray-50">
          <form action="" onSubmit={handleSubmit}>
            <div className="flex justify-center items-start md:items-center">
              <div className="py-8 px-12 w-full">
                <div className="flex flex-col justify-center">
                  <h1 className="text-3xl text-sky-900 font-bold text-start mb-4 cursor-pointer">
                    Trip Details
                  </h1>
                </div>
                <div className="space-y-4 flex flex-col justify-center items-center">
                  <div
                    class="p-4 mb-4 self-start text-sm text-blue-800 rounded-lg bg-blue-50 border border-sky-700 dark:bg-gray-800 dark:text-blue-400"
                    role="alert"
                  >
                    <span class="font-medium">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-blue-800 inline-block"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>{" "}
                    Please make sure that your nae and date of brth match the
                    passport/ID card.
                  </div>

                  {/* name */}
                  <label className="px-3 self-start">Name</label>
                  <div className="flex w-full gap-5">
                    <input
                      type="text"
                      name="first_name"
                      placeholder="First Name"
                      value={booking && booking.first_name}
                      onChange={handleChange}
                      className="block text-sm py-3 px-4 rounded-lg w-full border border-[#0c4a6e69] outline-none"
                    />
                    <input
                      type="text"
                      name="last_name"
                      placeholder="Last Name"
                      value={booking && booking.last_name}
                      onChange={handleChange}
                      className="block text-sm py-3 px-4 rounded-lg w-full border border-[#0c4a6e69] outline-none"
                    />
                  </div>

                  {/* DOB */}
                  <label className="px-3 self-start">Date of birth</label>
                  <input
                    type="date"
                    name="date"
                    placeholder="date"
                    value={booking && booking.address}
                    onChange={handleChange}
                    className="block text-sm py-3 px-4 rounded-lg w-full border border-[#0c4a6e69] outline-none"
                  />

                  {/* Email */}
                  <label className="px-3 self-start">Email</label>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={booking && booking.first_name}
                    onChange={handleChange}
                    className="block text-sm py-3 px-4 rounded-lg w-full border border-[#0c4a6e69] outline-none"
                  />

                  {/* Phone */}
                  <label className="px-3 self-start">Phone</label>
                  <input
                    type="number"
                    name="phone"
                    placeholder="Phone"
                    value={booking && booking.phone}
                    onChange={handleChange}
                    className="block text-sm py-3 px-4 rounded-lg w-full border border-[#0c4a6e69] outline-none"
                  />
                </div>

                <div className="flex flex-wrap justify-center my-5 items-center gap-2 md:gap-5">
                  <div class="w-32 h-44 md:w-52 md:h-60 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div class="flex flex-col justify-center items-center w-full h-full gap-6 text-gray-900 dark:text-white">
                      <img
                        className="w-12 md:w-24"
                        src="https://cdn-icons-png.flaticon.com/512/293/293265.png"
                        alt="Suitcase icon"
                      />
                      <div class="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                        <input
                          class="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio1"
                          value="option1"
                        />
                        <label
                          class="mt-px inline-block pl-[0.15rem] hover:cursor-pointer text-[12px] md:text-lg"
                          for="inlineRadio1"
                        >
                          1 X 20KG (40 JOD)
                        </label>
                      </div>
                    </div>
                    <div class="space-y-5 my-7"></div>
                  </div>
                  <div class="w-32 h-44 md:w-52 md:h-60 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div class="flex flex-col justify-center items-center w-full h-full gap-6 text-gray-900 dark:text-white">
                      <img
                        className="w-12 md:w-24"
                        src="https://cdn-icons-png.flaticon.com/512/293/293265.png"
                        alt="Suitcase icon"
                      />
                      <div class="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                        <input
                          class="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio1"
                          value="option1"
                        />
                        <label
                          class="mt-px inline-block pl-[0.15rem] hover:cursor-pointer text-[12px] md:text-lg"
                          for="inlineRadio1"
                        >
                          1 X 25KG (80 JOD)
                        </label>
                      </div>
                    </div>
                    <div class="space-y-5 my-7"></div>
                  </div>
                  <div class="w-32 h-44 md:w-52 md:h-60 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div class="flex flex-col justify-center items-center w-full h-full gap-6 text-gray-900 dark:text-white">
                      <img
                        className="w-12 md:w-24"
                        src="https://cdn-icons-png.flaticon.com/512/293/293265.png"
                        alt="Suitcase icon"
                      />
                      <div class="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                        <input
                          class="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio1"
                          value="option1"
                        />
                        <label
                          class="mt-px inline-block pl-[0.15rem] hover:cursor-pointer text-[12px] md:text-lg"
                          for="inlineRadio1"
                        >
                          1 X 30KG (120 JOD)
                        </label>
                      </div>
                    </div>
                    <div class="space-y-5 my-7"></div>
                  </div>
                </div>
                {clientSecret && stripePromise && (
                  <Elements stripe={stripePromise}>
                    <ElementsConsumer>
                      {({ stripe, elements }) => (
                        <CheckoutForm stripe={stripe} elements={elements} />
                      )}
                    </ElementsConsumer>
                  </Elements>
                )}
                {/* <div className="text-center mt-6">
                  <button
                    type="submit"
                    className="py-3 w-64 text-xl text-white hover:text-sky-900 bg-sky-900 border-2 hover:bg-white border-sky-900 rounded-2xl"
                  >
                    Book
                  </button>
                </div> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col md:flex-row gap-5 p-5 md:px-16 justify-center items-start min-h-screen">
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl text-sky-900 font-bold text-start mb-4">
            Information
          </h1>
          <div className="text-start px-3 text-lg md:text-xl text-gray-950">
            <h1>
              Name:{" "}
              <strong>
                {bookData.first_name} {bookData.last_name}
              </strong>
            </h1>
            <h1>
              Address: <strong>{bookData.address}</strong>
            </h1>
            <h1>
              Phone number: <strong>{bookData.phone}</strong>
            </h1>
            <h1></h1>
            <h1>
              Number of guests: <strong>{bookData.adults}</strong>Adults{" "}
              {bookData.last_name === 0 ? (
                ""
              ) : (
                <span>
                  <strong>{bookData.children}</strong>Chlidren
                </span>
              )}
            </h1>
            <h1>
              Total cost: <strong>{bookData.cost}JOD</strong>
            </h1>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-auto">
          <h1 className="text-3xl text-sky-900 font-bold text-start mb-4">
            Payment
          </h1>
          {clientSecret && stripePromise && (
            <Elements stripe={stripePromise}>
              <ElementsConsumer>
                {({ stripe, elements }) => (
                  <CheckoutForm stripe={stripe} elements={elements} />
                )}
              </ElementsConsumer>
            </Elements>
          )}
        </div>
      </div>
    </>
  );
}

export default Payment;
