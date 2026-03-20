package storage

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"path/filepath"
	"strings"
	"time"

	"github.com/google/uuid"
)

type Client struct {
	url        string
	serviceKey string
	bucket     string
	http       *http.Client
}

type UploadResult struct {
	URL string `json:"url"`
}

func NewClient(supabaseURL, serviceKey, bucket string) *Client {
	return &Client{
		url:        strings.TrimRight(supabaseURL, "/"),
		serviceKey: serviceKey,
		bucket:     bucket,
		http:       &http.Client{Timeout: 30 * time.Second},
	}
}

// Upload uploads a file and returns its public URL
func (c *Client) Upload(file multipart.File, header *multipart.FileHeader, folder string) (*UploadResult, error) {
	ext := filepath.Ext(header.Filename)
	var filename string

	// Use static filenames for profile and resume to allow true upserting
	if folder == "profile" {
		filename = fmt.Sprintf("%s/avatar%s", folder, ext)
	} else if folder == "resume" {
		filename = fmt.Sprintf("%s/resume%s", folder, ext)
	} else {
		filename = fmt.Sprintf("%s/%s%s", folder, uuid.New().String(), ext)
	}

	data, err := io.ReadAll(file)
	if err != nil {
		return nil, fmt.Errorf("read file: %w", err)
	}

	url := fmt.Sprintf("%s/storage/v1/object/%s/%s", c.url, c.bucket, filename)

	req, err := http.NewRequest(http.MethodPost, url, bytes.NewReader(data))
	if err != nil {
		return nil, fmt.Errorf("create request: %w", err)
	}

	req.Header.Set("Authorization", "Bearer "+c.serviceKey)
	req.Header.Set("Content-Type", header.Header.Get("Content-Type"))
	req.Header.Set("x-upsert", "true")

	resp, err := c.http.Do(req)
	if err != nil {
		return nil, fmt.Errorf("upload request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusCreated {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("upload failed (%d): %s", resp.StatusCode, string(body))
	}

	publicURL := fmt.Sprintf("%s/storage/v1/object/public/%s/%s", c.url, c.bucket, filename)
	return &UploadResult{URL: publicURL}, nil
}

// Delete removes a file from storage
func (c *Client) Delete(fileURL string) error {
	// Extract path from URL
	prefix := fmt.Sprintf("%s/storage/v1/object/public/%s/", c.url, c.bucket)
	path := strings.TrimPrefix(fileURL, prefix)
	if path == fileURL {
		return nil // not our file, skip
	}

	url := fmt.Sprintf("%s/storage/v1/object/%s/%s", c.url, c.bucket, path)
	req, err := http.NewRequest(http.MethodDelete, url, nil)
	if err != nil {
		return err
	}

	req.Header.Set("Authorization", "Bearer "+c.serviceKey)
	resp, err := c.http.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	return nil
}

// UploadJSON is a helper for uploading JSON response
type uploadResponse struct {
	Key string `json:"Key"`
}

var _ = json.Marshal // keep import
