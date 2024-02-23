import React, { useEffect, useState } from "react";

import "./EventsPanel.css";
import { Divider } from "antd";

function EventsPanel() {
  const formatDateTime = () => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    let dateTimeString = new Date().toLocaleString("pl-PL", options);

    const parts = dateTimeString.split(", ");
    if (parts.length > 0) {
      parts[0] = parts[0]
        .toLowerCase() // First, make all letters lowercase
        .replace(/^\w/, (c) => c.toUpperCase()); // Then, make the first letter uppercase
    }
    dateTimeString = parts.join(", ");

    return dateTimeString;
  };

  const [currentDateTime, setCurrentDateTime] = useState(formatDateTime());

  const meetingsTable = {
    weeklyMeetings: [
      {
        department: "Informatyka",
        meetingTimes: [
          {
            day: "Czwartek",
            time: "19:30",
          },
        ],
      },
      {
        department: "Szefy",
        meetingTimes: [
          {
            day: "Poniedziałek",
            time: "18:00",
          },
        ],
      },
      {
        department: "Napęd",
        meetingTimes: [
          {
            day: "Wtorek",
            time: "20:30",
          },
        ],
      },
      {
        department: "KN + Marketing",
        meetingTimes: [
          {
            day: "Wtorek",
            time: "19:00",
          },
        ],
      },

      {
        department: "Zawieszenie",
        meetingTimes: [
          {
            day: "Wtorek",
            time: "18:00",
          },
        ],
      },
      {
        department: "Elektronika",
        meetingTimes: [
          {
            day: "Środa",
            time: "19:30",
          },
        ],
      },
      {
        department: "Areodynamika",
        meetingTimes: [
          {
            day: "Środa",
            time: "19:00",
          },
        ],
      },
    ],
  };
  const nearestMeeting = {
    eventName: "Spotkanie zespołu",
    date: "2024-01-03",
    time: "19:00",
  };

  function TimeTable() {
    // Days of the week for table headers
    const daysOfWeek = [
      "Poniedziałek",
      "Wtorek",
      "Środa",
      "Czwartek",
      "Piątek",
      "Sobota",
      "Niedziela",
    ];

    // Generate time slots from 12:00 to 22:00
    const generateTimeSlots = () => {
      const slots = [];
      for (let hour = 15; hour <= 22; hour += 0.5) {
        const time = `${Math.floor(hour).toString().padStart(2, "0")}:${
          hour % 1 === 0 ? "00" : "30"
        }`;
        slots.push(time);
      }
      return slots;
    };

    const timeSlots = generateTimeSlots();

    // Check if there's a meeting for a given day and time
    const findMeeting = (day, time) => {
      for (const department of meetingsTable.weeklyMeetings) {
        for (const meetingTime of department.meetingTimes) {
          if (meetingTime.day === day && meetingTime.time === time) {
            return department.department; // Return the department name if there's a meeting
          }
        }
      }
      return "-"; // Return an empty string if there's no meeting
    };

    return (
      <div className="generateTableWrapper">
        <table className="generatedTable">
          <thead>
            <tr>
              <th />
              {daysOfWeek.map((day) => (
                <th key={day} className="dayOfWeek">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot) => (
              <tr key={slot}>
                <td>{slot}</td>
                {daysOfWeek.map((day) => (
                  <td key={day + slot} className="tableContents">
                    {findMeeting(day, slot)}
                  </td> // Display the department name if there's a meeting
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(formatDateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="eventsWrapper">
      <span className="eventsHeader">Najbliższe wydarzenia</span>
      <span className="eventsDescription">
        Tu zamieszczone są informacje dotyczące najbliższego wydarzenia np.
        spotkanie zespołu oraz tabela spotkań zespołu
      </span>
      <div className="dateWrapper">
        <span className="dateInfo">Dzisiaj jest:</span>
        <span className="todaysDate">{currentDateTime}</span>
      </div>
      <div className="timetablesWrapper">
        <div className="timetable">
          <span className="tableHeader">Najbliższe wydarzenie:</span>
          <div className="tableContentsWrapper">
            <div className="embedded-file nearestEvent">
              <span className="eventTitle">{nearestMeeting.eventName}</span>
              <Divider />
              <div className="dateAndTimeWrapper">
                <div className="row">
                  <span className="textInNearestEvent">Data: </span>
                  <span className="textInNearestEvent bold">
                    {nearestMeeting.date}
                  </span>
                </div>
                <div className="row">
                  <span className="textInNearestEvent">Godzina: </span>
                  <span className="textInNearestEvent bold">
                    {nearestMeeting.time}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="timetable schedule">
          <span className="tableHeader">Tabela spotkań</span>
          <div className="tableContentsWrapper schedule">
            <div className="embedded-file">{TimeTable()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EventsPanel;
