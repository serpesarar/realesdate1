// Notification and Email Service
export interface EmailTemplate {
  subject: string
  htmlContent: string
  textContent: string
}

export interface NotificationData {
  to: string
  from?: string
  subject: string
  template: string
  variables: Record<string, any>
  type: "email" | "sms" | "push"
}

export interface WorkflowStep {
  id: string
  name: string
  status: "pending" | "in_progress" | "completed" | "failed"
  timestamp?: string
  data?: any
}

export interface ScreeningWorkflow {
  id: string
  applicantId: string
  propertyId: string
  steps: WorkflowStep[]
  currentStep: string
  createdAt: string
  updatedAt: string
}

export class NotificationService {
  private emailTemplates: Record<string, EmailTemplate> = {
    consentRequest: {
      subject: "Background Check Authorization Required - {{propertyName}}",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">PropertyFlow</h1>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #333;">Background Check Authorization Required</h2>
            
            <p>Dear {{applicantName}},</p>
            
            <p>{{propertyManager}} has requested a background check for your application at:</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
              <strong>{{propertyName}} - Unit {{unitNumber}}</strong><br>
              Monthly Rent: ${{ monthlyRent }}
            </div>
            
            <p>To proceed with your application, please click the button below to:</p>
            <ul>
              <li>Review what will be checked</li>
              <li>Provide your consent</li>
              <li>Enter required information (SSN, DOB)</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="{{consentUrl}}" style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                Authorize Background Check
              </a>
            </div>
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <strong>⏰ Important:</strong> This link expires in 48 hours.
            </div>
            
            <p style="color: #666; font-size: 14px;">
              If you have any questions, please contact {{propertyManager}} at {{contactEmail}} or {{contactPhone}}.
            </p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            
            <p style="color: #999; font-size: 12px; text-align: center;">
              This email was sent by PropertyFlow on behalf of {{propertyManager}}.<br>
              Your information is secure and FCRA compliant.
            </p>
          </div>
        </div>
      `,
      textContent: `
Background Check Authorization Required

Dear {{applicantName}},

{{propertyManager}} has requested a background check for your application at {{propertyName}} - Unit {{unitNumber}} (Monthly Rent: ${{ monthlyRent }}).

To proceed, please visit: {{consentUrl}}

This link expires in 48 hours.

For questions, contact {{propertyManager}} at {{contactEmail}} or {{contactPhone}}.
      `,
    },

    consentReminder: {
      subject: "Reminder: Background Check Authorization Needed - {{propertyName}}",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #f59e0b; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">⏰ Reminder</h1>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #333;">Background Check Authorization Still Needed</h2>
            
            <p>Dear {{applicantName}},</p>
            
            <p>We haven't received your background check authorization yet for your application at <strong>{{propertyName}} - Unit {{unitNumber}}</strong>.</p>
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <strong>⚠️ Your authorization link expires in {{hoursRemaining}} hours.</strong>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="{{consentUrl}}" style="background: #f59e0b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                Complete Authorization Now
              </a>
            </div>
            
            <p>If you need assistance or have questions, please contact us immediately.</p>
          </div>
        </div>
      `,
      textContent: `
Reminder: Background Check Authorization Still Needed

Dear {{applicantName}},

Your authorization for {{propertyName}} - Unit {{unitNumber}} expires in {{hoursRemaining}} hours.

Complete now: {{consentUrl}}
      `,
    },

    screeningComplete: {
      subject: "Background Check Complete - {{propertyName}}",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #10b981; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">✅ Screening Complete</h1>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #333;">Background Check Results Available</h2>
            
            <p>The background check for {{applicantName}} has been completed.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <strong>Application Details:</strong><br>
              Property: {{propertyName}} - Unit {{unitNumber}}<br>
              Applicant: {{applicantName}}<br>
              Screening Package: {{packageType}}<br>
              Completed: {{completedDate}}
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="{{dashboardUrl}}" style="background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                View Results
              </a>
            </div>
          </div>
        </div>
      `,
      textContent: `
Background Check Complete

The screening for {{applicantName}} at {{propertyName}} - Unit {{unitNumber}} is complete.

View results: {{dashboardUrl}}
      `,
    },

    adverseAction: {
      subject: "Rental Application Decision - {{propertyName}}",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #ef4444; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Application Decision</h1>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #333;">Rental Application Decision</h2>
            
            <p>Dear {{applicantName}},</p>
            
            <p>Thank you for your interest in {{propertyName}} - Unit {{unitNumber}}. After careful review of your application and background check, we regret to inform you that we cannot approve your application at this time.</p>
            
            <div style="background: #fee2e2; border: 1px solid #fecaca; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #dc2626; margin-top: 0;">Reason for Decision:</h3>
              <p style="margin-bottom: 0;">{{denialReason}}</p>
            </div>
            
            <h3>Your Rights Under the Fair Credit Reporting Act</h3>
            <p>This decision was based in whole or in part on information contained in a consumer report obtained from:</p>
            
            <div style="background: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <strong>{{creditBureau}}</strong><br>
              Phone: {{bureauContact}}<br>
              Website: www.transunion.com
            </div>
            
            <p><strong>You have the right to:</strong></p>
            <ul>
              <li>Obtain a free copy of your credit report within 60 days</li>
              <li>Dispute any inaccurate information with the credit bureau</li>
              <li>Request that the credit bureau investigate disputed items</li>
            </ul>
            
            <p style="color: #666; font-size: 14px;">
              This notice is provided in compliance with the Fair Credit Reporting Act. If you believe there has been an error, please contact us within 30 days.
            </p>
          </div>
        </div>
      `,
      textContent: `
Rental Application Decision

Dear {{applicantName}},

We cannot approve your application for {{propertyName}} - Unit {{unitNumber}}.

Reason: {{denialReason}}

This decision was based on information from {{creditBureau}} ({{bureauContact}}).

You have the right to obtain a free credit report within 60 days and dispute any inaccurate information.
      `,
    },
  }

  async sendNotification(notification: NotificationData): Promise<boolean> {
    try {
      const template = this.emailTemplates[notification.template]
      if (!template) {
        throw new Error(`Template ${notification.template} not found`)
      }

      // Replace template variables
      const subject = this.replaceVariables(template.subject, notification.variables)
      const htmlContent = this.replaceVariables(template.htmlContent, notification.variables)
      const textContent = this.replaceVariables(template.textContent, notification.variables)

      // Mock email sending
      console.log(`[Mock Email] Sending ${notification.type} to ${notification.to}`)
      console.log(`Subject: ${subject}`)
      console.log(`Template: ${notification.template}`)
      console.log(`Variables:`, notification.variables)

      // In real implementation:
      // await emailProvider.send({
      //   to: notification.to,
      //   from: notification.from || 'noreply@propertyflow.com',
      //   subject,
      //   html: htmlContent,
      //   text: textContent
      // })

      return true
    } catch (error) {
      console.error("Error sending notification:", error)
      return false
    }
  }

  private replaceVariables(template: string, variables: Record<string, any>): string {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return variables[key] || match
    })
  }

  async sendConsentRequest(applicantData: any, propertyData: any): Promise<boolean> {
    const consentToken = `consent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const consentUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/consent/${consentToken}`

    return this.sendNotification({
      to: applicantData.email,
      subject: "Background Check Authorization Required",
      template: "consentRequest",
      type: "email",
      variables: {
        applicantName: `${applicantData.firstName} ${applicantData.lastName}`,
        propertyName: propertyData.name,
        unitNumber: propertyData.unit,
        monthlyRent: propertyData.rent,
        propertyManager: propertyData.manager,
        contactEmail: propertyData.contactEmail,
        contactPhone: propertyData.contactPhone,
        consentUrl,
      },
    })
  }

  async sendConsentReminder(applicantData: any, propertyData: any, hoursRemaining: number): Promise<boolean> {
    const consentToken = applicantData.consentToken
    const consentUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/consent/${consentToken}`

    return this.sendNotification({
      to: applicantData.email,
      subject: "Reminder: Background Check Authorization Needed",
      template: "consentReminder",
      type: "email",
      variables: {
        applicantName: `${applicantData.firstName} ${applicantData.lastName}`,
        propertyName: propertyData.name,
        unitNumber: propertyData.unit,
        hoursRemaining,
        consentUrl,
      },
    })
  }

  async sendScreeningComplete(applicantData: any, propertyData: any, screeningData: any): Promise<boolean> {
    const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/screening`

    return this.sendNotification({
      to: propertyData.managerEmail,
      subject: "Background Check Complete",
      template: "screeningComplete",
      type: "email",
      variables: {
        applicantName: `${applicantData.firstName} ${applicantData.lastName}`,
        propertyName: propertyData.name,
        unitNumber: propertyData.unit,
        packageType: screeningData.packageType,
        completedDate: new Date().toLocaleDateString(),
        dashboardUrl,
      },
    })
  }
}

export class WorkflowService {
  private notificationService = new NotificationService()

  async createScreeningWorkflow(applicantId: string, propertyId: string): Promise<ScreeningWorkflow> {
    const workflow: ScreeningWorkflow = {
      id: `workflow_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      applicantId,
      propertyId,
      currentStep: "consent_request",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      steps: [
        {
          id: "consent_request",
          name: "Send Consent Request",
          status: "pending",
        },
        {
          id: "consent_received",
          name: "Consent Received",
          status: "pending",
        },
        {
          id: "screening_initiated",
          name: "Background Check Initiated",
          status: "pending",
        },
        {
          id: "screening_complete",
          name: "Background Check Complete",
          status: "pending",
        },
        {
          id: "decision_made",
          name: "Application Decision",
          status: "pending",
        },
      ],
    }

    console.log(`[Workflow] Created screening workflow ${workflow.id}`)
    return workflow
  }

  async updateWorkflowStep(
    workflowId: string,
    stepId: string,
    status: WorkflowStep["status"],
    data?: any,
  ): Promise<void> {
    console.log(`[Workflow] Updating ${workflowId} step ${stepId} to ${status}`)

    // In real implementation, update database
    // const workflow = await database.workflows.findById(workflowId)
    // workflow.steps.find(s => s.id === stepId).status = status
    // workflow.updatedAt = new Date().toISOString()
    // await database.workflows.update(workflow)

    // Trigger next step if current step completed
    if (status === "completed") {
      await this.processNextStep(workflowId, stepId, data)
    }
  }

  private async processNextStep(workflowId: string, completedStepId: string, data?: any): Promise<void> {
    console.log(`[Workflow] Processing next step after ${completedStepId}`)

    switch (completedStepId) {
      case "consent_request":
        // Set up reminder for 24 hours if no response
        setTimeout(
          () => {
            this.sendConsentReminder(workflowId, data)
          },
          24 * 60 * 60 * 1000,
        ) // 24 hours
        break

      case "consent_received":
        // Automatically initiate screening
        await this.initiateScreening(workflowId, data)
        break

      case "screening_complete":
        // Notify property manager
        await this.notifyScreeningComplete(workflowId, data)
        break

      case "decision_made":
        // Send appropriate notification to applicant
        await this.sendDecisionNotification(workflowId, data)
        break
    }
  }

  private async sendConsentReminder(workflowId: string, data: any): Promise<void> {
    // Check if consent was already received
    // In real implementation, check database
    const consentReceived = false // Mock check

    if (!consentReceived) {
      console.log(`[Workflow] Sending consent reminder for ${workflowId}`)

      // Calculate hours remaining (48 hours from initial request)
      const hoursRemaining = 24 // Mock calculation

      await this.notificationService.sendConsentReminder(data.applicant, data.property, hoursRemaining)
    }
  }

  private async initiateScreening(workflowId: string, data: any): Promise<void> {
    console.log(`[Workflow] Auto-initiating screening for ${workflowId}`)

    // In real implementation:
    // const screeningService = new ScreeningService()
    // await screeningService.initiateScreening(data.applicant, data.packageType)

    await this.updateWorkflowStep(workflowId, "screening_initiated", "completed")
  }

  private async notifyScreeningComplete(workflowId: string, data: any): Promise<void> {
    console.log(`[Workflow] Notifying screening complete for ${workflowId}`)

    await this.notificationService.sendScreeningComplete(data.applicant, data.property, data.screening)
  }

  private async sendDecisionNotification(workflowId: string, data: any): Promise<void> {
    console.log(`[Workflow] Sending decision notification for ${workflowId}`)

    if (data.decision === "deny") {
      await this.notificationService.sendNotification({
        to: data.applicant.email,
        subject: "Rental Application Decision",
        template: "adverseAction",
        type: "email",
        variables: {
          applicantName: `${data.applicant.firstName} ${data.applicant.lastName}`,
          propertyName: data.property.name,
          unitNumber: data.property.unit,
          denialReason: data.denialReason,
          creditBureau: "TransUnion",
          bureauContact: "1-800-888-4213",
        },
      })
    }
  }

  async getWorkflowStatus(workflowId: string): Promise<ScreeningWorkflow | null> {
    // In real implementation, fetch from database
    console.log(`[Workflow] Fetching status for ${workflowId}`)
    return null // Mock return
  }
}

// Export singleton instances
export const notificationService = new NotificationService()
export const workflowService = new WorkflowService()
