package handler

import (
	"net/http"

	"github.com/aldngrha/portfolio-backend/internal/domain"
	"github.com/aldngrha/portfolio-backend/internal/repository"
)

type StatsHandler struct {
	visitorRepo *repository.VisitorRepository
	workRepo    domain.WorkRepository
	labRepo     domain.LabRepository
	postRepo    domain.PostRepository
	contactRepo domain.ContactRepository
}

func NewStatsHandler(
	visitorRepo *repository.VisitorRepository,
	workRepo    domain.WorkRepository,
	labRepo     domain.LabRepository,
	postRepo    domain.PostRepository,
	contactRepo domain.ContactRepository,
) *StatsHandler {
	return &StatsHandler{
		visitorRepo: visitorRepo,
		workRepo:    workRepo,
		labRepo:     labRepo,
		postRepo:    postRepo,
		contactRepo: contactRepo,
	}
}

func (h *StatsHandler) GetStats(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	// Visitor stats
	visitorStats, err := h.visitorRepo.GetStats(ctx)
	if err != nil {
		InternalError(w, err)
		return
	}

	// Recent visitors
	recentVisitors, err := h.visitorRepo.GetRecent(ctx, 10)
	if err != nil {
		recentVisitors = []domain.Visitor{}
	}

	// Daily stats (7 days)
	dailyStats, err := h.visitorRepo.GetDailyStats(ctx, 7)
	if err != nil {
		dailyStats = []repository.DailyStat{}
	}

	// Work stats
	totalWorks, err := h.workRepo.Count(ctx)
	if err != nil { totalWorks = 0 }

	// Lab stats
	totalLabs, err := h.labRepo.Count(ctx)
	if err != nil { totalLabs = 0 }

	// Post stats
	totalPosts, err := h.postRepo.Count(ctx)
	if err != nil { totalPosts = 0 }

	// Unread messages
	unreadMsgs, err := h.contactRepo.CountUnread()
	if err != nil { unreadMsgs = 0 }

	JSON(w, http.StatusOK, map[string]interface{}{
		"visitors": visitorStats,
		"recent_visitors": recentVisitors,
		"daily_stats": dailyStats,
		"counts": map[string]int{
			"works":           totalWorks,
			"labs":            totalLabs,
			"posts":           totalPosts,
			"unread_messages": unreadMsgs,
		},
	})
}
