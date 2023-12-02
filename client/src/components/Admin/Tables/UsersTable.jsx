// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePage } from "../../Context/SelectedPageContext";
import { useAuth } from "../../Context/AuthContext";

export const UsersTable = () => {
  const [users, setUsers] = useState([]);
  //   const [currentUsers, setCurrentUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const {headers} =useAuth();
  const usersPerPage = 5;
  const { page, onSelectedPage, selectedId, onSelectedId } = usePage();

  const TABLE_HEAD = ["Users", "Country", "Admin", ""];
  useEffect(() => {
    axios
      .get(`http://localhost:3999/getUserData`)
      .then((response) => {
        // Handle the response data here
        setUsers(response.data);
        setFilteredUsers(response.data);
        // setTypes(response.data.destinations_type);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  let currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery === "") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter(
          (user) =>
            user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.last_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    setCurrentPage(1);
  };
  const handleEdit = (id) => {
    axios.put(`http://localhost:3999/MakeAdmin/${id}`, null, {headers:headers});
  };
  return (
    <Card className="p-2 lg:ml-80 m-5 w-auto h-full border border-sky-700">
      <h1 className="text-sky-900 text-start mt-5 mx-5 text-lg font-bold">
        Users
      </h1>
      <hr className="text-sky-700" />
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex items-center justify-between gap-8 m-4">
          <form className="w-full lg:w-1/3" onSubmit={handleSearch}>
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search user"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                class="text-white hover:text-sky-900 absolute end-2.5 bottom-1 bg-sky-900 hover:bg-white border border-sky-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              variant="outlined"
              size="sm"
              className="border border-sky-900 bg-sky-900 text-white hover:bg-white hover:text-sky-900"
              onClick={() => onSelectedPage("users")}
            >
              view all
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-0 h-[466px] mb-auto overflow-auto">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => {
              const isLast =
                (index === filteredUsers.length) === 0
                  ? users.length - 1
                  : filteredUsers.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

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
                          {user.first_name} {user.last_name}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {user.email}
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
                        {user.country}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={user.role_id === 1 ? "No" : "Yes"}
                        className={`${
                          user.role_id === 1 ? "text-red-500" : "text-green-500"
                        }`}
                      />
                    </div>
                  </td>
                  <td className={`${classes}`}>
                    <Tooltip content="Assign as admin">
                      <IconButton
                        variant="text"
                        onClick={() => {
                          handleEdit(user.user_id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6 text-sky-900"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                          />
                        </svg>
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage} of{" "}
          {Math.ceil(
            filteredUsers.length === 0
              ? users.length / usersPerPage
              : filteredUsers.length / usersPerPage
          )}
        </Typography>
        <div className="flex gap-2">
          <Button
            onClick={() => currentPage !== 1 && paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-sky-900"
            variant="outlined"
            size="sm"
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              currentPage !==
                Math.ceil(
                  filteredUsers.length === 0
                    ? users.length / usersPerPage
                    : filteredUsers.length / usersPerPage
                ) && paginate(currentPage + 1)
            }
            disabled={
              currentPage ===
              Math.ceil(
                filteredUsers.length === 0
                  ? users.length / usersPerPage
                  : filteredUsers.length / usersPerPage
              )
            }
            className="text-sky-900"
            variant="outlined"
            size="sm"
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
