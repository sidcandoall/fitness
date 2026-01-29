"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedWorkout, setExpandedWorkout] = useState(null);
  const [newExercise, setNewExercise] = useState("");
  const [exerciseData, setExerciseData] = useState({});
  const [draftWorkout, setDraftWorkout] = useState(null); // New state for draft
  const router = useRouter();

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No authentication token. Please login.");
        router.push("/login");
        return;
      }

      console.log("Fetching workouts with token:", token.substring(0, 20) + "...");

      const res = await fetch("/api/workouts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetch response status:", res.status);

      if (!res.ok) {
        if (res.status === 401) {
          setError("Unauthorized. Please login again.");
          router.push("/login");
          return;
        }
        const errorText = await res.text();
        console.error("Error response:", errorText);
        throw new Error(`Failed to fetch workouts (${res.status})`);
      }

      const data = await res.json();
      console.log("Fetched workouts:", data);
      
      if (Array.isArray(data)) {
        setWorkouts(data);
        setError("");
      } else {
        console.error("Data is not an array:", data);
        setWorkouts([]);
      }
    } catch (err) {
      console.error("Error fetching workouts:", err);
      setError(err.message || "Failed to load workouts");
      setWorkouts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWorkout = () => {
    // Create a draft workout instead of saving immediately
    setDraftWorkout({
      id: "draft",
      date: new Date().toISOString(),
      exercises: [],
    });
    setError("");
  };

  const handleSaveDraft = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No authentication token found. Please login again.");
        router.push("/login");
        return;
      }

      console.log("Saving draft workout...");

      const res = await fetch("/api/workouts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      console.log("Save workout response status:", res.status);

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to save workout");
      }

      console.log("Workout saved:", data);

      const newWorkout = data;
      setWorkouts([newWorkout, ...workouts]);
      setExpandedWorkout(newWorkout.id);
      setDraftWorkout(null); // Clear draft
      setError("");
    } catch (err) {
      console.error("Error saving workout:", err);
      setError(err.message);
    }
  };

  const handleCancelDraft = () => {
    setDraftWorkout(null);
    setNewExercise("");
    setExerciseData({});
  };

  const handleAddExercise = async (workoutId) => {
    if (!newExercise.trim()) {
      setError("Exercise name cannot be empty");
      return;
    }

    // If adding to draft workout, add locally
    if (workoutId === "draft") {
      setDraftWorkout({
        ...draftWorkout,
        exercises: [...(draftWorkout.exercises || []), newExercise.trim()],
      });
      setNewExercise("");
      setError("");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/exercises", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newExercise,
          workoutId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add exercise");
      }

      await fetchWorkouts();
      setNewExercise("");
      setError("");
    } catch (err) {
      console.error("Error adding exercise:", err);
      setError(err.message);
    }
  };

  const handleAddSet = async (exerciseId) => {
    const data = exerciseData[exerciseId] || {};
    if (!data.reps || !data.weight) {
      setError("Please enter reps and weight");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/sets", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reps: parseInt(data.reps),
          weight: parseFloat(data.weight),
          exerciseId,
        }),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || "Failed to add set");
      }

      await fetchWorkouts();
      setExerciseData({ ...exerciseData, [exerciseId]: {} });
      setError("");
    } catch (err) {
      console.error("Error adding set:", err);
      setError(err.message);
    }
  };

  const handleDeleteWorkout = async (workoutId) => {
    if (!confirm("Are you sure you want to delete this workout?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`/api/workouts/${workoutId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete workout");
      }

      setWorkouts(workouts.filter((w) => w.id !== workoutId));
      setError("");
    } catch (err) {
      console.error("Error deleting workout:", err);
      setError(err.message);
    }
  };

  const handleDeleteSet = async (setId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`/api/sets/${setId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete set");
      }

      await fetchWorkouts();
      setError("");
    } catch (err) {
      console.error("Error deleting set:", err);
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>💪 Fitness Tracker</h1>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Logout
        </button>
      </header>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.content}>
        <button onClick={handleCreateWorkout} className={styles.createBtn}>
          + New Workout
        </button>

        {/* Draft Workout Section */}
        {draftWorkout && (
          <div className={styles.draftWorkout}>
            <h2>New Workout (Draft)</h2>
            <p>Add exercises before saving</p>

            <div className={styles.addExerciseForm}>
              <input
                type="text"
                placeholder="Exercise name (e.g., Bench Press)"
                value={newExercise}
                onChange={(e) => setNewExercise(e.target.value)}
              />
              <button
                onClick={() => handleAddExercise(draftWorkout.id)}
                className={styles.addExerciseBtn}
              >
                + Add Exercise
              </button>
            </div>

            {draftWorkout.exercises && draftWorkout.exercises.length > 0 && (
              <div className={styles.draftExercises}>
                <h3>Exercises to be added:</h3>
                <ul>
                  {draftWorkout.exercises.map((ex) => (
                    <li key={ex}>{ex}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className={styles.draftActions}>
              <button onClick={handleSaveDraft} className={styles.saveBtn}>
                💾 Save Workout
              </button>
              <button onClick={handleCancelDraft} className={styles.cancelBtn}>
                ✕ Cancel
              </button>
            </div>
          </div>
        )}

        <div className={styles.workoutsList}>
          {!workouts || workouts.length === 0 ? (
            <p className={styles.emptyState}>
              No workouts yet. Start by creating one!
            </p>
          ) : (
            workouts.map((workout) => {
              const exercises = Array.isArray(workout.exercises)
                ? workout.exercises
                : [];
              return (
                <div key={workout.id} className={styles.workoutCard}>
                  <div
                    className={styles.workoutHeader}
                    onClick={() =>
                      setExpandedWorkout(
                        expandedWorkout === workout.id ? null : workout.id
                      )
                    }
                  >
                    <div>
                      <h3>
                        Workout -{" "}
                        {new Date(workout.date).toLocaleDateString()}
                      </h3>
                      <p className={styles.exerciseCount}>
                        {exercises.length} exercises
                      </p>
                    </div>
                    <span className={styles.toggleIcon}>
                      {expandedWorkout === workout.id ? "▼" : "▶"}
                    </span>
                  </div>

                  {expandedWorkout === workout.id && (
                    <div className={styles.workoutDetails}>
                      <div className={styles.exercisesList}>
                        {exercises.map((exercise) => (
                          <div
                            key={exercise.id}
                            className={styles.exerciseCard}
                          >
                            <h4>{exercise.name}</h4>
                            <div className={styles.setsList}>
                              {Array.isArray(exercise.sets) &&
                                exercise.sets.map((set) => (
                                  <div key={set.id} className={styles.setItem}>
                                    <span>
                                      {set.reps} reps × {set.weight} lbs
                                    </span>
                                    <button
                                      onClick={() => handleDeleteSet(set.id)}
                                      className={styles.deleteSetBtn}
                                    >
                                      ✕
                                    </button>
                                  </div>
                                ))}
                            </div>

                            <div className={styles.addSetForm}>
                              <input
                                type="number"
                                placeholder="Reps"
                                value={exerciseData[exercise.id]?.reps || ""}
                                onChange={(e) =>
                                  setExerciseData({
                                    ...exerciseData,
                                    [exercise.id]: {
                                      ...exerciseData[exercise.id],
                                      reps: e.target.value,
                                    },
                                  })
                                }
                              />
                              <input
                                type="number"
                                placeholder="Weight (lbs)"
                                value={
                                  exerciseData[exercise.id]?.weight || ""
                                }
                                onChange={(e) =>
                                  setExerciseData({
                                    ...exerciseData,
                                    [exercise.id]: {
                                      ...exerciseData[exercise.id],
                                      weight: e.target.value,
                                    },
                                  })
                                }
                              />
                              <button
                                onClick={() => handleAddSet(exercise.id)}
                                className={styles.addSetBtn}
                              >
                                Add Set
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className={styles.addExerciseForm}>
                        <input
                          type="text"
                          placeholder="Exercise name (e.g., Bench Press)"
                          value={newExercise}
                          onChange={(e) => setNewExercise(e.target.value)}
                        />
                        <button
                          onClick={() => handleAddExercise(workout.id)}
                          className={styles.addExerciseBtn}
                        >
                          + Add Exercise
                        </button>
                      </div>

                      <button
                        onClick={() => handleDeleteWorkout(workout.id)}
                        className={styles.deleteBtn}
                      >
                        Delete Workout
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
