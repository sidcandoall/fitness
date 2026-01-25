"use client";

import { useEffect, useState } from "react";
import { getWorkouts } from "../../lib/api";

export default function Dashboard() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    getWorkouts(token)
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading workouts...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Workouts</h1>
        <button
          onClick={handleLogout}
          className="border px-4 py-2 rounded hover:bg-gray-100"
        >
          Logout
        </button>
      </div>

      {workouts.length === 0 && (
        <p className="text-gray-500">No workouts yet.</p>
      )}

      {workouts.map((workout) => (
        <div key={workout.id} className="border rounded p-4 mb-4">
          <p className="font-semibold mb-2">
            {new Date(workout.date).toDateString()}
          </p>

          {workout.exercises.length === 0 && (
            <p className="text-sm text-gray-500 ml-2">
              No exercises added
            </p>
          )}

          {workout.exercises.map((exercise) => (
            <div key={exercise.id} className="ml-4 mt-2">
              <p className="font-medium">{exercise.name}</p>

              {exercise.sets.length === 0 && (
                <p className="text-sm text-gray-500 ml-4">
                  No sets
                </p>
              )}

              {exercise.sets.map((set) => (
                <p key={set.id} className="ml-4 text-sm">
                  {set.reps} reps × {set.weight}
                </p>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
