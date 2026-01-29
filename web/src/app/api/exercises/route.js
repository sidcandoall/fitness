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
    
    const res = await fetch("http://localhost:5001/exercises", {
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
    console.error("Error creating exercise:", error);
    return Response.json(
      { message: "Failed to create exercise" },
      { status: 500 }
    );
  }
}
