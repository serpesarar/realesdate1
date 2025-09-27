"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, Clock, TrendingUp, AlertTriangle, CheckCircle, Users, Eye, MessageSquare } from "lucide-react"

export default function ManagerDashboard() {
  const liveIssues = [
    {
      id: 1,
      title: "Kitchen Faucet Leak",
      property: "Sunset Apartments",
      unit: "2B",
      priority: "high",
      time: "2 min ago",
    },
    {
      id: 2,
      title: "AC Not Working",
      property: "Oak Street Complex",
      unit: "5A",
      priority: "urgent",
      time: "5 min ago",
    },
    { id: 3, title: "Broken Window", property: "Pine View", unit: "1C", priority: "medium", time: "12 min ago" },
  ]

  const handymanLocations = [
    { id: 1, name: "Mike Johnson", location: "Sunset Apartments", status: "on-site", eta: "Working" },
    { id: 2, name: "Tom Rodriguez", location: "En route to Oak Street", status: "traveling", eta: "15 min" },
    { id: 3, name: "Sarah Wilson", location: "Available", status: "available", eta: "Ready" },
  ]

  const approvalQueue = [
    { id: 1, type: "High-cost repair", description: "HVAC replacement - $2,400", property: "Oak Street", urgent: true },
    {
      id: 2,
      type: "Contractor application",
      description: "New plumber - Rodriguez Plumbing",
      property: "All",
      urgent: false,
    },
    {
      id: 3,
      type: "Lease renewal",
      description: "Unit 3B - 12 month extension",
      property: "Sunset Apartments",
      urgent: false,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Operations Center</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
            All Systems Operational
          </Badge>
        </div>
      </div>

      {/* Real-time Operations Center */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Map */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Live Property Map
            </CardTitle>
            <CardDescription>Real-time overview of properties and active maintenance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative bg-muted rounded-lg h-64 flex items-center justify-center">
              <div className="text-center space-y-2">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto" />
                <p className="text-sm text-muted-foreground">Interactive map with property pins</p>
                <div className="flex items-center justify-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span>Urgent Issues</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>Handyman Locations</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Completed Today</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Live Activity Feed
            </CardTitle>
            <CardDescription>Real-time updates from all properties</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {liveIssues.map((issue) => (
                <div key={issue.id} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      issue.priority === "urgent"
                        ? "bg-red-500"
                        : issue.priority === "high"
                          ? "bg-orange-500"
                          : "bg-yellow-500"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{issue.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {issue.property} - Unit {issue.unit}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">{issue.time}</div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                <Eye className="w-4 h-4 mr-2" />
                View All Activity
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Performance Metrics
          </CardTitle>
          <CardDescription>Key performance indicators for property management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Response Time</span>
                <span className="text-sm text-muted-foreground">Avg: 12 min</span>
              </div>
              <Progress value={85} className="h-2" />
              <div className="text-xs text-muted-foreground">Target: &lt;15 min</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Resolution Rate</span>
                <span className="text-sm text-muted-foreground">94%</span>
              </div>
              <Progress value={94} className="h-2" />
              <div className="text-xs text-muted-foreground">Target: &gt;90%</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Tenant Satisfaction</span>
                <span className="text-sm text-muted-foreground">4.7/5</span>
              </div>
              <Progress value={94} className="h-2" />
              <div className="text-xs text-muted-foreground">Based on 127 ratings</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Cost Efficiency</span>
                <span className="text-sm text-muted-foreground">-8% vs last month</span>
              </div>
              <Progress value={78} className="h-2" />
              <div className="text-xs text-muted-foreground">$2,340 saved</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Handyman Tracking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Handyman Locations
            </CardTitle>
            <CardDescription>Real-time tracking of maintenance staff</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {handymanLocations.map((handyman) => (
                <div key={handyman.id} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>
                      {handyman.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{handyman.name}</div>
                    <div className="text-xs text-muted-foreground">{handyman.location}</div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        handyman.status === "on-site"
                          ? "default"
                          : handyman.status === "traveling"
                            ? "secondary"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {handyman.eta}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Approval Queue */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Approval Queue
            </CardTitle>
            <CardDescription>Items requiring manager approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {approvalQueue.map((item) => (
                <div key={item.id} className="p-3 rounded-lg border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {item.type}
                      </Badge>
                      {item.urgent && (
                        <Badge variant="destructive" className="text-xs">
                          Urgent
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-sm font-medium mb-1">{item.description}</div>
                  <div className="text-xs text-muted-foreground mb-3">{item.property}</div>
                  <div className="flex gap-2">
                    <Button size="sm" className="h-7 text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Approve
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
