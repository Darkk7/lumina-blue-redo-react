import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { practiceId } = params;

  try {
    const licenseResponse = await fetch(
      `https://passport.nevadacloud.com/api/v1/public/get_licence_names?practice_id=${practiceId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!licenseResponse.ok) {
      throw new Error(`Failed to fetch licenses: ${licenseResponse.status} ${licenseResponse.statusText}`);
    }

    const data = await licenseResponse.json();
    

    // Handle if data is wrapped in an object like { licenses: [...] }
    const licensesArray = Array.isArray(data) ? data : data?.licenses || [];

    // Find Lumina Blue
    const lumina = licensesArray.find((lic) =>
      lic.description?.toLowerCase().includes("lumina blue")
    );

    return NextResponse.json({
      hasLumina: Boolean(lumina),
      product_type: lumina?.product_type || null,
      expiry_date: lumina?.expiry_date || null,
    });
  } catch (error) {
    console.error("[License API] Error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
