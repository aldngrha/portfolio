package mailer

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

type Mailer struct {
	apiKey string
	from   string
	to     string
	http   *http.Client
}

type EmailPayload struct {
	From    string   `json:"from"`
	To      []string `json:"to"`
	Subject string   `json:"subject"`
	HTML    string   `json:"html"`
}

func New(apiKey, from, to string) *Mailer {
	return &Mailer{
		apiKey: apiKey,
		from:   from,
		to:     to,
		http:   &http.Client{Timeout: 10 * time.Second},
	}
}

func (m *Mailer) SendContactNotification(name, email, subject, message string) error {
	if m.apiKey == "" {
		return nil
	}

	html := fmt.Sprintf(`<div style="font-family:sans-serif;max-width:600px;margin:0 auto">
  <h2 style="color:#185FA5">New contact message</h2>
  <table style="width:100%%;border-collapse:collapse">
    <tr><td style="padding:8px 0;color:#888;width:100px">From</td><td><strong>%s</strong> &lt;%s&gt;</td></tr>
    <tr><td style="padding:8px 0;color:#888">Subject</td><td>%s</td></tr>
  </table>
  <div style="background:#f5f5f5;padding:16px;border-radius:8px;margin-top:16px">
    <p style="margin:0;white-space:pre-wrap">%s</p>
  </div>
</div>`, name, email, subject, message)

	payload := EmailPayload{
		From:    m.from,
		To:      []string{m.to},
		Subject: fmt.Sprintf("[Portfolio] %s — %s", subject, name),
		HTML:    html,
	}

	body, err := json.Marshal(payload)
	if err != nil {
		return fmt.Errorf("marshal email: %w", err)
	}

	req, err := http.NewRequest(http.MethodPost, "https://api.resend.com/emails", bytes.NewReader(body))
	if err != nil {
		return fmt.Errorf("create request: %w", err)
	}
	req.Header.Set("Authorization", "Bearer "+m.apiKey)
	req.Header.Set("Content-Type", "application/json")

	resp, err := m.http.Do(req)
	if err != nil {
		return fmt.Errorf("send: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		b, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("resend error (%d): %s", resp.StatusCode, string(b))
	}
	return nil
}
