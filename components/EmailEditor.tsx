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
<body style="margin: 0; padding: 0; background: linear-gradient(135deg, #165b33 0%, #0f4123 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  
  <!-- Wrapper Table -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #165b33 0%, #0f4123 100%);">
    <tr>
      <td style="padding: 40px 20px;">
        
        <!-- Main Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
          
          <!-- Header with Pattern -->
          <tr>
            <td style="background: linear-gradient(135deg, #c41e3a 0%, #8b1429 100%); padding: 0; position: relative;">
              <div style="background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px); padding: 40px 30px; text-align: center;">
                <h1 style="color: #ffffff; font-size: 42px; font-weight: 800; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.2); letter-spacing: -1px;">
                  🎄 You're Confirmed! 🎁
                </h1>
                <p style="color: #fff; font-size: 18px; margin: 15px 0 0; opacity: 0.95; font-weight: 500;">
                  The White Elephant Bash 2025
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Welcome Message -->
          <tr>
            <td style="padding: 40px 30px 30px; background-color: #f8f9fa;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%); border-radius: 12px; padding: 25px; border-left: 4px solid #c41e3a;">
                    <p style="color: #2d3748; font-size: 18px; line-height: 1.6; margin: 0; font-weight: 500;">
                      🎉 <strong style="color: #c41e3a;">Ho ho ho!</strong> Your RSVP is locked in!
                    </p>
                    <p style="color: #4a5568; font-size: 15px; line-height: 1.6; margin: 12px 0 0;">
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
                  <td style="background: #ffffff; border-radius: 12px; padding: 25px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                    <h2 style="color: #165b33; font-size: 24px; font-weight: 700; margin: 0 0 8px; display: flex; align-items: center;">
                      🧝 Your Elf Squad
                    </h2>
                    <p style="color: #718096; font-size: 14px; margin: 0 0 20px; font-style: italic;">
                      Your festive alter egos have been assigned!
                    </p>
                    <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 8px; padding: 20px; border: 2px solid #86efac;">
                      {{GUEST_LIST}}
                    </div>
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
                  <td style="background: linear-gradient(135deg, #c41e3a 0%, #8b1429 100%); border-radius: 12px; padding: 30px; box-shadow: 0 4px 12px rgba(196, 30, 58, 0.3);">
                    <h2 style="color: #ffffff; font-size: 24px; font-weight: 700; margin: 0 0 20px;">
                      📅 Party Details
                    </h2>
                    
                    <!-- Date -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 15px;">
                      <tr>
                        <td style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 15px; backdrop-filter: blur(10px);">
                          <p style="color: rgba(255,255,255,0.8); font-size: 12px; margin: 0; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">When</p>
                          <p style="color: #ffffff; font-size: 16px; font-weight: 600; margin: 5px 0 0;">{{PARTY_DATETIME}}</p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Location -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 15px;">
                      <tr>
                        <td style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 15px;">
                          <p style="color: rgba(255,255,255,0.8); font-size: 12px; margin: 0; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Where</p>
                          <p style="color: #ffffff; font-size: 16px; font-weight: 600; margin: 5px 0 0;">{{ADDRESS}}</p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Dress Code -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 15px;">
                      <tr>
                        <td style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 15px;">
                          <p style="color: rgba(255,255,255,0.8); font-size: 12px; margin: 0; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Dress Code</p>
                          <p style="color: #ffffff; font-size: 16px; font-weight: 600; margin: 5px 0 0;">{{DRESS_CODE}}</p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Gift Range -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 15px;">
                          <p style="color: rgba(255,255,255,0.8); font-size: 12px; margin: 0; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Gift Budget</p>
                          <p style="color: #ffffff; font-size: 16px; font-weight: 600; margin: 5px 0 0;">{{GIFT_RANGE}}</p>
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
                  <td style="background: #ffffff; border-radius: 12px; padding: 25px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                    <h2 style="color: #165b33; font-size: 22px; font-weight: 700; margin: 0 0 20px;">
                      ✨ Your Game Plan
                    </h2>
                    
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                          <span style="color: #10b981; font-size: 18px; margin-right: 10px;">✓</span>
                          <span style="color: #2d3748; font-size: 15px;">Wrap your gift ({{GIFT_RANGE}}) with creativity!</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                          <span style="color: #10b981; font-size: 18px; margin-right: 10px;">✓</span>
                          <span style="color: #2d3748; font-size: 15px;">Arrive by 7:00 PM (game starts at 7:30 PM sharp!)</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                          <span style="color: #10b981; font-size: 18px; margin-right: 10px;">✓</span>
                          <span style="color: #2d3748; font-size: 15px;">Rock your ugliest Christmas sweater 🎄</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                          <span style="color: #10b981; font-size: 18px; margin-right: 10px;">✓</span>
                          <span style="color: #2d3748; font-size: 15px;">Bring your A-game for gift stealing 😈</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0;">
                          <span style="color: #10b981; font-size: 18px; margin-right: 10px;">✓</span>
                          <span style="color: #2d3748; font-size: 15px;">Come ready to laugh and make memories!</span>
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
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="text-align: center;">
                    <a href="{{CALENDAR_LINK}}" style="display: inline-block; background: linear-gradient(135deg, #c41e3a 0%, #8b1429 100%); color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 700; font-size: 15px; margin: 8px; box-shadow: 0 4px 12px rgba(196, 30, 58, 0.3);">
                      📅 Add to Calendar
                    </a>
                    <a href="{{MANAGE_RSVP_LINK}}" style="display: inline-block; background: linear-gradient(135deg, #165b33 0%, #0f4123 100%); color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 700; font-size: 15px; margin: 8px; box-shadow: 0 4px 12px rgba(22, 91, 51, 0.3);">
                      ✏️ Manage RSVP
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background: linear-gradient(135deg, #165b33 0%, #0f4123 100%); text-align: center;">
              <p style="color: #ffffff; font-size: 20px; font-weight: 700; margin: 0 0 10px; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);">
                Can't wait to see you there! 🎅✨
              </p>
              <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin: 15px 0 0;">
                Questions? Just reply to this email!
              </p>
              <div style="margin-top: 25px; padding-top: 25px; border-top: 1px solid rgba(255,255,255,0.2);">
                <p style="color: rgba(255,255,255,0.7); font-size: 12px; margin: 0;">
                  The White Elephant Bash 2025
                </p>
              </div>
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
              dangerouslySetInnerHTML={{ __html: template }}
              style={{ maxWidth: '600px', margin: '0 auto' }}
            />
          </div>
        </Card>
      )}

      <div className="flex gap-4">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700"
        >
          {saving ? '💾 Saving...' : '💾 Save Template'}
        </Button>
        <Button
          onClick={() => setTemplate(defaultEmailTemplate)}
          variant="outline"
        >
          🔄 Reset to Default
        </Button>
      </div>
    </div>
  );
}
