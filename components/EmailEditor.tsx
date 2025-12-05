'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState, useEffect } from 'react';

interface EmailEditorProps {
  password: string;
}

const defaultEmailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're Invited!</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #0f4123; font-family: Arial, Helvetica, sans-serif;">
  
  <!-- Wrapper Table -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0f4123;">
    <tr>
      <td style="padding: 40px 20px;">
        
        <!-- Main Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff;">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #c41e3a; padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 42px; font-weight: bold; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;">
                🎄 You're Confirmed! 🎁
              </h1>
              <p style="color: #ffffff; font-size: 18px; margin: 15px 0 0; padding: 0; font-family: Arial, Helvetica, sans-serif;">
                The White Elephant Bash
              </p>
            </td>
          </tr>
          
          <!-- Welcome Message -->
          <tr>
            <td style="padding: 40px 30px 30px; background-color: #f8f9fa;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="background-color: #ffffff; padding: 25px; border-left: 4px solid #c41e3a;">
                    <p style="color: #2d3748; font-size: 18px; line-height: 1.6; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;">
                      🎉 <strong style="color: #c41e3a;">Ho ho ho!</strong> Your RSVP is locked in!
                    </p>
                    <p style="color: #4a5568; font-size: 15px; line-height: 1.6; margin: 12px 0 0; padding: 0; font-family: Arial, Helvetica, sans-serif;">
                      Get ready for an evening of gift stealing, holiday cheer, and unforgettable chaos!
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Your Squad Section -->
          <tr>
            <td style="padding: 0 30px 30px; background-color: #f8f9fa;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="background-color: #ffffff; padding: 25px;">
                    <h2 style="color: #165b33; font-size: 24px; font-weight: bold; margin: 0 0 8px; padding: 0; font-family: Arial, Helvetica, sans-serif;">
                      🧝 Your Elf Squad
                    </h2>
                    <p style="color: #718096; font-size: 14px; margin: 0 0 20px; padding: 0; font-style: italic; font-family: Arial, Helvetica, sans-serif;">
                      Your festive alter egos have been assigned!
                    </p>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="background-color: #dcfce7; padding: 20px; border: 2px solid #86efac;">
                          {{GUEST_LIST}}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Event Details -->
          <tr>
            <td style="padding: 0 30px 30px; background-color: #f8f9fa;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="background-color: #c41e3a; padding: 30px;">
                    <h2 style="color: #ffffff; font-size: 24px; font-weight: bold; margin: 0 0 20px; padding: 0; font-family: Arial, Helvetica, sans-serif;">
                      🗓️ Party Details
                    </h2>
                    
                    <!-- Date -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 15px;">
                      <tr>
                        <td style="background-color: #8b1429; padding: 15px;">
                          <p style="color: #ffcccc; font-size: 12px; margin: 0; padding: 0; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; font-family: Arial, Helvetica, sans-serif;">WHEN</p>
                          <p style="color: #ffffff; font-size: 16px; font-weight: bold; margin: 5px 0 0; padding: 0; font-family: Arial, Helvetica, sans-serif;">{{PARTY_DATETIME}}</p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Location -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 15px;">
                      <tr>
                        <td style="background-color: #8b1429; padding: 15px;">
                          <p style="color: #ffcccc; font-size: 12px; margin: 0; padding: 0; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; font-family: Arial, Helvetica, sans-serif;">WHERE</p>
                          <p style="color: #ffffff; font-size: 16px; font-weight: bold; margin: 5px 0 0; padding: 0; font-family: Arial, Helvetica, sans-serif;">{{ADDRESS}}</p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Dress Code -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 15px;">
                      <tr>
                        <td style="background-color: #8b1429; padding: 15px;">
                          <p style="color: #ffcccc; font-size: 12px; margin: 0; padding: 0; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; font-family: Arial, Helvetica, sans-serif;">DRESS CODE</p>
                          <p style="color: #ffffff; font-size: 16px; font-weight: bold; margin: 5px 0 0; padding: 0; font-family: Arial, Helvetica, sans-serif;">{{DRESS_CODE}}</p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Gift Range -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="background-color: #8b1429; padding: 15px;">
                          <p style="color: #ffcccc; font-size: 12px; margin: 0; padding: 0; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; font-family: Arial, Helvetica, sans-serif;">GIFT BUDGET</p>
                          <p style="color: #ffffff; font-size: 16px; font-weight: bold; margin: 5px 0 0; padding: 0; font-family: Arial, Helvetica, sans-serif;">{{GIFT_RANGE}}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Checklist -->
          <tr>
            <td style="padding: 0 30px 30px; background-color: #f8f9fa;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="background-color: #ffffff; padding: 25px;">
                    <h2 style="color: #165b33; font-size: 22px; font-weight: bold; margin: 0 0 20px; padding: 0; font-family: Arial, Helvetica, sans-serif;">
                      ✨ Your Game Plan
                    </h2>
                    
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-family: Arial, Helvetica, sans-serif;">
                          <span style="color: #10b981; font-size: 18px;">✓ </span><span style="color: #2d3748; font-size: 15px;">Wrap your gift ({{GIFT_RANGE}}) with creativity!</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-family: Arial, Helvetica, sans-serif;">
                          <span style="color: #10b981; font-size: 18px;">✓ </span><span style="color: #2d3748; font-size: 15px;">Arrive by 7:00 PM (game starts at 7:30 PM sharp!)</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-family: Arial, Helvetica, sans-serif;">
                          <span style="color: #10b981; font-size: 18px;">✓ </span><span style="color: #2d3748; font-size: 15px;">Rock your ugliest Christmas sweater 🎄</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-family: Arial, Helvetica, sans-serif;">
                          <span style="color: #10b981; font-size: 18px;">✓ </span><span style="color: #2d3748; font-size: 15px;">Bring your A-game for gift stealing 😈</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; font-family: Arial, Helvetica, sans-serif;">
                          <span style="color: #10b981; font-size: 18px;">✓ </span><span style="color: #2d3748; font-size: 15px;">Come ready to laugh and make memories!</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Action Buttons -->
          <tr>
            <td style="padding: 30px; background-color: #f8f9fa; text-align: center;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                <tr>
                  <td style="padding: 0 5px;">
                    <a href="{{CALENDAR_LINK}}" style="display: inline-block; background-color: #c41e3a; color: #ffffff; text-decoration: none; padding: 14px 28px; font-weight: bold; font-size: 15px; font-family: Arial, Helvetica, sans-serif;">
                      🗓️ Add to Calendar
                    </a>
                  </td>
                  <td style="padding: 0 5px;">
                    <a href="{{MANAGE_RSVP_LINK}}" style="display: inline-block; background-color: #165b33; color: #ffffff; text-decoration: none; padding: 14px 28px; font-weight: bold; font-size: 15px; font-family: Arial, Helvetica, sans-serif;">
                      ✏️ Manage RSVP
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #165b33; text-align: center;">
              <p style="color: #ffffff; font-size: 20px; font-weight: bold; margin: 0 0 10px; padding: 0; font-family: Arial, Helvetica, sans-serif;">
                Can't wait to see you there! 🎅✨
              </p>
              <p style="color: #ffffff; font-size: 14px; margin: 15px 0 0; padding: 0; font-family: Arial, Helvetica, sans-serif;">
                Questions? Just reply to this email or send a text to Jen Bradshaw.
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 25px; padding-top: 25px; border-top: 1px solid #ffffff;">
                <tr>
                  <td style="text-align: center;">
                    <p style="color: #cccccc; font-size: 12px; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;">
                      The White Elephant Bash
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
        </table>
        
      </td>
    </tr>
  </table>
  
</body>
</html>
`;

export default function EmailEditor({ password }: EmailEditorProps) {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [template, setTemplate] = useState(defaultEmailTemplate);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resetting, setResetting] = useState(false);

  // Generate preview with sample data
  const getPreviewHtml = () => {
    const sampleCalendarLink = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=The+White+Elephant+Bash';
    const sampleManageLink = 'https://thewhiteelephantbash.com/rsvp?email=sample@example.com';
    
    return template
      .replace(/{{PRIMARY_NAME}}/g, 'John Doe')
      .replace(/{{EMAIL}}/g, 'john@example.com')
      .replace(/{{GUEST_COUNT}}/g, '3')
      .replace(/{{GUEST_LIST}}/g, `
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 10px;">
          <tr>
            <td style="padding: 12px 15px; background-color: #ffffff; border-left: 3px solid #10b981;">
              <p style="margin: 0; color: #2d3748; font-size: 15px; font-weight: bold; font-family: Arial, Helvetica, sans-serif;">John Doe</p>
              <p style="margin: 5px 0 0; color: #10b981; font-size: 14px; font-weight: 500; font-family: Arial, Helvetica, sans-serif;">🧝 Jolly Jingleberry</p>
            </td>
          </tr>
        </table>
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 10px;">
          <tr>
            <td style="padding: 12px 15px; background-color: #ffffff; border-left: 3px solid #10b981;">
              <p style="margin: 0; color: #2d3748; font-size: 15px; font-weight: bold; font-family: Arial, Helvetica, sans-serif;">Jane Smith</p>
              <p style="margin: 5px 0 0; color: #10b981; font-size: 14px; font-weight: 500; font-family: Arial, Helvetica, sans-serif;">🧝 Sparkle Snowflake</p>
            </td>
          </tr>
        </table>
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 10px;">
          <tr>
            <td style="padding: 12px 15px; background-color: #ffffff; border-left: 3px solid #10b981;">
              <p style="margin: 0; color: #2d3748; font-size: 15px; font-weight: bold; font-family: Arial, Helvetica, sans-serif;">Bob Johnson</p>
              <p style="margin: 5px 0 0; color: #10b981; font-size: 14px; font-weight: 500; font-family: Arial, Helvetica, sans-serif;">🧝 Tinsel McTwinkle</p>
            </td>
          </tr>
        </table>
      `)
      .replace(/{{PARTY_DATETIME}}/g, 'Friday, January 10 at 6:00 PM AST')
      .replace(/{{ADDRESS}}/g, '8853 S University Blvd, Highlands Ranch, CO 80126')
      .replace(/{{DRESS_CODE}}/g, 'Ugly Christmas Sweaters Encouraged! 🎄')
      .replace(/{{GIFT_RANGE}}/g, '$20 - $40')
      .replace(/{{CALENDAR_LINK}}/g, sampleCalendarLink)
      .replace(/{{MANAGE_RSVP_LINK}}/g, sampleManageLink);
  };

  // Load saved template on mount
  useEffect(() => {
    const loadTemplate = async () => {
      try {
        const response = await fetch('/api/admin/email-template');
        if (response.ok) {
          const data = await response.json();
          if (data.template) {
            setTemplate(data.template);
          }
        }
      } catch (error) {
        console.error('Failed to load template:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTemplate();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/email-template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ template, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save template');
      }

      setMessage('✅ Email template saved successfully!');
    } catch (error) {
      setMessage(`❌ Failed to save template: ${(error as Error).message}`);
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleResetToDefault = async () => {
    if (!confirm('This will reset the email template in the database to the default. Are you sure?')) {
      return;
    }

    setResetting(true);
    setMessage('');

    try {
      // Delete from database
      const response = await fetch('/api/admin/reset-email-template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to reset template');
      }

      // Reset local state
      setTemplate(defaultEmailTemplate);
      setMessage('✅ Email template reset to default successfully! Click Save to apply.');
    } catch (error) {
      setMessage(`❌ Failed to reset template: ${(error as Error).message}`);
      console.error('Reset error:', error);
    } finally {
      setResetting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8 text-gray-600">
        Loading email template...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Template</h2>
        <p className="text-gray-600">Customize the RSVP confirmation email sent to guests</p>
      </div>

      <Card className="p-4 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">📝 Available Merge Fields</h3>
        <div className="text-sm text-blue-800 space-y-1 grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <p><code className="bg-blue-100 px-2 py-1 rounded text-xs">{`{{PRIMARY_NAME}}`}</code> - Primary contact name</p>
            <p><code className="bg-blue-100 px-2 py-1 rounded text-xs">{`{{EMAIL}}`}</code> - Contact email</p>
            <p><code className="bg-blue-100 px-2 py-1 rounded text-xs">{`{{GUEST_LIST}}`}</code> - List of all guests with elf names</p>
            <p><code className="bg-blue-100 px-2 py-1 rounded text-xs">{`{{GUEST_COUNT}}`}</code> - Number of guests</p>
            <p><code className="bg-blue-100 px-2 py-1 rounded text-xs">{`{{CALENDAR_LINK}}`}</code> - Add to calendar link</p>
          </div>
          <div>
            <p><code className="bg-blue-100 px-2 py-1 rounded text-xs">{`{{PARTY_DATETIME}}`}</code> - Party date and time</p>
            <p><code className="bg-blue-100 px-2 py-1 rounded text-xs">{`{{ADDRESS}}`}</code> - Party address</p>
            <p><code className="bg-blue-100 px-2 py-1 rounded text-xs">{`{{DRESS_CODE}}`}</code> - Dress code</p>
            <p><code className="bg-blue-100 px-2 py-1 rounded text-xs">{`{{GIFT_RANGE}}`}</code> - Gift price range</p>
            <p><code className="bg-blue-100 px-2 py-1 rounded text-xs">{`{{MANAGE_RSVP_LINK}}`}</code> - Edit RSVP link</p>
          </div>
        </div>
        <p className="text-xs text-blue-700 mt-2 italic">💡 Tip: Copy and paste these codes into your email template!</p>
      </Card>

      {message && (
        <div className={`p-4 rounded-lg ${message.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message}
        </div>
      )}

      <div className="flex gap-2 mb-4">
        <Button
          onClick={() => setShowPreview(false)}
          variant={!showPreview ? 'default' : 'outline'}
        >
          📝 Edit HTML
        </Button>
        <Button
          onClick={() => setShowPreview(true)}
          variant={showPreview ? 'default' : 'outline'}
        >
          👁️ Preview
        </Button>
      </div>

      {!showPreview ? (
        <Card className="overflow-hidden">
          <textarea
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="w-full h-[600px] p-4 font-mono text-sm border-0 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            placeholder="Enter your HTML email template..."
            spellCheck={false}
          />
        </Card>
      ) : (
        <Card className="overflow-hidden bg-gray-100">
          <div className="p-4">
            <div 
              dangerouslySetInnerHTML={{ __html: getPreviewHtml() }}
              style={{ maxWidth: '600px', margin: '0 auto' }}
            />
          </div>
        </Card>
      )}

      <div className="flex gap-4">
        <Button
          onClick={handleSave}
          disabled={saving || resetting}
          className="bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700"
        >
          {saving ? '💾 Saving...' : '💾 Save Template'}
        </Button>
        <Button
          onClick={handleResetToDefault}
          disabled={saving || resetting}
          variant="destructive"
        >
          {resetting ? '🔄 Resetting...' : '🔄 Reset to Default (with Buttons)'}
        </Button>
      </div>
    </div>
  );
}
