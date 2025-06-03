import React, { useState } from "react";

const EventForm = () => {
  const [formData, setFormData] = useState({
    userId: "user123", // or pass this as prop later
    name: "",
    description: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  });

  const padTime = (timeStr) => {
    return timeStr.length === 5 ? timeStr + ":00" : timeStr;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      startTime: padTime(formData.startTime),
      endTime: padTime(formData.endTime),
    };

    try {
      const response = await fetch("http://localhost:8080/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Event saved successfully!");
        setFormData({
          userId: "user123",
          name: "",
          description: "",
          startDate: "",
          startTime: "",
          endDate: "",
          endTime: "",
        });
      } else {
        const errorText = await response.text();
        alert("Failed to save event: " + errorText);
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <div>
        <label>Name:</label><br />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Description:</label><br />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          required
        />
      </div>

      <div>
        <label>Start Date:</label><br />
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Start Time:</label><br />
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>End Date:</label><br />
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>End Time:</label><br />
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" style={{ marginTop: "10px" }}>Save</button>
    </form>
  );
};

export default EventForm;
