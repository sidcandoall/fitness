export async function DELETE(req, { params }) {
  const authHeader = req.headers.get("Authorization");
  
  if (!authHeader) {
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
    
    const res = await fetch(`${apiUrl}/api/workouts/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    
    return Response.json(data, { status: res.status });
  } catch (error) {
    console.error("Error deleting workout:", error);
    return Response.json(
      { message: "Failed to delete workout" },
      { status: 500 }
    );
  }
}
