import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      property,
      unit,
      urgency,
      category,
      priority,
      estimatedCost,
      suggestedContractor,
      confidence,
    } = body

    // Validate required fields
    if (!title || !description || !property || !unit) {
      return NextResponse.json(
        {
          error: "Missing required fields: title, description, property, unit",
        },
        { status: 400 },
      )
    }

    // Generate issue ID
    const issueId = `ISS-${Date.now()}`

    // Mock issue creation - in real app, save to database
    const issue = {
      id: issueId,
      title,
      description,
      property,
      unit,
      urgency,
      category: category || "OTHER",
      priority: priority || "MEDIUM",
      estimatedCost: estimatedCost || "TBD",
      suggestedContractor: suggestedContractor || "General Maintenance",
      confidence: confidence || 0,
      status: "OPEN",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assignedTo: null,
      tenantId: "current-tenant", // In real app, get from auth
    }

    console.log("[v0] Created new issue:", issue)

    return NextResponse.json({
      success: true,
      issue,
      message: "Issue created successfully",
    })
  } catch (error) {
    console.error("Error creating issue:", error)
    return NextResponse.json({ error: "Failed to create issue" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Mock issues data - in real app, fetch from database
    const issues = [
      {
        id: "ISS-1704067200000",
        title: "Kitchen Faucet Leak",
        description: "Water is dripping from the kitchen faucet",
        property: "park-avenue",
        unit: "12A",
        urgency: "normal",
        category: "PLUMBING",
        priority: "HIGH",
        estimatedCost: "$150-400",
        suggestedContractor: "Mike Johnson (Plumber)",
        confidence: 95,
        status: "IN_PROGRESS",
        createdAt: "2024-01-01T10:00:00Z",
        updatedAt: "2024-01-02T14:30:00Z",
        assignedTo: "Mike Rodriguez",
        tenantId: "current-tenant",
      },
    ]

    return NextResponse.json({
      success: true,
      issues,
    })
  } catch (error) {
    console.error("Error fetching issues:", error)
    return NextResponse.json({ error: "Failed to fetch issues" }, { status: 500 })
  }
}
