export async function GET(req) {
  // Extract token from request headers
  const authHeader = req.headers.get("Authorization");
  
  if (!authHeader) {
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
    const res = await fetch(`${apiUrl}/api/workouts`, {
      method: "GET",
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    
    return Response.json(data, { status: res.status });
  } catch (error) {
    console.error("Error fetching workouts from backend:", error);
    return Response.json(
      { message: "Failed to fetch workouts" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const authHeader = req.headers.get("Authorization");
  
  if (!authHeader) {
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
    
    const res = await fetch(`${apiUrl}/api/workouts`, {
      method: "POST",
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    
    return Response.json(data, { status: res.status });
  } catch (error) {
    console.error("Error creating workout:", error);
    return Response.json(
      { message: "Failed to create workout" },
      { status: 500 }
    );
  }
}
