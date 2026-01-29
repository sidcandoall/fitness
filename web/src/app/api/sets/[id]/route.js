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
    
    const res = await fetch(`http://localhost:5001/sets/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    
    return Response.json(data, { status: res.status });
  } catch (error) {
    console.error("Error deleting set:", error);
    return Response.json(
      { message: "Failed to delete set" },
      { status: 500 }
    );
  }
}
