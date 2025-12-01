'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Color from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState, useEffect } from 'react';

interface EmailEditorProps {
  password: string;
}

const defaultEmailTemplate = `
<div style="font-family: Georgia, serif; background-color: #fef9f3; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white; border: 4px solid #c41e3a; border-radius: 12px; padding: 30px;">
    <h1 style="color: #c41e3a; text-align: center; font-size: 32px; margin-bottom: 10px;">🎄 The White Elephant Bash 2025 🎁</h1>
    <p style="text-align: center; font-size: 18px; margin-bottom: 30px; color: #165b33;"><strong>Ho ho ho! Your RSVP has been confirmed!</strong></p>
    
    <h2 style="color: #165b33; font-size: 24px; margin-top: 30px;">🎉 Your Party Squad</h2>
    <p style="color: #666; font-size: 14px; font-style: italic;">Your unique elf names will be listed here!</p>
    {{GUEST_LIST}}
    
    <div style="background-color: #fef9f3; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h2 style="color: #165b33; font-size: 24px;">📅 Event Details</h2>
      <p><strong>Date & Time:</strong> {{PARTY_DATETIME}}</p>
      <p><strong>Location:</strong> {{ADDRESS}}</p>
      <p><strong>Dress Code:</strong> {{DRESS_CODE}}</p>
      <p><strong>Gift Price Range:</strong> {{GIFT_RANGE}}</p>
    </div>

    <h2 style="color: #165b33; font-size: 24px; margin-top: 30px;">🎁 Don't Forget:</h2>
    <ul style="list-style: none; padding: 0;">
      <li style="padding: 8px 0;">✓ Bring a wrapped gift ({{GIFT_RANGE}})</li>
      <li style="padding: 8px 0;">✓ Arrive by 7:00 PM - game starts at 7:30 PM sharp!</li>
      <li style="padding: 8px 0;">✓ Wear your ugliest (or most fabulous) Christmas sweater 🎄</li>
      <li style="padding: 8px 0;">✓ Bring your A-game for stealing gifts! 😈</li>
      <li style="padding: 8px 0;">✓ Come ready to laugh, compete, and make memories</li>
    </ul>

    <div style="border-top: 2px solid #c41e3a; margin-top: 30px; padding-top: 20px;">
      <p style="text-align: center; font-size: 16px; color: #165b33;">
        <strong>Can't wait to see you there! 🎅✨</strong>
      </p>
      <p style="text-align: center; font-size: 14px; color: #666; margin-top: 10px;">
        Questions? Just reply to this email!
      </p>
    </div>
  </div>
</div>
`;

const MenuBar = ({ editor }: any) => {
  if (!editor) return null;

  return (
    <div className="border-b p-2 flex flex-wrap gap-1 bg-gray-50">
      <Button
        type="button"
        size="sm"
        variant={editor.isActive('bold') ? 'default' : 'outline'}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        Bold
      </Button>
      <Button
        type="button"
        size="sm"
        variant={editor.isActive('italic') ? 'default' : 'outline'}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        Italic
      </Button>
      <Button
        type="button"
        size="sm"
        variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'outline'}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        H1
      </Button>
      <Button
        type="button"
        size="sm"
        variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'outline'}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </Button>
      <Button
        type="button"
        size="sm"
        variant={editor.isActive('bulletList') ? 'default' : 'outline'}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        Bullet List
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        Undo
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        Redo
      </Button>
    </div>
  );
};

export default function EmailEditor({ password }: EmailEditorProps) {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [template, setTemplate] = useState(defaultEmailTemplate);

  const editor = useEditor({
    extensions: [StarterKit, Link, TextStyle, Color],
    content: template,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[400px] p-4',
      },
    },
    onUpdate: ({ editor }) => {
      setTemplate(editor.getHTML());
    },
  });

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Template</h2>
        <p className="text-gray-600">Customize the RSVP confirmation email sent to guests</p>
      </div>

      <Card className="p-4 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">📝 Available Variables</h3>
        <div className="text-sm text-blue-800 space-y-1">
          <p><code className="bg-blue-100 px-2 py-1 rounded">{`{{GUEST_LIST}}`}</code> - List of guests with elf names</p>
          <p><code className="bg-blue-100 px-2 py-1 rounded">{`{{PARTY_DATETIME}}`}</code> - Party date and time</p>
          <p><code className="bg-blue-100 px-2 py-1 rounded">{`{{ADDRESS}}`}</code> - Party address</p>
          <p><code className="bg-blue-100 px-2 py-1 rounded">{`{{DRESS_CODE}}`}</code> - Dress code</p>
          <p><code className="bg-blue-100 px-2 py-1 rounded">{`{{GIFT_RANGE}}`}</code> - Gift price range</p>
        </div>
      </Card>

      {message && (
        <div className={`p-4 rounded-lg ${message.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message}
        </div>
      )}

      <Card className="overflow-hidden">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} className="bg-white" />
      </Card>

      <div className="flex gap-4">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700"
        >
          {saving ? '💾 Saving...' : '💾 Save Template'}
        </Button>
        <Button
          onClick={() => editor?.commands.setContent(defaultEmailTemplate)}
          variant="outline"
        >
          🔄 Reset to Default
        </Button>
      </div>

      <style jsx global>{`
        .ProseMirror {
          min-height: 400px;
        }
        .ProseMirror:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
}
