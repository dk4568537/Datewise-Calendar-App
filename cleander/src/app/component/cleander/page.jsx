"use client";
import { Button, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { setTimeout } from "timers";

const CalendarPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(7); // August
  const [currentYear, setCurrentYear] = useState(2024);
  const [calendar, setCalendar] = useState([]);
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false); // New state for showing event details
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    time: "00:00",
    color: "bg-blue-200",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null); // New state for selected event

  const today = new Date();
  const todayDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  useEffect(() => {
    generateCalendar(currentMonth, currentYear);
    fetchEvents();
  }, [currentMonth, currentYear]);

  const generateCalendar = (month, year) => {
    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let date = 1;
    const newCalendar = [];

    for (let i = 0; i < 6; i++) {
      const week = [];

      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          week.push("");
        } else if (date > daysInMonth) {
          week.push("");
        } else {
          week.push(date);
          date++;
        }
      }
      newCalendar.push(week);
    }
    setCalendar(newCalendar);
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/events/`);
      if (response.status === 200) {
        const eventsData = response.data.reduce((acc, event) => {
          const date = event.date;
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(event);
          return acc;
        }, {});
        setEvents(eventsData);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day) => {
    if (day) {
      setSelectedDate(`${currentYear}-${currentMonth + 1}-${day}`);
      setNewEvent({
        title: "",
        description: "",
        time: "00:00",
        color: "bg-blue-200",
      });
      setEditIndex(null);
      setShowModal(true);
    }
  };

  const handleEditClick = (event, index) => {
    setNewEvent(event);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleAddEvent = async () => {
    if (selectedDate && newEvent) {
      console.log(selectedDate, newEvent);
      try {
        if (editIndex !== null) {
          const eventToUpdate = events[selectedDate][editIndex];
          await axios.put(
            `http://localhost:5000/api/events/${eventToUpdate._id}`,
            newEvent
          );
          fetchEvents();
        } else {
          const response = await axios.post(
            "http://localhost:5000/api/events/",
            { ...newEvent, date: selectedDate }
          );
          const event = response.data;
          setEvents((prevEvents) => {
            const updatedEvents = { ...prevEvents };
            if (!updatedEvents[selectedDate]) {
              updatedEvents[selectedDate] = [];
            }
            updatedEvents[selectedDate].push(event);
            return updatedEvents;
          });
        }
        setNewEvent({
          title: "",
          description: "",
          time: "00:00",
          color: "bg-blue-200",
        });
        setShowModal(false);
      } catch (error) {
        console.error("Error adding/updating event:", error);
      }
    }
  };

  const handleShowClick = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  useEffect(() => {
    setIsLoading(true);
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(setIsLoading(false), 60000));
    };

    loadData();
  }, []);

  const handleDeleteEvent = async (eventId, date, index) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`);
      setEvents((prevEvents) => {
        const updatedEvents = { ...prevEvents };
        updatedEvents[date].splice(index, 1);
        if (updatedEvents[date].length === 0) {
          delete updatedEvents[date];
        }
        return updatedEvents;
      });
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };
  const handleEditFromDetails = () => {
    if (selectedEvent) {
      handleEditClick(
        selectedEvent,
        events[selectedEvent.date].indexOf(selectedEvent)
      );
    }
  };
  return (
    <div className="container mx-auto mt-5">
      <div className="wrapper rounded shadow w-full">
        <div className="header flex justify-between items-center border-b border-black p-2">
          {/* navbar clander */}
          <div>
            <button className="p-1" onClick={handlePrevMonth}>
              <svg
                width="1em"
                fill="gray"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-arrow-left-circle"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
                <path
                  fillRule="evenodd"
                  d="M8.354 11.354a.5.5 0 0 0 0-.708L5.707 8l2.647-2.646a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708 0z"
                />
                <path
                  fillRule="evenodd"
                  d="M11.5 8a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z"
                />
              </svg>
            </button>
            <span id="month-year" className="text-lg font-bold">
              {`${currentYear} ${new Date(
                currentYear,
                currentMonth
              ).toLocaleString("default", { month: "long" })}`}
            </span>
            <button className="p-1" onClick={handleNextMonth}>
              <svg
                width="1em"
                fill="gray"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-arrow-right-circle"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
                <path
                  fillRule="evenodd"
                  d="M7.646 11.354a.5.5 0 0 1 0-.708L10.293 8 7.646 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z"
                />
                <path
                  fillRule="evenodd"
                  d="M4.5 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </button>
          </div>
          <div>
            <Button
              colorScheme="blue"
              onClick={() => {
                setSelectedDate(todayDate);
                setNewEvent({
                  title: "",
                  description: "",
                  time: "00:00",
                  color: "bg-blue-200",
                });
                setEditIndex(null);
                setShowModal(true);
              }}
            >
              Add Event
            </Button>
          </div>
        </div>
        {/* week table */}
        <table className="w-full">
          <thead>
            <tr>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <th
                  key={day}
                  className="p-2 border-x h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          {/* cleander day Body */}
          <tbody id="calendar-body">
            {calendar.map((week, i) => (
              <tr key={i}>
                {week.map((day, j) => {
                  const dayString = day
                    ? `${currentYear}-${currentMonth + 1}-${day}`
                    : "";
                  return (
                    <td
                      key={j}
                      className={`border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300 relative ${
                        dayString === todayDate ? "bg-green-100" : ""
                      }`}
                      onClick={() => handleDateClick(day)}
                    >
                      {day ? (
                        <div className="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                          <div className="top h-5 w-full">
                            <span
                              className={`text-gray-500 ${
                                dayString === todayDate ? "relative" : ""
                              }`}
                            >
                              {day}
                              {dayString === todayDate && (
                                <span className="absolute top-0 left-[140px] flex h-3 w-3">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                              )}
                            </span>
                          </div>
                          <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer">
                            {events[
                              `${currentYear}-${currentMonth + 1}-${day}`
                            ]?.map((event, index) => (
                              <div
                                key={index}
                                className={`${event.color} p-2 gap-1 rounded mt-1 cursor-pointer`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditClick(event, index);
                                }}
                              >
                                <div className="flex justify-between items-center">
                                  <div className="font-bold">{event.title}</div>

                                  <button
                                    className=" text-red-500"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleShowClick(event);
                                    }}
                                  >
                                    Show
                                  </button>
                                </div>
                                <div className="text-xs hidden">
                                  <div className="text-sm">{event.time}</div>
                                  {event.description}
                                </div>
                                {/* Display email if available */}
                                {event.email && (
                                  <div className="text-xs text-blue-500 mt-1">
                                    Email:{" "}
                                    <a href={`mailto:${event.email}`}>
                                      {event.email}
                                    </a>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Edit Data Mondal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg w-1/3">
            <h3 className="font-bold text-lg mb-4">
              {editIndex !== null ? `Edit Event` : `Add Event`} for{" "}
              {selectedDate}
            </h3>
            <input
              type="text"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              className="border p-2 rounded w-full mt-2"
            />
            <input
              type="text"
              placeholder="Event Description"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
              className="border p-2 rounded w-full mt-2"
            />
            <input
              type="time"
              value={newEvent.time}
              onChange={(e) =>
                setNewEvent({ ...newEvent, time: e.target.value })
              }
              className="border p-2 rounded w-full mt-2"
            />
            <div className="mt-2">
              <label className="block text-sm font-bold">Select Color:</label>
              <div className="flex mt-2">
                {[
                  "bg-blue-200",
                  "bg-green-200",
                  "bg-yellow-200",
                  "bg-red-200",
                ].map((color, index) => (
                  <div
                    key={index}
                    className={`w-10 h-10 rounded-full cursor-pointer ${color} border-2 border-gray-300 mr-2`}
                    onClick={() => setNewEvent({ ...newEvent, color })}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between mt-4">
              {isLoading ? (
                <Spinner />
              ) : (
                <Button
                  onClick={handleAddEvent}
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  {editIndex !== null ? `Save Changes` : `Add Event`}
                </Button>
              )}
              <Button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white p-2 rounded-md"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* show data Mondal */}
      {showEventModal && (
        <div className="modal fixed z-10 inset-0 overflow-y-auto">
          <div className="modal-overlay fixed inset-0 bg-gray-500 opacity-75"></div>
          <div className="modal-container flex items-center justify-center min-h-screen p-4">
            <div className="modal-content bg-white p-6 rounded shadow-lg w-full max-w-md mx-auto z-50">
              <div className=" flex justify-between items-center mb-4">
                <div>
                  <h1 className=" text-2xl font-bold">Your ID Data!!</h1>
                </div>
                <div className=" flex justify-between items-center gap-5">
                  <button
                    className="font-bold text-lg  p-1 rounded-md border-gray-400 border text-red-500"
                    onClick={() =>
                      handleDeleteEvent(
                        selectedEvent._id,
                        selectedEvent.date,
                        events[selectedEvent.date].indexOf(selectedEvent)
                      )
                    }
                  >
                    <MdDelete className=" text-2xl" />
                  </button>

                  <button
                    onClick={(event) => handleEditFromDetails(event.target)}
                    className="border p-1 rounded-md border-gray-400 flex items-center space-x-2"
                  >
                    <MdModeEditOutline className="text-2xl" />
                  </button>
                </div>
              </div>
              <h2 className="text-lg font-bold mb-2">{selectedEvent?.title}</h2>
              <p className="mb-2">{selectedEvent?.description}</p>
              <p className="mb-2">{selectedEvent?.time}</p>
              <div className="flex justify-end">
                <Button
                  colorScheme="blue"
                  onClick={() => setShowEventModal(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
