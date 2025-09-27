"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { IssueReportDialog } from "@/components/issue-report-dialog"
import { PaymentCenterDialog } from "@/components/payment-center-dialog"
import { DocumentVaultDialog } from "@/components/document-vault-dialog"
import { CommunicationHubDialog } from "@/components/communication-hub-dialog"
import { AmenityBookingDialog } from "@/components/amenity-booking-dialog"
import { TenantAmenitiesPanel } from "@/components/tenant-amenities-panel"
import { VisitorManagementDialog } from "@/components/visitor-management-dialog"
import { ServiceRatingsDialog } from "@/components/service-ratings-dialog"
import { RoommateChatPanel } from "@/components/roommate-chat-panel"
import { useState } from "react"
import {
  AlertTriangle,
  CreditCard,
  FileText,
  Phone,
  Wifi,
  Car,
  Dumbbell,
  Clock,
  CheckCircle,
  Building2,
  Users,
  Wrench,
  MessageSquare,
  Calendar,
  UserPlus,
  Star,
  Bot,
  Timer,
  UserCheck,
} from "lucide-react"

export default function TenantDashboard() {
  const daysUntilRent = 12
  const contractMonthsRemaining = 8
  const contractDaysRemaining = 15
  const rentAmount = 1850
  const paymentStatus = "current" // current, overdue, pending
  const userRole = "tenant"

  const getStatusColor = (status: string) => {
    switch (status) {
      case "current":
        return "bg-emerald-500"
      case "overdue":
        return "bg-red-500"
      case "pending":
        return "bg-amber-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "current":
        return "Current"
      case "overdue":
        return "Overdue"
      case "pending":
        return "Pending"
      default:
        return "Unknown"
    }
  }

  const [issueDialogOpen, setIssueDialogOpen] = useState(false)
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)
  const [documentDialogOpen, setDocumentDialogOpen] = useState(false)
  const [communicationDialogOpen, setCommunicationDialogOpen] = useState(false)
  const [amenityDialogOpen, setAmenityDialogOpen] = useState(false)
  const [tenantAmenitiesOpen, setTenantAmenitiesOpen] = useState(false)
  const [visitorDialogOpen, setVisitorDialogOpen] = useState(false)
  const [ratingsDialogOpen, setRatingsDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      {/* Hero Status Card - Updated colors */}
      <Card className="bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
        <CardHeader>
          <CardTitle className="text-2xl text-teal-900">Welcome Home, Sarah!</CardTitle>
          <CardDescription className="text-teal-700">Unit 4B - Riverside Gardens</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-900">{daysUntilRent}</div>
              <div className="text-sm text-teal-700">Days until rent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-900">
                {contractMonthsRemaining}m {contractDaysRemaining}d
              </div>
              <div className="text-sm text-teal-700">Lease remaining</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-900">${rentAmount}</div>
              <div className="text-sm text-teal-700">Monthly rent</div>
            </div>
            <div className="text-center">
              <Badge className={`${getStatusColor(paymentStatus)} text-white`}>{getStatusText(paymentStatus)}</Badge>
              <div className="text-sm text-teal-700 mt-1">Payment status</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Processing Status - Updated colors */}
      <Card className="border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-teal-600 animate-pulse" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-teal-900">AI Processing Your Request</h3>
              <p className="text-sm text-teal-700">Kitchen faucet leak - Categorized as Plumbing</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-teal-600">
                <div className="flex items-center gap-1">
                  <Timer className="w-3 h-3" />
                  Est. response: 2-4 hours
                </div>
                <div className="flex items-center gap-1">
                  <UserCheck className="w-3 h-3" />
                  Assigned: Mike Johnson (Plumber)
                </div>
              </div>
            </div>
            <Badge className="bg-teal-500 text-white">Processing</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Report Issue Button - Prominent */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
        <CardContent className="p-6 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-orange-900">Need Help?</h3>
              <p className="text-orange-700">Report maintenance issues or concerns</p>
            </div>
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
              onClick={() => setIssueDialogOpen(true)}
            >
              <AlertTriangle className="w-5 h-5 mr-2" />
              Report an Issue
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setPaymentDialogOpen(true)}>
          <CardContent className="p-4 text-center space-y-2">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto">
              <CreditCard className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="font-medium">Payment Center</h3>
            <p className="text-sm text-muted-foreground">Autopay & history</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setDocumentDialogOpen(true)}>
          <CardContent className="p-4 text-center space-y-2">
            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6 text-cyan-600" />
            </div>
            <h3 className="font-medium">Document Vault</h3>
            <p className="text-sm text-muted-foreground">Lease & receipts</p>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => setCommunicationDialogOpen(true)}
        >
          <CardContent className="p-4 text-center space-y-2">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto">
              <MessageSquare className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-medium">Chat Management</h3>
            <p className="text-sm text-muted-foreground">Direct messaging</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setAmenityDialogOpen(true)}>
          <CardContent className="p-4 text-center space-y-2">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto">
              <Calendar className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="font-medium">Book Amenities</h3>
            <p className="text-sm text-muted-foreground">Gym, pool, rooms</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setVisitorDialogOpen(true)}>
          <CardContent className="p-4 text-center space-y-2">
            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mx-auto">
              <UserPlus className="w-6 h-6 text-cyan-600" />
            </div>
            <h3 className="font-medium">Visitor Management</h3>
            <p className="text-sm text-muted-foreground">Guest registration</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setRatingsDialogOpen(true)}>
          <CardContent className="p-4 text-center space-y-2">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto">
              <Star className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-medium">Rate Service</h3>
            <p className="text-sm text-muted-foreground">Review maintenance</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center space-y-2">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto">
              <Phone className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="font-medium">Emergency</h3>
            <p className="text-sm text-muted-foreground">24/7 contacts</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center space-y-2">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto">
              <Wrench className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="font-medium">Maintenance History</h3>
            <p className="text-sm text-muted-foreground">Past requests</p>
          </CardContent>
        </Card>
      </div>

      {/* Building Amenities */}
      <Card className="border-teal-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-teal-900">
              <Building2 className="w-5 h-5" />
              Building Amenities
            </CardTitle>
            <Button
              variant="outline"
              className="border-teal-200 text-teal-700 hover:bg-teal-50 bg-transparent"
              onClick={() => setTenantAmenitiesOpen(true)}
            >
              View All Amenities
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-teal-500" />
              <span className="text-sm">Free WiFi</span>
            </div>
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-cyan-500" />
              <span className="text-sm">Parking</span>
            </div>
            <div className="flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-emerald-500" />
              <span className="text-sm">Gym</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-teal-500" />
              <span className="text-sm">Community Room</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Timeline */}
      <Card className="border-teal-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-teal-900">
            <Clock className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Rent payment confirmed</p>
              <p className="text-xs text-muted-foreground">December 1, 2024 - $1,850.00</p>
            </div>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>

          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Maintenance request completed</p>
              <p className="text-xs text-muted-foreground">November 28, 2024 - Kitchen faucet repair</p>
            </div>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>

          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Building announcement</p>
              <p className="text-xs text-muted-foreground">November 25, 2024 - Holiday schedule update</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <IssueReportDialog open={issueDialogOpen} onOpenChange={setIssueDialogOpen} />
      <PaymentCenterDialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen} />
      <DocumentVaultDialog open={documentDialogOpen} onOpenChange={setDocumentDialogOpen} />
      <CommunicationHubDialog open={communicationDialogOpen} onOpenChange={setCommunicationDialogOpen} />
      <AmenityBookingDialog open={amenityDialogOpen} onOpenChange={setAmenityDialogOpen} />
      <TenantAmenitiesPanel open={tenantAmenitiesOpen} onOpenChange={setTenantAmenitiesOpen} />
      <VisitorManagementDialog open={visitorDialogOpen} onOpenChange={setVisitorDialogOpen} />
      <ServiceRatingsDialog open={ratingsDialogOpen} onOpenChange={setRatingsDialogOpen} />
      <RoommateChatPanel userRole={userRole} />
    </div>
  )
}
